import { Box } from "@/components/common/Box/Box";
import TitleHeader from "@/components/common/Box/TitleHeader";
import LectureList from "./LectureList";
import { Lecture } from "@/hooks/conference";
import LectureSearch from "./LectureSearch";

export default function Lectures({ lectures }: { lectures: Lecture[] }) {
  return (
    <Box className="text-darkblue w-[90%] lg:w-[60%] mt-5 mb-5">
      <TitleHeader title={"Wykłady"} />
      <LectureSearch data={lectures} />
      {lectures.length !== 0 ? (
        <div className="w-full">
          {lectures.map((lecture, index) => (
            <LectureList key={index} lecture={lecture} />
          ))}
        </div>
      ) : null}
    </Box>
  );
}
