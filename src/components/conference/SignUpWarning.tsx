import { useState, Dispatch, SetStateAction } from "react";
import { signUpForConference } from "@/hooks/conference";

export default function SignUpWarning({
    setSignUpWarning,
    tempId,
    setTempId
} : { 
    setSignUpWarning: Dispatch<SetStateAction<boolean>>;
    tempId: number;
    setTempId: Dispatch<SetStateAction<number>>;
}) {
    const [message, setMessage] = useState<string>("");
    
    const confirmSignUp = async () => {
        try {
            const result_1 = await signUpForConference(tempId);
            if (result_1 === 200) {
              setTempId(-1);
              setSignUpWarning(false);
            } else {
              console.error("Błąd zapisywania na konferencję");
              setMessage("Błąd zapisywania na konferencję");
            }
          } catch (error) {
            console.error("Błąd zapisywania na konferencję", error);
            setMessage("Błąd zapisywania na konferencję");
          }
    }

    return (
        <div className="fixed flex items-center justify-center inset-0 z-10">
            <div onClick={() => setSignUpWarning(false)} className="absolute inset-0 bg-darkblue opacity-80"></div>
            <div className="flex flex-col justify-center items-center w-64 sm:w-96 border-2 border-black text-black bg-close2White rounded-xl space-y-2 p-4 z-20">
                <h1 className="text-xl">Zapis na konferencję</h1>
                <p className="text-sm text-center font-sans">
                    Czy na pewno chcesz zapisać się na konferencję?
                    <br />
                    Organizator otrzyma dostęp do twoich danych.
                </p>
                <div> 
                    <button onClick={confirmSignUp} className="bg-blue text-close2White text-sm font-medium rounded-3xl px-4 py-2 mt-2 w-fit">
                        Zapisz się
                    </button>
                </div>
                 {message && (
                    <p className="text-xs">{ message }</p>
                 )}
            </div>
        </div>
    )
} 