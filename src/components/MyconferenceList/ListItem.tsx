'use client'
import {Box} from "@/components/common/Box/Box";
import APIImageComponent from "@/hooks/imageAPI";
import Link from "next/link";
import {useState, useRef, ReactNode, useEffect, useCallback} from "react";
import {BsThreeDotsVertical, BsFillTrash3Fill} from "react-icons/bs";
import {deleteConference, getAllConferences} from "@/hooks/conference";
import {useQuery} from "react-query";
import {red} from "next/dist/lib/picocolors";
export default function ListItem({conference} : Content) {

    const [open, setOpen] = useState<boolean>(false);
    const optionsRef = useRef<HTMLDivElement>(null);

    function formatDate(dateToFormat: string) {
      const formattedDate = new Date(dateToFormat).toLocaleString();
      return formattedDate;
    }
    const handleClick = () => {

      setOpen(!open);
    }
    const handleClickOutside = (e: any) => {
      if(open && !optionsRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    const handleDelete = useCallback(() => {
      deleteConference(conference.id);
    }, [])                                  // currently doesn't work

    window.addEventListener('click', handleClickOutside);

    return (
    <Box className="flex w-full text-black">
      <Link href={"/"} className="w-full">
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
      <div className="relative" ref={optionsRef}>
        <div className="flex justify-center items-center w-9 h-9 hover:bg-neutral-300 rounded-full" onClick={handleClick}>
          <BsThreeDotsVertical fontSize="1.5rem"/>
        </div>
        <div className={`${open ? 'absolute' : 'hidden'} top-[20px] right-1/2 min-w-60`} ref={optionsRef}>
          <Box>
            <div onClick={handleDelete} className="flex items-center cursor-pointer">
              <BsFillTrash3Fill color='red'/>
              <p>&nbsp;Delete conference</p>
            </div>
          </Box>
        </div>
      </div>
    </Box>
  );
}