import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const tvShowRouter = createTRPCRouter({
  getAllTvShows: publicProcedure.query(({ ctx }) => {
    const ret = ctx.db.televisionShow.findMany();
    return ret

  }),
});
