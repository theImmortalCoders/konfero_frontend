"use client";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/hooks/user";
import Logo from "@/assets/logo/blue/logo_text_blue.png";
import Image from "next/image";
import { Box } from "@/components/common/Box/Box";
import { NEXT_PUBLIC_FRONT_BASE_URL, appAPI } from "@/utils/appENV";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import Error500 from "@/components/common/Error/Error500";
import Page from "@/components/common/Page/Page";
import LoadingMessage from "@/components/common/Loading/LoadingMessage";

function LoginBoard() {
  return (
    <div className="flex flex-col justify-center items-center text-center text-darkblue">
      <p className="text-4xl mb-8">Witaj!</p>
      <p className="text-lg mb-8">Zaloguj się, aby uzyskać dostęp:</p>
      <a href={`${appAPI.defaults.baseURL}/api/oauth2/authorize/google`}>
        <div className="flex justify-center items-center w-full md:w-96 h-16 text-close2White text-lg bg-blue rounded-2xl px-8">
          <FaGoogle className="text-base mr-2" />
          <p className="text-sm xs:text-lg">Kontynuuj z Google</p>
        </div>
      </a>
      <p className="text-xs font-sans w-64 mt-4">
        Przetworzymy Twój adres e-mail, aby sprawdzić, czy jesteś już
        zarejestrowany.
      </p>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();

  const {
    data: currentUserData,
    isLoading,
    isError,
  } = useQuery("currentUser", getCurrentUser, {
    staleTime: Infinity,
  });

  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (!isLoading && !isError && currentUserData) {
      if (currentUserData !== null) {
        const lastVisitedPage = document.cookie
          .split("; ")
          .find((row) => row.startsWith("lastVisitedPage="))
          ?.split("=")[1];

        if (lastVisitedPage && lastVisitedPage !== "/login") {
          router.push(lastVisitedPage);
        } else {
          router.push("/");
        }
      }
    }
    document.cookie = `redirectUrl=${NEXT_PUBLIC_FRONT_BASE_URL}`;
    setTimeout(() => setShowLogin(true), 100);
  }, [isLoading, isError, currentUserData, router]);

  if (isError) return <Error500 />;

  return (
    <Page className="justify-center">
      {isLoading || !showLogin ? (
        <LoadingMessage />
      ) : (
        <Box className="bg-close2White w-auto shadow-whiteShadow">
          <div className="mb-12 flex justify-center">
            <Image src={Logo} alt="Logo" className="w-48" />
          </div>
          <LoginBoard />
        </Box>
      )}
    </Page>
  );
}
