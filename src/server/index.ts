import { z } from 'zod';
import { publicProcedure, router } from './trpc';
import { prisma } from '@/server/db';
import { TRPCError } from '@trpc/server';

export const appRouter = router({
  perfil: router({
    create: publicProcedure
      .input(z.object({ nombre: z.string(), telefono: z.string() }))
      .mutation(async ({ input }) => {

        
      

        await prisma.perfil.create({
          data: {
            nombreCompleto: input.nombre,
            telefono: input.telefono,
          },
        });
      }),
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
