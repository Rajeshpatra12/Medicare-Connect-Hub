-- Create appointments table
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  age INTEGER NOT NULL,
  department TEXT NOT NULL,
  doctor TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Public booking system: anyone can create and view appointments
-- (No authentication required for this hospital booking demo)
CREATE POLICY "Anyone can create appointments"
ON public.appointments
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can view appointments"
ON public.appointments
FOR SELECT
USING (true);

CREATE INDEX idx_appointments_created_at ON public.appointments(created_at DESC);