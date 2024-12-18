
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "../../../server/api/trpc";

export const tvShowRouter = createTRPCRouter({
  searchTVShows: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.televisionShow.findMany({
      take: 5,
      where: {
        name: {
          search: input
        },
      },
      include: {
        genres: true,
        content_ratings: true,
        reviews: true
      },
    });
  }),

  getAllTVShowIds: publicProcedure.query(({ ctx }) => {
    return ctx.db.televisionShow.findMany({
      select: {
        tvdb_id: true,
      },
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


  getMostDangerousShows: publicProcedure.query(({ ctx }) => {
    return ctx.db.televisionShow.findMany({
      take: 10,
      orderBy: {
        aggregate_cringe_rating: "desc"
      },

      include: {
        reviews: true
      }

    });
  }),

  getTVShowById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.televisionShow.findFirst({
      where: {
        tvdb_id: Number(input),
      },
      include: {
        genres: true,
        content_ratings: true,
        reviews: true
      }
    });
  }),
});