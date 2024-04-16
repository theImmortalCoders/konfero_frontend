'use client'

import Page from "@/components/common/Page/Page";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import ListItem from "@/components/MyconferenceList/ListItem"
import {getAllConferences, GetAllConferencesData} from "@/hooks/conference"
import {useRouter} from "next/navigation";
import {useQuery} from "react-query";
import {Box} from "@/components/common/Box/Box";

export default function MyConferenceListPage() {

  const router = useRouter();

  const {
    data,
    status,
  } = useQuery({
    queryKey: 'konferencje',
    queryFn: getAllConferences,
    staleTime: Infinity,
    refetchOnMount: "always",
  })

  return(
    <Page>
      <div className="flex flex-col items-center my-8 space-y-7 w-2/3">
        <Box className="flex w-full justify-between text-black font-black">
          Znalezione konferencje: {(data as GetAllConferencesData)?.numberOfElements}
          <Link href={'/'} className="flex justify-center items-center gap-x-2 px-2 py-2 sm:py-0 w-min md:text-nowrap border-2 border-black rounded-xl">
            <p className="sm:inline-block hidden">Dodaj Konferencje</p>
            <FaPlus/>
          </Link>
        </Box>
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
