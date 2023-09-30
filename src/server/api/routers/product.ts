import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.product.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    return posts;
  }),
  create: privateProcedure
    .input(
      z.object({
        name: z.string().min(1).max(280),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.create({
        data: {
          name: input.name
        }
      });
      return product;
    })
});
