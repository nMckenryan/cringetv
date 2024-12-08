import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "../trpc";

export const reviewRouter = createTRPCRouter({
  getReviewsByTVId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.review.findFirst({
      where: {
        tvdb_id: input,
      },
    });
  }),

});