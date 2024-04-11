'use client';
import Provider from '@/app/_trpc/Provider';
import Modal, { useFormSend } from '@/components/Modal';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const MainLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <main className={cn('px-5 pb-5')}>
        <Provider>{children}</Provider>
      </main>
      <Modal />
      <Image src={'/images/elipses_right.png'} alt='Fondo' className='absolute right-0 -z-10 bottom-0 origin-right sm:-bottom-20 scale-[50%]' width={313} height={695} /> 
      <Image src={'/images/elipses_left.png'} alt='Fondo' className='absolute left-0 -z-10 bottom-0 origin-left sm:-bottom-20 scale-[50%]' width={313} height={695} />
    </>
  );
};

export default MainLayout;
