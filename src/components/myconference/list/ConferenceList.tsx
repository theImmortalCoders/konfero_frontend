"use client";
import { Content } from "@/hooks/conference";
import ListItemImage from "../../common/List/ListItemImage";
import { formatDate } from "@/utils/date";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useRouter } from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { Dispatch, SetStateAction } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FcCancel } from "react-icons/fc";
import { signOutFromConference } from "@/hooks/conference";
import cancel from "@/components/status/cancel";
import Verified from "@/components/status/verified";
import Cancel from "@/components/status/cancel";

function NewComponent() {
  return (
    <div className="flex items-center justify-center gap-x-1">
      <RiVerifiedBadgeFill />
      <p>Zweryfikowana</p>
    </div>
  );
}

export default function ConferenceList({
  conference,
  role,
  setSignUpWarning,
  setTempId,
  update,
  setUpdate,
  mode,
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
    } else if (setSignUpWarning && setTempId) {
      setSignUpWarning(true);
      setTempId(conference.id);
    }
  };

  const signOut = async () => {
    try {
      const result = await signOutFromConference(conference.id);
      if (result === 200) {
        console.log("Wypisano z konferencji.");
        if (setUpdate) setUpdate(!update);
      } else {
        console.error("Błąd wypisywania z konferencji.");
      }
    } catch (error) {
      console.error("Błąd wypisywania z konferencji.", error);
    }
  };

  const handleCircleMinusClick = () => {
    if (role === null) {
      router.push("/login");
    } else {
      signOut();
    }
  };

  const baseScale = useMediaQuery("(min-width:1024px)");
  const rwd = new Array(15).fill(null).map((a, index) => {
    return Number(
      useMediaQuery(`(min-width:${(baseScale ? 3050 : 2700) - 150 * index}px)`),
    );
  });
  const sumRwd = rwd.reduce((a, b) => {
    return a + b;
  }, 0);

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start w-full text-black bg-close2White hover:bg-gray-200 duration-200 shadow-whiteShadow h-full z-0 rounded-3xl relative pb-4 sm:py-0">
      <ListItemImage
        href={`/myconference/${conference.id}`}
        logo={conference.logo}
        className="rounded-l-3xl"
      >
        <div className="flex flex-col w-4/5 h-full">
          <div className="flex flex-col sm:pl-4 gap-y-0 py-2 w-full h-full items-center sm:items-start text-center break-all 2sm:break-normal">
            <div className="flex flex-col sm:flex-row sm:h-3 gap-x-4 text-xs text-cyan-700 font-bold">
              {conference.verified && <Verified showtext={true} />}
              {conference.canceled && <Cancel showtext={true} />}
            </div>
            <p className="font-black text-sm 2xs:text-xl line-clamp-1">
              {conference?.name}
            </p>
            <div className="flex flex-col gap-x-1 items-center sm:flex-row text-xs 2xs:text-base">
              <p>
                {formatDate(conference?.startDateTime)}
                &nbsp;- {formatDate(conference?.endDateTime)}
              </p>
              {conference.finished && (
                <p className="w-min font-semibold text-nowrap text-rose-800 text-sm">
                  Zakończona
                </p>
              )}
            </div>
            <p className="font-semibold xs:font-bold text-xs 2xs:text-base line-clamp-1">
              {conference?.location?.name}
            </p>
          </div>
          {conference.tags !== null ? (
            <>
              <div className="flex flex-wrap sm:flex-row justify-center w-full sm:pl-4 items-center sm:justify-start mt-1 mb-2 gap-1">
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
        <div className="flex flex-col items-center space-y-2 sm:space-y-0">
          <div
            className="w-auto h-min flex justify-center items-center sm:h-min gap-x-2 sm:mr-4 sm:mt-4 2xs:px-2 sm:px-0 2xs:bg-gray-300 sm:bg-transparent rounded-full cursor-pointer"
            onClick={() => {
              if (conference.amISignedUp) {
                handleCircleMinusClick();
              } else if (
                !conference.participantsFull &&
                !conference.amISignedUp
              ) {
                handleCirclePlusClick();
              }
            }}
          >
            <p className="font-semibold text-xs 2xs:text-base hidden 2xs:block sm:hidden ">
              {conference.participantsFull && !conference.amISignedUp
                ? "Brak miejsc"
                : conference.amISignedUp
                  ? "Wypisz się"
                  : "Zapisz się"}
            </p>
            {conference.participantsFull && !conference.amISignedUp ? (
              <CiCirclePlus className="text-4xl text-darkblue opacity-50" />
            ) : conference.amISignedUp ? (
              <CiCircleMinus className="text-4xl text-darkblue" />
            ) : (
              <CiCirclePlus className="text-4xl text-darkblue" />
            )}
          </div>
          <p className="font-semibold text-base xs:text-xs sm:mr-4">
            {conference.participantsAmount}/{conference.participantsLimit}
          </p>
        </div>
      )}
    </div>
  );
}
