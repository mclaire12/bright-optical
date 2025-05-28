
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
    const { data, error } = await supabase
      .from('prescriptions')
      .insert([{
        ...prescriptionData,
        user_id: (await supabase.auth.getUser()).data.user?.id
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating prescription:', error);
      throw error;
    }

    return data;
  },

  async getUserPrescriptions(userId?: string) {
    let query = supabase
      .from('prescriptions')
      .select('*')
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching prescriptions:', error);
      return [];
    }

    return data || [];
  },

  async getAllPrescriptions() {
    const { data, error } = await supabase
      .from('prescriptions')
      .select(`
        *,
        profiles (
          first_name,
          last_name,
          email
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all prescriptions:', error);
      return [];
    }

    return data || [];
  },

  async getPrescriptionById(prescriptionId: string) {
    const { data, error } = await supabase
      .from('prescriptions')
      .select('*')
      .eq('id', prescriptionId)
      .single();

    if (error) {
      console.error('Error fetching prescription:', error);
      return null;
    }

    return data;
  },

  async updatePrescriptionStatus(prescriptionId: string, status: string) {
    const { data, error } = await supabase
      .from('prescriptions')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', prescriptionId)
      .select()
      .single();

    if (error) {
      console.error('Error updating prescription status:', error);
      throw error;
    }

    return data;
  }
};
