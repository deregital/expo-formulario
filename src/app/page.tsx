'use client';

import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import Link from 'next/link';

export default function Home() {
  const { data, isLoading} = trpc.hello.useQuery({
    text: 'world',
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-24">
      <Button>Hola, soy un botón 👮</Button>
      {isLoading ? (
        <p className="text-white">Cargando saludo...</p>
      ) : (
        <p className="text-white">{data?.greeting}</p>
      )}
      <Button variant="outline" asChild>
        <Link href={'/users'}>
          Soy un botón secundario que te lleva a la página de usuarios
        </Link>
      </Button>
    </main>
  );
}


