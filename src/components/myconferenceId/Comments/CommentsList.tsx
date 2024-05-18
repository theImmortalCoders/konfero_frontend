import { Box } from "@/components/common/Box/Box";
import TitleHeader from "@/components/common/Box/TitleHeader";
import { addCommentToConference } from "@/hooks/comment";
import { useState, Dispatch, SetStateAction } from "react";

export default function CommentsList({
    conferenceId,
    update,
    setUpdate
} : { 
    conferenceId: number;
    update: boolean;
    setUpdate: Dispatch<SetStateAction<boolean>>;
}) {
    const [newcomment, setNewComment] = useState<string>("");

    const publishComment = async () => {
        try {
            if (newcomment !== "") {
                const result = await addCommentToConference(conferenceId, newcomment);
                if (result === 200) {
                    console.log("Opublikowano komentarz.");
                    if (setUpdate)
                        setUpdate(!update);
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
        </Box>
    )
}