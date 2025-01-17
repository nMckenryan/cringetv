import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc";

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),

  editBio: protectedProcedure.input(z.object({ bio: z.string() })).mutation(async ({ ctx, input }) => {
    return ctx.db.user.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        userBio: input.bio,
      },
    });
  }),
  getUserById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.user.findUnique({
      where: {
        id: input,
      },
      select: {
        name: true,
        image: true
      },
    });
  }),
});