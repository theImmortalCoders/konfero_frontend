import { Comment } from "@/hooks/conference";
import { deleteComment, respondToComment } from "@/hooks/comment";
import { useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { MdStars, MdCheckCircle } from "react-icons/md";
import SingleResponse from "./SingleResponse";

export default function SingleComment({
  comment,
  organizerId,
  userId,
  userRole,
  update,
  setUpdate,
    auth
}: {
  comment: Comment;
  organizerId: number;
  userId: number | null;
  userRole: string | null;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  auth?:boolean;
}) {
  const removeComment = async (id: number) => {
    try {
      const result = await deleteComment(id);
      if (result === 200) {
        console.log("Usunięto komentarz.");
        if (setUpdate) setUpdate(!update);
      } else {
        console.error(result);
      }
    } catch (error) {
      console.error("Błąd usuwania komentarza.", error);
    }
  };

  const [isResponse, setIsResponse] = useState<boolean>(false);
  const [newResponse, setNewResponse] = useState<string>("");

  const publishResponse = async () => {
    try {
      const result = await respondToComment(comment.id, newResponse);
      if (result === 200) {
        console.log("Dodano odpowiedź.");
        setIsResponse(false);
        setNewResponse("");
        if (setUpdate) setUpdate(!update);
      } else {
        console.error(result);
      }
    } catch (error) {
      console.error("Błąd dodawania odpowiedzi.", error);
    }
  };

  return (
    <div className="flex flex-col w-full py-3 space-y-2">
      <span className="flex">
        <span className="flex items-center space-x-3 w-full">
          <Image
            alt="image"
            src={comment.author.photo}
            width={32}
            height={32}
            className="rounded-full"
          />
          <p className="flex flex-row items-center justify-stretch text-sm font-semibold">
            {comment.author.username}
            {comment.author.role === "ADMIN" && <MdStars className="ml-1" />}
            {comment.author.id === organizerId && <MdCheckCircle className="ml-1" />}
          </p>
          <p className="text-sm text-center">
            {comment.createdAt.replace("T", " ").slice(0, 16)}
          </p>
        </span>
      </span>
      <p className="min-h-16">{comment.content}</p>
      {auth &&
      <span className="space-x-2 font-semibold">
        <button
          onClick={() => setIsResponse(!isResponse)}
          className="text-xs hover:underline"
        >
          Odpowiedz
        </button>
        {(userId === comment.author.id || userRole === "ADMIN") && (
          <button
            onClick={() => removeComment(comment.id)}
            className="text-xs hover:underline text-red-600"
          >
            Usuń
          </button>
        )}
      </span>
      }
      {comment.responses &&
        comment?.responses.map((response) => {
          return (
            <SingleResponse
              key={response.id}
              organizerId={organizerId}
              response={response}
              userId={userId}
              userRole={userRole}
              removeComment={removeComment}
            />
          );
        })}
      {isResponse && (
        <div className="ml-8 w-4/5">
          <hr />
          <div className="py-2 px-4 mt-2 bg-white border border-darkblue rounded-tr-lg rounded-br-lg rounded-bl-lg">
            <textarea
              rows={3}
              className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none"
              placeholder="Odpowiedz..."
              value={newResponse}
              onChange={(e) => {
                const value = e.target.value;
                const maxLength = 23;
                const isValid =
                  value.split(" ").every((word) => word.length <= maxLength) &&
                  /^[\w\s\/\d\WąęłńóśźżĄĘŁŃÓŚŹŻ]{0,255}$/i.test(value);

                if (isValid) {
                  setNewResponse(value);
                }
              }}
            />
          </div>
          <span className="space-x-2">
            <button
              onClick={publishResponse}
              className="text-xs hover:underline"
            >
              Opublikuj
            </button>
            <button
              onClick={() => setIsResponse(false)}
              className="text-xs text-red-600 hover:underline"
            >
              Anuluj
            </button>
          </span>
        </div>
      )}
      <hr className="border-darkblue" />
    </div>
  );
}
