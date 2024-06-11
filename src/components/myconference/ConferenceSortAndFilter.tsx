"use client";
import { useEffect, useState } from "react";
import { Box } from "../common/Box/Box";
import { SortAndFilterConferenceData } from "@/app/conference/page";
import { Tag } from "@/hooks/conference";
import SearchBarTag from "../tag/SearchBarTag";
import { getAllTags } from "@/hooks/tag";
import { TiDeleteOutline } from "react-icons/ti";

function SortSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row justify-center items-center w-full xs:w-1/2 xl:w-2/5 bg-darkblue rounded-xl py-[6px] gap-[6px] sm:gap-4 px-4 xs:px-2">
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
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagsIds, setTagsIds] = useState<number[]>([]);
  const [tagsNames, setTagsNames] = useState<string[]>([]);
  const [cleanSearchBar, setCleanSearchBar] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      const result = await getAllTags();
      if (typeof result !== "string") {
        setTags(result);
      }
    };

    fetchTags();
  }, []);

  const handleTagSelected = (tag: Tag) => {
    setTagsIds((prevState) => {
      if (!prevState.includes(tag.id)) {
        return [...prevState, tag.id];
      }
      return prevState;
    });
    setTagsNames((prevState) => {
      if (!prevState.includes(tag.tagName)) {
        return [...prevState, tag.tagName];
      }
      return prevState;
    });
    setCleanSearchBar(true);
  };

  useEffect(() => {
    if (tagsIds.length !== 0) {
      setCleanSearchBar(false);
    }
    setState(tagsIds.length !== 0 ? tagsIds : undefined);
  }, [tagsIds]);

  const handleDeleteTags = (indexToDelete: number) => {
    setTagsIds(tagsIds.filter((_, index) => index !== indexToDelete));
    setTagsNames(tagsNames.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div
      className={`flex flex-row ${
        type === "tag" || type === "text"
          ? "xs:flex-row sm:flex-row"
          : "xs:flex-col sm:flex-row"
      } justify-center ${
        type === "tag" ? "items-start" : "items-center"
      } bg-darkblue rounded-xl py-[6px] gap-3 px-4 w-full sm:w-auto text-center`}
    >
      <p className="font-bold">{title}</p>
      {type !== "tag" ? (
        <input
          type={type}
          className="w-auto bg-close2White text-darkblue rounded-md px-1 text-center text-sm"
          onChange={(e) => {
            type !== "checkbox"
              ? e.target.value
                ? setState(e.target.value)
                : setState(undefined)
              : setState(e.target.checked);
          }}
        />
      ) : (
        <div className="text-center">
          <SearchBarTag
            items={tags}
            renderItem={(tag) => `${tag.tagName}`}
            onItemSelected={handleTagSelected}
            placeholder="Dodaj tagi"
            handleReset={cleanSearchBar}
            pt={-1}
            isFiltering={true}
          />
          <div
            className={`grid grid-cols-1 gap-1 w-full text-blue ${
              tagsNames.length !== 0 ? "pt-2" : "pt-0"
            }`}
          >
            {tagsNames.map((name, index) => (
              <span
                key={index}
                className="flex flex-row items-center w-full text-sm text-close2White justify-between p-1 border border-close2White rounded-lg"
              >
                {name}
                <TiDeleteOutline
                  className="size-5 cursor-pointer"
                  onClick={() => handleDeleteTags(index)}
                />
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SortFilterRow({
  children,
  isTagsThere,
  className,
}: {
  children: React.ReactNode;
  isTagsThere?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${className ? className : 'flex'} w-full justify-center ${
        isTagsThere
          ? "items-center 2xl:items-start flex-col 2xl:flex-row"
          : "items-center flex-col xs:flex-row"
      } gap-4`}
    >
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
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("DESC");

  const [startDateTimeFrom, setStartDateTimeFrom] = useState<
    string | undefined
  >(undefined);
  const [startDateTimeTo, setStartDateTimeTo] = useState<string | undefined>(
    undefined,
  );
  const [name, setName] = useState<string | undefined>(undefined);
  const [tagsIds, setTagsIds] = useState<number[] | undefined>(undefined);
  const [canceled, setCanceled] = useState<boolean | undefined>(false);
  const [showFinished, setShowFinished] = useState<boolean | undefined>(false);
  const [verified, setVerified] = useState<boolean | undefined>(false);
  const [participantsFull, setParticipantsFull] = useState<boolean | undefined>(
    false,
  );
  const [organizerId, setOrganizerId] = useState<number | undefined>(undefined);
  const [locationName, setLocationName] = useState<string | undefined>(
    undefined,
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
      showFinished: showFinished,
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
    showFinished,
    verified,
    participantsFull,
    organizerId,
    locationName,
  ]);

  return (
    <Box className="flex flex-col gap-4 w-full my-8 text-close2White text-sm md:text-base">
      <SortFilterRow>
        <SortSection>
          <p className="font-bold text-center">SORTUJ:</p>
          <select
            className="bg-darkblue px-1 border-b-[1px] border-close2White"
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
          <p className="font-bold text-center">KOLEJNOŚĆ:</p>
          <select
            className="bg-darkblue px-2 border-b-[1px] border-close2White"
            onChange={(e) => {
              e.target.value === "ASC" || e.target.value === "DESC"
                ? setSortDirection(e.target.value)
                : setSortDirection("DESC");
            }}
          >
            <option value="DESC">Malejąco</option>
            <option value="ASC">Rosnąco</option>
          </select>
        </SortSection>
      </SortFilterRow>
      <hr className="size-[2px] rounded-full w-full bg-darkblue" />
      <p
        onClick={() => {
          setShowFilters(!showFilters);
        }}
        className="text-darkblue font-bold -mt-2 md:-mt-4 w-full flex gap-1 items-center justify-end cursor-pointer"
      >
        {showFilters ? "- Ukryj filtry" : "+ Pokaż filtry"}
      </p>
      <SortFilterRow className={`${showFilters ? 'flex' : 'hidden'}`}>
        <FilterSection
          title="Rozpoczęcie po:"
          type="datetime-local"
          setState={setStartDateTimeFrom}
        ></FilterSection>
        <FilterSection
          title="Koniec przed:"
          type="datetime-local"
          setState={setStartDateTimeTo}
        ></FilterSection>
      </SortFilterRow>
      <SortFilterRow className={`${showFilters ? 'flex' : 'hidden'}`}>
        <FilterSection
          title="Pokaż pełne:"
          type="checkbox"
          setState={setParticipantsFull}
        ></FilterSection>
        <FilterSection
          title="Pokaż odwołane:"
          type="checkbox"
          setState={setCanceled}
        ></FilterSection>
        <FilterSection
            title="Pokaż zakończone:"
            type="checkbox"
            setState={setShowFinished}
        ></FilterSection>
        <FilterSection
          title="Tylko zweryfikowane:"
          type="checkbox"
          setState={setVerified}
        ></FilterSection>
      </SortFilterRow>
      <SortFilterRow className={`${showFilters ? 'flex' : 'hidden'}`} isTagsThere={true}>
        <FilterSection
          title="Tagi:"
          type="tag"
          setState={setTagsIds}
        ></FilterSection>
        <FilterSection
          title="Nazwa:"
          type="text"
          setState={setName}
        ></FilterSection>
        <FilterSection
          title="Lokalizacja:"
          type="text"
          setState={setLocationName}
        ></FilterSection>
      </SortFilterRow>
    </Box>
  );
}
