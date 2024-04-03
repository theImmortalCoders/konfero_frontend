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

function Navbox() {
  return (
    <>
      <Link href="/aboutus">
        <button>O nas</button>
      </Link>
      <Link href="/conference">
        <button>Konferencje</button>
      </Link>
      <Link href="/myconference">
        <button>Moje konferencje</button>
      </Link>
    </>
  );
}
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="max-w-screen h-navbar bg-close2White flex items-center justify-between px-4 md:px-8 shadow-navbarShadow sticky z-20">
      <Link href="/">
        <Image src={Logo} alt="Logo" width={70} height={70} />
      </Link>

      <div className="text-darkblue font-sans text-md lg:text-lg md:flex md:flex-row md:gap-10 hidden">
        <Navbox />
      </div>

      <div className="flex flex-row gap-4 md:gap-8 items-center">
        <Link href="/login">
          <IoPersonCircleOutline className="w-8 h-8 text-darkblue" />
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
        <div className="md:hidden absolute top-navbar left-0 w-full bg-close2White shadow-md py-4">
          <div className="flex flex-col items-center gap-4">
            <Navbox />
          </div>
        </div>
      )}
    </nav>
  );
}
