"use client";
import Page from "@/components/common/Page/Page";
import Logo from "@/assets/home/laptop.jpg";
import { Box, BoxWithImage } from "@/components/common/Box/Box";
import { useQuery } from "react-query";
import { getConferenceDetailsWithRoleFiltering } from "@/hooks/conference";
import Error500 from "@/components/common/Error/Error500";
import MyConferencePageImageBox from "@/components/myconferenceId/MyConferencePageImageBox";
import People from "@/components/myconferenceId/PeopleBox";
import AllImagesCarousel from "@/components/myconferenceId/Carousel/AllImagesCarousel";
import TitleHeader from "@/components/common/Box/TitleHeader";
import SingleImageCarousel from "@/components/myconferenceId/Carousel/SingleImageCarousel";

export default function MyConferencePage({
  params,
}: {
  params: { conferenceId: string };
}) {
  const {
    data: conferenceIdData,
    isLoading,
    isError,
  } = useQuery("conferenceId", () =>
    getConferenceDetailsWithRoleFiltering(parseInt(params.conferenceId))
  );

  if (isError) return <Error500 />;

  return (
    <Page>
      {!isLoading &&
      conferenceIdData &&
      typeof conferenceIdData !== "string" ? (
        <>
          <BoxWithImage
            className="text-darkblue w-[90%] lg:w-[60%] mt-20 mb-5"
            //src={conferenceIdData.logo.id}
            src={Logo}
            alt={"Logo"}
          >
            <MyConferencePageImageBox conferenceIdData={conferenceIdData} />
            <div className="px-4 py-2 sm:px-8 sm:py-4 w-full">
              <TitleHeader title={conferenceIdData.name} />
              <p className="text-sm sm:text-md md:text-lg lg:text-md xl:text-lg pt-2 sm:pt-3 md:pt-4 lg:pt-3 xl:pt-4">
                {conferenceIdData.description}
              </p>
            </div>
          </BoxWithImage>
          <Box className="text-darkblue w-[90%] lg:w-[60%] mt-5 mb-5">
            <TitleHeader title={"Organizator"} />
            <div className="w-full grid-cols-4 grid gap-8 pt-4">
              <People
                username={conferenceIdData.organizer.username}
                photo={conferenceIdData.organizer.photo}
                email={conferenceIdData.organizer.email}
              />
            </div>
          </Box>
          <Box className="text-darkblue w-[90%] lg:w-[60%] mt-5 mb-5">
            <TitleHeader title={"Wykłady"} />
          </Box>
          <Box className="text-darkblue w-[90%] lg:w-[60%] mt-5 mb-5">
            <TitleHeader title={"Uczestnicy"} />
            {!conferenceIdData.participantsFull ? (
              <>
                <h1 className="w-full flex justify-center text-sm sm:text-md md:text-lg lg:text-md xl:text-lg">
                  Pozostało{" "}
                  {conferenceIdData.participantsLimit -
                    conferenceIdData.participants.length}{" "}
                  / {conferenceIdData.participantsLimit}
                </h1>
                <div className="w-full grid-cols-4 grid gap-8 pt-4">
                  {conferenceIdData.participants.map((participants, index) => (
                    <People
                      key={index}
                      username={participants.username}
                      photo={participants.photo}
                    />
                  ))}
                </div>
              </>
            ) : (
              <h1 className="w-full flex justify-center text-sm sm:text-md md:text-lg lg:text-md xl:text-lg">
                Niestety brak wolnych miejsc
              </h1>
            )}
          </Box>
          <Box className="text-darkblue w-[90%] lg:w-[60%] mt-5 mb-20">
            <TitleHeader title={"Zdjęcia"} />
            <div className="w-full pt-4">
              <AllImagesCarousel photos={conferenceIdData.photos} />
            </div>
          </Box>
        </>
      ) : (
        <p className="text-2xl text-close2White">Trwa ładowanie danych...</p>
      )}
    </Page>
  );
}
