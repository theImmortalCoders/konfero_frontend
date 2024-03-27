import Image from "next/image";
import Logo from "/public/_70fa34e3-d819-4d5b-9aa7-fa543348061c.jpeg"
export default function NotFound() {
  return (
    <div className="bg-black2darkblue-gradient flex flex-col h-screen items-center justify-center space-y-10">
      <h1 className="text-1xl sm:text-3xl md:text-4xl text-bold text-white" >Błąd 404</h1>
      <div className="flex mx-auto">
        <Image
          src={Logo}
          alt={"Konfero logo"}
          width={300}
          height={300}
          className="rounded-3xl"
          priority
        />
      </div>
      <div className="mx-auto text-center">
        <h2 className="text-1xl sm:text-3xl md:text-4xl  text-bold text-white">
          Poszukiwana strona nie istnieje
        </h2>
      </div>
    </div>
  )
}