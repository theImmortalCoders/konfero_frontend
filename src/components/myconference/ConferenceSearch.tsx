import { GetAllConferencesData } from "@/hooks/conference";
import { Box } from "../common/Box/Box";
import AddButton from "../common/List/AddButton";

export default function ConferenceSearch({
  data,
  role,
}: {
  data: GetAllConferencesData;
  role: string;
}) {
  return (
    <Box className="w-full my-8">
      <div className="flex justify-between items-center font-black text-darkblue w-full">
        Znalezione konferencje:{" "}
        {(data as GetAllConferencesData)?.numberOfElements}
        {role === "ORGANIZER" ? (
          <AddButton href={"/addconference"}>Dodaj Konferencje</AddButton>
        ) : null}
      </div>
    </Box>
  );
}
