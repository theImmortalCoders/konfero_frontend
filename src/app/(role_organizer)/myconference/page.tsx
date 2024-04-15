'use client'

import Page from "@/components/common/Page/Page";
import ListItem from "@/components/MyconferenceList/ListItem"
import {getAllConferences, GetAllConferencesData} from "@/hooks/conference"
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useQuery} from "react-query";

export default function MyConferenceListPage() {

  const router = useRouter();

  const {
    data,
    status,
  } = useQuery({
    queryKey: 'konferencje',
    queryFn: getAllConferences,
    staleTime: Infinity,
  })

  useEffect(() => {
    router.refresh();
  }, []);

  return(
    <Page>
      <div className="flex flex-col items-center my-8 space-y-7 w-2/3">
        {
          status === "success" ?
          (data as GetAllConferencesData)?.content?.map((conf) => {
            return (<ListItem key={`${(conf).id}`} conference={conf}/>);
          }) : <></>
        }
      </div>
    </Page>
  );
}
