import Image from "next/image";
import Logo from "@/assets/logo/logo_table.jpeg";
export default function NotFound() {
  return (
    <main className="bg-black2darkblue-gradient flex min-h-max justify-center">
      <div className="px-[5%] justify-center items-center flex flex-col space-y-10 text-close2White">
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl">
          Błąd 404
        </h1>
        <Image
          src={Logo}
          alt={"Konfero logo"}
          width={300}
          height={300}
          className="rounded-3xl"
          priority
        />
        <h2 className="text-center text-1xl sm:text-2xl">
          Poszukiwana strona nie istnieje
        </h2>
      </div>
    </main>
  );
}
