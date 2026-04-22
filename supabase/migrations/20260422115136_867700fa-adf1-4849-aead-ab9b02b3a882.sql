-- Create card_background_templates table
CREATE TABLE public.card_background_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('image', 'css', 'gradient', 'pattern')),
  value TEXT NOT NULL,
  preview_url TEXT,
  storage_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.card_background_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view templates"
ON public.card_background_templates FOR SELECT USING (true);

CREATE POLICY "Anyone can insert templates"
ON public.card_background_templates FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update templates"
ON public.card_background_templates FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete templates"
ON public.card_background_templates FOR DELETE USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_card_background_templates_updated_at
BEFORE UPDATE ON public.card_background_templates
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for background images
INSERT INTO storage.buckets (id, name, public) VALUES ('card-backgrounds', 'card-backgrounds', true);

CREATE POLICY "Public can view card backgrounds"
ON storage.objects FOR SELECT USING (bucket_id = 'card-backgrounds');

CREATE POLICY "Public can upload card backgrounds"
ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'card-backgrounds');

CREATE POLICY "Public can update card backgrounds"
ON storage.objects FOR UPDATE USING (bucket_id = 'card-backgrounds');

CREATE POLICY "Public can delete card backgrounds"
ON storage.objects FOR DELETE USING (bucket_id = 'card-backgrounds');