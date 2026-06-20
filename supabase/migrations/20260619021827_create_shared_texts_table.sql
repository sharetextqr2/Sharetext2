/*
# Create shared_texts table

1. New Tables
- `shared_texts`
  - `id` (uuid, primary key) - auto-generated unique identifier
  - `short_id` (text, unique, not null) - short 8-character alphanumeric ID for QR codes
  - `content` (text, not null) - the text content being shared
  - `created_at` (timestamptz) - when the text was shared
  - `expires_at` (timestamptz) - optional expiration time

2. Security
- Enable RLS on `shared_texts`.
- Allow anonymous (public) read/write since this is a public text sharing tool with no auth required.
*/

CREATE TABLE IF NOT EXISTS shared_texts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  short_id text UNIQUE NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '30 days')
);

-- Index for fast lookups by short_id
CREATE INDEX IF NOT EXISTS idx_shared_texts_short_id ON shared_texts(short_id);

-- Index for cleanup of expired entries
CREATE INDEX IF NOT EXISTS idx_shared_texts_expires_at ON shared_texts(expires_at);

ALTER TABLE shared_texts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_shared_texts" ON shared_texts;
CREATE POLICY "anon_select_shared_texts" ON shared_texts FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_shared_texts" ON shared_texts;
CREATE POLICY "anon_insert_shared_texts" ON shared_texts FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_shared_texts" ON shared_texts;
CREATE POLICY "anon_update_shared_texts" ON shared_texts FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_shared_texts" ON shared_texts;
CREATE POLICY "anon_delete_shared_texts" ON shared_texts FOR DELETE
  TO anon, authenticated USING (true);