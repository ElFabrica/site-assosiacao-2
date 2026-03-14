import { CollectionConfig } from "payload";
import { ORIGIN_OPTIONS } from "./constants";

export const Register: CollectionConfig = {
  slug: "register",
  trash: true,
  labels: {
    singular: "Cadastro",
    plural: "Cadastros",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "phone", "address", "city", "state"],
  },
  fields: [
    {
      name: "name",
      label: "Nome",
      type: "text",
      required: true,
      admin: {
        placeholder: "Digite o nome",
      },
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      required: true,
      admin: {
        placeholder: "Digite o email",
      },
    },
    {
      name: "phone",
      label: "Telefone",
      type: "text",
      admin: {
        placeholder: "Digite o telefone",
      },
    },
    {
      name: "address",
      label: "Endereço",
      type: "text",
      admin: {
        placeholder: "Digite o endereço",
      },
    },
    {
      name: "event",
      label: "Evento",
      type: "relationship",
      relationTo: "events",
      admin: {
        position: "sidebar",
        description: "Evento do cadastro",
        readOnly: true,
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "city",
          label: "Cidade",
          type: "text",
          admin: {
            placeholder: "Digite a cidade",
          },
        },
        {
          name: "state",
          label: "Estado",
          type: "text",
          admin: {
            placeholder: "Digite o estado",
          },
        },
        {
          name: "zipCode",
          label: "CEP",
          type: "text",
          admin: {
            placeholder: "Digite o CEP",
          },
        },
      ],
    },
    {
      name: "origin",
      label: "Origem",
      type: "select",
      options: ORIGIN_OPTIONS.map((option) => ({
        label: option.label,
        value: option.value,
      })),
      defaultValue: ORIGIN_OPTIONS[0].value,
      admin: {
        position: "sidebar",
        description: "Origem do cadastro",
        readOnly: true,
      },
    },
  ],
};
