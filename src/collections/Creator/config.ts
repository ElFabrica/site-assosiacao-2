import { CollectionConfig } from "payload";

export const Creator: CollectionConfig = {
  slug: "creators",
  trash: true,
  labels: {
    singular: "Criador",
    plural: "Criadores",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["image", "name", "position"],
  },
  fields: [
    {
      name: "name",
      label: "Nome",
      type: "text",
      required: true,
      admin: {
        placeholder: "Willian",
        description: "Nome do autor",
      },
    },
    {
      name: "position",
      label: "Cargo",
      type: "text",
      required: true,
      admin: {
        placeholder: "Ex.: Professor",
        description: "Cargo do autor",
      },
    },
    {
      name: "image",
      label: "Foto do autor",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "socialLinks",
      label: "Links Sociais",
      type: "array",
      fields: [
        {
          name: "platform",
          type: "select",
          options: ["twitter", "linkedin", "instagram", "github", "website"],
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
