import { GetLectureDetailsData } from "@/hooks/lecture";
import { FaRegCalendarCheck, FaRegClock } from "react-icons/fa6";
import { IoMdPin } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/hooks/user";

async function getId() {
  const userData = await getCurrentUser();
  if (userData && typeof userData === "object" && "id" in userData) {
    return userData.id;
  }
  return null;
}

export default function MyLecturePageImageBox({
  lectureIdData,
  isUserOrganizer,
  isUserLecturer,
}: {
  lectureIdData: GetLectureDetailsData;
  isUserOrganizer: boolean;
  isUserLecturer: boolean;
}) {
  const router = useRouter();
  console.log("o",isUserOrganizer)
  console.log("l",isUserLecturer)
  return (
    <div className="w-full h-fit flex flex-col items-center text-close2White p-4">
      {isUserOrganizer || isUserLecturer ? (
        <div
          onClick={() => router.push(`/updatelecture/${lectureIdData.id}`)}
          className="flex px-3 py-1 justify-center items-center space-x-2 bg-close2White rounded-3xl font-black text-darkblue cursor-pointer"
        >
          <MdEdit className="text-2xl" />
          <p className="hidden md:block">Edytuj wykład</p>
        </div>
      ) : null}
      <h1 className="text-lg sm:text-2xl  md:text-3xl lg:text-2xl xl:text-3xl py-[3%]">
        {lectureIdData.name}
      </h1>
      <div className="w-full h-auto flex justify-around py-[3%]">
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
      <div className="flex-col flex gap-x-3 w-full h-auto items-center justify-center py-[3%]">
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
