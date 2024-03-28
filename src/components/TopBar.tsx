import Image from "next/image";
import imagejpg from "../../public/images/image.jpg";

const TopBar = () => {
    return (
        <div className="bg-topbar flex justify-center items-center w-full">
            <Image src={imagejpg} alt="ExpoDesfiles Logo" className="py-3" width={108} height={54} />
        </div>
    )
}

export default TopBar;