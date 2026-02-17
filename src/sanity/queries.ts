import { client } from "./client";
import imageUrlBuilder from "@sanity/image-url";
import type { Property } from "@/data/properties";

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

function sanityToProperty(doc: any): Property {
  return {
    id: doc._id,
    slug: doc.slug?.current || doc._id,
    title: doc.title || "",
    address: doc.address || "",
    zone: doc.zone || "",
    price: doc.price || "",
    priceNum: doc.priceNum || 0,
    beds: doc.beds || 0,
    baths: doc.baths || 0,
    sqm: doc.sqm || 0,
    lotSqm: doc.lotSqm,
    yearBuilt: doc.yearBuilt,
    status: doc.status || "En Venta",
    description: doc.description || "",
    features: doc.features || [],
    images: (doc.images || []).map((img: any) =>
      urlFor(img).width(1200).quality(80).url()
    ),
    details: `${doc.beds || 0} hab. | ${doc.baths || 0} banos | ${doc.sqm || 0} m2`,
  };
}

export async function getPropertiesFromSanity(): Promise<Property[]> {
  try {
    const docs = await client.fetch(
      `*[_type == "property"] | order(_createdAt desc)`
    );
    if (!docs || docs.length === 0) return [];
    return docs.map(sanityToProperty);
  } catch {
    return [];
  }
}

export async function getPropertyBySlugFromSanity(
  slug: string
): Promise<Property | null> {
  try {
    const doc = await client.fetch(
      `*[_type == "property" && slug.current == $slug][0]`,
      { slug }
    );
    if (!doc) return null;
    return sanityToProperty(doc);
  } catch {
    return null;
  }
}
