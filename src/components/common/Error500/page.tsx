import Image from "next/image";
import Logo from "@/assets/logo/_70fa34e3-d819-4d5b-9aa7-fa543348061c.jpeg";
export default function Error500() {
  return (
    <main className="bg-black2darkblue-gradient flex min-h-max justify-center">
      <div className="px-[5%] justify-center items-center flex flex-col space-y-10 text-close2White ">
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl">
          Występują problemy techniczne
        </h1>
        <Image
          src={Logo}
          alt={"Konfero logo"}
          width={300}
          height={300}
          className="rounded-3xl"
          priority
        />
        <h3 className="text-center text-1xl sm:text-2xl">Zapraszamy później</h3>
      </div>
    </main>
  );
}