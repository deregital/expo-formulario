import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import styles from './styles.module.css';
import Provider from '@/app/_trpc/Provider';
import { cn } from '@/lib/utils';

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
      <body className={cn('bg-slate-800', inter.className)}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
