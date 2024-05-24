import { Dispatch, SetStateAction } from "react";

export default function DeleteWarning({
    setWarning,
    tempId,
    handleFunction
  }: {
    setWarning: Dispatch<SetStateAction<boolean>>;
    tempId: number;
    handleFunction: (id:number) => void;
  }) {
    return (
      <div className="fixed flex items-center justify-center inset-0 z-10">
        <div
          onClick={() => {
            setWarning(false);
          }}
          className="absolute inset-0 bg-darkblue opacity-80"
        ></div>
        <div className="flex flex-col justify-center items-center w-64 sm:w-96 border-2 border-black text-black bg-close2White rounded-xl space-y-2 p-4 z-20">
          <h1 className="text-xl">Usuwanie konferencji</h1>
          <div className="flex flex-col text-xs xs:text-sm text-center font-sans">
            <p>Czy na pewno chcesz usunąć konferencję?</p>
          </div>
          <div>
            <span className="space-x-4">
                <button
                onClick={() => handleFunction(tempId)}
                className="bg-blue text-close2White text-sm font-medium rounded-3xl px-4 py-2 mt-2 w-fit"
                >
                Usuń
                </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
