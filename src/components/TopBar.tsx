import Image from 'next/image';

const TopBar = () => {
  return (
    <div className="flex w-full items-center justify-center bg-topbar">
      <Image
        src={'/images/image.jpg'}
        alt="ExpoDesfiles Logo"
        className="py-3"
        width={108}
        height={54}
      />
    </div>
  );
};

export default TopBar;
