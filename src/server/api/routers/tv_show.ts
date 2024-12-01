import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { type TV_Show } from "~/types";

export const tvShowRouter = createTRPCRouter({
  getAllTvShows: publicProcedure.query(({ ctx }) => {
    return ctx.db.tvShow.findMany() as TV_Show[];
  }),
});
