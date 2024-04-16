"use client";
import APIImageComponent from "@/hooks/imageAPI";
import Link from "next/link";
import ListItemOptions from "@/components/MyconferenceList/ListItemOptions";
import { Content, deleteConference } from "@/hooks/conference";
import { useCallback, useState } from "react";

export default function MaterialBox({ conference }: { conference: Content }) {
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
      <Link
        href={`/myconference/${conference?.id}`}
        className="w-full hover:bg-gray-200 rounded-l-3xl duration-200"
      >
        <div className="flex items-center w-full space-l-3.5 md:h-28">
          <div className="md:flex hidden rounded-l-3xl overflow-hidden h-min max-h-full max-w-[20%] pr-3">
            <APIImageComponent imageId={conference.logo.id} type={"IMAGE"} />
          </div>
          <div className="flex flex-col">
            <p className="font-black text-xl">{conference?.name}</p>
            <p>Rozpoczęcie: {formatDate(conference?.startDateTime)}</p>
            <p>Zakończenie: {formatDate(conference?.endDateTime)}</p>
            <p className="font-bold">{conference?.location.name}</p>
          </div>
        </div>
      </Link>
      <ListItemOptions confId={conference?.id} handleDelete={handleDelete} />
    </div>
  );
}
