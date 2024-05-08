"use client";
import { Content } from "@/hooks/conference";
import ListItemImage from "../../common/List/ListItemImage";
import { formatDate } from "@/utils/date";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useRouter } from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, Dispatch, SetStateAction } from "react";
import { base } from "next/dist/build/webpack/config/blocks/base";
import { signOutFromConference } from "@/hooks/conference";

export default function ConferenceList({
  conference,
  role,
  setSignUpWarning,
  setTempId,
  update,
  setUpdate,
  mode
}: {
  conference: Content;
  role: string | null;
  setSignUpWarning?: Dispatch<SetStateAction<boolean>>;
  setTempId?: Dispatch<SetStateAction<number>>;
  update?: boolean;
  setUpdate?: Dispatch<SetStateAction<boolean>>;
  mode?: string;
}) {
  const router = useRouter();
  const handleCirclePlusClick = () => {
    if (role === null) {
      router.push("/login");
    }
    else if (setSignUpWarning && setTempId) {
      setSignUpWarning(true);
      setTempId(conference.id);
    }
  };

  const signOut = async () => {
    try {
      const result = await signOutFromConference(conference.id);
      if (result === 200) {
        console.log("Wypisano z konferencji.");
        if (setUpdate)
          setUpdate(!update);
      } else {
        console.error("Błąd wypisywania z konferencji.");
      }
    } catch (error) {
      console.error("Błąd wypisywania z konferencji.", error);
    }
  }

  const handleCircleMinusClick = () => {
    if (role === null) {
      router.push("/login");
    }
    else {
      signOut();
    }
  };

  const baseScale = useMediaQuery("(min-width:1024px)");
  const rwd = new Array(15).fill(null).map((a, index) => {
    return Number(
      useMediaQuery(`(min-width:${(baseScale ? 3050 : 2700) - 150 * index}px)`)
    );
  });
  const sumRwd = rwd.reduce((a, b) => {
    return a + b;
  }, 0);

  return (
    <div className="flex flex-col xs:flex-row items-center xs:items-start w-full text-black bg-close2White hover:bg-gray-200 duration-200 shadow-whiteShadow h-full z-0 rounded-3xl relative pb-4 xs:py-0">
      <ListItemImage
        href={`/myconference/${conference.id}`}
        logo={conference.logo}
        className="rounded-l-3xl"
      >
        <div className="flex flex-col w-4/5">
          <div className="flex flex-col xs:pl-4 gap-y-0 xs:gap-y-1 py-2 w-full items-center xs:items-start text-center break-all 2xs:break-normal">
            <p className="font-black text-sm 2xs:text-xl">{conference?.name}</p>
            <p className="text-xs 2xs:text-base">
              {formatDate(conference?.startDateTime)}
              &nbsp;- {formatDate(conference?.endDateTime)}
            </p>
            <p className="font-semibold xs:font-bold text-xs 2xs:text-base">
              {conference?.location?.name}
            </p>
          </div>
          {conference.tags !== null ? (
            <>
              <div className="flex flex-wrap xs:flex-row justify-center w-full xs:pl-4 items-center xs:justify-start mt-1 mb-2 gap-1">
                {conference.tags?.slice(0, 2 + sumRwd).map((tag) => (
                  <p
                    key={tag.id}
                    className="w-20 h-fit text-xxs overflow-hidden overflow-ellipsis whitespace-nowrap text-center bg-gray-200 border-[1px] border-blue rounded-lg px-1"
                  >
                    {tag.tagName}
                  </p>
                ))}
                {conference.tags?.length > 2 + sumRwd && (
                  <div className="flex flex-row h-fit text-xxs overflow-hidden overflow-ellipsis whitespace-nowrap justify-center bg-gray-200 border-[1px] border-blue rounded-lg px-2">
                    <p className="sm:hidden">+</p>
                    {conference.tags.length - (2 + sumRwd)}
                    <p className="hidden sm:block">&nbsp;więcej...</p>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>
      </ListItemImage>
      {mode === "conference" && (
        <div className="flex flex-col items-center space-y-2 xs:space-y-0">
          <div
            className="w-auto h-min flex justify-center items-center xs:h-min gap-x-2 xs:mr-4 xs:mt-4 2xs:px-2 xs:px-0 2xs:bg-gray-300 xs:bg-transparent rounded-full cursor-pointer"
            onClick={() => {
              if(conference.amISignedUp) {
                handleCircleMinusClick();
              }
              else if (!conference.participantsFull && !conference.amISignedUp) {
                handleCirclePlusClick();
              }
            }}
          >
            <p className="font-semibold text-xs 2xs:text-base hidden 2xs:block xs:hidden ">
              {conference.participantsFull && !conference.amISignedUp ? "Brak miejsc" : conference.amISignedUp ? "Wypisz się" : "Zapisz się"}
            </p>
            {conference.participantsFull && !conference.amISignedUp ? 
              <CiCirclePlus className="text-4xl text-darkblue opacity-50"/> : conference.amISignedUp ? 
                <CiCircleMinus className="text-4xl text-darkblue" /> : <CiCirclePlus className="text-4xl text-darkblue" />}
            </div>
            <p className="font-semibold text-base xs:text-xs xs:mr-4">
              {conference.participantsAmount}/{conference.participantsLimit}
            </p>
          </div>
        )}
    </div>
  );
}
