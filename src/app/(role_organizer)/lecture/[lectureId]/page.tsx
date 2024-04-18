"use client";
import Page from "@/components/common/Page/Page";
import Logo from "@/assets/home/laptop.jpg";
import { BoxWithImage } from "@/components/common/Box/Box";
import { useQuery } from "react-query";
import Error500 from "@/components/common/Error/Error500";
import People from "@/components/myconferenceId/Participants/People";
import { getLectureDetails } from "@/hooks/lecture";
import MyLecturePageImageBox from "@/components/lecture/MyLecturePageImageBox";
import TitleHeader from "@/components/common/Box/TitleHeader";
import MaterialTableWrapper from "@/components/common/Material/MaterialTableWrapper";
import LoadingMessage from "@/components/common/Loading/LoadingMessage";

export default function LecturePage({
  params,
}: {
  params: { lectureId: string };
}) {
  const {
    data: lectureIdData,
    isLoading,
    isError,
  } = useQuery(`lectureId_${parseInt(params.lectureId)}`, () =>
    getLectureDetails(parseInt(params.lectureId))
  );

  if (isError) return <Error500 />;

  return (
    <Page>
      {!isLoading && lectureIdData && typeof lectureIdData !== "string" ? (
        <>
          <BoxWithImage
            className="text-darkblue w-[90%] lg:w-[60%] mt-20 mb-5"
            src={lectureIdData.image.id}
            alt={"Logo"}
          >
            <MyLecturePageImageBox lectureIdData={lectureIdData} />
            <div className="px-4 py-2 sm:px-8 sm:py-4 w-full">
              <TitleHeader title={lectureIdData.name} />
              <p className="text-sm sm:text-md md:text-lg lg:text-md xl:text-lg pt-2 sm:pt-3 md:pt-4 lg:pt-3 xl:pt-4">
                {lectureIdData.description}
              </p>
            </div>
            {lectureIdData.lecturers.length !== 0 ? (
              <>
                <div className="h-[2px] w-full bg-darkblue mt-2" />
                <TitleHeader title={"Prowadzący"} />
                <div className="w-full grid grid-cols-4 gap-8 pt-4">
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
            {lectureIdData.materials.length !== 0 ? (
              <>
                <div className="h-[2px] w-full bg-darkblue mt-2" />
                <TitleHeader title={"Materiały"} />
                <MaterialTableWrapper lectureIdData={lectureIdData} />
              </>
            ) : null}
            {lectureIdData.interested.length !== 0 ? (
              <>
                <div className="h-[2px] w-full bg-darkblue mt-2" />
                <TitleHeader title={"Zainteresowani"} />
                <div className="w-full grid grid-cols-4 gap-8 pt-4">
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
