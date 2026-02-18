import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface RSVP {
  id: string;
  guest_name: string;
  email?: string;
  attending: boolean;
  number_of_guests: number;
  food_intolerances?: string;
  message?: string;
  created_at: string;
  updated_at: string;
}

export interface GiftRegistryItem {
  id: string;
  name: string;
  description: string;
  photo_url: string;
  website_link?: string;
  priority: number;
  is_claimed: boolean;
  claimed_by?: string;
  created_at: string;
}
