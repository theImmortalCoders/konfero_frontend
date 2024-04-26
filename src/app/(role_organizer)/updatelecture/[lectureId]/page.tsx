'use client'
import EditLectureInputs from "@/components/lecture/EditLectureInputs";
import {useParams} from 'next/navigation';
import {useQuery} from "react-query";
import {getCurrentUser} from "@/hooks/user";
import {getLectureDetails, GetLectureDetailsData} from "@/hooks/lecture";
import Error500 from "@/components/common/Error/Error500";
import {Box} from "@/components/common/Box/Box";
import Page from "@/components/common/Page/Page";
import {getConferenceDetailsWithRoleFiltering} from "@/hooks/conference";

const EditLecture = () => {

    const {lectureId} = useParams<{ lectureId: string }>();

    const {
        data: currentUserData,
        isLoading: userLoading,
        isError: userError,
    } = useQuery("currentUser", getCurrentUser, {
        staleTime: Infinity,
    });

    const {
        data: lectureData,
        isLoading: lectureLoading,
        isError: lectureError,
    } = useQuery(`lectureId_${lectureId}`, () =>
        getLectureDetails(parseInt(lectureId as string))
    );

    const getConferenceInfo = async () => {
        return await getConferenceDetailsWithRoleFiltering((lectureData as GetLectureDetailsData).conferenceId);
    };

    const {
        data: conferenceData,
        isLoading: conferenceLoading,
        isError: conferenceError,
    } = useQuery("conference", getConferenceInfo, {enabled: !lectureLoading});

    if (lectureError || userError || conferenceError) return <Error500/>;


    return (
        <Page className="justify-start py-20">
            {!userLoading && !lectureLoading && !conferenceLoading && lectureData && conferenceData && currentUserData && typeof lectureData !== "string" && typeof conferenceData !== "string" ? (
                <>
                    <h1 className="w-full flex justify-center pb-8 text-lg sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl">
                        Edycja wykładu
                    </h1>
                    <Box className="w-4/5 2xs:w-2/3 xs:w-1/2">
                        <EditLectureInputs lectureData={lectureData} conferenceData={conferenceData}
                                           currentUserData={currentUserData}/>
                    </Box>
                </>
            ) : (
                <p className="w-full mt-20 text-xl h-max flex justify-center items-center text-close2White">
                    Trwa ładowanie danych...
                </p>
            )}
        </Page>
    );
}

export default EditLecture;