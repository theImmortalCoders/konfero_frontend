"use client";
import Page from "@/components/common/Page/Page";
import NotFoundConferenceForAddLecture from "./not-found";
import { useQuery } from "react-query";
import { getConferenceDetailsWithRoleFiltering } from "@/hooks/conference";
import { Box } from "@/components/common/Box/Box";
import AddLectureInputs from "@/components/lecture/AddLectureInputs";

export default function AddLecture({ params }: { params: { conferenceId: number } }) {

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
    <Page className="justify-start pt-20">
      {!conferenceLoading && conferenceData && typeof conferenceData !== "string" ? (
        <>
          <h1 className="w-full flex justify-center pb-8 text-lg sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl">
            Dodawanie wykładu do konferencji
          </h1>
          <Box>
            <AddLectureInputs />
          </Box>
        </>
      ) : (
        <p className="w-full mt-20 text-xl h-max flex justify-center items-center text-close2White">
          Trwa ładowanie danych...
        </p>
      )}
    </Page>
  );
}