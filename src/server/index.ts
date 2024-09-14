import { z } from 'zod';
import { publicProcedure, router } from './trpc';
import { prisma } from '@/server/db';
import { TRPCError } from '@trpc/server';

// tipado de localidades
export type Localidad = {
    id: string
    nombre: string;
    municipios: {
        categoria: string;
        centroide: {
            lon: number;
            lat: number;
        };
        fuente: string;
        id: string;
        nombre: string;
        nombreCompleto: string;
    }[];
}[];
export const appRouter = router({
    localidades: router({
        getLocalidadesByState: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
            // Agarrar las localidades del json localidad.json ubicado en lib filtrando solo por el estado
            const localidades: Localidad = require('../lib/localidad.json');
            const localidadesByState = localidades.filter((localidad) => localidad.nombre === input);
            if (localidadesByState.length === 0) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'No se encontraron localidades' });
            }
            return localidadesByState.map((localidad) => localidad.municipios);
            
        }),
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
