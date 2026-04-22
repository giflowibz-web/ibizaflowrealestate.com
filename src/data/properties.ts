export interface Property {
  id: string;
  slug: string;
  title: string;
  address: string;
  zone: string;
  price: string;
  priceNum: number;
  beds: number;
  baths: number;
  sqm: number;
  lotSqm?: number;
  yearBuilt?: number;
  status: "En Venta" | "Exclusiva" | "Reservada";
  description: string;
  features: string[];
  images: string[];
  details: string;
}

export const properties: Property[] = [
  {
    id: "1",
    slug: "villa-blanca-cala-jondal",
    title: "Villa Blanca",
    address: "Cala Jondal, Ibiza",
    zone: "Cala Jondal",
    price: "4.500.000 EUR",
    priceNum: 4500000,
    beds: 5,
    baths: 4,
    sqm: 450,
    lotSqm: 2200,
    yearBuilt: 2021,
    status: "Exclusiva",
    description:
      "Espectacular villa de nueva construccion en primera linea de Cala Jondal, una de las calas mas exclusivas de Ibiza. Diseno contemporaneo con amplios ventanales que enmarcan vistas panoramicas al Mediterraneo. La propiedad cuenta con piscina infinity, jardin paisajista con vegetacion autoctona y acceso directo a la playa. Interiores de lujo con materiales de primera calidad, suelos de piedra natural y cocina de diseno italiano equipada con electrodomesticos Gaggenau.",
    features: [
      "Piscina infinity con vistas al mar",
      "Acceso directo a la playa",
      "Cocina Gaggenau",
      "Suelos de piedra natural",
      "Jardin paisajista mediterraneo",
      "Sistema domotico completo",
      "Garaje para 3 vehiculos",
      "Terraza chill-out con barbacoa",
    ],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    ],
    details: "5 hab. | 4 banos | 450 m2",
  },
  {
    id: "2",
    slug: "villa-ses-salines",
    title: "Villa Ses Salines",
    address: "Ses Salines, Ibiza",
    zone: "Ses Salines",
    price: "6.200.000 EUR",
    priceNum: 6200000,
    beds: 6,
    baths: 5,
    sqm: 620,
    lotSqm: 3500,
    yearBuilt: 2019,
    status: "En Venta",
    description:
      "Magnifica villa de estilo ibicenco contemporaneo situada en la prestigiosa zona de Ses Salines, cerca del Parque Natural. Esta propiedad excepcional combina la arquitectura tradicional de Ibiza con acabados de lujo modernos. Rodeada de naturaleza, ofrece total privacidad y unas vistas impresionantes. La finca dispone de multiples terrazas, zona de barbacoa exterior, piscina climatizada y un extenso jardin con olivos centenarios.",
    features: [
      "Piscina climatizada",
      "Olivos centenarios",
      "Arquitectura ibicenca contemporanea",
      "6 suites con bano en suite",
      "Bodega climatizada",
      "Gimnasio privado",
      "Casa de invitados independiente",
      "Sistema de riego automatico",
    ],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
    ],
    details: "6 hab. | 5 banos | 620 m2",
  },
  {
    id: "3",
    slug: "atico-vista-mar-marina-botafoch",
    title: "Atico Vista Mar",
    address: "Marina Botafoch, Ibiza",
    zone: "Marina Botafoch",
    price: "2.800.000 EUR",
    priceNum: 2800000,
    beds: 3,
    baths: 3,
    sqm: 220,
    yearBuilt: 2022,
    status: "Exclusiva",
    description:
      "Impresionante atico duplex en Marina Botafoch con vistas panoramicas al puerto deportivo, Dalt Vila y el mar. Diseno interior de autor con materiales de primera calidad. Terraza de 80m2 con jacuzzi y zona lounge. Ubicacion privilegiada a pasos de los mejores restaurantes y clubs nauticos de Ibiza. Plaza de garaje doble y trastero incluidos.",
    features: [
      "Terraza de 80m2 con jacuzzi",
      "Vistas a Dalt Vila y puerto",
      "Diseno interior de autor",
      "Duplex con ascensor privado",
      "2 plazas de garaje",
      "Trastero",
      "Conserjeria 24h",
      "Comunidad con piscina",
    ],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    ],
    details: "3 hab. | 3 banos | 220 m2",
  },
  {
    id: "4",
    slug: "finca-can-roca-san-rafael",
    title: "Finca Can Roca",
    address: "San Rafael, Ibiza",
    zone: "San Rafael",
    price: "3.900.000 EUR",
    priceNum: 3900000,
    beds: 4,
    baths: 3,
    sqm: 380,
    lotSqm: 15000,
    yearBuilt: 2018,
    status: "En Venta",
    description:
      "Autentica finca ibicenca completamente reformada con 15.000m2 de terreno en San Rafael, el corazon de la isla. La propiedad conserva el encanto de la arquitectura tradicional con todas las comodidades modernas. Vistas de 360 grados a la campina ibicenca y al mar. Huerto ecologico, frutales y zona ecuestre. Perfecta combinacion de vida rural y sofisticacion.",
    features: [
      "15.000m2 de terreno",
      "Vistas 360 grados",
      "Huerto ecologico",
      "Zona ecuestre",
      "Piscina natural",
      "Reformada integralmente",
      "Energia solar",
      "Pozo de agua propio",
    ],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80",
    ],
    details: "4 hab. | 3 banos | 380 m2",
  },
  {
    id: "5",
    slug: "villa-es-cubells",
    title: "Villa Es Cubells",
    address: "Es Cubells, Ibiza",
    zone: "Es Cubells",
    price: "8.500.000 EUR",
    priceNum: 8500000,
    beds: 7,
    baths: 6,
    sqm: 850,
    lotSqm: 5000,
    yearBuilt: 2020,
    status: "Exclusiva",
    description:
      "Excepcional villa de lujo en los acantilados de Es Cubells con vistas dramaticas al mar abierto y Formentera. Arquitectura vanguardista firmada por estudio internacional. Interiores de revista con dobles alturas, piedra de Ibiza y madera de teca. Piscina desbordante sobre el acantilado, spa completo con sauna y hamam, cine privado y bodega. La propiedad definitiva para quienes buscan lo extraordinario.",
    features: [
      "Piscina desbordante sobre acantilado",
      "Spa con sauna y hamam",
      "Cine privado",
      "Bodega climatizada",
      "Vistas a Formentera",
      "Arquitectura de autor",
      "Ascensor interior",
      "Seguridad 24h",
    ],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    ],
    details: "7 hab. | 6 banos | 850 m2",
  },
  {
    id: "6",
    slug: "casa-talamanca",
    title: "Casa Talamanca",
    address: "Talamanca, Ibiza",
    zone: "Talamanca",
    price: "1.950.000 EUR",
    priceNum: 1950000,
    beds: 3,
    baths: 2,
    sqm: 180,
    yearBuilt: 2023,
    status: "En Venta",
    description:
      "Elegante casa adosada de obra nueva en Talamanca, a solo 5 minutos del centro de Ibiza. Acabados de alta gama con diseno minimalista mediterraneo. Amplias terrazas con vistas al mar, jardin privado y piscina comunitaria. Ubicacion ideal para disfrutar de la playa de Talamanca y la vibrante vida de la isla. Perfecta como residencia permanente o inversion.",
    features: [
      "Obra nueva 2023",
      "5 min del centro de Ibiza",
      "Terrazas con vistas al mar",
      "Jardin privado",
      "Piscina comunitaria",
      "Plaza de garaje",
      "Acabados premium",
      "Certificacion energetica A",
    ],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    ],
    details: "3 hab. | 2 banos | 180 m2",
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}
