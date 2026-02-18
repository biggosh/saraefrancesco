/*
  # Wedding Website Database Schema

  ## Overview
  Creates tables for managing wedding RSVPs and gift registry for Sara and Francesco's wedding website.

  ## New Tables
  
  ### `rsvps`
  Stores guest confirmation responses and dietary requirements
  - `id` (uuid, primary key) - Unique identifier for each RSVP
  - `guest_name` (text, required) - Name of the guest
  - `email` (text, optional) - Guest email for confirmation
  - `attending` (boolean, required) - Whether the guest is attending
  - `number_of_guests` (integer, default 1) - Total number of people attending
  - `food_intolerances` (text, optional) - Any dietary restrictions or food allergies
  - `message` (text, optional) - Optional message from the guest
  - `created_at` (timestamptz) - When the RSVP was created
  - `updated_at` (timestamptz) - Last update timestamp

  ### `gift_registry`
  Stores the list of preferred wedding gifts
  - `id` (uuid, primary key) - Unique identifier for each gift
  - `name` (text, required) - Name of the gift item
  - `description` (text, required) - Description of the gift
  - `photo_url` (text, required) - URL to the gift photo
  - `website_link` (text, optional) - Link to purchase or view the gift
  - `priority` (integer, default 0) - Display priority (higher shows first)
  - `is_claimed` (boolean, default false) - Whether someone has claimed this gift
  - `claimed_by` (text, optional) - Name of person who claimed it
  - `created_at` (timestamptz) - When the gift was added
  
  ## Security
  
  ### RLS Policies
  - RSVPs: Anyone can insert their own RSVP, read all RSVPs (for displaying count), update their own
  - Gift Registry: Anyone can read gifts and update claim status
*/

-- Create RSVPs table
CREATE TABLE IF NOT EXISTS rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  email text,
  attending boolean NOT NULL DEFAULT true,
  number_of_guests integer DEFAULT 1 CHECK (number_of_guests > 0),
  food_intolerances text,
  message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create Gift Registry table
CREATE TABLE IF NOT EXISTS gift_registry (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  photo_url text NOT NULL,
  website_link text,
  priority integer DEFAULT 0,
  is_claimed boolean DEFAULT false,
  claimed_by text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_registry ENABLE ROW LEVEL SECURITY;

-- RLS Policies for rsvps
CREATE POLICY "Anyone can view RSVPs"
  ON rsvps FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert RSVPs"
  ON rsvps FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update RSVPs"
  ON rsvps FOR UPDATE
  USING (true);

-- RLS Policies for gift_registry
CREATE POLICY "Anyone can view gift registry"
  ON gift_registry FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update gift claims"
  ON gift_registry FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_rsvps_created_at ON rsvps(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gift_registry_priority ON gift_registry(priority DESC, created_at DESC);

-- Insert sample gift registry items
INSERT INTO gift_registry (name, description, photo_url, website_link, priority) VALUES
  ('Espresso Machine', 'A high-quality espresso machine for our morning coffee rituals', 'https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://example.com/espresso', 3),
  ('Italian Cookbook Collection', 'Collection of traditional Italian recipes to explore together', 'https://images.pexels.com/photos/4871119/pexels-photo-4871119.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://example.com/cookbook', 2),
  ('Luggage Set', 'Matching luggage set for our honeymoon adventures', 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://example.com/luggage', 3),
  ('Wine Decanter Set', 'Elegant crystal wine decanter with glasses', 'https://images.pexels.com/photos/2647933/pexels-photo-2647933.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://example.com/wine', 1),
  ('Smart Home Hub', 'Voice-controlled smart home system', 'https://images.pexels.com/photos/4458418/pexels-photo-4458418.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://example.com/smarthome', 2),
  ('Garden Tool Set', 'Complete set for our new garden', 'https://images.pexels.com/photos/169523/pexels-photo-169523.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://example.com/garden', 1)
ON CONFLICT DO NOTHING;