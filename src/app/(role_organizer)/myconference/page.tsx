"use client";

import Page from "@/components/common/Page/Page";
import { getAllConferences, GetAllConferencesData } from "@/hooks/conference";
import { useQuery } from "react-query";
import ConferenceList from "@/components/myconference/list/ConferenceList";
import Error500 from "@/components/common/Error/Error500";
import ConferenceSearch from "@/components/myconference/ConferenceSearch";

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
          <ConferenceSearch data={data as GetAllConferencesData} />
          <div className="w-full flex flex-col gap-y-4">
            {(data as GetAllConferencesData)?.content?.map((conf) => {
              return <ConferenceList key={`${conf.id}`} conference={conf} />;
            })}
          </div>
        </div>
      ) : (
        <h1 className="text-2xl text-close2White pt-[20%]">
          Trwa ładowanie danych...
        </h1>
      )}
    </Page>
  );
}
