import { defineType, defineField } from "sanity";

export const propertySchema = defineType({
  name: "property",
  title: "Propiedad",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titulo",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Estado",
      type: "string",
      options: {
        list: [
          { title: "En Venta", value: "En Venta" },
          { title: "Exclusiva", value: "Exclusiva" },
          { title: "Reservada", value: "Reservada" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Precio (ej: 4.500.000 EUR)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "priceNum",
      title: "Precio numerico",
      type: "number",
    }),
    defineField({
      name: "address",
      title: "Direccion",
      type: "string",
    }),
    defineField({
      name: "zone",
      title: "Zona",
      type: "string",
    }),
    defineField({
      name: "beds",
      title: "Habitaciones",
      type: "number",
    }),
    defineField({
      name: "baths",
      title: "Banos",
      type: "number",
    }),
    defineField({
      name: "sqm",
      title: "Superficie (m2)",
      type: "number",
    }),
    defineField({
      name: "lotSqm",
      title: "Parcela (m2)",
      type: "number",
    }),
    defineField({
      name: "yearBuilt",
      title: "Ano de construccion",
      type: "number",
    }),
    defineField({
      name: "description",
      title: "Descripcion",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "features",
      title: "Caracteristicas",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "images",
      title: "Imagenes",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "price",
      media: "images.0",
    },
  },
});
