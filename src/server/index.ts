import { z } from 'zod';
import { publicProcedure, router } from './trpc';
import { prisma } from '@/server/db';

export const appRouter = router({
  hello: publicProcedure
    .input(
      z
        .object({
          text: z.string(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      return {
        greeting: `Hello, ${input?.text ?? 'World'}!`,
      };
    }),
  user: router({
    getAll: publicProcedure.query(async () => {
      return await prisma.cuenta.findMany();
    }),
    add: publicProcedure
      .input(z.object({ nombreUsuario: z.string(), contrasena: z.string() }))
      .mutation(async ({ input }) => {
        return await prisma.cuenta.create({ data: input });
      }),
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
