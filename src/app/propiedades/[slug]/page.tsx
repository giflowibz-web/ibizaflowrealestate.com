import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import PropertyDetailClient from "@/components/sections/property-detail";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";

export const dynamic = "force-dynamic";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data, error } = await supabaseAdmin
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) console.error("[PropertyPage] error:", error);
  if (!data) notFound();

  return (
    <>
      <Navbar />
      <PropertyDetailClient property={data} />
      <Footer />
    </>
  );
}
