import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";

export const registerRouter = createTRPCRouter({
  create: baseProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.email(),
        phone: z.string(),
        address: z.string(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string(),
        origin: z
          .enum([
            "association",
            "support",
            "legal",
            "event",
            "newsletter",
            "others",
          ])
          .default("association"),
        event: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let event;

      if (input.event) {
        event = await ctx.db.find({
          collection: "events",
          where: {
            slug: {
              equals: input.event,
            },
          },
          limit: 1,
          depth: 1,
        });
      }

      const register = await ctx.db.create({
        collection: "register",
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone,
          address: input.address,
          city: input.city,
          state: input.state,
          zipCode: input.zipCode,
          origin: input.origin,
          event: event?.docs[0].id,
        },
      });

      return register;
    }),
});
