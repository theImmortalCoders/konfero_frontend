import { Box } from "@/components/common/Box/Box";
import TitleHeader from "@/components/common/Box/TitleHeader";
import LectureList from "./LectureList";
import { Lecture } from "@/hooks/conference";
import LectureSearch from "./LectureSearch";
import { GetConferenceDetailsWithRoleFilteringData } from "@/hooks/conference";

export default function Lectures({
  lectures,
  conference,
  userRole,
}: {
  lectures: Lecture[];
  conference:  GetConferenceDetailsWithRoleFilteringData;
  userRole: string;
}) {
  return (
    <Box className="text-darkblue w-[90%] lg:w-[60%] mt-5 mb-5">
      <TitleHeader title={"Wykłady"} />
      <LectureSearch
        data={lectures}
        conferenceId={conference.id}
        userRole={userRole}
      />
      {lectures.length !== 0 ? (
        <div className="w-full">
          {lectures.map((lecture, index) => (
            <div className="py-3" key={index}>
              <LectureList key={index} lecture={lecture} conference={conference} />
            </div>
          ))}
        </div>
      ) : null}
    </Box>
  );
}
