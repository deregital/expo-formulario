import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Libre_Bodoni } from 'next/font/google';
import Provider from '@/app/_trpc/Provider';
import './globals.css';
import { cn } from '@/lib/utils';
import TopBar from '@/components/TopBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Expo formulario',
  description: 'Formulario de inscripción para el evento de Expo',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='w-screen'>
        <TopBar />
        <main className='px-5'>
        <Provider>{children}</Provider>
        </main>
      </body>
    </html>
  );
}
