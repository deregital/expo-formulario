import type { Metadata } from 'next';
import { poppinsFont } from '@/lib/fonts';

import './globals.css';
import TopBar from '@/components/TopBar';
import MainLayout from '@/components/mainLayout';
import { cn } from '@/lib/utils';

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
      <body
        className={cn(
          'relative h-auto min-h-screen w-screen overflow-y-auto overflow-x-hidden',
          poppinsFont.className
        )}
      >
        <TopBar />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
