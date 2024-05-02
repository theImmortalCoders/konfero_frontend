"use client";
import { Content } from "@/hooks/conference";
import ListItemImage from "../../common/List/ListItemImage";
import { formatDate, formatDateWithHour } from "@/utils/date";
import { CiCirclePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useEffect} from "react";
import {base} from "next/dist/build/webpack/config/blocks/base";

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

  const baseScale = useMediaQuery("(min-width:1024px)");
  const rwd  = new Array(15).fill(null).map((a,index) => {
    return Number(useMediaQuery(`(min-width:${(baseScale?3050:2700) - 150 * index}px)`));
  })
  const sumRwd = rwd.reduce((a,b) => {return a + b} ,0)


  return (
    <div className="flex flex-col xs:flex-row items-center xs:items-start w-full text-black bg-close2White hover:bg-gray-200 duration-200 shadow-whiteShadow h-full z-0 rounded-3xl relative pb-4 xs:py-0">
      <ListItemImage
        href={`/myconference/${conference.id}`}
        logo={conference.logo}
        className="rounded-l-3xl"
      >
        <div className="flex flex-col w-4/5">
          <div className="flex flex-col xs:pl-4 gap-y-0 xs:gap-y-1 py-2 w-full items-center xs:items-start text-center break-all 2xs:break-normal">
            <p className="font-black text-sm 2xs:text-xl">{conference?.name}</p>
            <p className="text-xs 2xs:text-base">{formatDate(conference?.startDateTime)}
              &nbsp;- {formatDate(conference?.endDateTime)}</p>
            <p className="font-semibold xs:font-bold text-xs 2xs:text-base">{conference?.location?.name}</p>
          </div>
          <div className="flex flex-wrap xs:flex-row justify-center w-full xs:pl-4 items-center xs:justify-start mt-1 mb-2 gap-1">
            {conference.tags?.slice(0, 2 + sumRwd).map((tag) => (
              <p key={tag.id} className="w-20 h-fit text-xxs overflow-hidden overflow-ellipsis whitespace-nowrap text-center bg-gray-200 border-[1px] border-blue rounded-lg px-1">
                {tag.tagName}
              </p>
            ))}
            {conference.tags?.length > 2 + sumRwd &&
              <div className="flex flex-row h-fit text-xxs overflow-hidden overflow-ellipsis whitespace-nowrap justify-center bg-gray-200 border-[1px] border-blue rounded-lg px-2">
                <p className="sm:hidden" >+</p>
                {conference.tags.length - (2 + sumRwd)}
                <p className="hidden sm:block" >&nbsp;więcej...</p>
              </div>
            }
          </div>
        </div>
      </ListItemImage>
      {(role === "USER" || role === "ALL") && (
        <div
          className="w-auto h-min flex justify-center items-center xs:h-min gap-x-2 xs:mr-4 xs:mt-4 2xs:px-2 xs:px-0 2xs:bg-gray-300 xs:bg-transparent rounded-full cursor-pointer"
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
