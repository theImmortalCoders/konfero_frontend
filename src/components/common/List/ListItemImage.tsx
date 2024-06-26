import APIImageComponent, { ImageInterface } from "@/hooks/imageAPI";
import Link from "next/link";

export default function ListItemImage({
  href,
  logo,
  children,
  className,
}: {
  href: string;
  logo: ImageInterface;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`w-full ${className}`}>
      <div className="flex flex-col sm:flex-row items-center space-l-3.5 mt-0 2xs:mt-4 sm:mt-0 sm:h-36">
        <div className="flex rounded-t-3xl 2xs:rounded-b-3xl sm:rounded-r-none sm:rounded-l-3xl overflow-hidden max-h-full w-full 2xs:size-36">
          <APIImageComponent imageId={logo.id} type={"IMAGE"} full={false}/>
        </div>
        {children}
      </div>
    </Link>
  );
}
