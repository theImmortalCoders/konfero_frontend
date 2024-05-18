"use client";
import Page from "@/components/common/Page/Page";
import { Box } from "@/components/common/Box/Box";
import { useQuery } from "react-query";
import {
  deleteConference,
  getConferenceDetailsWithRoleFiltering,
  GetConferenceDetailsWithRoleFilteringData,
  signOutFromConference
} from "@/hooks/conference";
import Error500 from "@/components/common/Error/Error500";
import People from "@/components/myconferenceId/Participants/People";
import TitleHeader from "@/components/common/Box/TitleHeader";
import LoadingMessage from "@/components/common/Loading/LoadingMessage";
import { Organizer } from "@/hooks/user";
import Participants from "@/components/myconferenceId/Participants/Participants";
import Photos from "@/components/myconferenceId/Photos/Photos";
import Lectures from "@/components/myconferenceId/Lectures/Lectures";
import Title from "@/components/myconferenceId/Title/Title";
import Panel from "@/components/myconferenceId/OrganizerAndAdminPanel/Panel";
import useAuth from "@/hooks/useAuth";
import NotFound from "../../addlecture/[conferenceId]/not-found";
import { useEffect, useState } from "react";
import SignUpWarning from "@/components/conference/SignUpWarning";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import CommentsList from "@/components/myconferenceId/Comments/CommentsList";

export default function MyConferencePage({
  params,
}: {
  params: { conferenceId: string };
}) {
  const { isAuthorise, userRole } = useAuth(["USER", "ORGANIZER", "ADMIN"]);

  const {
    data: conferenceIdData,
    isLoading,
    isError,
    refetch
  } = useQuery(`conferenceId${parseInt(params.conferenceId)}`, () =>
    getConferenceDetailsWithRoleFiltering(parseInt(params.conferenceId))
  );

  if (isError) return <Error500 />;
  if (isAuthorise === false) return <NotFound />;

  const [signUpWarning, setSignUpWarning] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  const signOut = async (id : number) => {
    try {
      const result = await signOutFromConference(id);
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

  useEffect(() => {
    refetch();
  }, [update]);

  return (
    <Page className="py-10">
      {isAuthorise === true &&
      userRole &&
      !isLoading &&
      conferenceIdData &&
      typeof conferenceIdData !== "string" ? (
        <>
          {userRole === "ORGANIZER" || userRole === "ADMIN" ? (
            <Panel conferenceIdData={conferenceIdData} />
          ) : null}
          <Title conferenceIdData={conferenceIdData}>
            <span className="flex justify-center w-full">
              <span onClick={() => {
                  if(conferenceIdData.amISignedUp) {
                    signOut(conferenceIdData.id);
                  }
                  else if (!conferenceIdData.participantsFull && !conferenceIdData.amISignedUp) {
                    setSignUpWarning(true);
                  }
                }}
              className="flex items-center bg-gray-300 rounded-full cursor-pointer px-2 mt-4 space-x-2">
                <p className="text-black font-semibold">
                  {conferenceIdData.participantsFull && !conferenceIdData.amISignedUp ? "Brak miejsc" : conferenceIdData.amISignedUp ? "Wypisz się" : "Zapisz się"}
                </p>  
                {conferenceIdData.participantsFull && !conferenceIdData.amISignedUp ? 
                  <CiCirclePlus className="text-4xl text-darkblue opacity-50"/> : conferenceIdData.amISignedUp ? 
                    <CiCircleMinus className="text-4xl text-darkblue" /> : <CiCirclePlus className="text-4xl text-darkblue" />}
              </span>
            </span>
          </Title>
          <Organizers organizer={conferenceIdData.organizer} />
          <Lectures
            lectures={conferenceIdData.lectures}
            conference={conferenceIdData}
            userRole={userRole}
          />
          {conferenceIdData.participants !== null ? (
            <Participants conferenceIdData={conferenceIdData} />
          ) : null}
          {conferenceIdData.photos.length !== 0 ? (
            <Photos photos={conferenceIdData.photos} />
          ) : null}
          <CommentsList conferenceId={conferenceIdData.id} update={update} setUpdate={setUpdate}/>
          {signUpWarning && (
            <SignUpWarning setSignUpWarning={setSignUpWarning} tempId={conferenceIdData.id} update={update} setUpdate={setUpdate}/>
          )}
        </>
      ) : (
        <LoadingMessage />
      )}
    </Page>
  );
}

function Organizers({ organizer }: { organizer: Organizer }) {
  return (
    <Box className="text-darkblue w-[90%] lg:w-[60%] mt-5 mb-5">
      <TitleHeader title={"Organizator"} />
      <div className="w-full h-full flex justify-center items-center pt-4">
        <People
          username={organizer.username}
          photo={organizer.photo}
          email={organizer.email}
        />
      </div>
    </Box>
  );
}
