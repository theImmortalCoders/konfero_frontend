import { Box } from "@/components/common/Box/Box";
import TitleHeader from "@/components/common/Box/TitleHeader";
import { GetConferenceDetailsWithRoleFilteringData, Comment } from "@/hooks/conference";
import { addCommentToConference, deleteComment, respondToComment } from "@/hooks/comment";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";
import { getId, getRole } from "@/utils/userInformation";

function SingleResponse({
    response,
    organizerId,
    userId,
    userRole,
    update,
    setUpdate,
    removeComment
} : {
    response: Comment;
    organizerId: number;
    userId: number | null;
    userRole: string | null;
    update: boolean;
    setUpdate: Dispatch<SetStateAction<boolean>>;
    removeComment: (id:number) => void;
}) {
    return (
        <div className="flex flex-col ml-8 w-4/5 py-3 space-y-2">
            <span className="flex">
                <span className="flex items-center space-x-3 w-full">
                    <Image alt="image" src={response.author.photo} width={24} height={24} className="rounded-full"/>
                    <p className="inline-flex items-center justify-center text-xs font-semibold">
                        { response.author.username }
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
            <hr/>
        </div>
    )
}

function SingleComment({
    comment,
    organizerId,
    userId,
    userRole,
    update,
    setUpdate
} : {
    comment: Comment;
    organizerId: number;
    userId: number | null;
    userRole: string | null;
    update: boolean;
    setUpdate: Dispatch<SetStateAction<boolean>>;
}) {
    
    const removeComment = async (id : number) => {
        try {
            const result = await deleteComment(id);
            if (result === 200) {
                console.log("Usunięto komentarz.");
                if (setUpdate)
                    setUpdate(!update);
            } else {
                console.error("Błąd usuwania komentarza.");
            }
        } catch (error) {
          console.error("Błąd usuwanoa komentarza.", error);
        }
      }

    const [isResponse, setIsResponse] = useState<boolean>(false);
    const [newResponse, setNewResponse] = useState<string>("");

    const publishResponse = async () => {
        try {
            const result = await respondToComment(comment.id, newResponse);
            if (result === 200) {
                console.log("Dodano odpowiedź.");
                setIsResponse(false);
                setNewResponse("");
                if (setUpdate)
                    setUpdate(!update);
            } else {
                console.error("Błąd dodawania odpowiedzi.");
            }
        } catch (error) {
          console.error("Błąd dodawania odpowiedzi.", error);
        }
      }

    return (
        <div className="flex flex-col w-full py-3 space-y-2">
            <span className="flex">
                <span className="flex items-center space-x-3 w-full">
                    <Image alt="image" src={comment.author.photo} width={32} height={32} className="rounded-full"/>
                    <p className="inline-flex items-center justify-center text-sm font-semibold">
                        { comment.author.username }
                    </p>
                    <p className="text-sm">
                        { comment.createdAt.replace('T', ' ').slice(0, 16) }
                    </p>
                </span>
            </span>
            <p className="min-h-16">
                { comment.content }
            </p>
            <span className="space-x-2 font-semibold">            
                <button onClick={() => setIsResponse(!isResponse)} className="text-xs hover:underline">
                    Odpowiedz
                </button>
                {(userId === comment.author.id || userRole === "ADMIN") && (
                        <button onClick={()=>removeComment(comment.id)} className="text-xs hover:underline text-red-600">Usuń</button>
                 )}
            </span>
            {comment.responses && (
                comment?.responses.map((response) => {
                    return (
                        <SingleResponse
                            key={response.id}
                            organizerId={organizerId}
                            response={response}
                            userId={userId}
                            userRole={userRole}
                            update={update}
                            setUpdate={setUpdate} 
                            removeComment={removeComment}
                        />
                    )
                })
            )}
            {isResponse && (
                <div className="ml-8">
                    <div className="w-4/5 py-2 px-4 mt-2 bg-white border border-darkblue rounded-tr-lg rounded-br-lg rounded-bl-lg">
                        <textarea 
                            rows={3} 
                            className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none" 
                            placeholder="Odpowiedz..."
                            value={newResponse}
                            onChange={(e) => {
                                const value = e.target.value;
                                const maxLength = 23; // Długość najdłuższego polskiego słowa
                                const isValid = value.split(' ').every(word => word.length <= maxLength) && /^[\w\s\/\d\WąęłńóśźżĄĘŁŃÓŚŹŻ]{0,255}$/i.test(
                                    value
                                );

                                if (isValid) {
                                    setNewResponse(value);
                                }
                            }}
                    />
                    </div>
                    <button onClick={publishResponse} className="text-xs hover:underline">
                        Opublikuj
                    </button>
                </div>
            )}
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