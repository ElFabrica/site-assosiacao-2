import { CollectionConfig } from "payload";
import { generateSlugHook } from "./hooks/generate-slug.hook";
import { STATUS_OPTIONS } from "./constants";
import {
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { TYPE_CATEGORY } from "../Categories/constants";
import { ensureSingleFeatured } from "./hooks/featured.hook";

export const News: CollectionConfig = {
  slug: "news",
  trash: true,
  orderable: true,
  labels: {
    singular: "Notícia",
    plural: "Notícias",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: [
      "coverImage",
      "title",
      "categories",
      "status",
      "publishedAt",
    ],
  },
  hooks: {
    beforeChange: [ensureSingleFeatured],
  },
  fields: [
    {
      name: "title",
      label: "Título",
      type: "text",
      required: true,
      localized: true,
      admin: {
        placeholder: "Digite o título da notícia",
      },
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      unique: true,
      required: true,
      index: true,
      hooks: {
        beforeValidate: [generateSlugHook],
        beforeChange: [generateSlugHook],
      },
      admin: {
        placeholder: "Ex.: titulo-da-noticia",
        description: "O slug é o endereço da notícia",
        // readOnly: true,
      },
    },
    {
      name: "excerpt",
      label: "Resumo",
      type: "text",
      localized: true,
      admin: {
        placeholder: "Digite o resumo da notícia",
        description: "Resumo que será exibido na lista de notícias",
      },
    },
    {
      name: "content",
      label: "Conteúdo",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
        ],
      }),
      required: true,
      localized: true,
    },
    {
      name: "coverImage",
      label: "Imagem de capa",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description: "Imagem que será exibida na lista de notícias",
      },
    },
    {
      name: "featured",
      label: "Destacar esta notícia",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description:
          "Apenas uma notícia pode estar em destaque por vez. Ao marcar esta, a anterior será desmarcada automaticamente.",
      },
    },
    {
      name: "categories",
      label: "Categoria",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
      // 🎯 AQUI ESTÁ O FILTRO!
      filterOptions: {
        type: {
          equals: TYPE_CATEGORY.NEWS,
        },
      },
      admin: {
        description: "Selecione uma categoria de notícia",
      },
    },
    {
      name: "author",
      label: "Autor",
      type: "relationship",
      relationTo: "authors",
    },
    {
      name: "link",
      label: "Link",
      type: "text",
      admin: {
        placeholder: "https://",
        description: "Digite o link da notícia",
      },
    },
    {
      name: "publishedAt",
      label: "Data de publicação",
      type: "date",
      defaultValue: () => new Date().toISOString(),
      admin: {
        placeholder: "Selecione a data de publicação",
        // date: {
        //   pickerAppearance: "dayAndTime",
        // },
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
  ],
};
