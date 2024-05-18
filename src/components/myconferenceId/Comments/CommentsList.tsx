import { Box } from "@/components/common/Box/Box";
import TitleHeader from "@/components/common/Box/TitleHeader";
import { GetConferenceDetailsWithRoleFilteringData } from "@/hooks/conference";
import { addCommentToConference } from "@/hooks/comment";
import { useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { getId, getRole } from "@/utils/userInformation";

function SingleComment({
    key,
    photo,
    authorId,
    authorName,
    date,
    content
} : {
    key: number;
    photo: string;
    authorId: number;
    authorName: string;
    date: string;
    content: string;
}) {

    
    return (
        <div key={key} className="w-full py-3 space-y-2">
            <span className="flex items-center space-x-3">
                <Image alt="image" src={photo} width={32} height={32} className="rounded-full"/>
                <p className="inline-flex items-center justify-center text-sm font-semibold">
                    { authorName }
                </p>
                <p className="text-sm">
                    { date.replace('T', ' ').slice(0, 16) }
                </p>
            </span>
            <p className="min-h-16">
                { content }
            </p>
            <button className="text-xs hover:underline">
                Odpowiedz
            </button>
            <hr className="border-darkblue"/>
        </div>
    )
}

export default function CommentsList({
    conference,
    update,
    setUpdate
} : { 
    conference: GetConferenceDetailsWithRoleFilteringData;
    update: boolean;
    setUpdate: Dispatch<SetStateAction<boolean>>;
}) {
    const [newcomment, setNewComment] = useState<string>("");

    const publishComment = async () => {
        try {
            if (newcomment !== "") {
                const result = await addCommentToConference(conference.id, newcomment);
                if (result === 200) {
                    console.log("Opublikowano komentarz.");
                    if (setUpdate)
                        setUpdate(!update);
                    setNewComment("");
                } else {
                    console.error("Błąd publikowania komentarza.");
                }
            }
        } catch (error) {
          console.error("Błąd publikowania komentarza.", error);
        }
      }
    
    return (
        <Box className="flex flex-col items-center text-darkblue w-[90%] lg:w-[60%] mt-5 mb-5">
            <TitleHeader title="Komentarze"/>
            <div className="w-full py-2 px-4 my-4 bg-white rounded-lg rounded-t-lg border border-darkblue">
                <textarea 
                rows={5} 
                className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none" 
                placeholder="Napisz komentarz..."
                value={newcomment}
                onChange={(e) => {
                    const value = e.target.value;
                    const isValid = /^[\w\s\/\d\WąęłńóśźżĄĘŁŃÓŚŹŻ]{0,255}$/i.test(
                        value
                    );

                    if (isValid) {
                        setNewComment(value);
                    }
                }}
                />
            </div>
            <button 
                className="inline-flex items-center py-2.5 px-4 text-sm font-semibold text-center text-white bg-darkblue rounded-lg"
                onClick={publishComment}
            >
                Opublikuj
            </button>
            {conference.comments.map((comment) => {
            return (
                <SingleComment 
                    key={comment.id} 
                    photo={comment.author.photo}
                    authorId={comment.author.id}
                    authorName={comment.author.username} 
                    date={comment.createdAt} 
                    content={comment.content} />
                )
            })}
        </Box>
    )
}