"use client";

import Page from "@/components/common/Page/Page";
import { getAllConferences } from "@/hooks/conference";
import { useQuery } from "react-query";
import ConferenceList from "@/components/myconference/list/ConferenceList";
import Error500 from "@/components/common/Error/Error500";
import ConferenceSearch from "@/components/myconference/ConferenceSearch";
import LoadingMessage from "@/components/common/Loading/LoadingMessage";
import SignUpWarning from "@/components/conference/SignUpWarning";
import { getCurrentUser, UserData } from "@/hooks/user";
import { useEffect, useState } from "react";
import ConferenceSortAndFilter from "@/components/myconference/ConferenceSortAndFilter";

export interface SortAndFilterConferenceData {
  sort?:
    | "startDateTime"
    | "location"
    | "canceled"
    | "format"
    | "participantsFull";
  sortDirection?: "ASC" | "DESC";
  startDateTimeFrom?: string;
  startDateTimeTo?: string;
  name?: string;
  tagsIds?: number[];
  canceled?: boolean;
  showFinished?: boolean;
  verified?: boolean;
  participantsFull?: boolean;
  organizerId?: number;
  locationName?: string;
}

async function getUserData() {
  const userData = await getCurrentUser();
  if (userData && typeof userData === "object" && "role" in userData) {
    return userData;
  }
  return null;
}

export default function ConferencePage() {
  const [userData, setUserData] = useState<UserData | null>(null);

  const [sortFilterData, setSortFilterData] =
    useState<SortAndFilterConferenceData>();

  useEffect(() => {
    const fetchRole = async () => {
      const userData = await getUserData();
      setUserData(userData);
    };
    fetchRole();
  }, []);

  const { data, isLoading, isError, refetch } = useQuery(
    "AllConferences",
    () =>
      getAllConferences(
        sortFilterData?.sort,
        sortFilterData?.sortDirection,
        sortFilterData?.startDateTimeFrom,
        sortFilterData?.startDateTimeTo,
        sortFilterData?.name,
        sortFilterData?.tagsIds,
        sortFilterData?.canceled,
        sortFilterData?.showFinished,
        sortFilterData?.verified,
        sortFilterData?.participantsFull,
        sortFilterData?.organizerId,
        sortFilterData?.locationName,
      ),
    {
      staleTime: Infinity,
      refetchOnMount: "always",
    },
  );

  useEffect(() => {
    refetch();
  }, [sortFilterData, refetch]);

  if (isError) return <Error500 />;

  const [signUpWarning, setSignUpWarning] = useState<boolean>(false);
  const [tempId, setTempId] = useState<number>(-1);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    refetch();
  }, [update]);

  return (
    <Page>
      {!isLoading && data && typeof data !== "string" ? (
        <div className="w-[90%] lg:w-[60%] h-full justify-start mb-8">
          <ConferenceSortAndFilter
            sortFilterData={sortFilterData}
            setSortFilterData={setSortFilterData}
          />
          <ConferenceSearch
            numberOfConferences={data.numberOfElements}
            disablerole={true}
          />
          <div className="w-full flex flex-col gap-y-10">
            {data.content
              ?.sort((a, b) => Number(a.canceled) - Number(b.canceled))
              .map((conf) => {
                return (
                  <ConferenceList
                    key={`${conf.id}`}
                    conference={conf}
                    userData={userData}
                    setSignUpWarning={setSignUpWarning}
                    setTempId={setTempId}
                    update={update}
                    setUpdate={setUpdate}
                    mode={"conference"}
                  />
                );
              })}
          </div>
        </div>
      ) : (
        <LoadingMessage />
      )}
      {signUpWarning && (
        <SignUpWarning
          setSignUpWarning={setSignUpWarning}
          tempId={tempId}
          setTempId={setTempId}
          update={update}
          setUpdate={setUpdate}
        />
      )}
    </Page>
  );
}
