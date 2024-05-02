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
    <div className="flex w-full text-black bg-close2White items-start shadow-whiteShadow h-full z-0 rounded-3xl">
      <ListItemImage
        href={`/myconference/${conference.id}`}
        logo={conference.logo}
        className="rounded-l-3xl"
      >
        <div className="flex flex-col pl-4 space-y-0 xs:space-y-1 py-2 w-2/5">
          <p className="font-black text-lg xs:text-xl">{conference?.name}</p>
          <p className="text-sm xs:text-base">{formatDate(conference?.startDateTime)}
          &nbsp;- {formatDate(conference?.endDateTime)}</p>
          <p className="font-semibold xs:font-bold text-sm xs:text-base">{conference?.location?.name}</p>
        </div>
        <div className="grid grid-cols-3 gap-x-2 gap-y-1 ml-6 items-end justify-center">
          {conference.tags.slice(0, 8).map((tag) => (
            <p key={tag.id} className="w-28 overflow-hidden overflow-ellipsis whitespace-nowrap text-center bg-gray-200 border-[1px] border-blue rounded-lg px-1">
              {tag.tagName}
            </p>
          ))}
          {conference.tags.length > 8 && <p className="w-28 text-center bg-gray-200 border-[1px] border-blue rounded-lg px-1">...</p>}
        </div>
      </ListItemImage>
      {(role === "USER" || role === "ALL") && (
        <div className="w-auto h-full flex justify-center items-center">
          <CiCirclePlus
            onClick={handleCirclePlusClick}
            className="text-4xl text-darkblue"
          />
        </div>
      )}
    </div>
  );
}
