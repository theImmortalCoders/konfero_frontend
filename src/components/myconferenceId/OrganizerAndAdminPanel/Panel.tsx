"use client";
import { Box } from "@/components/common/Box/Box";
import {
  GetConferenceDetailsWithRoleFilteringData,
  cancelConference,
  deleteConference,
} from "@/hooks/conference";
import ListItemOptions from "@/components/myconference/list/ListItemOptions";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { BsFillTrash3Fill } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import TitleHeader from "@/components/common/Box/TitleHeader";

export default function Panel({
  conferenceIdData,
}: {
  conferenceIdData: GetConferenceDetailsWithRoleFilteringData;
}) {
  const router = useRouter();

  const handleEdit = useCallback(
    (id: number) => {
      router.replace(`/updateconference/${id.toString()}`);
    },
    [router]
  );

  const handleDelete = useCallback((id: number) => {
    deleteConference(id);
    router.push("/myconference");
  }, []);

  const handleCancel = useCallback((id: number) => {
    cancelConference(id);
    router.push("/myconference");
  }, []);

  return (
    <Box className="text-darkblue w-[90%] lg:w-[60%]">
      <TitleHeader title={"Panel Edycji"} />
      <div className="grid grid-cols-1 gap-y-4 sm:flex sm:justify-evenly mt-4">
        <button
          className="border-2 border-blue bg-inherit hover:bg-blue hover:text-close2White text-sm sm:text-md lg:text-lg font-medium py-1 px-2 rounded-2xl flex items-center justify-center"
          onClick={() => handleEdit(conferenceIdData.id)}
        >
          <GoPencil />
          <p>&nbsp;Edytuj konferencje</p>
        </button>
        {conferenceIdData.participants === null ||
        conferenceIdData.participants.length === 0 ? (
          <button
            onClick={() => handleDelete(conferenceIdData.id)}
            className="border-2 border-red-600 bg-close2White hover:bg-red-600 text-inherit hover:text-close2White text-sm sm:text-md lg:text-lg font-medium py-1 px-2 rounded-2xl flex items-center justify-center"
          >
            <BsFillTrash3Fill />
            <p>&nbsp;Usuń konferencję</p>
          </button>
        ) : (
          <button
            onClick={() => handleCancel(conferenceIdData.id)}
            className="border-2 border-red-600 bg-close2White hover:bg-red-600 text-inherit hover:text-close2White text-sm sm:text-md lg:text-lg font-medium py-1 px-2 rounded-2xl flex items-center justify-center"
          >
            <BsFillTrash3Fill />
            <p>&nbsp;Odwołaj konferencję</p>
          </button>
        )}
      </div>
    </Box>
  );
}
