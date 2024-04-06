import Page from "@/components/common/Page/Page";
import { Box } from "@/components/common/Box/Box";
import Image from "next/image";
import Photo_1 from "@/assets/aboutus/decorative_photo_1.jpg";
import Photo_2 from "@/assets/aboutus/decorative_photo_2.jpg";
import Logo from "@/assets/logo/blue/logo_text_blue.png";
import { FaUserTie } from "react-icons/fa";

export default function AboutUsPage() {
  return (
    <Page>
      <div className="flex flex-col items-center w-full space-y-5 py-10">
        <Box className="lg:w-[60%] text-darkblue">
          <h1 className="text-base sm:text-xl md:text-2xl font-bold mb-4 text-center">Dlaczego Konfero?</h1> 
          <p className="text-base text-justify">
            Konfero to innowacyjne narzędzie, które rewolucjonizuje sposób organizacji konferencji naukowych. Nasza aplikacja webowa została zaprojektowana z myślą o potrzebach organizatorów konferencji, aby wspierać ich w każdym etapie przygotowań i realizacji wydarzenia.
          </p>
        </Box>
        <Box className="flex items-center lg:w-[60%] text-darkblue  space-x-8">
          <Image src={Photo_1} alt="Photo_1" className="w-2/5 rounded-3xl" />
          <div>
            <h1 className="text-base sm:text-xl md:text-2xl font-bold mb-4 text-center">Zaufało nam wiele organizatorów</h1>
            <p className="text-base text-justify">
              Nasza aplikacja jest idealna dla organizatorów konferencji naukowych wszelkich rozmiarów. Niezależnie od tego, czy jest to małe sympozjum, czy międzynarodowy kongres, Konfero zapewnia narzędzia niezbędne do stworzenia udanego wydarzenia.
            </p>
          </div>
        </Box>
        <Box className="flex items-center lg:w-[60%] text-darkblue space-x-8">
          <div>
            <h1 className="text-base sm:text-xl md:text-2xl font-bold mb-4 text-center">Współpraca i rozwój</h1>
            <p className="text-base text-justify">
              Wierzymy w moc współpracy i otwartego dialogu. Nasz zespół regularnie uczestniczy w konferencjach branżowych, warsztatach i szkoleniach, aby być na bieżąco z najnowszymi trendami i najlepszymi praktykami w branży IT. To pozwala nam nie tylko rozwijać nasze umiejętności, ale także dzielić się wiedzą i doświadczeniem z całą społecznością.
            </p>
          </div>
          <Image src={Photo_2} alt="Photo_2" className="w-2/5 rounded-3xl" />
        </Box>
        <Box className="lg:w-[60%] text-darkblue sm:pb-0">
          <h1 className="text-base sm:text-xl md:text-2xl font-bold mb-6 text-center">Nasz zespół</h1>
          <div className="grid grid-cols-5 justify-items-center items-center gap-y-10">
            <div className="flex flex-col items-center text-center">
              <FaUserTie className="text-7xl"/>
              <p className="text-sm">Bogdan Bosak</p>
              <p className="text-xs font-sans">frontend developer</p>
            </div>  
            <div className="flex flex-col items-center text-center">
              <FaUserTie className="text-7xl"/>
              <p className="text-sm">Wiktor Mazur</p>
              <p className="text-xs font-sans">frontend developer</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaUserTie className="text-7xl"/>
              <p className="text-sm">Marcin Bator</p>
              <p className="text-xs font-sans">backend developer</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaUserTie className="text-7xl"/>
              <p className="text-sm">Bartłomiej Krówka</p>
              <p className="text-xs font-sans">frontend developer</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaUserTie className="text-7xl"/>
              <p className="text-sm">Paweł Buczek</p>
              <p className="text-xs font-sans">frontend developer</p>
            </div>
            <div className="flex flex-col items-center text-center pb-8">
              <FaUserTie className="text-7xl"/>
              <p className="text-sm">Igor Litwa</p>
              <p className="text-xs font-sans">project leader</p>
            </div>
            <div className="flex flex-col col-span-3 justify-center items-center space-y-5 px-4 pt-4 pb-8 border-2 border-b-0 border-darkblue rounded-t-3xl  ">
              <p className="text-lg">Skorzystaj z naszych usług już teraz</p>
              <Image src={Logo} alt="Logo" className="w-4/5" />
            </div>
            <div className="flex flex-col items-center text-center pb-8">
              <FaUserTie className="text-7xl"/>
              <p className="text-sm">Adrian Gola</p>
              <p className="text-xs font-sans">tester</p>
            </div>
          </div>
        </Box>
      </div>
    </Page>
    )
}
