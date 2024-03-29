"use client";
import { FaGoogle } from "react-icons/fa";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/hooks/user";
import Logo from "@/assets/logo/blue/logo_text_blue.png";
import Image from "next/image";

function LoginBoard() {
  return (
    <div className="flex flex-col w-11/12 justify-center items-center text-center">
      <p className="text-4xl mb-8">Witaj!</p>
      <p className="text-lg mb-8">Zaloguj się, aby uzyskać dostęp:</p>
      <a href="http://localhost:8080/api/oauth2/authorize/google">
        <div className="flex justify-center items-center w-full md:w-96 h-16 text-white text-lg bg-blue rounded-2xl px-8">
          <FaGoogle className="text-base mr-2" />{" "}
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

export default function Page() {
  const router = useRouter();

  const handleUserMe = async () => {
    try {
      const result = await getCurrentUser();
      if (result !== "Brak autoryzacji użytkownika") {
        router.push("/");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    handleUserMe();
  }, []);

  useEffect(() => {
    document.cookie = "redirectUrl=http://localhost:3000";
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image src={Logo} alt="Logo" className="w-48 mb-12" />
      <LoginBoard />
    </div>
  );
}
