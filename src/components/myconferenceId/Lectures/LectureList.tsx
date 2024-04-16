import { Lecture } from "@/hooks/conference";
import ListItemImage from "../../common/List/ListItemImage";

export default function LectureList({ lecture }: { lecture: Lecture }) {
  console.log("lecture", lecture);
  return (
    <div className="flex w-full text-black bg-close2White items-start shadow-whiteShadow h-auto z-0 rounded-3xl">
      <ListItemImage href={`/lecture/${lecture.id}`} logo={lecture.image}>
        <div className="flex flex-col pl-4">
          <p className="font-black text-xl">{lecture.name}</p>
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
      </ListItemImage>
    </div>
  );
}
