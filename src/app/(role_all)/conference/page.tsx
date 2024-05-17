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
import { Box } from "@/components/common/Box/Box";

async function getRole() {
  const userData = await getCurrentUser();
  if (userData && typeof userData === "object" && "role" in userData) {
    return userData.role;
  }
  return null;
}

function SortFilterSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center w-2/5 bg-darkblue rounded-xl py-[6px] gap-4">
      {children}
    </div>
  );
}

function SortFilterRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row w-full justify-center items-center gap-6">
      {children}
    </div>
  );
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
      {!isLoading && data && typeof data !== "string" ? (
        <div className="w-[90%] lg:w-[60%] h-full justify-start mb-8">
          <Box className="flex flex-col gap-4 w-full my-8 text-close2White">
            <SortFilterRow>
              <SortFilterSection>
                <p className="font-bold">SORTUJ:</p>
                <select className="bg-darkblue px-2 border-b-[1px] border-close2White">
                  <option value="">aaa</option>
                  <option value="">bbb</option>
                  <option value="">ccc</option>
                </select>
              </SortFilterSection>
              <SortFilterSection>
                <p className="font-bold">KOLEJNOŚĆ:</p>
                <select className="bg-darkblue px-2 border-b-[1px] border-close2White">
                  <option value="">Rosnąco</option>
                  <option value="">Malejąco</option>
                </select>
              </SortFilterSection>
            </SortFilterRow>
            <hr className="size-[2px] rounded-full w-full bg-darkblue" />
            <SortFilterRow>
              <SortFilterSection>
                <p>Data rozpoczęcia od:</p>
                <p>sroda</p>
              </SortFilterSection>
              <SortFilterSection>
                <p>Data rozpoczęcia do:</p>
                <p>piatek</p>
              </SortFilterSection>
            </SortFilterRow>
          </Box>
          <ConferenceSearch
            numberOfConferences={data.totalElements}
            disablerole={true}
            role={"USER"}
          />
          <div className="w-full flex flex-col gap-y-10">
            {data.content?.map((conf) => {
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
