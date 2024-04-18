"use client";
import { Content, deleteConference } from "@/hooks/conference";
import { useCallback, useState } from "react";
import ListItemImage from "../../common/List/ListItemImage";
import ListItemOptions from "./ListItemOptions";
import { formatDateWithHour } from "@/utils/date";

export default function ConferenceList({
  conference,
}: {
  conference: Content;
}) {
  const [deleted, setDeleted] = useState<boolean>(false);

  const handleDelete = useCallback(() => {
    deleteConference(conference?.id);
    setDeleted(true);
  }, []);

  return deleted ? (
    <></>
  ) : (
    <div className="flex w-full text-black bg-close2White items-start shadow-whiteShadow h-auto z-0 rounded-3xl">
      <ListItemImage
        href={`/myconference/${conference.id}`}
        logo={conference.logo}
        className="rounded-l-3xl"
      >
        <div className="flex flex-col pl-4">
          <p className="font-black text-xl">{conference?.name}</p>
          <p>Rozpoczęcie: {formatDateWithHour(conference?.startDateTime)}</p>
          <p>Zakończenie: {formatDateWithHour(conference?.endDateTime)}</p>
          <p className="font-bold">{conference?.location.name}</p>
        </div>
      </ListItemImage>
      <ListItemOptions confId={conference.id} handleDelete={handleDelete} />
    </div>
  );
}
