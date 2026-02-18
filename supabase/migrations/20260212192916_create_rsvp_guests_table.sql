/*
  # Create RSVP Guests Table

  ## Purpose
  Store additional guest names for RSVPs where number_of_guests is greater than 1.
  The main guest name remains in the rsvps.guest_name field, and additional guests
  (Guest 2, Guest 3, etc.) are stored in this table.

  ## New Tables
  - `rsvp_guests`
    - `id` (uuid, primary key) - Unique identifier for each additional guest
    - `rsvp_id` (uuid, foreign key) - Links to the parent RSVP record
    - `guest_name` (text, required) - Full name of the additional guest
    - `guest_order` (integer, required) - Order number (2, 3, 4, etc.)
    - `created_at` (timestamptz) - When the record was created

  ## Relationships
  - Foreign key from rsvp_guests.rsvp_id to rsvps.id with CASCADE delete
    (when an RSVP is deleted, all associated guest records are automatically deleted)

  ## Security
  - Enable RLS on rsvp_guests table
  - Add SELECT policy: Anyone can read guest names (public access)
  - Add INSERT policy: Anyone can insert guest names (public RSVP form)
  - Add UPDATE policy: Anyone can update guest names
  - Add DELETE policy: Anyone can delete guest records

  ## Notes
  - guest_order starts at 2 (Guest 2) since Guest 1 is stored in rsvps.guest_name
  - All guest names are required and cannot be empty
  - The table uses CASCADE delete to maintain referential integrity
*/

-- Create the rsvp_guests table
CREATE TABLE IF NOT EXISTS rsvp_guests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rsvp_id uuid NOT NULL REFERENCES rsvps(id) ON DELETE CASCADE,
  guest_name text NOT NULL,
  guest_order integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE rsvp_guests ENABLE ROW LEVEL SECURITY;

-- Policy for reading guest names (public access)
CREATE POLICY "Anyone can view guest names"
  ON rsvp_guests FOR SELECT
  USING (true);

-- Policy for inserting guest names (public RSVP form)
CREATE POLICY "Anyone can add guest names"
  ON rsvp_guests FOR INSERT
  WITH CHECK (true);

-- Policy for updating guest names
CREATE POLICY "Anyone can update guest names"
  ON rsvp_guests FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Policy for deleting guest records
CREATE POLICY "Anyone can delete guest records"
  ON rsvp_guests FOR DELETE
  USING (true);

-- Create an index for faster lookups by rsvp_id
CREATE INDEX IF NOT EXISTS idx_rsvp_guests_rsvp_id ON rsvp_guests(rsvp_id);