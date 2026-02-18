/*
  # Create wishes table for wedding wishes/messages

  1. New Tables
    - `wishes`
      - `id` (uuid, primary key) - Unique identifier for each wish
      - `sender_name` (text) - Name of the person sending the wish
      - `message` (text) - The wish message content
      - `created_at` (timestamptz) - When the wish was created
  
  2. Security
    - Enable RLS on `wishes` table
    - Add policy for anyone to insert wishes (public access for guests)
    - Add policy for anyone to read wishes (public display)
    
  3. Notes
    - This table allows wedding guests to leave wishes and messages
    - Public access is intentional for this use case
    - Messages are displayed on the wishes page
*/

CREATE TABLE IF NOT EXISTS wishes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_name text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert wishes"
  ON wishes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read wishes"
  ON wishes
  FOR SELECT
  TO anon, authenticated
  USING (true);