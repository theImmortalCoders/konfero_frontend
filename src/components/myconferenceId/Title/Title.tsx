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
  return (
    <BoxWithImage
      className="text-darkblue w-[90%] lg:w-[60%] mt-10 mb-5"
      src={conferenceIdData.logo.id}
      alt={"Logo"}
    >
      <MyConferencePageImageBox conferenceIdData={conferenceIdData} />
      <div className="px-4 py-2 sm:px-8 sm:py-4 w-full">
        <TitleHeader title={conferenceIdData.name} />
        <p className="text-sm sm:text-md md:text-lg lg:text-md xl:text-lg pt-2 sm:pt-3 md:pt-4 lg:pt-3 xl:pt-4">
          {conferenceIdData.description}
        </p>
        {children}
      </div>
    </BoxWithImage>
  );
}
