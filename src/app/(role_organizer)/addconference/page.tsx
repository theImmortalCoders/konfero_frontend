"use client";
import Page from "@/components/common/Page/Page";
import { Box } from "@/components/common/Box/Box";
import AddConferenceInputs from "@/components/myconference/AddConferenceInputs";
import Logo from "@/assets/logo/blue/logo_text_blue.png";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import NotFound from "../addlecture/[conferenceId]/not-found";
import LoadingMessage from "@/components/common/Loading/LoadingMessage";

export default function AddConference() {
  const { isAuthorise } = useAuth(["ORGANIZER", "ADMIN"]);
  if (isAuthorise === false) return <NotFound />;
  return (
    <Page className="py-10">
      {isAuthorise === true ? (
        <Box className="flex flex-col items-center space-y-6 w-11/12 sm:w-5/6 lg:w-3/5">
          <Image src={Logo} alt="Logo" width={180} height={180} />
          <h1 className="text-darkblue font-black">
            Podaj dane potrzebne do utworzenia konferencji
          </h1>
          <AddConferenceInputs isUpdate={false} />
        </Box>
      ) : (
        <LoadingMessage />
      )}
    </Page>
  );
}
