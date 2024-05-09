"use client";
import Page from "@/components/common/Page/Page";
import {
  GetAllConferencesData, getConferencesIAmSignedFor,
  getNotCanceledConferences, Content
} from "@/hooks/conference";
import { useQuery } from "react-query";
import ConferenceList from "@/components/myconference/list/ConferenceList";
import Error500 from "@/components/common/Error/Error500";
import ConferenceSearch from "@/components/myconference/ConferenceSearch";
import LoadingMessage from "@/components/common/Loading/LoadingMessage";
import useAuth from "@/hooks/useAuth";
import NotFound from "@/app/not-found";
import {getCurrentUser} from "@/hooks/user";
import {Dispatch, SetStateAction, useState} from "react";

const ConferenceSwitch = (
  {
    mySwitch,
    setMySwitch
  }:{
    mySwitch: boolean
    setMySwitch: Dispatch<SetStateAction<boolean>>
  } ) => {

  return (
    <div
      className="flex h-10 w-full xs:w-96 items-center mt-10 border-2 border-darkblue rounded-full relative bg-close2White transition-all"
    >
      <div className={`${mySwitch?"translate-x-[-4px]":"translate-x-full"} bg-darkblue w-[50.5%] h-full duration-300 ease-out rounded-full absolute z-10`}></div>
      <div
        className={ `${mySwitch?"text-close2White":"text-darkblue"} z-20 w-[50%] transition-colors font-semibold text-center text-xs xs:text-base cursor-pointer`}
        onClick={() => {
          setMySwitch(true)
        }}
      >
        Uczestniczę
      </div>
      <div
        className={ `${mySwitch?"text-darkblue":"text-close2White"} z-20 w-[50%] transition-colors font-semibold text-center text-xs xs:text-base cursor-pointer`}
        onClick={() => {
          setMySwitch(false)
        }}
      >
        Utworzone
      </div>
    </div>
  );
}

export default function MyConferenceListPage() {
  const { isAuthorise, userRole } = useAuth(["USER", "ORGANIZER", "ADMIN"]);
  const [ mySwitch, setMySwitch ] = useState<boolean>(true);

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery("user info", getCurrentUser)

  const {
    data: conferencesData,
    isLoading: isConferencesLoading,
    isError: isConferencesError,
  } = useQuery(
    "NotCanceledConferences",
    () => getNotCanceledConferences(userData?.id),
    {
      staleTime: Infinity,
      refetchOnMount: "always",
      enabled: !isUserLoading && (userRole !== 'USER')
    }
  );

  const {
    data: signedConferencesData,
    isLoading: isSignedConferencesLoading,
    isError: isSignedConferencesError,
  } = useQuery("conferences user attends", () => getConferencesIAmSignedFor())

  if (isSignedConferencesError || isConferencesError || isUserError) return <Error500 />;
  if (isAuthorise === false) return <NotFound />;

  return (
    <Page className="pb-10">
      {!isSignedConferencesLoading&& !isConferencesLoading && isAuthorise === true && userRole ? (
        <div className="w-[90%] lg:w-[60%] h-full justify-start mb-8">
          {
            (userRole === 'ORGANIZER' || userRole === "ADMIN") &&
            <ConferenceSwitch mySwitch={mySwitch} setMySwitch={setMySwitch}/>
          }
          <ConferenceSearch
            numberOfConferences={
              mySwitch?
              (signedConferencesData as Content[])?.length
                :
              (conferencesData as GetAllConferencesData)?.numberOfElements
            }
            disablerole={false}
            role={userRole}
          />
          <div className="w-full flex flex-col gap-y-10">
            {
              (mySwitch?
                (signedConferencesData as Content[])
                  :
                (conferencesData as GetAllConferencesData)?.content
              )?.map((conference) => {
              return (
                <ConferenceList
                  key={`${conference.id}`}
                  conference={conference}
                  role={"ORGANIZER"}
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
