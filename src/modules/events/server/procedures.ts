import { Category, Media } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import z from "zod";

export const eventsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        locale: z.string(),
        limit: z.number().optional().default(10),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.find({
        collection: "events",
        depth: 1,
        limit: input.limit,
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
        collection: "events",
        where: {
          slug: {
            equals: input.slug,
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
        })),
      };
    }),
});
