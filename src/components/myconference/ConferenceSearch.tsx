import { GetAllConferencesData } from "@/hooks/conference";
import { Box } from "../common/Box/Box";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

export default function ConferenceSearch({
  data,
}: {
  data: GetAllConferencesData;
}) {
  return (
    <Box className="top-0 left-0 sticky z-20 w-full my-8">
      <div className="flex justify-between items-center font-black text-darkblue w-full">
        Znalezione konferencje:{" "}
        {(data as GetAllConferencesData)?.numberOfElements}
        <Link
          href={"/"}
          className="flex justify-center items-center gap-x-2 px-2 py-2 sm:py-0 w-min md:text-nowrap border-2 border-black rounded-xl"
        >
          <p className="sm:inline-block hidden">Dodaj Konferencje</p>
          <FaPlus />
        </Link>
      </div>
    </Box>
  );
}
