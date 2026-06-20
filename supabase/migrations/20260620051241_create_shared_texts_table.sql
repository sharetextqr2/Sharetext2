/*
# Create shared_texts table for ShareTextQR

1. New Tables
- `shared_texts`
  - `id` (uuid, primary key, auto-generated)
  - `short_id` (text, unique, not null) — 8-character alphanumeric code used in QR URLs
  - `content` (text, not null) — the shared text content
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())

2. Security
- Enable RLS on `shared_texts`.
- Allow anonymous and authenticated users to read, insert, update, delete shared texts.
  This is a single-tenant public sharing app — no auth required.
*/

CREATE TABLE IF NOT EXISTS shared_texts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  short_id text UNIQUE NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

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
