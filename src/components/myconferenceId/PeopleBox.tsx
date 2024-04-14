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
    <div className="w-full">
      <div className="flex justify-center items-center w-auto h-auto">
        <div className="relative w-[20px] h-[20px] sm:w-[40px] sm:h-[40px] md:w-[60px] md:h-[60px] lg:w-[40px] lg:h-[40px] xl:w-[60px] xl:h-[60px] ">
          <Image
            src={photo}
            alt="User photo"
            layout="fill"
            className="rounded-full"
            objectFit="cover"
          />
        </div>
      </div>
      <span className="w-full flex justify-center pt-1 text-xs sm:text-sm md:text-md lg:text-sm xl:text-md">
        {username}
      </span>
      <span className="w-full hidden sm:flex justify-center text-xxs sm:text-xs md:text-tiny lg:text-xs xl:text-tiny">
        {email}
      </span>
    </div>
  );
}
