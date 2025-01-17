import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc";

export const reviewRouter = createTRPCRouter({
  getReviewsByTVId: publicProcedure.input(z.object({ tvdb_id: z.number() })).query(({ ctx, input }) => {
    return ctx.db.review.findMany({
      take: 6,
      skip: 1,
      where: {
        tvdb_id: input.tvdb_id,
      },
    });
  }),

  getPagedReviewsByTVId: publicProcedure.input(z.object({ tvdb_id: z.number(), cursor: z.number() })).query(({ ctx, input }) => {
    return ctx.db.review.findMany({
      take: 6,
      skip: input.cursor ?? 0,
      where: {
        tvdb_id: input.tvdb_id,
      },
    });
  }),

  getReviews: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.number().nullish(),
        direction: z.enum(['forward', 'backward']).default('forward'),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor, direction } = input;

      const items = await ctx.db.review.findMany({
        take: direction === 'backward' ? -(limit + 1) : limit + 1,
        cursor: cursor ? { review_id: cursor } : undefined,
        orderBy: {
          date_created: 'desc',
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      let prevCursor: typeof cursor | undefined = undefined;

      if (direction === 'forward') {
        if (items.length > limit) {
          const nextItem = items.pop()!;
          nextCursor = nextItem.review_id;
        }
        if (cursor) {
          prevCursor = cursor;
        }
      } else {
        if (items.length > limit) {
          const prevItem = items.shift()!;
          prevCursor = prevItem.review_id;
        }
        if (cursor) {
          nextCursor = cursor;
        }
        items.reverse();
      }

      return {
        items,
        nextCursor,
        prevCursor,
      };
    }),

  getReviewsByUserId: publicProcedure.input(z.object({ userId: z.string() })).query(({ ctx, input }) => {
    return ctx.db.review.findMany({
      where: {
        userId: input.userId,
      },
      orderBy: {
        date_created: "desc",
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

  hasUserLeftReview: publicProcedure.input(z.object({ tvdb_id: z.number() })).query(({ ctx, input }) => {
    const userReview = ctx.db.review.findFirst({
      where: {
        tvdb_id: input.tvdb_id,
        userId: ctx.session?.user.id
      }
    });

    return userReview !== null ? false : true;
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