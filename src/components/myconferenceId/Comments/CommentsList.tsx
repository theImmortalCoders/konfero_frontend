import { Box } from "@/components/common/Box/Box";
import TitleHeader from "@/components/common/Box/TitleHeader";
import { GetConferenceDetailsWithRoleFilteringData, Comment } from "@/hooks/conference";
import { addCommentToConference } from "@/hooks/comment";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { getId, getRole } from "@/utils/userInformation";
import SingleComment from "./SingleComment";

export default function CommentsList({
    conference,
    update,
    setUpdate
} : { 
    conference: GetConferenceDetailsWithRoleFilteringData;
    update: boolean;
    setUpdate: Dispatch<SetStateAction<boolean>>;
}) {
    const [userId, setUserId] = useState<number | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const fetchId = async () => {
          const id = await getId();
          const role = await getRole();
          setUserId(id);
          setUserRole(role);
        };
        fetchId();
      }, []);

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
                    const maxLength = 23; // Długość najdłuższego polskiego słowa
                    const isValid = value.split(' ').every(word => word.length <= maxLength) && /^[\w\s\/\d\WąęłńóśźżĄĘŁŃÓŚŹŻ]{0,255}$/i.test(
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
                    organizerId={conference.organizer.id}
                    comment={comment}
                    userId={userId}
                    userRole={userRole}
                    update={update}
                    setUpdate={setUpdate} 
                    />
                )
            })}
        </Box>
    )
}