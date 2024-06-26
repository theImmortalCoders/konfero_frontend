import Image, { StaticImageData } from "next/image";

export default function People({
  username,
  photo,
  email,
}: {
  username: string;
  photo: string | StaticImageData;
  email?: string;
}) {
  return (
    <div>
      <div className="flex justify-center items-center w-auto h-auto">
        <div className="relative w-[40px] h-[40px] md:w-[60px] md:h-[60px] lg:w-[40px] lg:h-[40px] xl:w-[60px] xl:h-[60px] ">
          <Image
            src={photo}
            alt="User photo"
            layout="fill"
            className="rounded-full"
            objectFit="cover"
          />
        </div>
      </div>
      <span className="w-full flex justify-center pt-1 text-xs sm:text-sm md:text-md lg:text-sm xl:text-md text-center">
        {username}
      </span>
      <span className="w-full hidden sm:flex justify-center text-xxs sm:text-xs md:text-tiny lg:text-xs xl:text-tiny text-center">
        {email}
      </span>
    </div>
  );
}
