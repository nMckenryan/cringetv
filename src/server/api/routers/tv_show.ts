
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

  getNewestTvShows: publicProcedure.query(({ ctx }) => {
    return ctx.db.televisionShow.findMany({
      take: 10,
      orderBy: {
        first_air_date: "desc",
      },
      where: {
        series_status: {
          not: 'Ended',
        }
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