import { Box } from "@/components/common/Box/Box";
import TitleHeader from "@/components/common/Box/TitleHeader";
import { GetConferenceDetailsWithRoleFilteringData } from "@/hooks/conference";
import People from "./People";

export default function Participants({
  conferenceIdData,
}: {
  conferenceIdData: GetConferenceDetailsWithRoleFilteringData;
}) {
  return (
    <Box className="text-darkblue w-[90%] lg:w-[60%] mt-5 mb-5">
      <TitleHeader title={"Uczestnicy"} />

      {!conferenceIdData.participantsFull ? (
        <>
          <h1 className="w-full flex justify-center text-sm sm:text-md md:text-lg lg:text-md xl:text-lg">
            Pozostało{" "}
            {conferenceIdData.participantsLimit -
              conferenceIdData.participants.length}{" "}
            / {conferenceIdData.participantsLimit}
          </h1>
          <div className="w-full grid-cols-4 grid gap-8 pt-4">
            {conferenceIdData.participants.map((participants, index) => (
              <People
                key={index}
                username={participants.username}
                photo={participants.photo}
              />
            ))}
          </div>
        </>
      ) : (
        <h1 className="w-full flex justify-center text-sm sm:text-md md:text-lg lg:text-md xl:text-lg">
          Niestety brak wolnych miejsc
        </h1>
      )}
    </Box>
  );
}
