"use client";
import Page from "@/components/common/Page/Page";
import Logo from "@/assets/home/laptop.jpg";
import { Box, BoxWithImage } from "@/components/common/Box/Box";
import { useQuery } from "react-query";
import Error500 from "@/components/common/Error/Error500";
import People from "@/components/myconferenceId/PeopleBox";
import { getLectureDetails } from "@/hooks/lecture";
import MyLecturePageImageBox from "@/components/lecture/MyLecturePageImageBox";
import TitleHeader from "@/components/common/Box/TitleHeader";
import Link from "next/link";
import { NEXT_PUBLIC_API_BASE_URL, appAPI } from "@/utils/appENV";
import { ImageInterface } from "@/hooks/conference";

export default function MyConferencePage({
  params,
}: {
  params: { lectureId: string };
}) {
  const {
    data: lectureIdData,
    isLoading,
    isError,
  } = useQuery("lectureId", () =>
    getLectureDetails(parseInt(params.lectureId))
  );

  console.log("lectureId", lectureIdData);
  if (isError) return <Error500 />;

  return (
    <Page>
      {!isLoading && lectureIdData && typeof lectureIdData !== "string" ? (
        <>
          <BoxWithImage
            className="text-darkblue w-[90%] lg:w-[60%] mt-20 mb-5"
            //src={conferenceIdData.logo.id}
            src={Logo}
            alt={"Logo"}
          >
            <MyLecturePageImageBox lectureIdData={lectureIdData} />
            <div className="px-4 py-2 sm:px-8 sm:py-4 w-full">
              <TitleHeader title={lectureIdData.name} />
              <p className="text-sm sm:text-md md:text-lg lg:text-md xl:text-lg pt-2 sm:pt-3 md:pt-4 lg:pt-3 xl:pt-4">
                {lectureIdData.description}
              </p>
            </div>
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
            {lectureIdData.materials.length !== 0 ? (
              <>
                <div className="h-[2px] w-full bg-darkblue mt-2" />
                <TitleHeader title={"Materiały"} />
                <div className="w-full flex justify-center items-center flex-col">
                  {lectureIdData.materials.map((material, index) => (
                    <Materials key={index} material={material} />
                  ))}
                </div>
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
        <p className="text-2xl text-close2White">Trwa ładowanie danych...</p>
      )}
    </Page>
  );
}

function Materials({ material }: { material: ImageInterface }) {
  return (
    <Link
      href={`${NEXT_PUBLIC_API_BASE_URL}/api/file/${material.id}`}
      className="w-[80%] z-10"
    >
      <div className="flex flex-row">
        <h1>{material.description}</h1>
        <h1>{material.authorId}</h1>
        <h1>{material.fileType}</h1>
      </div>
    </Link>
  );
}
