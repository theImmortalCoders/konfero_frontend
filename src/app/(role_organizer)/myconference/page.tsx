"use client";

import Page from "@/components/common/Page/Page";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { getAllConferences, GetAllConferencesData } from "@/hooks/conference";
import { useQuery } from "react-query";
import { Box } from "@/components/common/Box/Box";
import ConferenceList from "@/components/MyconferenceList/ConferenceList";
import Error500 from "@/components/common/Error/Error500";

export default function MyConferenceListPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: "konferencje",
    queryFn: getAllConferences,
    staleTime: Infinity,
    refetchOnMount: "always",
  });

  if (isError) return <Error500 />;

  return (
    <Page>
      {!isLoading ? (
        <div className="w-[90%] lg:w-[60%] h-full justify-start">
          <Box className="top-0 left-0 sticky z-20 w-full my-8">
            <div className="flex justify-between items-center font-black text-darkblue w-full">
              Znalezione konferencje:{" "}
              {(data as GetAllConferencesData)?.numberOfElements}
              <Link
                href={"/"}
                className="flex justify-center items-center gap-x-2 px-2 py-2 sm:py-0 w-min md:text-nowrap border-2 border-black rounded-xl"
              >
                <p className="sm:inline-block hidden">Dodaj Konferencje</p>
                <FaPlus />
              </Link>
            </div>
          </Box>
          <div className="w-full flex flex-col gap-y-4">
            {(data as GetAllConferencesData)?.content?.map((conf) => {
              return <ConferenceList key={`${conf.id}`} conference={conf} />;
            })}
          </div>
        </div>
      ) : (
        <p className="text-2xl text-close2White">Trwa ładowanie danych...</p>
      )}
    </Page>
  );
}
