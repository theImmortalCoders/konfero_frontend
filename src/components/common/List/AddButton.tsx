import Link from "next/link";
import {FaPlus} from "react-icons/fa6";

export default function AddButton({
                                      href,
                                      children,
                                  }: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className="flex justify-center items-center gap-x-2 px-2 py-2 sm:py-0 bg-close2White hover:bg-darkblue  w-min md:text-nowrap text-darkblue hover:text-close2White border-2 border-black rounded-xl"
        >
            <p className="sm:inline-block hidden">{children}</p>
            <FaPlus/>
        </Link>
    );
}
