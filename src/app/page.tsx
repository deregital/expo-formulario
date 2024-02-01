import { serverClient } from '@/app/_trpc/serverClient';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const { greeting } = await serverClient.hello({ text: 'Nico' });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Hola, soy un botón 👮</Button>
      <Button variant="outline" asChild>
        <Link href={'/users'}>
          Soy un botón secundario que te lleva a la página de usuarios
        </Link>
      </Button>
    </main>
  );
}
