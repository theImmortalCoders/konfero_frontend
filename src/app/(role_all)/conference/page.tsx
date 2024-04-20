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
  const { data, isLoading, isError } = useQuery({
    queryKey: "konferencje",
    queryFn: getAllConferences,
    staleTime: Infinity,
    refetchOnMount: "always",
  });

  const {
    data: currentUserData,
    isLoading: currentUserLoading,
    isError: currentUserError,
  } = useQuery("currentUser", getCurrentUser, {
    staleTime: Infinity,
  });

  if (isError || currentUserError) return <Error500 />;

  let userRole: string = "ALL";
  if (currentUserData !== undefined) {
    if (currentUserData === null) {
      userRole = "ALL";
    } else {
      if (currentUserData.role === "ORGANIZER") {
        userRole = "USER";
      } else {
        userRole = currentUserData.role;
      }
    }
  }

  return (
    <Page>
      {!isLoading && !currentUserLoading && currentUserData ? (
        <div className="w-[90%] lg:w-[60%] h-full justify-start">
          <ConferenceSearch
            data={data as GetAllConferencesData}
            role={userRole}
          />
          <div className="w-full flex flex-col gap-y-4">
            {(data as GetAllConferencesData)?.content?.map((conf) => {
              return (
                <ConferenceList
                  key={`${conf.id}`}
                  conference={conf}
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
