-- CMS Tables for Hexanovate Admin Dashboard
-- Run this in: Supabase Dashboard → SQL Editor → New Query

-- ─── Pages ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.cms_pages (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  slug         TEXT        UNIQUE NOT NULL,
  name         TEXT        NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- ─── Sections ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.cms_sections (
  id             UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id        UUID        NOT NULL REFERENCES public.cms_pages(id) ON DELETE CASCADE,
  component_name TEXT        NOT NULL,
  display_name   TEXT        NOT NULL,
  display_order  INT         NOT NULL DEFAULT 0,
  enabled        BOOLEAN     NOT NULL DEFAULT true,
  content        JSONB       NOT NULL DEFAULT '{}',
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cms_sections_page_id ON public.cms_sections(page_id);
CREATE INDEX IF NOT EXISTS idx_cms_sections_component ON public.cms_sections(component_name);

-- ─── Carousel / List Items ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.cms_carousel_items (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  section_id  UUID        NOT NULL REFERENCES public.cms_sections(id) ON DELETE CASCADE,
  item_order  INT         NOT NULL DEFAULT 0,
  content     JSONB       NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cms_carousel_section_id ON public.cms_carousel_items(section_id);

-- ─── Auto-update updated_at ───────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_cms_sections_updated_at ON public.cms_sections;
CREATE TRIGGER trg_cms_sections_updated_at
  BEFORE UPDATE ON public.cms_sections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ─── Row Level Security ───────────────────────────────────────────────────────
ALTER TABLE public.cms_pages           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_sections        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_carousel_items  ENABLE ROW LEVEL SECURITY;

-- Public read (frontend can read content without login)
DROP POLICY IF EXISTS "Public read cms_pages"          ON public.cms_pages;
DROP POLICY IF EXISTS "Public read cms_sections"       ON public.cms_sections;
DROP POLICY IF EXISTS "Public read cms_carousel_items" ON public.cms_carousel_items;

CREATE POLICY "Public read cms_pages"
  ON public.cms_pages FOR SELECT USING (true);

CREATE POLICY "Public read cms_sections"
  ON public.cms_sections FOR SELECT USING (true);

CREATE POLICY "Public read cms_carousel_items"
  ON public.cms_carousel_items FOR SELECT USING (true);

-- Authenticated write (admin only)
DROP POLICY IF EXISTS "Auth write cms_pages"          ON public.cms_pages;
DROP POLICY IF EXISTS "Auth write cms_sections"       ON public.cms_sections;
DROP POLICY IF EXISTS "Auth write cms_carousel_items" ON public.cms_carousel_items;

CREATE POLICY "Auth write cms_pages"
  ON public.cms_pages FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Auth write cms_sections"
  ON public.cms_sections FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Auth write cms_carousel_items"
  ON public.cms_carousel_items FOR ALL USING (auth.role() = 'authenticated');

-- ─── Seed: Pages ──────────────────────────────────────────────────────────────
INSERT INTO public.cms_pages (slug, name) VALUES
  ('home',                'Home'),
  ('about-us',            'About Us'),
  ('leadership-and-team', 'Leadership & Team'),
  ('schedule-demo',       'Schedule Demo'),
  ('contact-us',          'Contact Us'),
  ('thank-you',           'Thank You')
ON CONFLICT (slug) DO NOTHING;

-- ─── Seed: Sections (Home) ────────────────────────────────────────────────────
DO $$
DECLARE page_id UUID;
BEGIN
  SELECT id INTO page_id FROM public.cms_pages WHERE slug = 'home';
  INSERT INTO public.cms_sections (page_id, component_name, display_name, display_order) VALUES
    (page_id, 'BannerSection',            'Hero Banner',                   1),
    (page_id, 'FmcgSection',              'FMCG Portfolio',                2),
    (page_id, 'B2bSection',               'B2B Section (ThirdMeta)',        3),
    (page_id, 'EducationSection',         'Education Section (EduHexa)',    4),
    (page_id, 'WhatDefinesUsSection',     'What Defines Us',               5),
    (page_id, 'LogoMarqueeSection',       'Logo Marquee (Client Logos)',    6),
    (page_id, 'WhyWeStartedSection',      'Why We Started',                7),
    (page_id, 'SolutionsSection',         'Solutions',                     8),
    (page_id, 'WhyChooseUsSection',       'Why Choose Us',                 9),
    (page_id, 'TeamCultureSection',       'Team & Culture',               10),
    (page_id, 'TestimonialSection',       'Testimonials Carousel',        11),
    (page_id, 'ValuesApproachSection',    'Values & Approach',            12),
    (page_id, 'AwardsLogoWallSection',    'Awards Logo Wall',             13),
    (page_id, 'ResourcesSection',         'Resources',                    14),
    (page_id, 'TestimonialsHeaderSection','Growth Systems CTA',           15),
    (page_id, 'FaqSection',              'FAQ',                           16),
    (page_id, 'DemoFormSection',          'Contact Form',                 17),
    (page_id, 'TagsCarouselSection',      'Tags Carousel',                18),
    (page_id, 'FooterSection',            'Footer',                       19)
  ON CONFLICT DO NOTHING;
END $$;

-- ─── Seed: Sections (About Us) ────────────────────────────────────────────────
DO $$
DECLARE page_id UUID;
BEGIN
  SELECT id INTO page_id FROM public.cms_pages WHERE slug = 'about-us';
  INSERT INTO public.cms_sections (page_id, component_name, display_name, display_order) VALUES
    (page_id, 'GlobalHeader',                   'Global Header',          1),
    (page_id, 'LeadershipHeroSection',           'Hero Section',           2),
    (page_id, 'AboutIntroSection',               'About Intro',            3),
    (page_id, 'SolutionsSection',                'Solutions',              4),
    (page_id, 'WhyWeStartedSection',             'Why We Started',         5),
    (page_id, 'WhatDefinesUsSection',            'What Defines Us',        6),
    (page_id, 'AboutMissionVisionSection',       'Mission & Vision',       7),
    (page_id, 'AboutJourneySection',             'Our Journey Gallery',    8),
    (page_id, 'AboutContactSection',             'Contact Form',           9),
    (page_id, 'AboutEcosystemSection',           'Ecosystem',             10),
    (page_id, 'AboutEcosystemAccordionSection',  'Ecosystem Accordion',   11),
    (page_id, 'TeamCultureSection',              'Team & Culture',        12),
    (page_id, 'AboutB2BPortfolioSection',        'B2B Portfolio',         13),
    (page_id, 'ValuesApproachSection',           'Values & Approach',     14),
    (page_id, 'TestimonialsHeaderSection',       'Growth Systems CTA',    15),
    (page_id, 'AwardsLogoWallSection',           'Awards Logo Wall',      16),
    (page_id, 'TagsCarouselSection',             'Tags Carousel',         17),
    (page_id, 'FooterSection',                   'Footer',                18)
  ON CONFLICT DO NOTHING;
END $$;

-- ─── Seed: Sections (Leadership & Team) ──────────────────────────────────────
DO $$
DECLARE page_id UUID;
BEGIN
  SELECT id INTO page_id FROM public.cms_pages WHERE slug = 'leadership-and-team';
  INSERT INTO public.cms_sections (page_id, component_name, display_name, display_order) VALUES
    (page_id, 'GlobalHeader',                  'Global Header',          1),
    (page_id, 'LeadershipHeroSection',          'Hero Section',           2),
    (page_id, 'WhatDefinesUsSection',           'What Defines Us',        3),
    (page_id, 'LogoMarqueeSection',             'Logo Marquee',           4),
    (page_id, 'WhyWeStartedSection',            'Why We Started',         5),
    (page_id, 'TeamCultureSection',             'Team & Culture',         6),
    (page_id, 'LeadershipWhyChooseUsSection',   'Why Choose Us',          7),
    (page_id, 'LeadershipTestimonialSection',   'Testimonials',           8),
    (page_id, 'B2bSection',                     'B2B Portfolio',          9),
    (page_id, 'ValuesApproachSection',          'Values & Approach',     10),
    (page_id, 'LeadershipGallerySection',       'Image Gallery',         11),
    (page_id, 'AboutContactSection',            'Contact Form',          12),
    (page_id, 'LeadershipGrowthSystemsSection', 'Growth Systems CTA',   13),
    (page_id, 'FooterSection',                  'Footer',                14)
  ON CONFLICT DO NOTHING;
END $$;

-- ─── Seed: Sections (Schedule Demo) ──────────────────────────────────────────
DO $$
DECLARE page_id UUID;
BEGIN
  SELECT id INTO page_id FROM public.cms_pages WHERE slug = 'schedule-demo';
  INSERT INTO public.cms_sections (page_id, component_name, display_name, display_order) VALUES
    (page_id, 'BookStrategyCallSection',  'Book Strategy Call Form', 1),
    (page_id, 'WhyChooseUsSection',       'Why Choose Us',           2),
    (page_id, 'FaqSection',              'FAQ',                     3),
    (page_id, 'TestimonialsHeaderSection','Growth Systems CTA',      4)
  ON CONFLICT DO NOTHING;
END $$;

-- ─── Seed: Sections (Contact Us) ─────────────────────────────────────────────
DO $$
DECLARE page_id UUID;
BEGIN
  SELECT id INTO page_id FROM public.cms_pages WHERE slug = 'contact-us';
  INSERT INTO public.cms_sections (page_id, component_name, display_name, display_order) VALUES
    (page_id, 'DemoFormSection',          'Contact Form',         1),
    (page_id, 'ContactInfoSection',       'Contact Info & Map',   2),
    (page_id, 'LogoMarqueeSection',       'Logo Marquee',         3),
    (page_id, 'TestimonialsHeaderSection','Growth Systems CTA',   4),
    (page_id, 'TestimonialSection',       'Testimonials',         5),
    (page_id, 'TagsCarouselSection',      'Tags Carousel',        6)
  ON CONFLICT DO NOTHING;
END $$;

-- ─── Seed: Sections (Thank You) ──────────────────────────────────────────────
DO $$
DECLARE page_id UUID;
BEGIN
  SELECT id INTO page_id FROM public.cms_pages WHERE slug = 'thank-you';
  INSERT INTO public.cms_sections (page_id, component_name, display_name, display_order) VALUES
    (page_id, 'ThankYouBanner',           'Thank You Banner',     1),
    (page_id, 'WhyChooseUsSection',       'Why Choose Us',        2),
    (page_id, 'TestimonialsHeaderSection','Growth Systems CTA',   3),
    (page_id, 'TestimonialSection',       'Testimonials',         4),
    (page_id, 'TagsCarouselSection',      'Tags Carousel',        5),
    (page_id, 'FaqSection',              'FAQ',                   6)
  ON CONFLICT DO NOTHING;
END $$;
