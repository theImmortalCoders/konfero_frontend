"use client";
import Page from "@/components/common/Page/Page";
import { BoxWithImage } from "@/components/common/Box/Box";
import Error500 from "@/components/common/Error/Error500";
import People from "@/components/myconferenceId/Participants/People";
import { getConferenceDetailsWithRoleFiltering } from "@/hooks/conference";
import { getLectureDetails, GetLectureDetailsData, addLectureToFavourites, removeLectureFromFavourites } from "@/hooks/lecture";
import { getCurrentUser } from "@/hooks/user";
import MyLecturePageImageBox from "@/components/lecture/MyLecturePageImageBox";
import TitleHeader from "@/components/common/Box/TitleHeader";
import MaterialTableWrapper from "@/components/common/Material/MaterialTableWrapper";
import LoadingMessage from "@/components/common/Loading/LoadingMessage";
import AddLectureMaterials from "@/components/lecture/AddLectureMaterials";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import NotFound from "../../addlecture/[conferenceId]/not-found";
import { FaStar, FaRegStar } from "react-icons/fa";

async function getId() {
  const userData = await getCurrentUser();
  if (userData && typeof userData === 'object' && 'id' in userData) {
    return userData.id;
  }
  return null;
}

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
  const { isAuthorise, userRole } = useAuth(["USER", "ORGANIZER", "ADMIN"]);

  const [userId, setUserId] = useState<number | null>(null);
  const [update, setUpdate] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  useEffect(() => {
    const fetchId = async () => {
      const id = await getId();
      setUserId(id);
    };
    fetchId();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getLectureDetails(parseInt(params.lectureId));
        setLectureIdData(data);
        setLoading(false);
        if (typeof data !== 'string') {
          const conference = await getConferenceDetailsWithRoleFiltering(data.conferenceId);
          if (typeof conference !== 'string') {
            setParticipant(conference.amISignedUp);
          }
          setIsFavourite(data.interested.some(user => user.id === userId));
        }
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchData();
  }, [refetchState, update, userId]);

  const handleLectureDataRefetch = () => {
    setRefetchState((prev) => prev + 1);
  };

  if (isError) return <Error500 />;
  if (isAuthorise === false) return <NotFound />;

  const handleAddToFavourites  = async () => {
    try {
      const result = await addLectureToFavourites(parseInt(params.lectureId));
      if (result === 200) {
        if (setUpdate)
          setUpdate(!update);
      } else {
        console.error("Błąd dodawania wykładu do ulubionych.");
      }
    } catch (error) {
      console.error("Błąd dodawania wykładu do ulubionych.", error);
    }
  }

  const handleRemoveFromFavourites = async() => {
    try {
      const result = await removeLectureFromFavourites(parseInt(params.lectureId));
      if (result === 200) {
        if (setUpdate)
          setUpdate(!update);
      } else {
        console.error("Błąd usuwania wykładu z ulubionych.");
      }
    } catch (error) {
      console.error("Błąd usuwania wykładu z ulubionych.", error);
    }    
  }

  return (
    <Page>
      {isAuthorise === true &&
      !isLoading &&
      userRole &&
      lectureIdData &&
      typeof lectureIdData !== "string" ? (
        <>
          <BoxWithImage
            className="text-darkblue w-[90%] lg:w-[60%] mt-20 mb-5"
            src={lectureIdData.image.id}
            alt={"Logo"}
          >
            <MyLecturePageImageBox
              lectureIdData={lectureIdData}
              userRole={userRole}
            />
            <div className="px-4 pt-2 sm:px-8 sm:pt-4 w-full">
              <TitleHeader title={lectureIdData.name} />
              <p className="text-sm sm:text-md md:text-lg lg:text-md xl:text-lg py-2 sm:py-3 md:py-4 lg:py-3 xl:py-4">
                {lectureIdData.description}
              </p>
              {participant && (
                <span className="w-full flex justify-center md:justify-end">
                  <span
                    onClick={() => {
                      isFavourite ? handleRemoveFromFavourites() : handleAddToFavourites();
                    }}
                    className="w-fit h-min flex justify-center items-center gap-x-2 cursor-pointer text-darkblue px-3"
                  >
                    {isFavourite ? <FaStar className="text-xl" /> :  <FaRegStar className="text-xl" />}
                    <p className="text-sm md:text-lg font-medium">
                      {isFavourite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
                    </p>
                  </span>
                </span>  
              )}
            </div>
            {lectureIdData.lecturers.length !== 0 ? (
              <>
                <div className="h-[2px] w-full bg-darkblue mt-2 mb-2" />
                <TitleHeader title={"Prowadzący"} />
                <div className="w-full h-auto flex justify-center items-center pt-4">
                  {lectureIdData.lecturers.map((lecturer, index) => (
                    <People
                      key={index}
                      username={lecturer.username}
                      photo={lecturer.photo}
                      email={lecturer.email}
                    />
                  ))}
                </div>
              </>
            ) : null}
            <div className="h-[2px] w-full bg-darkblue mt-2 mb-2" />
            <TitleHeader title={"Materiały"} />
            <div className="w-full flex justify-center md:justify-end items-center mb-4 px-4 sm:px-8">
              {userRole === "ORGANIZER" || userRole === "ADMIN" ? (
                <AddLectureMaterials
                  lectureId={params.lectureId}
                  handleRefetch={handleLectureDataRefetch}
                />
              ) : null}
            </div>
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
                <div className="w-full flex flex-row justify-center items-start gap-16 py-4 flex-wrap px-4">
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

          </BoxWithImage>
        </>
      ) : (
        <LoadingMessage />
      )}
    </Page>
  );
}
