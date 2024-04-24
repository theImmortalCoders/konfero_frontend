"use client";
import { AxiosResponse } from "axios";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/assets/logo/blue/logo_text_blue.png";
import {
  IoPersonCircleOutline,
  IoMenuOutline,
  IoCloseOutline,
} from "react-icons/io5";
import Link from "next/link";
import { updateLastVisitedPage } from "@/utils/cookie";
import { UserData, getCurrentUser } from "@/hooks/user";
import { useQuery } from "react-query";

function Navbox() {
  return (
    <>
      <Link href="/aboutus">
        <button onClick={() => updateLastVisitedPage("/aboutus")}>O nas</button>
      </Link>
      <Link href="/conference">
        <button onClick={() => updateLastVisitedPage("/conference")}>
          Konferencje
        </button>
      </Link>
      <Link
        href="/myconference"
        onClick={() => updateLastVisitedPage("/myconference")}
      >
        Moje konferencje
      </Link>
    </>
  );
}

function handleUserMenuClick() {



}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const {
    data: currentUserData,
    isLoading,
    isError,
  }: {
    data?: UserData | string;
    isLoading: boolean;
    isError: any;
  } = useQuery("currentUser", getCurrentUser, {
    staleTime: Infinity,
  });

  return (
    <nav className="max-w-screen h-navbar bg-close2White flex items-center justify-between px-4 md:px-8 shadow-navbarShadow sticky z-20">
      <Link href="/" onClick={() => updateLastVisitedPage("/")}>
        <Image src={Logo} alt="Logo" width={70} height={70} />
      </Link>

      <div className="text-darkblue font-sans text-md lg:text-lg md:flex md:flex-row md:gap-10 hidden">
        <Navbox />
      </div>

      <div className="flex flex-row gap-4 md:gap-8 items-center">
        <Link href="/login">
          {isLoading ||
          typeof currentUserData === "string" ||
          !currentUserData ||
          currentUserData === null ||
          isError ? (
            <IoPersonCircleOutline className="w-8 h-8 text-darkblue" />
          ) : (
            <div className="flex justify-end relative">
              <Image
                src={currentUserData.photo}
                className="w-8 h-8 rounded-full z-50"
                width={32}
                height={32}
                alt="Avatar"
                onClick={(e) => {handleUserMenuClick}}
              />
              <div className="absolute right-0 top-0 w-36 h-20 bg-red-300 px-2">
                a
              </div>
            </div>
          )}
        </Link>
        <button
          onClick={toggleMenu}
          className="text-darkblue mr-2 flex items-center md:hidden"
        >
          {isMenuOpen ? (
            <IoCloseOutline className="w-8 h-8" />
          ) : (
            <IoMenuOutline className="w-8 h-8" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-navbar left-0 w-full bg-close2White shadow-md py-4 z-50">
          <div className="flex flex-col items-center gap-4 z-50">
            <Navbox />
          </div>
        </div>
      )}
    </nav>
  );
}
