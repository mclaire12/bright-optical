
import { supabase } from "@/integrations/supabase/client";

export interface Prescription {
  id: string;
  user_id: string;
  patient_name: string;
  doctor_name?: string;
  date: string;
  expiry_date?: string;
  status: string;
  image?: string;
  right_eye_sphere?: string;
  right_eye_cylinder?: string;
  right_eye_axis?: string;
  left_eye_sphere?: string;
  left_eye_cylinder?: string;
  left_eye_axis?: string;
  recommendations?: string[];
  created_at: string;
  updated_at: string;
}

export const prescriptionService = {
  async createPrescription(prescriptionData: {
    patient_name: string;
    doctor_name?: string;
    date: string;
    expiry_date?: string;
    image?: string;
    right_eye_sphere?: string;
    right_eye_cylinder?: string;
    right_eye_axis?: string;
    left_eye_sphere?: string;
    left_eye_cylinder?: string;
    left_eye_axis?: string;
    recommendations?: string[];
  }) {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('prescriptions')
      .insert([{
        ...prescriptionData,
        user_id: user.user.id,
        status: 'Active'
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating prescription:', error);
      throw error;
    }

    return data;
  },

  async getUserPrescriptions() {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return [];

    const { data, error } = await supabase
      .from('prescriptions')
      .select('*')
      .eq('user_id', user.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching prescriptions:', error);
      return [];
    }

    return data || [];
  },

  async getAllPrescriptions() {
    const { data, error } = await supabase
      .from('prescriptions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all prescriptions:', error);
      return [];
    }

    return data || [];
  },

  async getPrescriptionById(id: string) {
    const { data, error } = await supabase
      .from('prescriptions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching prescription:', error);
      return null;
    }

    return data;
  },

  async updatePrescription(id: string, updates: Partial<Prescription>) {
    const { data, error } = await supabase
      .from('prescriptions')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating prescription:', error);
      throw error;
    }

    return data;
  }
};
