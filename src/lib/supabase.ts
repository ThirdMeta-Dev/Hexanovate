import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://aovvrjsdsbzjlpbodasb.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvdnZyanNkc2J6amxwYm9kYXNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MjQ3NjQsImV4cCI6MjA4NzUwMDc2NH0.rbAqgfsrJq5rmmNEttaH5CI7qZFfetlirWVCF7YM8uI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
