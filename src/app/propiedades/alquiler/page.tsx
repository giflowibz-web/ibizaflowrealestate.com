import { supabaseAdmin } from "@/lib/supabase";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PropertiesListingPage from "@/components/sections/properties-listing";

export const dynamic = "force-dynamic";

export default async function AlquilerPage() {
  const { data: properties } = await supabaseAdmin
    .from("properties")
    .select("*")
    .in("listing_type", ["rent", "both"])
    .eq("status", "available")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <>
      <Navbar />
      <PropertiesListingPage
        properties={properties ?? []}
        listingType="rent"
      />
      <Footer />
    </>
  );
}
