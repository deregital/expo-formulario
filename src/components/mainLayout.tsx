'use client';
import Modal from '@/components/Modal';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className={cn('px-5 pb-5')}>{children}</main>
      <Modal />
      <Image
        src={'/images/elipses_right.png'}
        alt="Fondo"
        className="absolute bottom-0 right-0 -z-10 origin-right scale-[50%] sm:-bottom-20"
        width={313}
        height={695}
      />
      <Image
        src={'/images/elipses_left.png'}
        alt="Fondo"
        className="absolute bottom-0 left-0 -z-10 origin-left scale-[50%] sm:-bottom-20"
        width={313}
        height={695}
      />
    </>
  );
};

export default MainLayout;
