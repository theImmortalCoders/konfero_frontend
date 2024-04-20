"use client";
import Page from "@/components/common/Page/Page";
import { Box } from "@/components/common/Box/Box";
import AddConferenceInputs from "@/components/myconference/AddConferenceInputs"
import Logo from "@/assets/logo/blue/logo_text_blue.png";
import Image from "next/image";

export default function AddConference() {

  return (
    <Page className="py-20">
        <Box className="w-4/5 2xs:w-2/3 xs:w-1/2 flex flex-col items-center space-y-6">
          <Image src={Logo} alt="Logo" width={180} height={180} />
          <h1 className="text-darkblue font-black">Podaj dane potrzebne do utworzenia konferencji</h1>
          <AddConferenceInputs />
        </Box>
    </Page>
  );
}

