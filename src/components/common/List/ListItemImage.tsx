import APIImageComponent, { ImageInterface, LogoInterface } from "@/hooks/imageAPI";
import Link from "next/link";

export default function ListItemImage({
  href,
  logo,
  children,
  className,
}: {
  href: string;
  logo: LogoInterface | ImageInterface;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`w-full ${className}`}
    >
      <div className="flex flex-col xs:flex-row items-center space-l-3.5 mt-0 2xs:mt-4 xs:mt-0 xs:h-28">
        <div className="flex rounded-t-3xl 2xs:rounded-b-3xl xs:rounded-r-none xs:rounded-l-3xl overflow-hidden max-h-full w-full 2xs:size-36 xs:w-48">
          <APIImageComponent imageId={logo.id} type={"IMAGE"} />
        </div>
        {children}
      </div>
    </Link>
  );
}
