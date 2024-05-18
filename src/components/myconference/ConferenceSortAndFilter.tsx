"use client";
import { useState } from "react";
import { Box } from "../common/Box/Box";

function SortSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center w-2/5 bg-darkblue rounded-xl py-[6px] gap-4">
      {children}
    </div>
  );
}

function FilterSection({
  title,
  type,
  setState,
}: {
  title: string;
  type: string;
  setState: React.Dispatch<React.SetStateAction<any | undefined>>;
}) {
  return (
    <div className="flex justify-center w-auto bg-darkblue rounded-xl py-[6px] gap-4 px-2">
      <p className="font-bold">{title}</p>
      <input
        type={type}
        className="w-auto bg-close2White text-darkblue rounded-md px-1 text-center text-sm"
        onChange={(e) => {
          setState(e.target.value);
        }}
      />
    </div>
  );
}

function SortFilterRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row w-full justify-center items-center gap-6">
      {children}
    </div>
  );
}

export default function ConferenceSortAndFilter({
  onData,
}: {
  onData: (data: any) => void;
}) {
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const [startDateTimeFrom, setStartDateTimeFrom] = useState<
    string | undefined
  >(undefined);
  const [startDateTimeTo, setStartDateTimeTo] = useState<string | undefined>(
    undefined
  );
  const [name, setName] = useState<string | undefined>(undefined);
  const [tagsIds, setTagsIds] = useState<number[] | undefined>(undefined);
  const [canceled, setCanceled] = useState<boolean | undefined>(undefined);
  const [verified, setVerified] = useState<boolean | undefined>(undefined);
  const [participantsFull, setParticipantsFull] = useState<boolean | undefined>(
    undefined
  );
  const [organizerId, setOrganizerId] = useState<number | undefined>(undefined);
  const [locationName, setLocationName] = useState<string | undefined>(
    undefined
  );

  return (
    <Box className="flex flex-col gap-4 w-full my-8 text-close2White">
      <SortFilterRow>
        <SortSection>
          <p className="font-bold">SORTUJ PO:</p>
          <select className="bg-darkblue px-2 border-b-[1px] border-close2White">
            <option value="startDateTime">Data rozpoczęcia</option>
            <option value="location">Lokalizacja</option>
            <option value="canceled">Odwołane</option>
            <option value="format">Forma konferencji</option>
            <option value="participantsFull">Zajęte miejsca</option>
          </select>
        </SortSection>
        <SortSection>
          <p className="font-bold">KOLEJNOŚĆ:</p>
          <select className="bg-darkblue px-2 border-b-[1px] border-close2White">
            <option value="">Rosnąco</option>
            <option value="">Malejąco</option>
          </select>
        </SortSection>
      </SortFilterRow>
      <hr className="size-[2px] rounded-full w-full bg-darkblue" />
      <p
        onClick={() => {
          setShowFilters(!showFilters);
        }}
        className="text-darkblue font-bold -mt-4 w-full flex gap-1 items-center justify-end cursor-pointer"
      >
        {showFilters ? "Ukryj" : "Filtrowanie"}
      </p>
      {showFilters && (
        <>
          <SortFilterRow>
            <FilterSection
              title="Data od:"
              type="date"
              setState={setStartDateTimeFrom}
            ></FilterSection>
            <FilterSection
              title="Data do:"
              type="date"
              setState={setStartDateTimeTo}
            ></FilterSection>
            <FilterSection
              title="Tytuł:"
              type="text"
              setState={setName}
            ></FilterSection>
          </SortFilterRow>
        </>
      )}
    </Box>
  );
}
