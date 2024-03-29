import Box from "@/components/common/Box/Box";
import Image from "next/image";
import Laptop from "@/assets/home/laptop.jpg";
import { FaArrowRight } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="flex min-h-max min-w-screen bg-black2darkblue-gradient justify-center items-center">
      <Box>
        <div className="grid grid-cols-1 xl:grid-cols-2 w-full h-full">
          <div className="pr-0 md:pr-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              Witamy w Konfero
            </h1>
            <p className="text-md sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-8">
              Najlepszej stronie do organizacji konferencji
            </p>
            <p className="text-md sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-8">
              Zapewniamy niezawodne planowanie konferencji, rejestrację
              uczestników wraz z zarządzaniem harmonogramem sesji i prezentacji
              oraz publikację materiałów konferencyjnych
            </p>
            <p className="text-md sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-8">
              Rozsiądz się wygodnie i zostaw wszystko nam...
            </p>
            <div className="flex items-center justify-center w-full">
              <button className="bg-close2White text-blue text-sm sm:text-md lg:text-lg font-medium py-2 px-4 md:py-3 md:px-6 rounded-2xl flex items-center justify-center">
                <a href="/login">Dołącz do nas</a>
                <div className="ml-3 md:ml-6 w-6 h-6 md:w-9 md:h-9 rounded-full bg-blue flex items-center justify-center">
                  <FaArrowRight className="text-close2White" />
                </div>
              </button>
            </div>
          </div>
          <div className="w-full h-full hidden xl:flex items-center">
            <Image src={Laptop} alt="LaptopImage" className=" rounded-3xl" />
          </div>
        </div>
      </Box>
    </main>
  );
}
