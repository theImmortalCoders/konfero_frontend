'use client'

import Page from "@/components/common/Page/Page";
import ListItem from "@/components/MyconferenceList/ListItem"
import { getAllConferences } from "@/hooks/conference"
import {useQuery} from "react-query";
import {Property} from "csstype";

export default function MyConferenceListPage() {


  const {
    data,
    status,
  } = useQuery({
    queryKey: 'konferencje',
    queryFn: getAllConferences,
    staleTime: Infinity,
  })

  return(
    <Page>
      <div className="flex flex-col items-center my-8 space-y-7 w-2/3">
        <p>{status}</p>
        {
          status === 'success'?
          data?.content.map((conf) => {
            return (<ListItem key={`${conf.id}`} conference={conf}/>);
          }) : null
        }
      </div>
    </Page>
  );
}
