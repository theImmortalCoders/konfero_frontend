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
  const { isAuthorise, userRole } = useAuth(["USER", "ORGANIZER", "ADMIN"]);

  const { data, isLoading, isError } = useQuery(
    "NotCanceledConferences",
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
      {!isLoading && isAuthorise === true && userRole ? (
        <div className="w-[90%] lg:w-[60%] h-full justify-start mb-8">
          <ConferenceSearch
            data={data as GetAllConferencesData}
            disablerole={false}
            role={userRole}
          />
          <div className="w-full flex flex-col gap-y-10">
            {(data as GetAllConferencesData)?.content?.map((conference) => {
              return (
                <ConferenceList
                  key={`${conference.id}`}
                  conference={conference}
                  role={userRole}
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
