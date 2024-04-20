"use client";
import { Box } from "@/components/common/Box/Box";
import {
  GetConferenceDetailsWithRoleFilteringData,
  cancelConference,
  deleteConference,
} from "@/hooks/conference";
import ListItemOptions from "@/components/myconference/list/ListItemOptions";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

export default function Panel({
  conferenceIdData,
}: {
  conferenceIdData: GetConferenceDetailsWithRoleFilteringData;
}) {
  const router = useRouter();
  const handleDelete = useCallback(() => {
    deleteConference(conferenceIdData.id);
    router.push("/myconference");
  }, []);

  const handleCancel = useCallback(() => {
    cancelConference(conferenceIdData.id);
    router.push("/myconference");
  }, []);
  return (
    <Box className="text-darkblue w-[90%] lg:w-[60%] mt-5">
      <h1>Panel Edycji</h1>
      <ListItemOptions
        conferenceIdData={conferenceIdData}
        handleDelete={handleDelete}
        handleCancel={handleCancel}
      />
    </Box>
  );
}
