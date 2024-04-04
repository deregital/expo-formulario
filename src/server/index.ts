import { z } from 'zod';
import { publicProcedure, router } from './trpc';
import { prisma } from '@/server/db';
import { TRPCError } from '@trpc/server';

export const appRouter = router({

});
// export type definition of API
export type AppRouter = typeof appRouter;
