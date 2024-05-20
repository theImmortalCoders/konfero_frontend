"use client";
import { useEffect, useState } from "react";
import { Box } from "../common/Box/Box";
import { SortAndFilterConferenceData } from "@/app/(role_all)/conference/page";

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
    <div className="flex justify-center w-auto bg-darkblue rounded-xl py-[6px] gap-3 px-2">
      <p className="font-bold">{title}</p>
      <input
        type={type}
        className="w-auto bg-close2White text-darkblue rounded-md px-1 text-center text-sm"
        onChange={(e) => {
          type !== "checkbox"
            ? e.target.value
              ? setState(e.target.value)
              : setState(undefined)
            : setState(e.target.checked ? e.target.checked : undefined);
        }}
      />
    </div>
  );
}

function SortFilterRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row w-full justify-center items-center gap-4">
      {children}
    </div>
  );
}

export default function ConferenceSortAndFilter({
  sortFilterData,
  setSortFilterData,
}: {
  sortFilterData: SortAndFilterConferenceData | undefined;
  setSortFilterData: React.Dispatch<
    React.SetStateAction<SortAndFilterConferenceData | undefined>
  >;
}) {
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const [sort, setSort] = useState<
    "startDateTime" | "location" | "canceled" | "format" | "participantsFull"
  >("startDateTime");
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

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

  useEffect(() => {
    setSortFilterData({
      sort: sort,
      sortDirection: sortDirection,
      startDateTimeFrom: startDateTimeFrom,
      startDateTimeTo: startDateTimeTo,
      name: name,
      tagsIds: tagsIds,
      canceled: canceled,
      verified: verified,
      participantsFull: participantsFull,
      organizerId: organizerId,
      locationName: locationName,
    });
  }, [
    sort,
    sortDirection,
    startDateTimeFrom,
    startDateTimeTo,
    name,
    tagsIds,
    canceled,
    verified,
    participantsFull,
    organizerId,
    locationName,
  ]);

  return (
    <Box className="flex flex-col gap-4 w-full my-8 text-close2White">
      <SortFilterRow>
        <SortSection>
          <p className="font-bold">SORTUJ PO:</p>
          <select
            className="bg-darkblue px-2 border-b-[1px] border-close2White"
            onChange={(e) => {
              e.target.value === "startDateTime" ||
              e.target.value === "location" ||
              e.target.value === "canceled" ||
              e.target.value === "format" ||
              e.target.value === "participantsFull"
                ? setSort(e.target.value)
                : setSort("startDateTime");
            }}
          >
            <option value="startDateTime">Data rozpoczęcia</option>
            <option value="location">Lokalizacja</option>
            <option value="canceled">Odwołane</option>
            <option value="format">Forma konferencji</option>
            <option value="participantsFull">Zajęte miejsca</option>
          </select>
        </SortSection>
        <SortSection>
          <p className="font-bold">KOLEJNOŚĆ:</p>
          <select
            className="bg-darkblue px-2 border-b-[1px] border-close2White"
            onChange={(e) => {
              e.target.value === "ASC" || e.target.value === "DESC"
                ? setSortDirection(e.target.value)
                : setSortDirection("ASC");
            }}
          >
            <option value="ASC">Rosnąco</option>
            <option value="DESC">Malejąco</option>
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
        {showFilters ? "- Ukryj filtry" : "+ Pokaż filtry"}
      </p>
      {showFilters && (
        <>
          <SortFilterRow>
            <FilterSection
              title="Rozpoczyna się po:"
              type="datetime-local"
              setState={setStartDateTimeFrom}
            ></FilterSection>
            <FilterSection
              title="Kończy się przed:"
              type="datetime-local"
              setState={setStartDateTimeTo}
            ></FilterSection>
          </SortFilterRow>
          <SortFilterRow>
            <FilterSection
              title="Nazwa:"
              type="text"
              setState={setName}
            ></FilterSection>
            <FilterSection
              title="Organizator:"
              type="text"
              setState={setOrganizerId}
            ></FilterSection>
            <FilterSection
              title="Lokalizacja:"
              type="string"
              setState={setLocationName}
            ></FilterSection>
          </SortFilterRow>
          <SortFilterRow>
            <FilterSection
              title="Tagi:"
              type="text"
              setState={setTagsIds}
            ></FilterSection>
            <FilterSection
              title="Brak miejsc:"
              type="checkbox"
              setState={setParticipantsFull}
            ></FilterSection>
            <FilterSection
              title="Odwołane:"
              type="checkbox"
              setState={setCanceled}
            ></FilterSection>
            <FilterSection
              title="Zweryfikowane:"
              type="checkbox"
              setState={setVerified}
            ></FilterSection>
          </SortFilterRow>
        </>
      )}
    </Box>
  );
}
