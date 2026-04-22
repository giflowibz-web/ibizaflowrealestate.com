import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { propertySchema } from "./schema";

export default defineConfig({
  name: "ibiza-flow",
  title: "Ibiza Flow Real Estate",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenido")
          .items([
            S.listItem()
              .title("Propiedades")
              .child(S.documentTypeList("property").title("Propiedades")),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: [propertySchema],
  },
});
