
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "../../../server/api/trpc";

export const tvShowRouter = createTRPCRouter({
  searchTVShows: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    try {
      const results = await ctx.db.televisionShow.findMany({
        take: 5,
        where: {
          name: {
            contains: input,
            mode: 'insensitive',
          },
        },
      });
      return {
        results,
      };
    } catch (error) {
      console.error(error);
      return {
        error: 'Failed to search for TV shows',
      };
    }
  }),

  // recalculateAvgCringeRating: publicProcedure.mutation(async ({ ctx }) => {
  //   return ctx.db.televisionShow.updateMany({
  //     data: {
  //       aggregate_cringe_rating: {
  //         avg: {
  //           of: "reviews.cringe_score_vote"
  //         }
  //       }
  //     }
  //   });
  // }),

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
        original_country: {
          in: ['usa', 'gbr', 'can', 'aus']
        },
        series_status: {
          notIn: ['Ended', 'Upcoming']
        },
        poster_link: {
          not: null
        }
      }
    });
  }),


  getMostDangerousShows: publicProcedure.query(({ ctx }) => {
    return ctx.db.televisionShow.findMany({
      take: 10,
      where: {
        aggregate_cringe_rating: {
          gte: 0.5
        },
        poster_link: {
          not: null
        }
      },
      orderBy: {
        aggregate_cringe_rating: "desc"
      },

      include: {
        reviews: true
      },
    });
  }),

  getSafestShows: publicProcedure.query(({ ctx }) => {
    return ctx.db.televisionShow.findMany({
      take: 10,
      where: {
        aggregate_cringe_rating: {
          lte: 0.2
        },
        poster_link: {
          not: null
        }
      },
      orderBy: {
        aggregate_cringe_rating: "desc"
      },

      include: {
        reviews: true
      },
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