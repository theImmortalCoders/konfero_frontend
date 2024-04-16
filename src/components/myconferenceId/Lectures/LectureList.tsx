import { Lecture } from "@/hooks/conference";
import ListItemImage from "../../common/List/ListItemImage";
import { formatDateWithHour } from "@/utils/date";

export default function LectureList({ lecture }: { lecture: Lecture }) {
  return (
    <div className="flex w-full text-black bg-close2White items-start shadow-whiteShadow h-auto z-0 rounded-3xl">
      <ListItemImage href={`/lecture/${lecture.id}`} logo={lecture.image}>
        <div className="flex flex-col pl-4">
          <p className="font-black text-xl">{lecture.name}</p>
          <p>Rozpoczęcie: {formatDateWithHour(lecture.startDateTime)}</p>
          <p>Czas: {lecture.durationMinutes} min</p>
          <p className="font-bold">Miejsce: {lecture?.place}</p>
        </div>
      </ListItemImage>
    </div>
  );
}
