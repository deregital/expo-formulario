import { z } from 'zod';
import { publicProcedure, router } from './trpc';
import { prisma } from '@/server/db';
import { TRPCError } from '@trpc/server';

// tipado de localidades
export type Localidad = {
    id: string
    nombre: string;
    fuente: string;
    provincia: {
        id: string;
        nombre: string;
    },
    departamento: {
        id: string;
        nombre: string;
    },
    municipio: {
        id: string;
        nombre: string;
    },
    localidad_censal: {
        id: string;
        nombre: string;
    },
    categoria: string;
    centroide: {
        lon: number;
        lat: number;
    },
}[];

export type LocalidadesJson = {
    localidades: Localidad;
}
export const appRouter = router({
    localidades: router({
        getLocalidadesByState: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
            // Agarrar las localidades del json localidad.json ubicado en lib filtrando solo por el estado
            const localidades: LocalidadesJson = require('../lib/localidades.json');
            const localidadesByState = localidades.localidades.filter((localidad) => localidad.provincia.nombre === input);
            if (localidadesByState.length === 0) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'No se encontraron localidades' });
            }
            return localidadesByState.map((localidad) => {
                return {
                    id: localidad.id,
                    nombre: localidad.nombre,
                    centroide: localidad.centroide,
                }
            });
            
        }),
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
