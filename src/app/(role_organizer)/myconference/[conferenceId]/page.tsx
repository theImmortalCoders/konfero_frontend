"use client";
import Page from "@/components/common/Page/Page";
import {Box} from "@/components/common/Box/Box";
import {useQuery} from "react-query";
import {getConferenceDetailsWithRoleFiltering,} from "@/hooks/conference";
import Error500 from "@/components/common/Error/Error500";
import People from "@/components/myconferenceId/Participants/People";
import TitleHeader from "@/components/common/Box/TitleHeader";
import LoadingMessage from "@/components/common/Loading/LoadingMessage";
import {Organizer} from "@/hooks/user";
import Participants from "@/components/myconferenceId/Participants/Participants";
import Photos from "@/components/myconferenceId/Photos/Photos";
import Lectures from "@/components/myconferenceId/Lectures/Lectures";
import Title from "@/components/myconferenceId/Title/Title";
import Panel from "@/components/myconferenceId/OrganizerAndAdminPanel/Panel";

export default function MyConferencePage({
                                             params,
                                         }: {
    params: { conferenceId: string };
}) {
    const {
        data: conferenceIdData,
        isLoading,
        isError,
    } = useQuery(`conferenceId${parseInt(params.conferenceId)}`, () =>
        getConferenceDetailsWithRoleFiltering(parseInt(params.conferenceId))
    );

    if (isError) return <Error500/>;

    return (
        <Page>
            {!isLoading &&
            conferenceIdData &&
            typeof conferenceIdData !== "string" ? (
                <>
                    <Panel conferenceIdData={conferenceIdData}/>
                    <Title conferenceIdData={conferenceIdData}/>
                    <Organizers organizer={conferenceIdData.organizer}/>
                    <Lectures
                        lectures={conferenceIdData.lectures}
                        conferenceId={conferenceIdData.id}
                    />
                    {conferenceIdData.participants !== null ? (
                        <Participants conferenceIdData={conferenceIdData}/>
                    ) : null}
                    {conferenceIdData.photos.length !== 0 ? (
                        <Photos photos={conferenceIdData.photos}/>
                    ) : null}
                </>
            ) : (
                <LoadingMessage/>
            )}
        </Page>
    );
}

function Organizers({organizer}: { organizer: Organizer }) {
    return (
        <Box className="text-darkblue w-[90%] lg:w-[60%] mt-5 mb-5">
            <TitleHeader title={"Organizator"}/>
            <div className="w-full h-full flex justify-center items-center pt-4">
                <People
                    username={organizer.username}
                    photo={organizer.photo}
                    email={organizer.email}
                />
            </div>
        </Box>
    );
}
