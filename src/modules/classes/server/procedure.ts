import { Media } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import z from "zod";

export const classesRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        locale: z.string().default("pt"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.find({
        collection: "classes",
        depth: 1,
        locale: (input.locale as "pt" | "it" | "es") || "pt",
        where: {
          available: {
            equals: true,
          },
        },
      });
      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
        })),
      };
    }),
});
