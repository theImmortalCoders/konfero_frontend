import { StaticImageData } from "next/image";
import Image from "next/image";

export function Box({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={`bg-close2White items-start shadow-whiteShadow h-auto z-0 rounded-3xl px-4 py-4 sm:px-8 sm:py-8 ${className}`}
    >
      {children}
    </main>
  );
}

export function BoxWithImage({
  children,
  className,
  src,
  alt,
}: {
  children: React.ReactNode;
  className?: string;
  src: StaticImageData | string;
  alt: string;
}) {
  return (
    <div
      className={`bg-close2White items-start shadow-whiteShadow h-auto z-0 rounded-3xl ${className}`}
    >
      <div className="relative w-full">
        <Image
          src={src}
          alt={alt}
          className="rounded-t-3xl w-full h-auto filter brightness-50"
        />
        {children}
      </div>
    </div>
  );
}
