import {GetAllPendingBecomeOrganizerRequestData, GetAllUsersData, reviewOrganizerRequest} from "@/hooks/user";
import {UseQueryResult} from "react-query";
import Image from "next/image";
import {useCallback} from "react";
import { BiBuildings } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { FiPhone } from "react-icons/fi";



type props = {
  request: GetAllPendingBecomeOrganizerRequestData,
  refetchRequests: () => Promise<UseQueryResult>
}

const AcceptOrganizerCard = ({request, refetchRequests}: props) => {

  const handleAcceptOrganizer = useCallback(async (approve: boolean) => {
    try {
      const response = await reviewOrganizerRequest(request.id, approve);
      if (response === 200) {
        await refetchRequests();
      }
    } catch (error) {
      console.log(error)
    }
  },[])

  return (
    <div className="flex flex-col md:flex-row justify-between border-2 border-black w-full py-5 px-2 sm:px-6 gap-x-4 gap-y-6 rounded-3xl shadow-darkblue shadow-md">
      <div className="flex flex-col items-center gap-y-4 xs:w-56 self-center">
        <p className="font-black text-lg text-center w-full" >{request.user.username}</p>
        <Image
          src={request.user.photo}
          className="w-16 h-16 rounded-full"
          width={256}
          height={256}
          alt="użytkownik"
        />
      </div>
      <div className="flex flex-col gap-4 justify-center sm:pr-0 xs:flex-row sm:justify-around w-full text-center">
        <div className="flex flex-col gap-y-2 text-xs xs:text-base items-center">
          <p className="flex items-center gap-x-1 font-bold" >
            <BiBuildings />
            Firma
          </p>
          <p className="h-full content-center">{request.user.companyName}</p>
        </div>
        <div className="flex flex-col gap-y-2 text-xs xs:text-base items-center">
          <p className="flex items-center gap-x-1 font-bold" >
            <GrLocation />
            Adres
          </p>
          <p className="h-full content-center">{request.user.address}</p>
        </div>
        <div className="flex flex-col gap-y-2 text-xs xs:text-base items-center">
          <p className="flex items-center gap-x-1 font-bold" >
            <FiPhone />
            Telefon
          </p>
          <p className="h-full content-center">{request.user.phone}</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-y-5">
        <button
          onClick={() => {handleAcceptOrganizer(true)}}
          className="border-2 border-darkblue rounded-full px-3 md:w-full hover:bg-darkblue hover:text-close2White transition-colors shadow-md shadow-darkblue"
        >
          <p className="text-xs xs:text-base md:text-nowrap font-semibold">Zaakceptuj organizatora</p>
        </button>
        <button
          onClick={() => {handleAcceptOrganizer(false)}}
          className="border-2 border-red-600 rounded-full px-3 md:w-full hover:bg-red-600 hover:text-close2White transition-colors shadow-md shadow-red-800"
        >
          <p className="text-xs xs:text-base md:text-nowrap font-semibold">Odrzuć organizatora</p>
        </button>
      </div>
    </div>
  );
}

export default AcceptOrganizerCard;