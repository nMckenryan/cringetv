import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc";

export const reviewRouter = createTRPCRouter({
  getReviewsByTVId: publicProcedure.input(z.object({ tvdb_id: z.number() })).query(({ ctx, input }) => {
    return ctx.db.review.findMany({
      where: {
        tvdb_id: input.tvdb_id,
      },
      select: {
        televisionShow: {
          select: {
            name: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        review_id: true,
        review_content: true,
        cringe_score_vote: true,
        date_created: true,
        date_updated: true
      },
      orderBy: {
        date_created: 'desc'
      }
    });
  }),


  hasCurrentUserLeftReview: publicProcedure.input(z.object({ tvdb_id: z.number(), userId: z.string() })).query(({ ctx, input }) => {
    return ctx.db.review.findFirst({
      where: {
        tvdb_id: input.tvdb_id,
        userId: input.userId
      }
    })
  }),

  getReviewListFromTVIDForReviewListPage: publicProcedure.input(z.object({ tvdb_id: z.number() })).query(({ ctx, input }) => {
    return ctx.db.review.findMany({
      take: 7,
      where: {
        tvdb_id: input.tvdb_id,
      },
      select: {
        televisionShow: {
          select: {
            name: true,
            tvdb_id: true,
            aggregate_cringe_rating: true,
            poster_link: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        review_id: true,
        review_content: true,
        cringe_score_vote: true,
        date_created: true,
        date_updated: true
      },
      orderBy: {
        date_created: 'desc'
      }
    });
  }),


  getReviewListFromUserId: publicProcedure.input(z.object({ userId: z.string() })).query(({ ctx, input }) => {
    return ctx.db.review.findMany({
      take: 7,
      where: {
        userId: input.userId,
      },
      select: {
        televisionShow: {
          select: {
            name: true,
            tvdb_id: true,
            aggregate_cringe_rating: true,
            poster_link: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        review_id: true,
        review_content: true,
        cringe_score_vote: true,
        date_created: true,
        date_updated: true
      },
      orderBy: {
        date_created: 'desc'
      }
    });
  }),



  getReviewsByUserId: publicProcedure.input(z.object({ userId: z.string() })).query(({ ctx, input }) => {
    return ctx.db.review.findMany({
      where: {
        userId: input.userId,
      },
    });
  }),


  createNewReview: protectedProcedure
    .input(z.object({
      review_content: z.string().min(1),
      tvdb_id: z.number(),
      cringe_score_vote: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.review.create({
        data: {
          review_content: input.review_content,
          tvdb_id: input.tvdb_id,
          userId: ctx.session.user.id,
          cringe_score_vote: input.cringe_score_vote,
          date_created: new Date()
        },
      });
    }),

  getUserReview: publicProcedure.input(z.object({ tvdb_id: z.number() })).query(({ ctx, input }) => {
    return ctx.db.review.findFirst({
      where: {
        tvdb_id: input.tvdb_id,
        userId: ctx.session?.user.id
      }
    });
  }),

  getMostRecentReviews: publicProcedure.input(z.object({ tvdb_id: z.number() })).query(({ ctx, input }) => {
    return ctx.db.review.findMany({
      orderBy: {
        date_created: "desc",
      },
      where: {
        tvdb_id: input.tvdb_id,
      }
    });
  }),

  updateReview: protectedProcedure
    .input(z.object({
      review_id: z.number(),
      review_content: z.string().min(1),
      cringe_score_vote: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.review.update({
        where: {
          review_id: input.review_id
        },
        data: {
          review_content: input.review_content,
          cringe_score_vote: input.cringe_score_vote,
          date_updated: new Date()
        },
      });
    }),

  deleteReview: protectedProcedure
    .input(z.object({ review_id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.review.delete({
        where: {
          review_id: input.review_id
        },
      });
    }),
});