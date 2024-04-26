import APIImageComponent, {LogoInterface} from "@/hooks/imageAPI";
import Link from "next/link";

export default function ListItemImage({
                                          href,
                                          logo,
                                          children,
                                          className,
                                      }: {
    href: string;
    logo: LogoInterface;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <Link
            href={href}
            className={`w-full hover:bg-gray-200 duration-200 ${className}`}
        >
            <div className="flex items-center w-full space-l-3.5 md:h-28">
                <div className="md:flex hidden rounded-l-3xl overflow-hidden h-min max-h-full max-w-[20%]">
                    <APIImageComponent imageId={logo.id} type={"IMAGE"}/>
                </div>
                {children}
            </div>
        </Link>
    );
}
