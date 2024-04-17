"use client";
import Page from "@/components/common/Page/Page";
import NotFoundConferenceForAddLecture from "./not-found";
import { useQuery } from "react-query";
import { getConferenceDetailsWithRoleFiltering } from "@/hooks/conference";
import SingleFormInput from "@/components/common/Input/SingleFormInput";
import { useState } from "react";

export default function addlecture({ params }: { params: { conferenceId: number } }) {

  const getConferenceInfo = async () => {
    return await getConferenceDetailsWithRoleFiltering(params.conferenceId);
  };

  const {
    data: conferenceData,
    isLoading: conferenceLoading,
    isError: conferenceError,
  } = useQuery("conference", getConferenceInfo);

  if (conferenceError) {
    return <NotFoundConferenceForAddLecture />;
  }

  const [name, setName] = useState<string>("");

  return (
    <Page>
      {!conferenceLoading && conferenceData && typeof conferenceData !== "string" ? (
        <div className="mt-20">
          {/* addlecture {params.conferenceId} */}
          <div className="flex flex-col w-full h-fit space-y-6 bg-close2White">
            <div className="relative">
              <SingleFormInput
                  type="text"
                  id="name"
                  name="companyName"
                  placeholder=" "
                  value={name}
                  onChange={(e) => {
                      const value = e.target.value;
                      const isValid = /^[\w\s\/\d\WąęłńóśźżĄĘŁŃÓŚŹŻ]{0,100}$/i.test(value);
            
                      if (isValid) {
                        setName(value);
                      }
                  }}
              />
              <label htmlFor="name" className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all">
                  Nazwa
              </label>
            </div> 
            <div className="relative">
              <SingleFormInput
                  type="text"
                  id="name"
                  name="companyName"
                  placeholder=" "
                  value={name}
                  onChange={(e) => {
                      const value = e.target.value;
                      const isValid = /^[\w\s\/\d\WąęłńóśźżĄĘŁŃÓŚŹŻ]{0,100}$/i.test(value);
            
                      if (isValid) {
                        setName(value);
                      }
                  }}
              />
              <label htmlFor="name" className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all">
                  Nazwa
              </label>
            </div> 
          </div>   
        </div>
      ) : (
        <p className="w-full mt-20 text-xl h-max flex justify-center items-center text-close2White">
          Trwa ładowanie danych...
        </p>
      )}
    </Page>
  );
}
