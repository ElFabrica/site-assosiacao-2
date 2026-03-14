import { CollectionConfig } from "payload";
import { TYPE_CATEGORY } from "../Categories/constants";
import { generateSlugHook } from "./hooks/generate-slug.hook";
import { STATUS_OPTIONS } from "./constants";
import {
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const Events: CollectionConfig = {
  slug: "events",
  trash: true,
  orderable: true,
  labels: {
    singular: "Evento",
    plural: "Eventos",
  },
  admin: {
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
        placeholder: "Digite o nome do evento",
      },
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [generateSlugHook],
        beforeChange: [generateSlugHook],
      },
      admin: {
        placeholder: "Ex.: titulo-do-evento",
        description: "O slug é o endereço do evento",
        // readOnly: true,
      },
    },
    {
      name: "description",
      label: "Descrição",
      type: "textarea",
      localized: true,
      admin: {
        placeholder: "Digite a descrição do evento",
      },
    },
    {
      name: "content",
      label: "Conteúdo",
      type: "richText",
      localized: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
        ],
      }),
    },
    {
      name: "location",
      label: "Local",
      type: "text",
      required: true,
      localized: true,
      admin: {
        placeholder: "Ex.: Sede da Associação - Centro SP",
        description: "Local do evento",
      },
    },
    {
      name: "categories",
      label: "Categoria",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
      filterOptions: {
        type: {
          equals: TYPE_CATEGORY.EVENT,
        },
      },
      admin: {
        description: "Selecione uma categoria de evento",
      },
    },
    {
      name: "coverImage",
      label: "Imagem de capa",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "eventDate",
      label: "Data do evento",
      type: "date",
      defaultValue: new Date().toISOString(),
      admin: {
        placeholder: "Selecione a data do evento",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "eventEndDate",
      label: "Data final do evento",
      type: "date",
      defaultValue: new Date().toISOString(),
      admin: {
        placeholder: "Selecione a data final do evento",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        {
          label: "Rascunho",
          value: STATUS_OPTIONS.DRAFT,
        },
        {
          label: "Publicado",
          value: STATUS_OPTIONS.PUBLISHED,
        },
      ],
      defaultValue: STATUS_OPTIONS.DRAFT,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "videoLink",
      label: "Link do video",
      type: "text",
      admin: {
        placeholder: "Ex.: https://www.youtube.com/watch?v=pbOXOY78dNA",
        description: "Link do video do evento",
        position: "sidebar",
      },
    },
  ],
};
