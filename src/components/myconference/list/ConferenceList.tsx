"use client";
import { Content } from "@/hooks/conference";
import ListItemImage from "../../common/List/ListItemImage";
import { formatDate } from "@/utils/date";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import { signOutFromConference } from "@/hooks/conference";
import Verified from "@/components/status/verified";
import Cancel from "@/components/status/cancel";
import End from "@/components/status/end";
import DisplayTag from "@/components/tag/displaytag";
import { UserData } from "@/hooks/user";

export default function ConferenceList({
  conference,
  userData,
  setSignUpWarning,
  setTempId,
  update,
  setUpdate,
  mode,
}: {
  conference: Content;
  userData: UserData | null;
  setSignUpWarning?: Dispatch<SetStateAction<boolean>>;
  setTempId?: Dispatch<SetStateAction<number>>;
  update?: boolean;
  setUpdate?: Dispatch<SetStateAction<boolean>>;
  mode?: string;
}) {
  const router = useRouter();
  const handleCirclePlusClick = () => {
    if (userData === null) {
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
    if (userData === null) {
      router.push("/login");
    } else {
      signOut();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start w-full text-black bg-close2White hover:bg-gray-200 duration-200 shadow-whiteShadow h-full z-0 rounded-3xl relative pb-4 sm:py-0">
      <ListItemImage
        href={`/conference/${conference.id}`}
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
              {conference.finished && <End />}
            </div>
            <div className="font-semibold xs:font-bold text-xs 2xs:text-base line-clamp-1">
              {conference.format === "STATIONARY" && (
                <p>{conference?.location?.name}</p>
              )}
              {conference.format === "ONLINE" && <p>Online</p>}
            </div>
          </div>
          <DisplayTag conference={conference} isSmall={true} />
        </div>
      </ListItemImage>
      {mode === "conference" && !conference.canceled && userData != null && (
        <div className="flex flex-col items-center space-y-2 sm:space-y-0">
          <div
            className="w-auto h-min flex justify-center items-center sm:h-min gap-x-2 sm:mr-4 sm:mt-4 2xs:px-2 sm:px-0 2xs:bg-gray-300 sm:bg-transparent rounded-full cursor-pointer"
            onClick={() => {
              if (conference.amISignedUp) {
                handleCircleMinusClick();
              } else if (
                !conference.participantsFull &&
                !conference.amISignedUp
                  && !(Date.parse(conference.endDateTime) < Date.now())
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
            { !conference.participantsFull && !conference.amISignedUp && !(Date.parse(conference.endDateTime) < Date.now())? (
              <CiCirclePlus className="text-4xl text-darkblue" />
            ) : conference.amISignedUp && !(Date.parse(conference.endDateTime) < Date.now()) ? (
              <CiCircleMinus className="text-4xl text-darkblue" />
            ) : !conference.amISignedUp ? (
                <CiCirclePlus className="text-4xl text-darkblue opacity-50"/>
            ) : <CiCircleMinus className="text-4xl text-darkblue opacity-50"/>}
          </div>
          <p className="font-semibold text-base xs:text-xs sm:mr-4">
            {conference.participantsAmount}/{conference.participantsLimit}
          </p>
        </div>
      )}
    </div>
  );
}
