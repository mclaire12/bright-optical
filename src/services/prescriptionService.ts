
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
  async uploadPrescription(prescriptionData: {
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
      .insert({
        user_id: user.user.id,
        patient_name: prescriptionData.patient_name,
        doctor_name: prescriptionData.doctor_name,
        date: prescriptionData.date,
        expiry_date: prescriptionData.expiry_date,
        image: prescriptionData.image,
        right_eye_sphere: prescriptionData.right_eye_sphere,
        right_eye_cylinder: prescriptionData.right_eye_cylinder,
        right_eye_axis: prescriptionData.right_eye_axis,
        left_eye_sphere: prescriptionData.left_eye_sphere,
        left_eye_cylinder: prescriptionData.left_eye_cylinder,
        left_eye_axis: prescriptionData.left_eye_axis,
        recommendations: prescriptionData.recommendations,
        status: 'Pending Review'
      })
      .select()
      .single();

    if (error) {
      console.error('Error uploading prescription:', error);
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
      console.error('Error fetching user prescriptions:', error);
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
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
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
