import { notFound } from "next/navigation";
import { properties } from "@/data/properties";
import { getPropertyBySlugFromSanity } from "@/sanity/queries";
import { PropertyDetail } from "@/components/sections/property-detail";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try Sanity first, fallback to local data
  const sanityProperty = await getPropertyBySlugFromSanity(slug);
  const property =
    sanityProperty || properties.find((p) => p.slug === slug);

  if (!property) {
    notFound();
  }

  return <PropertyDetail property={property} />;
}
