import { FaFacebook, FaInstagram, FaYoutube, FaTwitch } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function BottomLink ({ children }: { children: React.ReactNode }) {
    return (
        <p className="font-sans text-xs cursor-pointer">{children}</p>
    );
  }

  function TopFooter () {
    return (
        <div className="flex flex-col lg:flex-row px-6 py-5">
            <span className="flex w-full justify-center lg:justify-start order-2 lg:order-1 ">
                <img src="/logo/blue/logo_img_blue.png" alt="logo" className="w-12 h-12"/>
            </span>
            <span className="flex w-full justify-center lg:justify-end items-center space-x-6 mb-6 lg:mb-0 text-darkblue order-1 lg:order-2">
                <FaFacebook className="w-8 h-8 cursor-pointer"/>
                <FaInstagram className="w-8 h-8 cursor-pointer"/>
                <FaXTwitter className="w-8 h-8 cursor-pointer"/>
                <FaYoutube className="w-8 h-8 cursor-pointer"/>
                <FaTwitch className="w-8 h-8 cursor-pointer"/>
            </span>
        </div>
    )
  }

  function BotFooter () {
    return (
        <div className="flex flex-col lg:flex-row px-6 py-5 text-blue border-t border-blue">
            <span className="flex w-full justify-center lg:justify-start py-4 lg:py-0 order-2 lg:order-1">
                <p className="font-sans text-xs">KONFERNO © 2024 Wszelkie prawa zastrzeżone</p>
            </span>
            <span className="flex flex-wrap lg:flex-nowrap w-full justify-center lg:justify-end items-center space-x-6 order-1 lg:order-2">
                <BottomLink>Sponsorzy</BottomLink>
                <BottomLink>Ostrzeżenie prawne</BottomLink>
                <BottomLink>Polityka prywatności</BottomLink>
                <BottomLink>Polityka plików cookies</BottomLink>
                <BottomLink>Kanał informacyjny</BottomLink>
            </span>
        </div>
    )
  }

export default function Footer () {
    return (
        <footer>
            <TopFooter/>
            <BotFooter/>
        </footer>
    )
}