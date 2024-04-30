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
import useAuth from "@/hooks/useAuth";
import NotFound from "@/app/not-found";

export default function MyConferenceListPage() {
  const { isAuthorise, isLoading: isAuthLoading } = useAuth([
    "ORGANIZER",
    "ADMIN",
  ]);

  const { data, isLoading, isError } = useQuery(
    "konferencje",
    () => getNotCanceledConferences(),
    {
      staleTime: Infinity,
      refetchOnMount: "always",
    }
  );

  if (isError) return <Error500 />;

  if (isAuthorise === false) return <NotFound />;

  return (
    <Page className="pb-10">
      {!isLoading && !isAuthLoading ? (
        <div className="w-[90%] lg:w-[60%] h-full justify-start mb-8">
          <ConferenceSearch
            data={data as GetAllConferencesData}
            role={"ORGANIZER"}
          />
          <div className="w-full flex flex-col gap-y-10">
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
