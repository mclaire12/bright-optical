
import { supabase } from "@/integrations/supabase/client";

export interface Order {
  id: string;
  user_id: string;
  order_date: string;
  total_amount: number;
  status: string;
  payment_method: string;
  payment_details?: any;
  shipping_address: string;
  city: string;
  district: string;
  tracking_number?: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
}

export const orderService = {
  async createOrder(orderData: {
    total_amount: number;
    payment_method: string;
    payment_details?: any;
    shipping_address: string;
    city: string;
    district: string;
  }) {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('orders')
      .insert({
        user_id: user.user.id,
        total_amount: orderData.total_amount,
        payment_method: orderData.payment_method,
        payment_details: orderData.payment_details,
        shipping_address: orderData.shipping_address,
        city: orderData.city,
        district: orderData.district,
        status: 'Processing'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating order:', error);
      throw error;
    }

    return data;
  },

  async createOrderItems(orderId: string, items: Array<{
    product_id: string;
    quantity: number;
    price: number;
  }>) {
    const { data, error } = await supabase
      .from('order_items')
      .insert(
        items.map(item => ({
          order_id: orderId,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price
        }))
      )
      .select();

    if (error) {
      console.error('Error creating order items:', error);
      throw error;
    }

    return data;
  },

  async getUserOrders() {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return [];

    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('user_id', user.user.id)
      .order('order_date', { ascending: false });

    if (error) {
      console.error('Error fetching user orders:', error);
      return [];
    }

    return data || [];
  },

  async getAllOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .order('order_date', { ascending: false });

    if (error) {
      console.error('Error fetching all orders:', error);
      return [];
    }

    return data || [];
  },

  async getOrderById(orderId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('id', orderId)
      .single();

    if (error) {
      console.error('Error fetching order:', error);
      return null;
    }

    return data;
  },

  async updateOrderStatus(orderId: string, status: string) {
    const { data, error } = await supabase
      .from('orders')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)
      .select()
      .single();

    if (error) {
      console.error('Error updating order status:', error);
      throw error;
    }

    return data;
  }
};
