
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[HANDLE-PAYMENT-SUCCESS] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { sessionId } = await req.json();
    logStep("Session ID received", { sessionId });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    logStep("Session retrieved", { sessionStatus: session.payment_status });

    if (session.payment_status !== 'paid') {
      throw new Error('Payment not completed');
    }

    // Extract metadata
    const metadata = session.metadata;
    const items = JSON.parse(metadata?.items || '[]');
    const shippingInfo = JSON.parse(metadata?.shipping_info || '{}');
    const prescriptionData = metadata?.prescription_data ? JSON.parse(metadata.prescription_data) : null;
    const userId = metadata?.user_id;

    logStep("Metadata extracted", { userId, itemsCount: items.length, hasPrescription: !!prescriptionData });

    // Create the order
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .insert([{
        user_id: userId,
        total_amount: session.amount_total || 0,
        payment_method: 'stripe',
        payment_details: { 
          stripe_session_id: sessionId,
          payment_intent_id: session.payment_intent 
        },
        shipping_address: shippingInfo.address,
        city: shippingInfo.city,
        district: shippingInfo.district,
        status: 'Processing'
      }])
      .select()
      .single();

    if (orderError) {
      logStep("Error creating order", { error: orderError });
      throw orderError;
    }

    logStep("Order created", { orderId: order.id });

    // Create order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabaseClient
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      logStep("Error creating order items", { error: itemsError });
      throw itemsError;
    }

    logStep("Order items created", { itemsCount: orderItems.length });

    // Create prescription if provided
    if (prescriptionData) {
      const { error: prescriptionError } = await supabaseClient
        .from('prescriptions')
        .insert([{
          user_id: userId,
          patient_name: prescriptionData.patientName || 'Unknown',
          image: prescriptionData.file,
          status: 'Pending Review'
        }]);

      if (prescriptionError) {
        logStep("Error creating prescription", { error: prescriptionError });
        // Don't throw here as the order is already created
      } else {
        logStep("Prescription created");
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      orderId: order.id,
      order: order 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in handle-payment-success", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
