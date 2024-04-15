import { Lecture } from "@/hooks/conference";
import APIImageComponent from "@/hooks/imageAPI";
import Link from "next/link";

export default function LectureBox({ lecture }: { lecture: Lecture }) {
  return (
    <Link href={`/lecture/${lecture.id}`} className="w-full">
      <div className="flex items-center w-full space-x-3.5 md:h-28 bg-inherit rounded-lg border-2 border-darkblue">
        <div className="md:flex hidden rounded-xl overflow-hidden h-min max-h-full max-w-[20%] ml-3">
          <APIImageComponent imageId={lecture.image.id} type={"IMAGE"} />
        </div>
        <div className="flex flex-col text-darkblue ">
          <p className="text-xl">{lecture.name}</p>
          <p>
            Rozpoczęcie: {lecture.startDateTime.split("T")[0]}{" "}
            {lecture.startDateTime
              .split("T")[1]
              .split(":")
              .slice(0, 2)
              .join(":")}
          </p>
          <p>Czas: {lecture.durationMinutes}</p>
          <p className="font-bold">Miejsce: {lecture?.place}</p>
        </div>
      </div>
    </Link>
  );
}
