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

  console.log("conferenceIdData", conferenceIdData);
  if (isError) return <Error500 />;

  return (
    <Page>
      {!isLoading &&
      conferenceIdData &&
      typeof conferenceIdData !== "string" ? (
        <>
          <BoxWithImage
            className="text-darkblue w-[90%] lg:w-[60%] mt-20 mb-5"
            src={Logo}
            alt={"Logo"}
          >
            <MyConferencePageImageBox conferenceIdData={conferenceIdData} />
            <div className="px-4 py-2 sm:px-8 sm:py-4 w-full">
              <h1 className="w-full flex justify-center text-3xl">
                {conferenceIdData.name}:
              </h1>
              <p className="text-1xl pt-4">{conferenceIdData.description}</p>
            </div>
          </BoxWithImage>
          <Box className="text-darkblue w-[90%] lg:w-[60%] mt-5 mb-5">
            <h1 className="w-full flex justify-center text-3xl">Organizator</h1>
            <div className="w-full grid-cols-4 grid gap-8 pt-4">
              <People
                username={conferenceIdData.organizer.username}
                photo={conferenceIdData.organizer.photo}
                email={conferenceIdData.organizer.email}
              />
            </div>
          </Box>
          <Box className="text-darkblue w-[90%] lg:w-[60%] mt-5 mb-5">
            <h1 className="w-full flex justify-center text-3xl">Prowadzący</h1>
            <div className="w-full grid-cols-4 grid gap-8 pt-4">
              <People
                username={conferenceIdData.organizer.username}
                photo={conferenceIdData.organizer.photo}
                email={conferenceIdData.organizer.email}
              />
            </div>
          </Box>
          <Box className="text-darkblue w-[90%] lg:w-[60%] mt-5 mb-5">
            <h1 className="w-full flex justify-center text-3xl">Wykłady</h1>
          </Box>
          <Box className="text-darkblue w-[90%] lg:w-[60%] mt-5 mb-5">
            <h1 className="w-full flex justify-center text-3xl">Uczestnicy</h1>
            <div className="w-full grid-cols-4 grid gap-8 pt-4">
              <People
                username={conferenceIdData.organizer.username}
                photo={conferenceIdData.organizer.photo}
              />
              <People
                username={conferenceIdData.organizer.username}
                photo={conferenceIdData.organizer.photo}
              />
              <People
                username={conferenceIdData.organizer.username}
                photo={conferenceIdData.organizer.photo}
              />
              <People
                username={conferenceIdData.organizer.username}
                photo={conferenceIdData.organizer.photo}
              />
              <People
                username={conferenceIdData.organizer.username}
                photo={conferenceIdData.organizer.photo}
              />
              <People
                username={conferenceIdData.organizer.username}
                photo={conferenceIdData.organizer.photo}
              />
            </div>
          </Box>
          <Box className="text-darkblue w-[90%] lg:w-[60%] mt-5 mb-20">
            <h1 className="w-full flex justify-center text-3xl">Zdjęcia</h1>
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
