"use client";
import { Box } from "@/components/common/Box/Box";
import Page from "@/components/common/Page/Page";
import AddConferenceInputs from "@/components/myconference/AddConferenceInputs";
import Logo from "@/assets/logo/blue/logo_text_blue.png";
import Image from "next/image";
import { useState } from "react";

export default function UpdateConferenceById({
  params,
}: {
  params: { conferenceId: string };
}) {
  const [tempId, setTempId] = useState<number>(-1);
  return (
    <Page className="py-10">
      <Box className="flex flex-col items-center space-y-6 w-11/12 sm:w-5/6 lg:w-3/5">
        <Image src={Logo} alt="Logo" width={180} height={180} />
        <h1 className="text-darkblue font-black">
          Zmień dane obecnej konferencji
        </h1>
        <AddConferenceInputs
          isUpdate={true}
          conferenceid={params.conferenceId}
          tempId={tempId}
          setTempId={setTempId}
        />
      </Box>
    </Page>
  );
}
