ALTER TABLE public.appointments
  ADD COLUMN IF NOT EXISTS aadhaar text,
  ADD COLUMN IF NOT EXISTS father_name text,
  ADD COLUMN IF NOT EXISTS blood_group text;