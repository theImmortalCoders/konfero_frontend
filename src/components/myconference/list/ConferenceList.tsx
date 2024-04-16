"use client";
import { Content, deleteConference } from "@/hooks/conference";
import { useCallback, useState } from "react";
import ListItemImage from "../../common/List/ListItemImage";
import ListItemOptions from "./ListItemOptions";

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

  function formatDate(dateToFormat: string) {
    return new Date(dateToFormat).toLocaleString();
  }
  return deleted ? (
    <></>
  ) : (
    <div className="flex w-full text-black bg-close2White items-start shadow-whiteShadow h-auto z-0 rounded-3xl">
      <ListItemImage
        href={`/myconference/${conference.id}`}
        logo={conference.logo}
      >
        <div className="flex flex-col pl-4">
          <p className="font-black text-xl">{conference?.name}</p>
          <p>Rozpoczęcie: {formatDate(conference?.startDateTime)}</p>
          <p>Zakończenie: {formatDate(conference?.endDateTime)}</p>
          <p className="font-bold">{conference?.location.name}</p>
        </div>
      </ListItemImage>
      <ListItemOptions confId={conference.id} handleDelete={handleDelete} />
    </div>
  );
}
