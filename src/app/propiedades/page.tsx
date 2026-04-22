import { supabaseAdmin } from "@/lib/supabase";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PropertiesListingAll from "@/components/sections/properties-listing-all";

export const dynamic = "force-dynamic";

export default async function PropiedadesPage() {
  const { data: properties } = await supabaseAdmin
    .from("properties")
    .select("*")
    .eq("status", "available")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <>
      <Navbar />
      <PropertiesListingAll properties={properties ?? []} />
      <Footer />
    </>
  );
}
