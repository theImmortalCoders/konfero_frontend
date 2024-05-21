"use client";
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
import { appAPI } from "@/utils/appENV";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);

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

  const pathname = usePathname();
  const isActive = (pathname: string, target: string) => pathname === target;

  function Navbox() {
    return (
      <>
        <Link href="/aboutus">
          <button
            onClick={() => updateLastVisitedPage("/aboutus")}
            className={isActive(pathname, "/aboutus") ? "font-bold" : ""}
          >
            O nas
          </button>
        </Link>
        <Link href="/conference">
          <button
            onClick={() => updateLastVisitedPage("/conference")}
            className={isActive(pathname, "/conference") ? "font-bold" : ""}
          >
            Konferencje
          </button>
        </Link>
        <Link href="/myconference">
          <button
            onClick={() => updateLastVisitedPage("/myconference")}
            className={isActive(pathname, "/myconference") ? "font-bold" : ""}
          >
            Moje konferencje
          </button>
        </Link>
      </>
    );
  }

  const rolesMap = {
    USER: "Użytkownik",
    ORGANIZER: "Organizator",
    ADMIN: "Administrator",
  };

  return (
    <nav className="max-w-screen h-navbar bg-close2White flex items-center justify-between px-4 md:px-8 shadow-navbarShadow sticky z-20">
      <Link href="/" onClick={() => updateLastVisitedPage("/")}>
        <Image src={Logo} alt="Logo" width={70} height={70} />
      </Link>

      <div className="text-darkblue font-sans text-md lg:text-lg md:flex md:flex-row md:gap-10 hidden">
        <Navbox />
      </div>

      <div className="flex flex-row gap-4 md:gap-8 items-center">
        <>
          {isLoading ||
          typeof currentUserData === "string" ||
          !currentUserData ||
          currentUserData === null ||
          isError ? (
            <Link href="/login">
              <IoPersonCircleOutline className="w-8 h-8 text-darkblue" />
            </Link>
          ) : (
            <div className="flex justify-end relative">
              <Image
                src={currentUserData.photo}
                className="w-8 h-8 rounded-full z-50 cursor-pointer"
                width={32}
                height={32}
                alt="Avatar"
                onClick={toggleUserMenu}
              />
              <div
                className={`absolute -right-5 top-0 pt-[40px] w-44 flex-col bg-close2White rounded-b-lg ${showUserMenu ? "flex" : "hidden"} items-center justify-start text-sm`}
              >
                <p className="font-bold text-darkblue p-2">
                  {rolesMap[currentUserData.role as keyof typeof rolesMap]}
                </p>
                <Link
                  href={`/favourites`}
                  className="hover:bg-gray-300 h-full w-full text-center p-2 rounded-xl"
                  onClick={toggleUserMenu}
                >
                  Ulubione
                </Link>
                {currentUserData.role === "USER" && (
                  <Link
                    href={`/becomeorganizer`}
                    className="text-nowrap w-full p-2 rounded-xl text-center hover:bg-gray-300"
                    onClick={toggleUserMenu}
                  >
                    Zostań organizatorem
                  </Link>
                )}
                {currentUserData.role === "ADMIN" && (
                  <Link href="/admindashboard">
                    <button
                      className="text-nowrap w-full p-2 rounded-xl text-center hover:bg-gray-300"
                      onClick={toggleUserMenu}
                    >
                      Panel administratora
                    </button>
                  </Link>
                )}
                <Link
                  href={`${appAPI.defaults.baseURL}/api/oauth2/logout`}
                  className="hover:bg-gray-300 h-full w-full text-center p-2 rounded-xl"
                >
                  Wyloguj
                </Link>
              </div>
            </div>
          )}
        </>
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
