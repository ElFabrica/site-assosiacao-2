import { Author, Category, Media } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";

export const newsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(z.object({ locale: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.find({
        collection: "news",
        depth: 1, // Populate "category" & "coverImage"
        pagination: false,
        locale: (input.locale as "pt" | "it" | "es") || "pt",
        where: {
          status: {
            equals: "Publicado",
          },
        },
      });

      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          coverImage: doc.coverImage as Media | null,
          categories: doc.categories as Category | null,
          author: doc.author as Author | null,
        })),
      };
    }),
  getOne: baseProcedure
    .input(
      z.object({
        slug: z.string(),
        locale: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.find({
        collection: "news",
        where: {
          slug: {
            equals: input.slug,
          },
          status: {
            equals: "Publicado",
          },
        },
        limit: 1,
        depth: 2,
        locale: (input.locale as "pt" | "it" | "es") || "pt",
      });

      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          coverImage: doc.coverImage as Media | null,
          categories: doc.categories as Category | null,
          author: doc.author as Author | null,
        })),
      };
    }),
});
