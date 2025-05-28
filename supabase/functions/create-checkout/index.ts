
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Parse request body
    const { items, shippingInfo, prescriptionData } = await req.json();
    logStep("Request body parsed", { itemsCount: items.length, hasPrescription: !!prescriptionData });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }
    logStep("Customer check completed", { customerId });

    // Calculate total amount
    const itemsTotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const prescriptionCost = prescriptionData?.additionalPrice || 0;
    const shippingCost = 500; // RWF 500 shipping cost
    const totalAmount = itemsTotal + prescriptionCost + shippingCost;

    // Prepare line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "rwf",
        product_data: {
          name: item.name,
          description: item.category,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    // Add prescription cost if present
    if (prescriptionCost > 0) {
      lineItems.push({
        price_data: {
          currency: "rwf",
          product_data: {
            name: "Prescription Processing",
            description: "Additional cost for prescription processing",
          },
          unit_amount: prescriptionCost,
        },
        quantity: 1,
      });
    }

    // Add shipping cost
    lineItems.push({
      price_data: {
        currency: "rwf",
        product_data: {
          name: "Shipping",
          description: "Delivery charges",
        },
        unit_amount: shippingCost,
      },
      quantity: 1,
    });

    logStep("Line items prepared", { lineItemsCount: lineItems.length, totalAmount });

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/dashboard?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/cart?payment=cancelled`,
      metadata: {
        user_id: user.id,
        items: JSON.stringify(items),
        shipping_info: JSON.stringify(shippingInfo),
        prescription_data: prescriptionData ? JSON.stringify(prescriptionData) : "",
      },
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-checkout", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
