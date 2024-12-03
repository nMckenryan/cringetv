import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "../../../server/api/trpc";

export const tvShowRouter = createTRPCRouter({
  getAllTvShows: publicProcedure.query(({ ctx }) => {
    return ctx.db.televisionShow.findMany({
      orderBy: {
        last_air_date: "desc",
      }
    });
  }),

  getTVShowById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.televisionShow.findFirst({
      where: {
        tvdb_id: input,
      },
    });
  }),
});