import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Provider from '@/app/_trpc/Provider';
import './globals.css';
import { cn } from '@/lib/utils';
import TopBar from '@/components/TopBar';
import MainLayout from '@/components/mainLayout';

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
      <body className={`relative min-h-screen w-screen overflow-y-auto`}>
        <TopBar />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
