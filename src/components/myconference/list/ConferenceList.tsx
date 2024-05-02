"use client";
import { Content } from "@/hooks/conference";
import ListItemImage from "../../common/List/ListItemImage";
import { formatDate, formatDateWithHour } from "@/utils/date";
import { CiCirclePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";

export default function ConferenceList({
  conference,
  role,
}: {
  conference: Content;
  role: string;
}) {
  const router = useRouter();
  const handleCirclePlusClick = () => {
    if (role === "USER") {
      router.push("/attend");
    } else if (role === "ALL") {
      router.push("/login");
    }
  };
  return (
    <div className="flex flex-col xs:flex-row items-center xs:items-start w-full text-black bg-close2White hover:bg-gray-200 duration-200 shadow-whiteShadow h-full z-0 rounded-3xl relative pb-4 xs:py-0">
      <ListItemImage
        href={`/myconference/${conference.id}`}
        logo={conference.logo}
        className="rounded-l-3xl"
      >
        <div className="flex flex-col xs:pl-4 gap-y-0 xs:gap-y-1 py-2 w-full items-center xs:items-start text-center break-all 2xs:break-normal">
          <p className="font-black text-sm 2xs:text-xl">{conference?.name}</p>
          <p className="text-xs 2xs:text-base">{formatDate(conference?.startDateTime)}
          &nbsp;- {formatDate(conference?.endDateTime)}</p>
          <p className="font-semibold xs:font-bold text-xs 2xs:text-base">{conference?.location?.name}</p>
        </div>
      </ListItemImage>
      {(role === "USER" || role === "ALL") && (
        <div
          className="w-auto h-full flex justify-center items-center xs:h-min gap-x-2 xs:mr-4 xs:mt-4 px-2 xs:px-0 bg-gray-300 xs:bg-transparent rounded-full cursor-pointer"
          onClick={handleCirclePlusClick}
        >
          <p className="font-semibold text-xs 2xs:text-base hidden 2xs:block xs:hidden ">Dołącz</p>
          <CiCirclePlus
            className="text-4xl text-darkblue"
          />
        </div>
      )}
    </div>
  );
}
