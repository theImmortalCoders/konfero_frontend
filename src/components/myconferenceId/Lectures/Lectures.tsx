import { Box } from "@/components/common/Box/Box";
import TitleHeader from "@/components/common/Box/TitleHeader";
import LectureList from "./LectureList";
import { Lecture } from "@/hooks/conference";

export default function Lectures({ lectures }: { lectures: Lecture[] }) {
  return (
    <Box className="text-darkblue w-[90%] lg:w-[60%] mt-5 mb-5">
      <TitleHeader title={"Wykłady"} />
      <div className="w-full pt-4">
        {lectures.map((lecture, index) => (
          <LectureList key={index} lecture={lecture} />
        ))}
      </div>
    </Box>
  );
}
