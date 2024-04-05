import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';

import './globals.css';
import TopBar from '@/components/TopBar';
import MainLayout from '@/components/mainLayout';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Expo formulario',
  description: 'Formulario de inscripción para el evento de Expo',
};

export const poppinsFont = Poppins({
  adjustFontFallback: true,
  preload: true,
  weight: ['400', '700'],
  fallback: ['sans-serif'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'relative min-h-screen w-screen overflow-y-auto',
          poppinsFont.className
        )}
      >
        <TopBar />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
