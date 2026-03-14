import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";

export const categoryRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(z.object({ locale: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.find({
        collection: "categories",
        pagination: false,
        locale: (input.locale as "pt" | "it" | "es") || "pt",
        where: {
          type: {
            equals: "Notícia",
          },
        },
        sort: ["name"],
      });

      return data;
    }),
});
