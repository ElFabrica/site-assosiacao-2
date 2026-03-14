import { CollectionConfig } from "payload";

export const Course: CollectionConfig = {
  slug: "courses",
  admin: {
    useAsTitle: "name",
  },
  labels: {
    singular: "Curso",
    plural: "Cursos",
  },
  fields: [
    {
      name: "name",
      label: "Nome",
      type: "text",
      required: true,
      localized: true,
      admin: {
        placeholder: "Curso de Italiano",
        description: "Digite o nome do curso",
      },
    },
    {
      name: "description",
      label: "Descrição",
      type: "textarea",
      localized: true,
      admin: {
        placeholder: "Digite a descrição do curso",
      },
    },
    {
      name: "thumbnail",
      label: "Capa",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Capa do curso",
      },
    },
    {
      name: "features",
      label: "Características",
      type: "array",
      fields: [
        {
          name: "feature",
          label: "Característica",
          type: "text",
          required: true,
          localized: true,
          admin: {
            placeholder: "Ex.: Simulados",
            description: "Digite uma característica",
          },
        },
      ],
    },
    {
      name: "available",
      label: "Disponível",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Marque se o curso está disponível",
        position: "sidebar",
      },
    },
  ],
};
