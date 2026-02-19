import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { PropertyDetail } from "@/components/sections/property-detail";
import { properties as fallbackProperties } from "@/data/properties";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try Supabase first
  const { data, error } = await supabaseAdmin
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("[PropertyPage] Supabase error:", error);
  }

  if (data) {
    return <PropertyDetail property={data} />;
  }

  // Fallback to local data
  const local = fallbackProperties.find((p) => p.slug === slug);
  if (!local) notFound();

  return <PropertyDetail property={local as any} />;
}
