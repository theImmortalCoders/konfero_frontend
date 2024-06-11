"use client";
import Page from "@/components/common/Page/Page";
import { Box } from "@/components/common/Box/Box";
import { useQuery } from "react-query";
import {
  Content,
  getConferenceDetailsWithRoleFiltering,
  signOutFromConference,
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
import React, { useEffect, useState } from "react";
import SignUpWarning from "@/components/conference/SignUpWarning";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import CommentsList from "@/components/myconferenceId/Comments/CommentsList";
import DisplayTag from "@/components/tag/displaytag";
import { deleteConference } from "@/hooks/conference";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import DeleteWarning from "@/components/myconferenceId/DeleteWarning";
import { isUserInOrganizers } from "@/hooks/authorise/authorization";
import NotFound from "@/app/not-found";

export default function MyConferencePage({
  params,
}: {
  params: { conferenceId: string };
}) {
  const { isAuthorise, userData } = useAuth(["USER", "ORGANIZER", "ADMIN"], true);

  const {
    data: conferenceIdData,
    isLoading,
    isError,
    refetch,
  } = useQuery(`conferenceId${parseInt(params.conferenceId)}`, () =>
    getConferenceDetailsWithRoleFiltering(parseInt(params.conferenceId)),
  );

  const router = useRouter();
  const handleDelete = useCallback((id: number) => {
    deleteConference(id);
    router.push("/conference");
  }, []);

  if (isError) return <Error500 />;

  const [signUpWarning, setSignUpWarning] = useState<boolean>(false);
  const [deleteWarning, setDeleteWarning] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  const signOut = async (id: number) => {
    try {
      const result = await signOutFromConference(id);
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

  useEffect(() => {
    refetch();
  }, [update]);

  const [isOrganizer, setIsOrganizer] = useState<boolean | undefined>(
    undefined,
  );

  useEffect(() => {
    const checkIfOrganizer = async () => {
      if (
        userData &&
        conferenceIdData &&
        typeof conferenceIdData !== "string"
      ) {
        const isOrganizerResult = await isUserInOrganizers(
          userData,
          conferenceIdData,
        );
        setIsOrganizer(isOrganizerResult);
      }
    };

    checkIfOrganizer();
  }, [userData, conferenceIdData]);
  return (
    <Page className="py-10">
      {
      !isLoading &&
      conferenceIdData &&
          isAuthorise != null &&
      typeof conferenceIdData !== "string" ? (
        <>
          {(isOrganizer || (userData && userData.role === "ADMIN")) &&
          !conferenceIdData.canceled ? (
            <Panel
              conferenceIdData={conferenceIdData}
              setDeleteWarning={setDeleteWarning}
            />
          ) : null}
          <Title conferenceIdData={conferenceIdData}>
            {!conferenceIdData.canceled && isAuthorise && (
              <span className="flex justify-center py-10 w-full">
                <span
                  onClick={() => {
                    if (conferenceIdData.amISignedUp) {
                      signOut(conferenceIdData.id);
                    } else if (
                      !conferenceIdData.participantsFull &&
                      !conferenceIdData.amISignedUp && !(Date.parse(conferenceIdData.endDateTime) < Date.now())
                    ) {
                      setSignUpWarning(true);
                    }
                  }}
                  className="flex items-center bg-gray-300 rounded-full cursor-pointer px-2 mt-4 space-x-2"
                >

                  <p className="text-black font-semibold">
                    {!conferenceIdData.participantsFull && !conferenceIdData.amISignedUp && !(Date.parse(conferenceIdData.endDateTime) < Date.now()) ? (
                        <p>Zapisz się</p>
                    ) : conferenceIdData.amISignedUp && !(Date.parse(conferenceIdData.endDateTime) < Date.now()) ? (
                        <p>Wypisz się</p>
                    ) : !conferenceIdData.amISignedUp ? (
                        <p className="opacity-50">Zapisz się</p>
                    ) : <p className="opacity-50">Wypisz się</p>}
                  </p>

                  {!conferenceIdData.participantsFull && !conferenceIdData.amISignedUp && !(Date.parse(conferenceIdData.endDateTime) < Date.now()) ? (
                      <CiCirclePlus className="text-4xl text-darkblue"/>
                  ) : conferenceIdData.amISignedUp && !(Date.parse(conferenceIdData.endDateTime) < Date.now()) ? (
                      <CiCircleMinus className="text-4xl text-darkblue"/>
                  ) : !conferenceIdData.amISignedUp ? (
                      <CiCirclePlus className="text-4xl text-darkblue opacity-50"/>
                  ) : <CiCircleMinus className="text-4xl text-darkblue opacity-50"/>}
                </span>
              </span>
            )}
          </Title>
          <Organizers organizer={conferenceIdData.organizer} />
          {conferenceIdData.tags !== null && (
            <Tags conference={conferenceIdData} />
          )}
          <Lectures
            lectures={conferenceIdData.lectures}
            conference={conferenceIdData}
            userData={userData}
          />
          {conferenceIdData.participants !== null ? (
            <Participants conferenceIdData={conferenceIdData} />
          ) : null}
          {conferenceIdData.photos.length !== 0 ? (
            <Photos photos={conferenceIdData.photos} />
          ) : null}
          <CommentsList
            conference={conferenceIdData}
            update={update}
            setUpdate={setUpdate}
            auth={isAuthorise}
          />
          {signUpWarning && (
            <SignUpWarning
              setSignUpWarning={setSignUpWarning}
              tempId={conferenceIdData.id}
              update={update}
              setUpdate={setUpdate}
            />
          )}
          {deleteWarning && (
            <DeleteWarning
              tempId={conferenceIdData.id}
              setWarning={setDeleteWarning}
              handleFunction={handleDelete}
              mode={"conference"}
            />
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

function Tags({ conference }: { conference: Content }) {
  return (
    <Box className="text-darkblue w-[90%] lg:w-[60%] mt-5 mb-5">
      <TitleHeader title={"Tagi"} />
      <div className="w-full h-full flex justify-center items-center pt-4">
        <DisplayTag conference={conference} isSmall={false} />
      </div>
    </Box>
  );
}
