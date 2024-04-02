import Image from 'next/image';
import imagejpg from '../../public/images/image.jpg';

const TopBar = () => {
  return (
    <div className="flex w-full items-center justify-center bg-topbar">
      <Image
        src={imagejpg}
        alt="ExpoDesfiles Logo"
        className="py-3"
        width={108}
        height={54}
      />
      {/* <Image src={imageLogo} alt="ExpoDesfiles Logo" className="py-3" width={108} height={54} /> */}
    </div>
  );
};

export default TopBar;
