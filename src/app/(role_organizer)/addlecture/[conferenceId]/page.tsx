"use client";
import Page from "@/components/common/Page/Page";
import NotFoundConferenceForAddLecture from "./not-found";
import { useQuery } from "react-query";
import { getConferenceDetailsWithRoleFiltering } from "@/hooks/conference";

export default function addlecture({ params }: { params: { conferenceId: number } }) {

  const getConferenceInfo = async () => {
    return await getConferenceDetailsWithRoleFiltering(params.conferenceId);
  };

  const {
    data: conferenceData,
    isLoading: conferenceLoading,
    isError: conferenceError,
  } = useQuery("conference", getConferenceInfo);

  if (conferenceError) {
    return <NotFoundConferenceForAddLecture />;
  }

  return (
    <Page>
      {!conferenceLoading && conferenceData && typeof conferenceData !== "string" ? (
        <>
          addlecture {params.conferenceId}
        </>
      ) : (
        <p className="w-full mt-20 text-xl h-max flex justify-center items-center text-close2White">
          Trwa ładowanie danych...
        </p>
      )}
    </Page>
  );
}
