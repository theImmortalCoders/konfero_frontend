"use client";

import Page from "@/components/common/Page/Page";
import {
  GetAllConferencesData,
  getNotCanceledConferences,
} from "@/hooks/conference";
import { useQuery } from "react-query";
import ConferenceList from "@/components/myconference/list/ConferenceList";
import Error500 from "@/components/common/Error/Error500";
import ConferenceSearch from "@/components/myconference/ConferenceSearch";
import LoadingMessage from "@/components/common/Loading/LoadingMessage";

export default function MyConferenceListPage() {
  const { data, isLoading, isError } = useQuery(
    "konferencje",
    () => getNotCanceledConferences(),
    {
      staleTime: Infinity,
      refetchOnMount: "always",
    }
  );

  if (isError) return <Error500 />;

  return (
    <Page className="pb-10">
      {!isLoading ? (
        <div className="w-[90%] lg:w-[60%] h-full justify-start">
          <ConferenceSearch
            data={data as GetAllConferencesData}
            role={"ORGANIZER"}
          />
          <div className="w-full flex flex-col gap-y-8">
            {(data as GetAllConferencesData)?.content?.map((conf) => {
              return (
                <ConferenceList
                  key={`${conf.id}`}
                  conference={conf}
                  role={"ORGANIZER"}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <LoadingMessage />
      )}
    </Page>
  );
}
