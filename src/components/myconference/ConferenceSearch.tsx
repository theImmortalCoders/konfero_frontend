import { Box } from "../common/Box/Box";
import AddButton from "../common/List/AddButton";
import { UserData } from "@/hooks/user";

export default function ConferenceSearch({
  numberOfConferences,
  disablerole,
  userData,
}: {
  numberOfConferences: number;
  disablerole: boolean;
  userData?: UserData;
}) {
  return (
    <Box className="w-full my-8">
      <div className="flex flex-col xs:flex-row gap-y-2 justify-between items-center font-black text-darkblue w-full">
        <p className="text-center break-all 2xs:break-normal">
          Znalezione konferencje: {numberOfConferences}
        </p>
        {!disablerole &&
        (userData?.role === "ORGANIZER" || userData?.role === "ADMIN") ? (
          <AddButton href={"/addconference"}>Dodaj Konferencje</AddButton>
        ) : null}
      </div>
    </Box>
  );
}
