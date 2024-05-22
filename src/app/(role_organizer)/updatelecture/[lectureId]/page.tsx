"use client";
import EditLectureInputs from "@/components/lecture/EditLectureInputs";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import { getCurrentUser, isUserInLecturers, UserData } from "@/hooks/user";
import { getLectureDetails, GetLectureDetailsData } from "@/hooks/lecture";
import Error500 from "@/components/common/Error/Error500";
import { Box } from "@/components/common/Box/Box";
import Page from "@/components/common/Page/Page";
import { getConferenceDetailsWithRoleFiltering } from "@/hooks/conference";
import NotFound from "../../addlecture/[conferenceId]/not-found";
import { useEffect, useState } from "react";

async function getId() {
  const userData = await getCurrentUser();
  if (userData && typeof userData === "object" && "id" in userData) {
    return userData;
  }
  return null;
}

const EditLecture = () => {
  const [user, setUser] = useState<UserData | null | undefined>(undefined);
  useEffect(() => {
    const fetchId = async () => {
      const data = await getId();
      setUser(data);
    };
    fetchId();
  }, []);
  const { lectureId } = useParams<{ lectureId: string }>();

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

  const getConferenceInfo = async () => {
    return await getConferenceDetailsWithRoleFiltering(
      (lectureData as GetLectureDetailsData).conferenceId,
    );
  };

  const {
    data: conferenceData,
    isLoading: conferenceLoading,
    isError: conferenceError,
  } = useQuery("conference", getConferenceInfo, { enabled: !lectureLoading });

  if (lectureError || userError || conferenceError) return <Error500 />;

  if (
    user &&
    (user.role === null ||
      (user.role !== "ADMIN" &&
        user.role !== "ORGANIZER" &&
        !isUserInLecturers(lectureData, user)))
  )
    return <NotFound />;

  return (
    <Page className="justify-start py-20">
      {!userLoading &&
      !lectureLoading &&
      !conferenceLoading &&
      lectureData &&
      conferenceData &&
      currentUserData &&
      typeof lectureData !== "string" &&
      typeof conferenceData !== "string" ? (
        <>
          {(currentUserData.role === "ORGANIZER" ||
            currentUserData.role === "ADMIN" ||
            lectureData.lecturers.map(
              (lecturer) => lecturer.id === currentUserData.id,
            )) && (
            <>
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
            </>
          )}
        </>
      ) : (
        <p className="w-full mt-20 text-xl h-max flex justify-center items-center text-close2White">
          Trwa ładowanie danych...
        </p>
      )}
    </Page>
  );
};

export default EditLecture;
