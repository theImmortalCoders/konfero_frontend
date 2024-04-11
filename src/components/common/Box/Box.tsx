import { StaticImageData } from "next/image";
import Image from "next/image";
import { GoCalendar } from "react-icons/go";
import { FaRegClock } from "react-icons/fa";
import { IoMdPin } from "react-icons/io";

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
  src: StaticImageData;
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
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center text-close2White p-4">
          <h1 className="text-4xl pt-[5%]">Tytuł konferencji</h1>
          <div className="w-full h-auto flex justify-around text-3xl pt-[10%]">
            <div className="flex-row flex gap-x-3 w-full h-auto items-center justify-center">
              <GoCalendar className="text-4xl" />
              <h1>Data konferencji</h1>
            </div>
            <div className="flex-row flex gap-x-3 w-full h-auto items-center justify-center">
              <FaRegClock className="text-4xl" />
              <h1>Godzina konferencji</h1>
            </div>
          </div>
          <div className="flex-row flex gap-x-3 w-full h-auto items-center justify-center pt-[20%]">
            <IoMdPin className="text-4xl" />
            <h1 className=" text-3xl">Miejsce konferencji</h1>
          </div>
        </div>
      </div>
      <div className="px-4 py-2 sm:px-8 sm:py-4 w-full">{children}</div>
    </div>
  );
}
