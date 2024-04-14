import { GetConferenceDetailsWithRoleFilteringData } from "@/hooks/conference";
import Link from "next/link";
import {
  FaChevronRight,
  FaRegCalendarCheck,
  FaRegCalendarXmark,
} from "react-icons/fa6";
import { IoMdPin } from "react-icons/io";

export default function MyConferencePageImageBox({
  conferenceIdData,
}: {
  conferenceIdData: GetConferenceDetailsWithRoleFilteringData;
}) {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center text-close2White p-4">
      <h1 className="text-lg sm:text-2xl  md:text-3xl lg:text-2xl xl:text-3xl pt-[5%]">
        {conferenceIdData.name}
      </h1>
      <div className="w-full h-auto flex justify-around pt-[10%]">
        <div className="flex-row flex gap-x-3 w-full h-auto items-center justify-center">
          <FaRegCalendarCheck className="text-lg md:text-3xl lg:text-2xl xl:text-4xl" />
          <h1 className="text-xs sm:text-sm md:text-lg lg:text-md xl:text-lg">
            {conferenceIdData.startDateTime.split("T")[0]}{" "}
            {conferenceIdData.startDateTime
              .split("T")[1]
              .split(":")
              .slice(0, 2)
              .join(":")}
          </h1>
        </div>
        <div className="flex-row flex gap-x-3 w-full h-auto items-center justify-center">
          <FaRegCalendarXmark className="text-lg md:text-3xl lg:text-2xl xl:text-4xl" />
          <h1 className="text-xs sm:text-sm md:text-lg lg:text-md xl:text-lg">
            {conferenceIdData.endDateTime.split("T")[0]}{" "}
            {conferenceIdData.endDateTime
              .split("T")[1]
              .split(":")
              .slice(0, 2)
              .join(":")}
          </h1>
        </div>
      </div>
      <div className="flex-col flex gap-x-3 w-full h-auto items-center justify-center pt-[10%]">
        <div className="flex-row flex gap-x-3 w-full h-auto items-center justify-center">
          <IoMdPin className="text-lg md:text-3xl lg:text-2xl xl:text-4xl" />
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl">
            {conferenceIdData.location.name}
          </h1>
        </div>
        <Link
          href={`https://www.google.com/maps/place/${conferenceIdData.location.locX}+${conferenceIdData.location.locY}`}
          className={"pt-2 hover:underline flex items-center gap-2 "}
        >
          <h1 className="text-sm sm:text-md md:text-lg lg:text-md xl:text-lg">
            Zobacz lokalizację na mapie
          </h1>
          <FaChevronRight />
        </Link>
      </div>
    </div>
  );
}
