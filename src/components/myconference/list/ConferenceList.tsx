"use client";
import {Content} from "@/hooks/conference";
import ListItemImage from "../../common/List/ListItemImage";
import {formatDateWithHour} from "@/utils/date";
import {CiCirclePlus} from "react-icons/ci";
import {useRouter} from "next/navigation";

export default function ConferenceList({
                                           conference,
                                           role,
                                       }: {
    conference: Content;
    role: string;
}) {
    const router = useRouter();
    const handleCirclePlusClick = () => {
        if (role === "USER") {
            router.push("/attend");
        } else if (role === "ALL") {
            router.push("/login");
        }
    };

    console.log("conference", conference);
    return (
        <div className="flex w-full text-black bg-close2White items-start shadow-whiteShadow h-full z-0 rounded-3xl">
            <ListItemImage
                href={`/myconference/${conference.id}`}
                logo={conference.logo}
                className="rounded-l-3xl"
            >
                <div className="flex flex-col pl-4">
                    <p className="font-black text-xl">{conference?.name}</p>
                    <p>Rozpoczęcie: {formatDateWithHour(conference?.startDateTime)}</p>
                    <p>Zakończenie: {formatDateWithHour(conference?.endDateTime)}</p>
                    <p className="font-bold">{conference?.location?.name}</p>
                </div>
            </ListItemImage>
            {(role === "USER" || role === "ALL") && (
                <div className="w-auto h-full flex justify-center items-center">
                    <CiCirclePlus
                        onClick={handleCirclePlusClick}
                        className="text-4xl text-darkblue"
                    />
                </div>
            )}
        </div>
    );
}
