'use client';
import Provider from '@/app/_trpc/Provider';
import Modal, { useFormSend } from '@/components/Modal';
import { cn } from '@/lib/utils';

const MainLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <main className={cn('px-5 pb-5')}>
        <Provider>{children}</Provider>
      </main>
      <Modal />
    </>
  );
};

export default MainLayout;
