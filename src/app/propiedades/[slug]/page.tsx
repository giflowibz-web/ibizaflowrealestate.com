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
  const { data } = await supabaseAdmin
    .from("properties")
    .select("*")
    .or(`slug.eq.${slug},id.eq.${slug}`)
    .single();

  if (data) {
    return <PropertyDetail property={data} />;
  }

  // Fallback to local data
  const local = fallbackProperties.find((p) => p.slug === slug);
  if (!local) notFound();

  return <PropertyDetail property={local as any} />;
}
