"use client";
import Page from "@/components/common/Page/Page";
import { BoxWithImage } from "@/components/common/Box/Box";
import Error500 from "@/components/common/Error/Error500";
import People from "@/components/myconferenceId/Participants/People";
import { getConferenceDetailsWithRoleFiltering } from "@/hooks/conference";
import {
  getLectureDetails,
  GetLectureDetailsData,
  addLectureToFavourites,
  removeLectureFromFavourites,
} from "@/hooks/lecture";
import MyLecturePageImageBox from "@/components/lecture/MyLecturePageImageBox";
import TitleHeader from "@/components/common/Box/TitleHeader";
import MaterialTableWrapper from "@/components/common/Material/MaterialTableWrapper";
import LoadingMessage from "@/components/common/Loading/LoadingMessage";
import AddLectureMaterials from "@/components/lecture/AddLectureMaterials";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import NotFound from "../../(role_organizer)/addlecture/[conferenceId]/not-found";
import { FaStar, FaRegStar } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";
import { useRouter } from "next/navigation";
import {
  isUserInLecturers,
  isUserInOrganizers,
} from "@/hooks/authorise/authorization";

const RedirectToConference = ({ conferenceId }: { conferenceId: number }) => {
  const router = useRouter();

  return (
    <div
      className="relative self-start bg-white rounded-2xl flex items-center justify-center font-semibold text-black text-center text-nowrap w-36 xs:w-44 md:w-60 h-10 md:h-12 p-1 hover:py-2 hover:top-0 mt-20 top-2 cursor-pointer duration-100"
      onClick={() => router.push(`/conference/${conferenceId}`)}
    >
      <div className="flex justify-center items-center gap-x-2">
        <IoArrowBackCircle className="size-5 md:size-7 hidden xs:block" />
        <p className="text-xs md:text-base">Przejdź do konferencji</p>
      </div>
    </div>
  );
};

export default function LecturePage({
  params,
}: {
  params: { lectureId: string };
}) {
  const [lectureIdData, setLectureIdData] = useState<
    string | GetLectureDetailsData
  >();
  const [participant, setParticipant] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [refetchState, setRefetchState] = useState<number>(0);
  const { isAuthorise, userData } = useAuth(["USER", "ORGANIZER", "ADMIN"], true);
  const [update, setUpdate] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [isUserLecturer, setIsUserLecturer] = useState<boolean | undefined>(
    undefined,
  );
  const [isUserOrganizer, setIsUserOrganizer] = useState<boolean | undefined>(
    undefined,
  );
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getLectureDetails(parseInt(params.lectureId));
        setLectureIdData(data);
        setLoading(false);
        if (typeof data !== "string") {
          const conference = await getConferenceDetailsWithRoleFiltering(
            data.conferenceId,
          );
          if (typeof conference !== "string") {
            setParticipant(conference.amISignedUp);
          }
          if (
            userData &&
            lectureIdData &&
            typeof lectureIdData !== "string" &&
            conference &&
            typeof conference !== "string"
          ) {
            setIsFavourite(
              data.interested.some((user) => user.id === userData.id),
            );
            const isUserInLecturersResults = await isUserInLecturers(
              userData,
              lectureIdData,
            );
            setIsUserLecturer(isUserInLecturersResults);
            const isUserInOrganizersResults = await isUserInOrganizers(
              userData,
              conference,
            );
            setIsUserOrganizer(isUserInOrganizersResults);
          }
        }
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchData();
  }, [refetchState, update, userData]);

  const handleLectureDataRefetch = () => {
    setRefetchState((prev) => prev + 1);
  };

  if (isError) return <Error500 />;

  const handleAddToFavourites = async () => {
    try {
      const result = await addLectureToFavourites(parseInt(params.lectureId));
      if (result === 200) {
        if (setUpdate) setUpdate(!update);
      } else {
        console.error("Błąd dodawania wykładu do ulubionych.");
      }
    } catch (error) {
      console.error("Błąd dodawania wykładu do ulubionych.", error);
    }
  };

  const handleRemoveFromFavourites = async () => {
    try {
      const result = await removeLectureFromFavourites(
        parseInt(params.lectureId),
      );
      if (result === 200) {
        if (setUpdate) setUpdate(!update);
      } else {
        console.error("Błąd usuwania wykładu z ulubionych.");
      }
    } catch (error) {
      console.error("Błąd usuwania wykładu z ulubionych.", error);
    }
  };

  return (
    <Page>
      {
      !isLoading &&
      lectureIdData &&
      typeof lectureIdData !== "string" ? (
        <div className="w-[90%] lg:w-[60%] flex flex-col items-center gap-5 mb-20">
          <div className="w-full flex items-center flex-col">
          <RedirectToConference conferenceId={lectureIdData.conferenceId} />
          <BoxWithImage
              className="text-darkblue w-[55%] lg:w-[45%] mt-10 mb-5"
            src={lectureIdData.image.id}
            alt={"Logo"}
           children={<></>}/>
          </div>
          {isUserOrganizer != null && isUserLecturer != null &&
            <MyLecturePageImageBox
              lectureIdData={lectureIdData}
              isUserOrganizer={isUserOrganizer}
              isUserLecturer={isUserLecturer}
            />}

            <div className="px-4 pt-2 sm:px-8 sm:pt-4 w-full">
              <p className="w-full flex justify-center text-sm sm:text-md md:text-lg lg:text-md xl:text-lg py-2 sm:py-3 md:py-4 lg:py-3 xl:py-4">
                {lectureIdData.description}
              </p>
              {participant && (
                <span className="w-full flex justify-center md:justify-end">
                  <span
                    onClick={() => {
                      isFavourite
                        ? handleRemoveFromFavourites()
                        : handleAddToFavourites();
                    }}
                    className="w-fit h-min flex justify-center items-center gap-x-2 cursor-pointer text-darkblue px-3"
                  >
                    {isFavourite ? (
                      <FaStar className="text-xl" />
                    ) : (
                      <FaRegStar className="text-xl" />
                    )}
                    <p className="text-sm md:text-lg font-medium">
                      {isFavourite
                        ? "Usuń z ulubionych"
                        : "Dodaj do ulubionych"}
                    </p>
                  </span>
                </span>
              )}
            </div>
            {lectureIdData.lecturers.length !== 0 ? (
              <div className="my-5">
                <div className="h-[2px] w-full bg-darkblue my-5" />
                <TitleHeader title={"Prowadzący"} />
                <div className="w-full gap-5 h-auto flex justify-center items-center pt-4">
                  {lectureIdData.lecturers.map((lecturer, index) => (
                    <People
                      key={index}
                      username={lecturer.username}
                      photo={lecturer.photo}
                      email={lecturer.email}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {(lectureIdData.materials.length !== 0 ||
                (userData && userData.role === "ADMIN") ||
              isUserOrganizer === true ||
              isUserLecturer === true) && (
              <>
                <div className="h-[2px] w-full bg-darkblue mt-2 mb-2" />
                <TitleHeader title={"Materiały"} />
                <div className="w-full flex justify-center md:justify-end items-center mb-4 px-4 sm:px-8">
                  {((userData && userData.role === "ADMIN") ||
                    isUserOrganizer === true ||
                    isUserLecturer === true) && (
                    <AddLectureMaterials
                      lectureId={params.lectureId}
                      handleRefetch={handleLectureDataRefetch}
                    />
                  )}
                </div>
              </>
            )}
            {lectureIdData.materials.length !== 0 ? (
              <>
                <MaterialTableWrapper
                  lectureIdData={lectureIdData}
                  handleRefetch={handleLectureDataRefetch}
                />
              </>
            ) : null}

            {lectureIdData.interested.length !== 0 ? (
              <>
                <div className="h-[2px] w-full bg-darkblue mt-2 mb-2" />
                <TitleHeader title={"Zainteresowani"} />
                <div className="w-full flex flex-row justify-center items-start gap-5 2xs:gap-8 xl:gap-12 2xl:gap-16 py-4 flex-wrap px-4">
                  {lectureIdData.interested.map((interested, index) => (
                    <People
                      key={index}
                      username={interested.username}
                      photo={interested.photo}
                    />
                  ))}
                </div>
              </>
            ) : null}
        </div>
      ) : (
        <LoadingMessage />
      )}
    </Page>
  );
}
