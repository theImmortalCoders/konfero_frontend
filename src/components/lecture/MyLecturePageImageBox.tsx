import { GetLectureDetailsData } from "@/hooks/lecture";
import { FaRegCalendarCheck, FaRegClock } from "react-icons/fa6";
import { IoMdPin } from "react-icons/io";

export default function MyLecturePageImageBox({
  lectureIdData,
}: {
  lectureIdData: GetLectureDetailsData;
}) {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center text-close2White p-4">
      <h1 className="text-lg sm:text-2xl  md:text-3xl lg:text-2xl xl:text-3xl pt-[5%]">
        {lectureIdData.name}
      </h1>
      <div className="w-full h-auto flex justify-around pt-[10%]">
        <div className="flex-row flex gap-x-3 w-full h-auto items-center justify-center">
          <FaRegCalendarCheck className="text-lg md:text-3xl lg:text-2xl xl:text-4xl" />
          <h1 className="text-xs sm:text-sm md:text-lg lg:text-md xl:text-lg">
            {lectureIdData.startDateTime.split("T")[0]}{" "}
            {lectureIdData.startDateTime
              .split("T")[1]
              .split(":")
              .slice(0, 2)
              .join(":")}
          </h1>
        </div>
        <div className="flex-row flex gap-x-3 w-full h-auto items-center justify-center">
          <FaRegClock className="text-lg md:text-3xl lg:text-2xl xl:text-4xl" />
          <h1 className="text-xs sm:text-sm md:text-lg lg:text-md xl:text-lg">
            Czas trwania: {lectureIdData.durationMinutes} minut
          </h1>
        </div>
      </div>
      <div className="flex-col flex gap-x-3 w-full h-auto items-center justify-center pt-[10%]">
        <div className="flex-row flex gap-x-3 w-full h-auto items-center justify-center">
          <IoMdPin className="text-lg md:text-3xl lg:text-2xl xl:text-4xl" />
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl">
            {lectureIdData.place}
          </h1>
        </div>
      </div>
    </div>
  );
}
