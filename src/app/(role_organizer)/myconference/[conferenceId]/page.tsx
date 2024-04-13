"use client";
import Page from "@/components/common/Page/Page";
import Logo from "@/assets/home/laptop.jpg";
import { Box, BoxWithImage } from "@/components/common/Box/Box";
import Image, { StaticImageData } from "next/image";
import { useQuery } from "react-query";
import { getConferenceDetailsWithRoleFiltering } from "@/hooks/conference";
import Error500 from "@/components/common/Error/Error500";
import { GoCalendar } from "react-icons/go";
import { FaChevronRight, FaRegClock } from "react-icons/fa";
import { IoMdPin } from "react-icons/io";
import { FaRegCalendarCheck } from "react-icons/fa";
import { FaRegCalendarXmark } from "react-icons/fa6";
import Link from "next/link";

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
      {conferenceIdData && typeof conferenceIdData !== "string" ? (
        <>
          <BoxWithImage
            className="text-darkblue w-[90%] lg:w-[60%] mt-20 mb-5"
            src={Logo}
            alt={"Logo"}
          >
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center text-close2White p-4">
              <h1 className="text-4xl pt-[5%]">{conferenceIdData.name}</h1>
              <div className="w-full h-auto flex justify-around text-3xl pt-[10%]">
                <div className="flex-row flex gap-x-3 w-full h-auto items-center justify-center">
                  <FaRegCalendarCheck className="text-4xl" />
                  <h1 className="text-lg">
                    {conferenceIdData.startDateTime.split("T")[0]}{" "}
                    {conferenceIdData.startDateTime
                      .split("T")[1]
                      .split(":")
                      .slice(0, 2)
                      .join(":")}
                  </h1>
                </div>
                <div className="flex-row flex gap-x-3 w-full h-auto items-center justify-center">
                  <FaRegCalendarXmark className="text-4xl" />
                  <h1 className="text-lg">
                    {conferenceIdData.endDateTime.split("T")[0]}{" "}
                    {conferenceIdData.endDateTime
                      .split("T")[1]
                      .split(":")
                      .slice(0, 2)
                      .join(":")}
                  </h1>
                </div>
              </div>
              <div className="flex-col flex gap-x-3 w-full h-auto items-center justify-center pt-[18%]">
                <div className="flex-row flex gap-x-3 w-full h-auto items-center justify-center">
                  <IoMdPin className="text-4xl" />
                  <h1 className=" text-3xl">
                    {conferenceIdData.location.name}
                  </h1>
                </div>
                <Link
                  href={`https://www.google.com/maps/place/${conferenceIdData.location.locX}+${conferenceIdData.location.locY}`}
                  className={"pt-2 hover:underline flex items-center gap-2"}
                >
                  Zobacz lokalizację na mapie <FaChevronRight />
                </Link>
              </div>
            </div>
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
              <People username={"Jan Kowalski"} photo={Logo} />
            </div>
          </Box>
          <Box className="text-darkblue w-[90%] lg:w-[60%] mt-5 mb-5">
            <h1 className="w-full flex justify-center text-3xl">Uczestnicy</h1>
            <div className="w-full grid-cols-4 grid gap-8 pt-4">
              <People username={"Jan Kowalski"} photo={Logo} />
              <People username={"Jan Kowalski"} photo={Logo} />
              <People username={"Jan Kowalski"} photo={Logo} />
              <People username={"Jan Kowalski"} photo={Logo} />
              <People username={"Jan Kowalski"} photo={Logo} />
              <People username={"Jan Kowalski"} photo={Logo} />
            </div>
          </Box>
          <Box className="text-darkblue w-[90%] lg:w-[60%] mt-5 mb-20">
            <h1 className="w-full flex justify-center text-3xl">Partnerzy</h1>
            <div className="w-full grid-cols-4 grid gap-8 pt-4">
              <People username={"Jan Kowalski"} photo={Logo} />
            </div>
          </Box>
        </>
      ) : null}
    </Page>
  );
}

function People({
  username,
  photo,
  email,
}: {
  username: string;
  photo: string | StaticImageData;
  email?: string;
}) {
  return (
    <div className="w-full">
      <p className="w-full flex justify-center items-center">
        <Image
          src={photo}
          alt={"Logo"}
          className="rounded-full"
          width={80}
          height={80}
        />
      </p>
      <span className="w-full flex justify-center pt-1 text-md">
        {username}
      </span>
      <span className="w-full flex justify-center text-xs">{email}</span>
    </div>
  );
}
