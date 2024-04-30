"use client";

import Page from "@/components/common/Page/Page";
import { getAllConferences, GetAllConferencesData } from "@/hooks/conference";
import { useQuery } from "react-query";
import ConferenceList from "@/components/myconference/list/ConferenceList";
import Error500 from "@/components/common/Error/Error500";
import ConferenceSearch from "@/components/myconference/ConferenceSearch";
import LoadingMessage from "@/components/common/Loading/LoadingMessage";
import { getCurrentUser } from "@/hooks/user";

export default function ConferencePage() {
  const { data, isLoading, isError } = useQuery(
    "AllConferences",
    () => getAllConferences(),
    {
      staleTime: Infinity,
      refetchOnMount: "always",
    }
  );

  if (isError) return <Error500 />;

  return (
    <Page>
      {!isLoading ? (
        <div className="w-[90%] lg:w-[60%] h-full justify-start mb-8">
          <ConferenceSearch
            data={data as GetAllConferencesData}
            disablerole={true}
            role={"USER"}
          />
          <div className="w-full flex flex-col gap-y-10">
            {(data as GetAllConferencesData)?.content?.map((conf) => {
              return (
                <ConferenceList
                  key={`${conf.id}`}
                  conference={conf}
                  role={"USER"}
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
