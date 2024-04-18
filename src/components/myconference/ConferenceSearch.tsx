import { GetAllConferencesData } from "@/hooks/conference";
import { Box } from "../common/Box/Box";
import AddButton from "../common/List/AddButton";

export default function ConferenceSearch({
  data,
}: {
  data: GetAllConferencesData;
}) {
  return (
    <Box className="top-0 left-0 sticky z-20 w-full my-8">
      <div className="flex justify-between items-center font-black text-darkblue w-full">
        Znalezione konferencje:{" "}
        {(data as GetAllConferencesData)?.numberOfElements}
        <AddButton href={"/addconference"}>Dodaj Konferencje</AddButton>
      </div>
    </Box>
  );
}
