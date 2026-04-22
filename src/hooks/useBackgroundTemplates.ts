import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type DbTemplate = {
  id: string;
  name: string;
  type: "image" | "css" | "gradient" | "pattern";
  value: string;
  preview_url: string | null;
};

export type BackgroundOption = {
  value: string;
  label: string;
  description?: string;
  className: string;
  style?: React.CSSProperties;
  /** Image URL for "image" type templates from DB */
  imageUrl?: string;
  /** Whether this option's text should be dark (light backgrounds) */
  isLight?: boolean;
};

const TEMPLATE_PREFIX = "tpl_";

export const dbTemplateToOption = (t: DbTemplate): BackgroundOption => {
  const base: BackgroundOption = {
    value: `${TEMPLATE_PREFIX}${t.id}`,
    label: t.name,
    description: `Template ${t.type}`,
    className: "",
  };

  if (t.type === "image" && t.preview_url) {
    return {
      ...base,
      className: "bg-cover bg-center bg-no-repeat",
      imageUrl: t.preview_url,
    };
  }

  if (t.type === "css") {
    // Heuristic: if it looks like Tailwind (no `:` or `(`), treat as className
    const looksLikeTailwind = !/[:()]/.test(t.value);
    if (looksLikeTailwind) {
      return { ...base, className: t.value };
    }
    return { ...base, className: "", style: { background: t.value } };
  }

  // gradient or pattern → CSS background value
  return { ...base, className: "", style: { background: t.value } };
};

export const isTemplateValue = (v: string) => v.startsWith(TEMPLATE_PREFIX);

export const useBackgroundTemplates = () => {
  const [templates, setTemplates] = useState<BackgroundOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from("card_background_templates")
        .select("id,name,type,value,preview_url")
        .order("created_at", { ascending: false });
      if (!active) return;
      if (!error && data) {
        setTemplates(data.map((d) => dbTemplateToOption(d as DbTemplate)));
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  return { templates, loading };
};
