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
      <p className="w-full flex justify-center items-center">
        <Image
          src={photo}
          alt={"Logo"}
          className="rounded-full"
          width={80}
          height={80}
        />
      </p>
      <span className="w-full flex justify-center pt-1 text-md">
        {username}
      </span>
      <span className="w-full flex justify-center text-xs">{email}</span>
    </div>
  );
}
