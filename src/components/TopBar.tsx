import Logo from '@/components/Logo';
import Image from 'next/image';

const TopBar = () => {
  return (
    <div className="flex w-full items-center justify-center bg-topbar">
      <Logo width={150} height={75} className="text-white" />
    </div>
  );
};

export default TopBar;
