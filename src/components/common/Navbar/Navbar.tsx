import Link from "next/link";
import { FaBars } from "react-icons/fa6";

export default function Navbar() {
  return (
    <nav className="w-full h-navbar bg-close2White flex justify-between items-center px-20 font-thin text-black">
      <FaBars className="flex md:hidden" />
      <button>
        <Link href="/">Home</Link>
      </button>
      <div className="flex justify-around items-center md:h-full w-[40%]">
        <button>
          <Link href="/about">O nas</Link>
        </button>
        <button>
          <Link href="/findevent">Znajdz wydarzenie</Link>
        </button>
        <button>
          <Link href="/findevent">Znajdz wydarzenie</Link>
        </button>
        <button>
          <Link href="/findevent">Znajdz wydarzenie</Link>
        </button>
      </div>
      <button>
        <Link href="/login">Login</Link>
      </button>
    </nav>
  );
}
