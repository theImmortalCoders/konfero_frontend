'use client'

import {useQuery, UseQueryResult} from "react-query";
import {getAllPendingBecomeOrganizerRequest, GetAllPendingBecomeOrganizerRequestData, getAllUsers} from "@/hooks/user";
import AcceptOrganizerCard from "@/components/admin/AcceptOrganizerCard";

const AcceptOrganizer = () => {

  const {
    data: pendingRequestsData,
    isLoading: isLoadingRequests,
    isError: isErrorRequests,
    refetch: refetchRequests,
  } = useQuery("organizers requests", getAllPendingBecomeOrganizerRequest)

  return (
    <div className="flex flex-col justify-center gap-y-5">
      {
        !isLoadingRequests &&
        pendingRequestsData &&
        typeof pendingRequestsData !== "string" ?
        pendingRequestsData.map((req, index) => {
          return (
            <AcceptOrganizerCard
              request={req}
              refetchRequests={refetchRequests}
              key={index}
            />
          );
        }) : <p>Ładowanie...</p>
      }
    </div>
  );
}

export default AcceptOrganizer;