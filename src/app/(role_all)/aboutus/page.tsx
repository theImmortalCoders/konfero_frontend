"use client";
import Page from "@/components/common/Page/Page";
import { Box } from "@/components/common/Box/Box";
import Image from "next/image";
import Photo_1 from "@/assets/aboutus/decorative_photo_1.jpg";
import Photo_2 from "@/assets/aboutus/decorative_photo_2.jpg";
import Logo from "@/assets/logo/blue/logo_text_blue.png";
import { FaUserTie } from "react-icons/fa";
import { useEffect, useState } from 'react';

export default function AboutUsPage() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <Page>
      <div className="flex flex-col items-center w-full space-y-10 py-10">
        <Box className="w-[90%] lg:w-[75%] xl:w-[60%] text-darkblue">
          <h1 className="text-xl md:text-2xl font-bold mb-4 text-center">Dlaczego Konfero?</h1> 
          <p className="text-sm lg:text-base text-justify">
            Konfero to innowacyjne narzędzie, które rewolucjonizuje sposób organizacji konferencji naukowych. Nasza aplikacja webowa została zaprojektowana z myślą o potrzebach organizatorów konferencji, aby wspierać ich w każdym etapie przygotowań i realizacji wydarzenia.
          </p>
        </Box>
        <Box className="flex flex-col md:flex-row items-center w-[90%] lg:w-[75%] xl:w-[60%] text-darkblue space-x-0 md:space-x-8">
          <div className="flex w-5/6 md:w-2/5 mt-5 lg:mt-0 justify-end order-2 md:order-1 relative">
            <Image src={Photo_1} alt="Photo_1" className="w-full rounded-3xl" />
            <div className={`flex flex-col w-3/4 h-3/5 m-4 p-4 rounded-xl bg-close2White font-bold bg-opacity-60 absolute transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-sm sm:text-base md:text-xs lg:text-sm">ORGANIZATORZY: 69</p>
              <p className="text-sm sm:text-base md:text-xs lg:text-sm">PRELEGENCI: 100</p>
              <p className="text-sm sm:text-base md:text-xs lg:text-sm">UŻYTKOWNICY: 2115</p>
            </div>
          </div>
          <div className="md:w-3/5 order-1 md:order-2">
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-center">Zaufanie organizatorów</h1>
            <p className="text-sm lg:text-base text-justify">
              Nasza aplikacja jest idealna dla organizatorów konferencji naukowych wszelkich rozmiarów. Niezależnie od tego, czy jest to małe sympozjum, czy międzynarodowy kongres, Konfero zapewnia narzędzia niezbędne do stworzenia udanego wydarzenia.
            </p>
          </div>
        </Box>
        <Box className="flex flex-col md:flex-row items-center w-[90%] lg:w-[75%] xl:w-[60%] text-darkblue space-x-0 md:space-x-8">
          <div>
            <h1 className="text-base sm:text-xl md:text-2xl font-bold mb-4 text-center">Współpraca i rozwój</h1>
            <p className="text-sm lg:text-base text-justify">
              Wierzymy w moc współpracy i otwartego dialogu. Nasz zespół regularnie uczestniczy w konferencjach branżowych, warsztatach i szkoleniach, aby być na bieżąco z najnowszymi trendami i najlepszymi praktykami w branży IT. To pozwala nam nie tylko rozwijać nasze umiejętności, ale także dzielić się wiedzą i doświadczeniem z całą społecznością.
            </p>
          </div>
          <Image src={Photo_2} alt="Photo_2" className="w-5/6 md:w-2/5 mt-5 lg:mt-0 rounded-3xl" />
        </Box>
        <Box className="w-[90%] lg:w-[75%] xl:w-[60%] text-darkblue pb-0 sm:pb-0">
          <h1 className="text-xl md:text-2xl font-bold mb-6 text-center">Nasz zespół</h1>
          <div className="grid grid-cols-4 md:grid-cols-5 justify-items-center items-center gap-y-10">
            <div className="flex flex-col items-center text-center order-1 col-span-2 sm:col-span-1">
              <FaUserTie className="text-6xl md:text-7xl"/>
              <p className="text-xs md:text-sm text-nowrap">Bogdan Bosak</p>
              <p className="text-xs font-sans text-nowrap">frontend developer</p>
            </div>  
            <div className="flex flex-col items-center text-center order-2 col-span-2 sm:col-span-1">
              <FaUserTie className="text-6xl md:text-7xl"/>
              <p className="text-xs md:text-sm text-nowrap">Wiktor Mazur</p>
              <p className="text-xs font-sans text-nowrap">frontend developer</p>
            </div>
            <div className="flex flex-col items-center text-center order-6 md:order-3 col-span-2 md:col-span-1">
              <FaUserTie className="text-6xl md:text-7xl"/>
              <p className="text-xs md:text-sm text-nowrap">Marcin Bator</p>
              <p className="text-xs font-sans text-nowrap">backend developer</p>
            </div>
            <div className="flex flex-col items-center text-center order-3 md:order-4 col-span-2 sm:col-span-1">
              <FaUserTie className="text-6xl md:text-7xl"/>
              <p className="text-xs md:text-sm text-nowrap">Bartłomiej Krówka</p>
              <p className="text-xs font-sans text-nowrap">frontend developer</p>
            </div>
            <div className="flex flex-col items-center text-center order-4 md:order-5 col-span-2 sm:col-span-1">
              <FaUserTie className="text-6xl md:text-7xl"/>
              <p className="text-xs md:text-sm text-nowrap">Paweł Buczek</p>
              <p className="text-xs font-sans text-nowrap">frontend developer</p>
            </div>
            <div className="flex flex-col items-center text-center md:pb-8 order-5">
              <FaUserTie className="text-6xl md:text-7xl"/>
              <p className="text-xs md:text-sm text-nowrap">Igor Litwa</p>
              <p className="text-xs font-sans text-nowrap">project leader</p>
            </div>
            <div className="flex flex-col col-span-4 md:col-span-3 justify-center items-center space-y-5 px-4 pt-4 pb-8 border-2 border-b-0 border-darkblue rounded-t-3xl order-8 md:order-7">
              <p className="text-sm sm:text-lg text-nowrap">Skorzystaj z naszych usług już teraz</p>
              <Image src={Logo} alt="Logo" className="w-4/5" />
            </div>
            <div className="flex flex-col items-center text-center md:pb-8 order-7 md:order-8">
              <FaUserTie className="text-6xl md:text-7xl"/>
              <p className="text-xs md:text-sm text-nowrap">Adrian Gola</p>
              <p className="text-xs font-sans text-nowrap">tester</p>
            </div>
          </div>
        </Box>
      </div>
    </Page>
    )
}
