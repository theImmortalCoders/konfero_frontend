import { BoxWithImage } from "@/components/common/Box/Box";
import TitleHeader from "@/components/common/Box/TitleHeader";
import { GetConferenceDetailsWithRoleFilteringData } from "@/hooks/conference";
import MyConferencePageImageBox from "./MyConferencePageImageBox";

export default function Title({
  conferenceIdData,
  children,
}: {
  conferenceIdData: GetConferenceDetailsWithRoleFilteringData;
  children?: React.ReactNode;
}) {
  return (<>
    <BoxWithImage
      className="text-darkblue w-[40%] lg:w-[30%] mt-10 mb-5"
      src={conferenceIdData.logo.id}
      alt={"Logo"}
     children={<></>}/>
      <MyConferencePageImageBox conferenceIdData={conferenceIdData}/>

      <div className="px-4 lg:w-[60%] py-2 sm:px-8 sm:py-4 my-5">
        <p className="flex  justify-center text-sm sm:text-md md:text-lg w-full lg:text-md xl:text-lg">
          {conferenceIdData.description}
        </p>
        {children}
      </div>
      </>
  );
}
