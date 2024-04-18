import { Box } from "@/components/common/Box/Box";
import AddButton from "@/components/common/List/AddButton";
import { Lecture } from "@/hooks/conference";

export default function LectureSearch({ data, conferenceId }: { data: Lecture[]; conferenceId: number }) {
  return (
    <Box className="top-0 left-0 sticky z-20 w-full my-8">
      <div className="flex justify-between items-center font-black text-darkblue w-full">
        Znalezione wykłady: {(data as Lecture[])?.length}
        <AddButton href={`/addlecture/${conferenceId}`}>Dodaj Wykład</AddButton>
      </div>
    </Box>
  );
}
