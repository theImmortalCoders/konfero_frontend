import { Box } from "@/components/common/Box/Box";
import AddButton from "@/components/common/List/AddButton";
import { Lecture } from "@/hooks/conference";

export default function LectureSearch({
  data,
  conferenceId,
  userRole,
}: {
  data: Lecture[];
  conferenceId: number;
  userRole: string;
}) {
  return (
    <Box className="w-full my-8">
      <div className="flex justify-between items-center font-black text-darkblue w-full">
        Znalezione wykłady: {(data as Lecture[])?.length}
        {userRole === "ORGANIZER" || userRole === "ADMIN" ? (
          <AddButton href={`/addlecture/${conferenceId}`}>
            Dodaj Wykład
          </AddButton>
        ) : null}
      </div>
    </Box>
  );
}
