import { CollectionConfig } from "payload";

export const Classes: CollectionConfig = {
  slug: "classes",
  trash: true,
  orderable: true,
  labels: {
    singular: "Turma",
    plural: "Turmas",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: [
      "image",
      "name",
      "level",
      "duration",
      "weekDays",
      "schedule",
    ],
  },
  fields: [
    {
      name: "name",
      label: "Nome",
      type: "text",
      required: true,
      localized: true,
      admin: {
        placeholder: "Ex.: Italiano Básico",
        description: "Nome do curso",
      },
    },
    {
      name: "description",
      label: "Descrição",
      type: "textarea",
      required: true,
      localized: true,
      admin: {
        placeholder: "Ex.: Curso de italiano para iniciantes",
        description: "Descrição do curso",
      },
    },
    {
      name: "level",
      label: "Nível",
      type: "select",
      required: true,
      options: [
        {
          label: {
            pt: "Básico",
            it: "Principiante",
            es: "Básico",
          },
          value: "basico",
        },
        {
          label: {
            pt: "Intermediário",
            it: "Intermedio",
            es: "Intermedio",
          },
          value: "intermediario",
        },
        {
          label: {
            pt: "Avançado",
            it: "Avanzato",
            es: "Avanzado",
          },
          value: "avancado",
        },
      ],
      admin: {
        placeholder: "Selecione o nível do curso",
        description: "Nível do curso",
      },
    },
    {
      name: "image",
      label: "Imagem",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description: "Imagem do curso",
      },
    },
    {
      name: "duration",
      label: "Duração",
      type: "text",
      required: true,
      admin: {
        placeholder: "Ex.: 4 meses",
        description: "Duração do curso",
      },
    },
    {
      name: "weekDays",
      label: "Dias da Semana",
      type: "select",
      hasMany: true,
      required: true,
      options: [
        { label: "Segunda-feira", value: "2" },
        { label: "Terça-feira", value: "3" },
        { label: "Quarta-feira", value: "4" },
        { label: "Quinta-feira", value: "5" },
        { label: "Sexta-feira", value: "6" },
        { label: "Sábado", value: "7" },
        { label: "Domingo", value: "1" },
      ],
      admin: {
        description: "Selecione os dias em que o curso acontece",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "startTime",
          label: "Horário de Início",
          type: "date",
          required: true,
          admin: {
            placeholder: "08:00",
            description: "Formato: HH:MM",
            date: {
              pickerAppearance: "timeOnly",
            },
          },
        },
        {
          name: "endTime",
          label: "Horário de Término",
          type: "date",
          required: true,
          admin: {
            placeholder: "12:00",
            description: "Formato: HH:MM",
            date: {
              pickerAppearance: "timeOnly",
            },
          },
        },
      ],
    },
    {
      name: "available",
      label: "Disponível",
      type: "checkbox",
      required: true,
      admin: {
        position: "sidebar",
        description: "Disponibilidade do curso",
      },
    },
  ],
};
