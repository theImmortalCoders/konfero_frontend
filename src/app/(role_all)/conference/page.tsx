"use client";

import Page from "@/components/common/Page/Page";
import { getAllConferences, GetAllConferencesData } from "@/hooks/conference";
import { useQuery } from "react-query";
import ConferenceList from "@/components/myconference/list/ConferenceList";
import Error500 from "@/components/common/Error/Error500";
import ConferenceSearch from "@/components/myconference/ConferenceSearch";
import LoadingMessage from "@/components/common/Loading/LoadingMessage";
import SignUpWarning from "@/components/conference/SignUpWarning";
import { getCurrentUser } from "@/hooks/user";
import { useEffect, useState } from "react";

async function getRole() {
  const userData = await getCurrentUser();
  if (userData && typeof userData === 'object' && 'role' in userData) {
    return userData.role;
  }
  return null;
}

export default function ConferencePage() {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      const role = await getRole();
      setUserRole(role);
    };
    fetchRole();
  }, []);

  const { data, isLoading, isError, refetch } = useQuery(
    "AllConferences",
    () => getAllConferences(),
    {
      staleTime: Infinity,
      refetchOnMount: "always",
    }
  );


  if (isError) return <Error500 />;
  const [signUpWarning, setSignUpWarning] = useState<boolean>(false);
  const [tempId, setTempId] = useState<number>(-1);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    refetch();
  }, [update]);

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
                  role={userRole}
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
          <SignUpWarning setSignUpWarning={setSignUpWarning} tempId={tempId} setTempId={setTempId} update={update} setUpdate={setUpdate}/>
      )}
    </Page>
  );
}
