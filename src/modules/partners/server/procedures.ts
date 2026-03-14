import { Media } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";

export const partnersRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(z.object({ locale: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.find({
        collection: "partners",
        depth: 1,
        pagination: false,
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
          logo: doc.logo as Media | null,
        })),
      };
    }),
});
