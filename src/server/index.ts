import { z } from 'zod';
import { publicProcedure, router } from './trpc';
import { prisma } from '@/server/db';

export const appRouter = router({
  perfil: router({
    create: publicProcedure
      .input(z.object({ nombre: z.string(), telefono: z.string() }))
      .mutation(async ({ input }) => {
        // Sacarle los espacios al telefono

        // Antes, ver que el numero de telefono no se encuentre en la base.
        // Si se encuentra, devolver error con `throw TRPCError()`

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
