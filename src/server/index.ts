import { z } from 'zod';
import { publicProcedure, router } from './trpc';
import { prisma } from '@/server/db';
import { TRPCError } from '@trpc/server';

export const appRouter = router({
  perfil: router({
    create: publicProcedure
      .input(z.object({ nombre: z.string(), telefono: z.string() }))
      .mutation(async ({ input }) => {

        const telefonoSinSeparaciones = input.telefono.replace(/\s+/g, '').replace(/\+/g, '');
        

        const telefonoExistente = await prisma.perfil.findFirst({
          where: {
            telefono: telefonoSinSeparaciones,
          },
        });

        if (telefonoExistente) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'El número de teléfono ya existe en el registro.',
          });
        }

        const nombrePila = input.nombre.split(' ')[0];

        
      

        await prisma.perfil.create({
          data: {
            nombreCompleto: input.nombre,
            telefono: telefonoSinSeparaciones,
            nombrePila: nombrePila,
          },
        });
      }),
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
