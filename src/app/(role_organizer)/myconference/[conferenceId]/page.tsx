"use client";
import Page from "@/components/common/Page/Page";
import Logo from "@/assets/home/laptop.jpg";
import { Box, BoxWithImage } from "@/components/common/Box/Box";
import Image from "next/image";
import { useQuery } from "react-query";
import { getConferenceDetailsWithRoleFiltering } from "@/hooks/conference";
import Error500 from "@/components/common/Error/Error500";

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
      <BoxWithImage
        className="text-darkblue w-[90%] lg:w-[60%] mt-20 mb-5"
        src={Logo}
        alt={"Logo"}
      >
        <h1 className="w-full flex justify-center text-3xl">
          Tytuł {params.conferenceId} konferencji:
        </h1>
        <p className="text-1xl pt-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo
          voluptatum excepturi aut quam consequuntur perspiciatis officia, omnis
          unde in saepe facere et a dolorem dolores sequi blanditiis nam
          molestiae vero!
        </p>
        <p className="text-1xl pt-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo
          voluptatum excepturi aut quam consequuntur perspiciatis officia, omnis
          unde in saepe facere et a dolorem dolores sequi blanditiis nam
          molestiae vero!
        </p>
        <p className="text-1xl pt-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo
          voluptatum excepturi aut quam consequuntur perspiciatis officia, omnis
          unde in saepe facere et a dolorem dolores sequi blanditiis nam
          molestiae vero!
        </p>
      </BoxWithImage>
      <Box className="text-darkblue w-[90%] lg:w-[60%] mt-5 mb-5">
        <h1 className="w-full flex justify-center text-3xl">Host</h1>
        <div className="w-full grid-cols-4 grid gap-8 pt-4">
          <People />
        </div>
      </Box>
      <Box className="text-darkblue w-[90%] lg:w-[60%] mt-5 mb-5">
        <h1 className="w-full flex justify-center text-3xl">Prowadzący</h1>
        <div className="w-full grid-cols-4 grid gap-8 pt-4">
          <People />
        </div>
      </Box>
      <Box className="text-darkblue w-[90%] lg:w-[60%] mt-5 mb-5">
        <h1 className="w-full flex justify-center text-3xl">Uczestnicy</h1>
        <div className="w-full grid-cols-4 grid gap-8 pt-4">
          <People />
          <People />
          <People />
          <People />
          <People />
          <People />
        </div>
      </Box>
      <Box className="text-darkblue w-[90%] lg:w-[60%] mt-5 mb-20">
        <h1 className="w-full flex justify-center text-3xl">Partnerzy</h1>
        <div className="w-full grid-cols-4 grid gap-8 pt-4">
          <People />
        </div>
      </Box>
    </Page>
  );
}

function People() {
  return (
    <div className="w-full">
      <Image src={Logo} alt={"Logo"} className="w-full h-auto" />
      <span className="w-full flex justify-center pt-2 text-lg">
        Jan Kowalski
      </span>
    </div>
  );
}
