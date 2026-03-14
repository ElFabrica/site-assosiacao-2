import { CollectionConfig } from "payload";

export const Partners: CollectionConfig = {
  slug: "partners",
  trash: true,
  orderable: true,
  labels: {
    singular: "Parceiro",
    plural: "Parceiros",
  },
  admin: {
    defaultColumns: ["name", "logo", "category", "createdAt", "updatedAt"],
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      label: "Nome",
      type: "text",
      required: true,
      localized: true,
      admin: {
        placeholder: "Digite o nome do parceiro",
      },
    },
    {
      name: "logo",
      label: "logo",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description: "Selecione a logo do parceiro",
      },
    },
    {
      name: "link",
      label: "Link",
      type: "text",
      admin: {
        placeholder: "Ex: https://www.google.com",
        description: "Link para o site do parceiro",
      },
    },
    {
      name: "available",
      label: "Disponível",
      type: "checkbox",
      required: true,
      admin: {
        position: "sidebar",
        description: "Mostrar este parceiro na página de parceiros",
      },
    },
  ],
};
