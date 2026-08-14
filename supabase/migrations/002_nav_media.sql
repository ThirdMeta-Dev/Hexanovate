-- ─────────────────────────────────────────────────────────────────────────────
-- 002_nav_media: navigation menu items + general settings
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Navigation menu items ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cms_nav_items (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_name   TEXT        NOT NULL DEFAULT 'main',
  label       TEXT        NOT NULL,
  link        TEXT        NOT NULL DEFAULT '#',
  parent_id   UUID        REFERENCES cms_nav_items(id) ON DELETE CASCADE,
  item_order  INTEGER     NOT NULL DEFAULT 0,
  target      TEXT        NOT NULL DEFAULT '_self',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS cms_nav_items_menu_order ON cms_nav_items (menu_name, item_order);

-- RLS
ALTER TABLE cms_nav_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "nav_anon_select"  ON cms_nav_items FOR SELECT USING (true);
CREATE POLICY "nav_auth_all"     ON cms_nav_items FOR ALL    USING (auth.role() = 'authenticated');

-- Seed default main navigation
INSERT INTO cms_nav_items (menu_name, label, link, item_order, target) VALUES
  ('main', 'Solutions',   '#solutions',          0, '_self'),
  ('main', 'Case Studies','#case-studies',        1, '_self'),
  ('main', 'Company',     '#company',             2, '_self'),
  ('main', 'Contact Us',  '/contact-us',          3, '_self'),
  ('main', 'Schedule Demo','/schedule-demo',      4, '_self')
ON CONFLICT DO NOTHING;

-- ── General key-value settings ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cms_settings (
  key         TEXT        PRIMARY KEY,
  value       JSONB       NOT NULL DEFAULT '{}'::jsonb,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS
ALTER TABLE cms_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "settings_anon_select" ON cms_settings FOR SELECT USING (true);
CREATE POLICY "settings_auth_all"    ON cms_settings FOR ALL    USING (auth.role() = 'authenticated');

-- Seed default settings
INSERT INTO cms_settings (key, value) VALUES
  ('site_name',       '"ThirdMeta"'),
  ('site_tagline',    '"The Future of Business Deserves a Better World"'),
  ('contact_email',   '"hello@hexanovate.com"'),
  ('contact_phone',   '"+"'),
  ('contact_address', '"India"')
ON CONFLICT (key) DO NOTHING;
