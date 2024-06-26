"use client";
import Page from "@/components/common/Page/Page";
import { Box } from "@/components/common/Box/Box";
import Image from "next/image";
import Conference from "@/assets/becomeorganizer/conference.jpg";
import { useState } from "react";
import Form from "./form";
import useAuth from "@/hooks/useAuth";
import NotFound from "@/app/not-found";
import LoadingMessage from "@/components/common/Loading/LoadingMessage";

function Description({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs xs:text-sm sm:text-lg xl:text-base text-center">
      {children}
    </p>
  );
}

export default function BecomeOrganizer() {
  const { isAuthorise } = useAuth(["USER"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  if (isAuthorise === false) return <NotFound />;
  return (
    <Page className="justify-center">
      {isAuthorise === true ? (
        <>
          <Box className="flex flex-col md:flex-row items-center w-[90%] lg:w-[75%] xl:w-[60%] text-darkblue space-x-0 xl:space-x-8">
            <Image
              src={Conference}
              alt="Conference"
              className="w-5/6 md:w-2/5 mt-5 lg:mt-0 rounded-3xl hidden xl:block"
            />
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-lg xs:text-2xl font-bold mb-4 text-center">
                Zostań organizatorem konferencji
              </h1>
              <Image
                src={Conference}
                alt="Conference"
                className="w-4/6 md:w-1/2 mb-4 lg:mt-0 rounded-3xl block xl:hidden"
              />
              <Description>
                Chcesz zarządzać konferencjami i ich zawartością?
              </Description>
              <Description>
                Rola organizatora umożliwia dodawanie prelekcji, zapraszanie
                prelegentów i dystrybucję materiałów dla uczestników.
              </Description>
              <p className="text-sm md:text-lg xl:text-base font-bold my-4 text-center">
                Wypełnij formularz i ciesz się możliwościami organizatora{" "}
              </p>
              <button
                onClick={() => setIsOpen(true)}
                className="text-nowrap w-fit bg-blue text-close2White text-lg font-medium py-2 px-6 rounded-3xl "
              >
                Poproś o dostęp
              </button>
            </div>
          </Box>
          {isOpen && <Form setIsOpen={setIsOpen} />}
        </>
      ) : (
        <LoadingMessage />
      )}
    </Page>
  );
}
