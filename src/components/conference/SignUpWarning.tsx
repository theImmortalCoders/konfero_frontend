import { useState, Dispatch, SetStateAction } from "react";
import { signUpForConference } from "@/hooks/conference";

export default function SignUpWarning({
  setSignUpWarning,
  tempId,
  setTempId,
  update,
  setUpdate,
}: {
  setSignUpWarning: Dispatch<SetStateAction<boolean>>;
  tempId: number;
  setTempId?: Dispatch<SetStateAction<number>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
}) {
  const [message, setMessage] = useState<string>("");

  const confirmSignUp = async () => {
    try {
      const result = await signUpForConference(tempId);
      if (result === "Zapisano na konferencję poprawnie!") {
        setSignUpWarning(false);
        setMessage(result);
        if (setTempId) setTempId(-1);
        setUpdate(!update);
      } else {
        setMessage("Błąd: " + result);
      }
    } catch (error) {
      setMessage("Błąd: " + error);
    }
  };

  return (
    <div className="fixed flex items-center justify-center inset-0 z-10">
      <div
        onClick={() => {
          setSignUpWarning(false);
          setTempId && setTempId(-1);
        }}
        className="absolute inset-0 bg-darkblue opacity-80"
      ></div>
      <div className="flex flex-col justify-center items-center w-64 sm:w-96 border-2 border-black text-black bg-close2White rounded-xl space-y-2 p-4 z-20">
        <h1 className="text-xl">Zapis na konferencję</h1>
        <div className="flex flex-col text-xs xs:text-sm text-center font-sans">
          <p>Czy na pewno chcesz zapisać się na konferencję?</p>
          <p>Organizator otrzyma dostęp do twoich danych.</p>
        </div>
        <div>
          <button
            onClick={confirmSignUp}
            className="bg-blue text-close2White text-sm font-medium rounded-3xl px-4 py-2 mt-2 w-fit"
          >
            Zapisz się
          </button>
        </div>
        {message && <p className="text-xs">{message}</p>}
      </div>
    </div>
  );
}
