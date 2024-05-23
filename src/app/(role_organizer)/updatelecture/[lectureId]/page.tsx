"use client";
import React, { useEffect, useState } from "react";
import EditLectureInputs from "@/components/lecture/EditLectureInputs";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import { getCurrentUser } from "@/hooks/user";
import { getLectureDetails, GetLectureDetailsData } from "@/hooks/lecture";
import Error500 from "@/components/common/Error/Error500";
import { Box } from "@/components/common/Box/Box";
import Page from "@/components/common/Page/Page";
import { getConferenceDetailsWithRoleFiltering } from "@/hooks/conference";
import NotFound from "../../addlecture/[conferenceId]/not-found";
import {
  isUserAnAdmin,
  isUserInLecturers,
  isUserInOrganizers,
} from "@/hooks/authorise/authorization";

export default function EditLecture() {
  const { lectureId } = useParams<{ lectureId: string }>();
  const [userHasPermission, setUserHasPermission] = useState<boolean | null>(
    null,
  );

  const {
    data: currentUserData,
    isLoading: userLoading,
    isError: userError,
  } = useQuery("currentUser", getCurrentUser, {
    staleTime: Infinity,
  });

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
  } = useQuery(`lectureId_${lectureId}`, () =>
    getLectureDetails(parseInt(lectureId as string)),
  );

  const {
    data: conferenceData,
    isLoading: conferenceLoading,
    isError: conferenceError,
  } = useQuery(
    "conference",
    async () => {
      if (!lectureLoading && lectureData) {
        return await getConferenceDetailsWithRoleFiltering(
          (lectureData as GetLectureDetailsData).conferenceId,
        );
      }
    },
    { enabled: !lectureLoading },
  );

  useEffect(() => {
    const checkPermissions = async () => {
      if (
        currentUserData &&
        lectureData &&
        typeof lectureData !== "string" &&
        conferenceData &&
        typeof conferenceData !== "string"
      ) {
        const [inLecturers, inOrganizers, isAdmin] = await Promise.all([
          isUserInLecturers(currentUserData, lectureData),
          isUserInOrganizers(currentUserData, conferenceData),
          isUserAnAdmin(currentUserData),
        ]);

        setUserHasPermission(inLecturers || inOrganizers || isAdmin);
      } else {
        setUserHasPermission(false);
      }
    };

    if (!userLoading && !lectureLoading && !conferenceLoading) {
      checkPermissions();
    }
  }, [
    userLoading,
    lectureLoading,
    conferenceLoading,
    currentUserData,
    lectureData,
    conferenceData,
  ]);

  if (lectureError || userError || conferenceError) return <Error500 />;

  if (
    userLoading ||
    lectureLoading ||
    conferenceLoading ||
    userHasPermission === null
  ) {
    return (
      <Page className="justify-start py-20">
        <p className="w-full mt-20 text-xl h-max flex justify-center items-center text-close2White">
          Trwa ładowanie danych...
        </p>
      </Page>
    );
  }

  return (
    <>
      {userHasPermission &&
      lectureData &&
      typeof lectureData !== "string" &&
      conferenceData &&
      typeof conferenceData !== "string" &&
      currentUserData ? (
        <Page className="justify-start py-20">
          <h1 className="w-full flex justify-center pb-8 text-lg sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl">
            Edycja wykładu
          </h1>
          <Box className="w-11/12 sm:w-5/6 lg:w-3/5">
            <EditLectureInputs
              lectureData={lectureData}
              conferenceData={conferenceData}
              currentUserData={currentUserData}
            />
          </Box>
        </Page>
      ) : (
        <NotFound />
      )}
    </>
  );
}
