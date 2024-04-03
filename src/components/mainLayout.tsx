'use client';
import Provider from '@/app/_trpc/Provider';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { create } from 'zustand';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Modal, { useFormSend } from '@/components/Modal';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { open } = useFormSend((s) => ({
    open: s.open,
  }));

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
