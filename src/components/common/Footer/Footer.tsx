import { FaFacebook, FaInstagram, FaYoutube, FaTwitch } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer () {
    return (
        <footer>
            <div className="flex justify-center px-6 py-5">
                <span className="w-full">
                    <img src="/logo/blue/logo_img_blue.png" alt="logo" className="w-12 h-12"/>
                </span>
                <span className="flex w-full justify-end items-center space-x-6 text-darkblue">
                    <FaFacebook className="w-8 h-8"/>
                    <FaInstagram className="w-8 h-8"/>
                    <FaXTwitter className="w-8 h-8"/>
                    <FaYoutube className="w-8 h-8"/>
                    <FaTwitch className="w-8 h-8"/>
                </span>
            </div>
            <div className="flex justify-center px-6 py-5 text-blue border-t border-blue">
                <span className="flex w-full">
                    <p className="font-sans text-xs">KONFERNO © 2024 Wszelkie prawa zastrzeżone</p>
                </span>
                <span className="flex w-full justify-end items-center space-x-6">
                    <p className="font-sans text-xs">ZOBACZ SPONSORÓW</p>
                    <p className="font-sans text-xs">Ostrzeżenie prawne</p>
                    <p className="font-sans text-xs">Polityka prywatności</p>
                    <p className="font-sans text-xs">Polityka plików cookies</p>
                    <p className="font-sans text-xs">Kanał informacyjny</p>
                </span>
            </div>
        </footer>
    )
}