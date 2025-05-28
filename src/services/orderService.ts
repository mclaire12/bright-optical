
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
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        ...orderData,
        user_id: (await supabase.auth.getUser()).data.user?.id
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating order:', error);
      throw error;
    }

    return data;
  },

  async createOrderItems(orderItems: {
    order_id: string;
    product_id: string;
    quantity: number;
    price: number;
  }[]) {
    const { data, error } = await supabase
      .from('order_items')
      .insert(orderItems)
      .select();

    if (error) {
      console.error('Error creating order items:', error);
      throw error;
    }

    return data;
  },

  async getUserOrders(userId?: string) {
    let query = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching orders:', error);
      return [];
    }

    return data || [];
  },

  async getAllOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all orders:', error);
      return [];
    }

    return data || [];
  },

  async getOrderById(orderId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
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
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId)
      .select()
      .single();

    if (error) {
      console.error('Error updating order status:', error);
      throw error;
    }

    return data;
  },

  async getOrderItems(orderId: string) {
    const { data, error } = await supabase
      .from('order_items')
      .select(`
        *,
        products (
          id,
          name,
          price,
          image,
          category
        )
      `)
      .eq('order_id', orderId);

    if (error) {
      console.error('Error fetching order items:', error);
      return [];
    }

    return data || [];
  }
};
