'use client'
import {Box} from "@/components/common/Box/Box";
import APIImageComponent from "@/hooks/imageAPI";
import Link from "next/link";
import ListItemOptions from "@/components/MyconferenceList/ListItemOptions";
import {Content, deleteConference} from "@/hooks/conference"
import {useCallback, useState} from "react";
export default function ListItem({conference} : {conference: Content}) {

    const [deleted, setDeleted] = useState<boolean>(false);

    const handleDelete =
      useCallback(() => {
        deleteConference(conference?.id);
        setDeleted(true);
        }, [])

    function formatDate(dateToFormat: string) {
      return new Date(dateToFormat).toLocaleString();
    }

    return deleted?(<></>):(
    <Box className="flex w-full text-black">
      <Link href={`/myconference/${conference?.id}`} className="w-full px-3.5 hover:bg-gray-200 rounded-3xl duration-200">
        <div className="flex items-center w-full space-x-3.5 md:h-28">
          <div className="md:flex hidden rounded-xl overflow-hidden h-min max-h-full max-w-[20%]">
            <APIImageComponent imageId={conference.logo.id} type={'IMAGE'}/>
          </div>
          <div className="flex flex-col">
            <p className="font-black text-xl">
              {conference?.name}
            </p>
            <p>
              Rozpoczęcie: {formatDate(conference?.startDateTime)}
            </p>
            <p>
              Zakończenie: {formatDate(conference?.endDateTime)}
            </p>
            <p className="font-bold">
              {conference?.location.name}
            </p>
          </div>
        </div>
      </Link>
      <ListItemOptions confId={conference?.id} handleDelete={handleDelete}/>
    </Box>
  );
}