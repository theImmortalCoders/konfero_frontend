import Box from "@/components/common/Box/Box";
import Image from "next/image";
import Laptop from "@/assets/home/laptop.jpg";
import { FaArrowRight } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="flex min-h-max min-w-screen bg-black2darkblue-gradient justify-center items-center mt-navbar">
      <Box>
        <div className="grid grid-cols-2 w-full h-full">
          <div className="pr-8">
            <h1 className="text-4xl font-bold mb-6">Witamy w Konferno</h1>
            <p className="text-xl mb-8">
              Najlepszej stronie do organizacji konferencji
            </p>
            <p className="text-xl mb-8">
              Zapewniamy niezawodne planowanie konferencji, rejestrację
              uczestników , zarządzanie harmonogramem sesji i prezentacji oraz
              publikację materiałów konferencyjnych
            </p>
            <p className="text-xl mb-8">
              Rozsiądz się wygodnie i zostaw wszystko nam...
            </p>
            <div className="flex items-center justify-center w-full">
              <button className="bg-close2White text-blue text-lg font-medium py-3 px-6 rounded-2xl flex items-center justify-center">
                <a href="/login">Dołącz do nas</a>
                <div className="ml-6 w-9 h-9 rounded-full bg-blue flex items-center justify-center">
                  <FaArrowRight className="text-close2White" />
                </div>
              </button>
            </div>
          </div>
          <div className="w-full h-full flex items-center">
            <Image
              src={Laptop}
              alt="LaptopImage"
              className="h-[384px] w-[640px] rounded-3xl"
            />
          </div>
        </div>
      </Box>
    </main>
  );
}
