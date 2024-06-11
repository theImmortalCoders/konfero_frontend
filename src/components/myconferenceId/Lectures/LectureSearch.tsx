"use client";
import { Box } from "@/components/common/Box/Box";
import AddButton from "@/components/common/List/AddButton";
import {
  GetConferenceDetailsWithRoleFilteringData,
  Lecture,
} from "@/hooks/conference";
import { useEffect, useState } from "react";
import { isUserInOrganizers } from "@/hooks/authorise/authorization";
import { UserData } from "@/hooks/user";

export default function LectureSearch({
  lectures,
  conference,
  userData,
}: {
  lectures: Lecture[];
  conference: GetConferenceDetailsWithRoleFilteringData;
  userData: UserData;
}) {
  const [isOrganizer, setIsOrganizer] = useState<boolean | undefined>(
    undefined,
  );

  useEffect(() => {
    const checkIfOrganizer = async () => {
      if (userData) {
        const isOrganizerResult = await isUserInOrganizers(
          userData,
          conference,
        );
        setIsOrganizer(isOrganizerResult);
      }
    };

    checkIfOrganizer();
  }, [userData, conference]);

  return (
    <Box className="w-full my-8">
      <div className="flex justify-between items-center font-black text-darkblue w-full">
        Znalezione wykłady: {(lectures as Lecture[])?.length}
        {isOrganizer || (userData && userData.role === "ADMIN") ? (
          <AddButton href={`/addlecture/${conference.id}`}>
            Dodaj Wykład
          </AddButton>
        ) : null}
      </div>
    </Box>
  );
}
