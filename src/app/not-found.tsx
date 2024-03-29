import Image from "next/image";
import Logo from "/public/_70fa34e3-d819-4d5b-9aa7-fa543348061c.jpeg"
export default function NotFound() {
  return (
    <main className="bg-black2darkblue-gradient flex min-h-max justify-center mt-navbar">
      <div className="px-20 justify-center items-center flex flex-col space-y-10 text-white sm:text-3xl text-2xl md:text-4xl">
        <h1>Błąd 404</h1>
        <Image
          src={Logo}
          alt={"Konfero logo"}
          width={300}
          height={300}
          className="rounded-3xl"
          priority
        />
        <h2 className="text-center">
          Poszukiwana strona nie istnieje
        </h2>
      </div>
    </main>
  )
}