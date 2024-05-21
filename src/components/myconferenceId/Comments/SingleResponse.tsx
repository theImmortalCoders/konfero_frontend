import { Comment } from "@/hooks/conference";
import Image from "next/image";
import { MdStars, MdCheckCircle } from "react-icons/md";

export default function SingleResponse({
    response,
    organizerId,
    userId,
    userRole,
    removeComment
} : {
    response: Comment;
    organizerId: number;
    userId: number | null;
    userRole: string | null;
    removeComment: (id:number) => void;
}) {
    return (
        <div className="flex flex-col ml-8 w-4/5 py-3 space-y-2">
            <hr/>
            <span className="flex">
                <span className="flex items-center space-x-3 w-full">
                    <Image alt="image" src={response.author.photo} width={24} height={24} className="rounded-full"/>
                    <p className="inline-flex items-center justify-center text-xs font-semibold">
                        { response.author.username }
                        { userRole === "ADMIN" && (
                            <MdStars className="ml-1"/>
                        )}
                        { userId === organizerId && (
                            <MdCheckCircle className="ml-1"/>
                        )}
                    </p>
                    <p className="text-xs">
                        { response.createdAt.replace('T', ' ').slice(0, 16) }
                    </p>
                </span>
            </span>
            <p className="min-h-16 text-sm">
                { response.content }
            </p>
            <span className="space-x-2 font-semibold">            
                {(userId === response.author.id || userRole === "ADMIN") && (
                        <button onClick={()=>removeComment(response.id)} className="text-xs hover:underline text-red-600">Usuń</button>
                 )}
            </span>
        </div>
    )
}