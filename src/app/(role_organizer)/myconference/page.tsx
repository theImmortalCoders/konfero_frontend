"use client";
import Page from "@/components/common/Page/Page";
import {
  GetAllConferencesData,
  getConferencesIAmSignedFor,
  getNotCanceledConferences,
  Content,
} from "@/hooks/conference";
import { useQuery } from "react-query";
import ConferenceList from "@/components/myconference/list/ConferenceList";
import Error500 from "@/components/common/Error/Error500";
import ConferenceSearch from "@/components/myconference/ConferenceSearch";
import LoadingMessage from "@/components/common/Loading/LoadingMessage";
import useAuth from "@/hooks/useAuth";
import NotFound from "@/app/not-found";
import { Dispatch, SetStateAction, useState } from "react";

const ConferenceSwitch = ({
  mySwitch,
  setMySwitch,
}: {
  mySwitch: boolean;
  setMySwitch: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex h-10 w-full xs:w-96 items-center mt-10 border-2 border-darkblue rounded-full relative bg-close2White transition-all z-0">
      <div
        className={`${mySwitch ? "translate-x-[-4px]" : "translate-x-full"} bg-darkblue w-[50.5%] h-full duration-300 ease-out rounded-full absolute z-10`}
      ></div>
      <div
        className={`${mySwitch ? "text-close2White" : "text-darkblue"} z-20 w-[50%] transition-colors font-semibold text-center text-xs xs:text-base cursor-pointer`}
        onClick={() => {
          setMySwitch(true);
        }}
      >
        Uczestniczę
      </div>
      <div
        className={`${mySwitch ? "text-darkblue" : "text-close2White"} z-20 w-[50%] transition-colors font-semibold text-center text-xs xs:text-base cursor-pointer`}
        onClick={() => {
          setMySwitch(false);
        }}
      >
        Utworzone
      </div>
    </div>
  );
};

export default function MyConferenceListPage() {
  const { isAuthorise, userData } = useAuth(["USER", "ORGANIZER", "ADMIN"]);
  const [mySwitch, setMySwitch] = useState<boolean>(true);

  const {
    data: conferencesData,
    isLoading: isConferencesLoading,
    isError: isConferencesError,
  } = useQuery(
    "NotCanceledConferences",
    () => getNotCanceledConferences(userData?.id || -1),
    {
      staleTime: Infinity,
      refetchOnMount: "always",
      enabled: !!userData,
    },
  );

  const {
    data: signedConferencesData,
    isLoading: isSignedConferencesLoading,
    isError: isSignedConferencesError,
  } = useQuery("conferences user attends", () => getConferencesIAmSignedFor(), {
    refetchOnMount: true,
    staleTime: 1000,
    enabled: !!userData,
  });

  if (userData === null) return <NotFound />;
  if (isSignedConferencesError || isConferencesError) return <Error500 />;
  if (isAuthorise === false) return <NotFound />;

  return (
    <Page className="pb-10">
      {!isSignedConferencesLoading &&
      !isConferencesLoading &&
      isAuthorise &&
      userData ? (
        <div className="w-[90%] lg:w-[60%] h-full justify-start mb-8">
          {(userData.role === "ORGANIZER" || userData.role === "ADMIN") && (
            <ConferenceSwitch mySwitch={mySwitch} setMySwitch={setMySwitch} />
          )}
          <ConferenceSearch
            numberOfConferences={
              mySwitch
                ? (signedConferencesData as Content[])?.length
                : (conferencesData as GetAllConferencesData)?.numberOfElements
            }
            disablerole={false}
            userData={userData}
          />
          <div className="w-full flex flex-col gap-y-10">
            {(mySwitch
              ? (signedConferencesData as Content[])
              : (conferencesData as GetAllConferencesData)?.content
            )
              ?.toSorted(
                (a, b) => Number(a.canceled ? 1 : 0) - Number(b.canceled),
              )
              .map((conference) => {
                return (
                  <ConferenceList
                    key={`${conference.id}`}
                    conference={conference}
                    userData={userData}
                  />
                );
              })}
          </div>
        </div>
      ) : (
        <LoadingMessage />
      )}
    </Page>
  );
}
