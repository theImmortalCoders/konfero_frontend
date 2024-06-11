import { GetConferenceDetailsWithRoleFilteringData } from "@/hooks/conference";
import { formatDateWithHour } from "@/utils/date";
import Link from "next/link";
import {
  FaChevronRight,
  FaRegCalendarCheck,
  FaRegCalendarXmark,
} from "react-icons/fa6";
import { IoMdPin } from "react-icons/io";
import React from "react";
import End from "@/components/status/end";
import Verified from "@/components/status/verified";
import Cancel from "@/components/status/cancel";
import Full from "@/components/status/full";

export default function MyConferencePageImageBox({
  conferenceIdData,
}: {
  conferenceIdData: GetConferenceDetailsWithRoleFilteringData;
}) {
  return (
    <div className=" w-full h-fit flex flex-col items-center text-close2White p-4">
      <h1 className="my-2 text-lg sm:text-2xl  md:text-3xl lg:text-2xl xl:text-3xl">
        {conferenceIdData.name}
      </h1>
      {conferenceIdData.verified && <Verified showtext={true}/>}
      {conferenceIdData.canceled && <Cancel showtext={true}/>}
      {conferenceIdData.participantsFull && <Full/>}
      {Date.parse(conferenceIdData.endDateTime) < Date.now() && !conferenceIdData.canceled && <End/>}
      <div className="w-full h-auto flex gap-5 px-10 md:px-32 justify-around py-[2%]">
        <div className="flex-row flex gap-x-3  h-auto items-center justify-center">
          <FaRegCalendarCheck className="text-lg md:text-3xl lg:text-2xl xl:text-4xl" />
          <h1 className="text-xs sm:text-sm md:text-lg lg:text-md xl:text-lg">
            {formatDateWithHour(conferenceIdData.startDateTime)}
          </h1>
        </div>
        <div className="flex-row flex gap-x-3 h-auto items-center justify-center">
          <FaRegCalendarXmark className="text-lg md:text-3xl lg:text-2xl xl:text-4xl" />
          <h1 className="text-xs sm:text-sm md:text-lg lg:text-md xl:text-lg">
            {formatDateWithHour(conferenceIdData.endDateTime)}
          </h1>
        </div>
      </div>
      {conferenceIdData.format === "STATIONARY" ? (
        <div className="flex-col flex gap-x-1 md:gap-x-3 w-full h-auto items-center justify-center py-[2%]">
          <div className="flex-row flex gap-x-3 w-full h-auto items-center justify-center">
            <IoMdPin className="text-lg md:text-3xl lg:text-2xl xl:text-4xl" />
            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl">
              {conferenceIdData.location.name}
            </h1>
          </div>
          <Link
            href={`https://www.google.com/maps/place/${conferenceIdData.location.locX}+${conferenceIdData.location.locY}`}
            rel="noopener noreferrer"
            target="_blank"
            className={"pt-2 hover:underline flex items-center gap-2 "}
          >
            <h1 className="text-sm sm:text-md md:text-lg lg:text-md xl:text-lg">
              Zobacz lokalizację na mapie
            </h1>
            <FaChevronRight />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
