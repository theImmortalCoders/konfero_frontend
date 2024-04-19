'use client'
import {useEffect, useState} from "react";
import SingleFormInput from "@/components/common/Input/SingleFormInput";
import {addNewConference, AddNewConferenceData} from "@/hooks/conference";
import {uploadFile} from "@/hooks/file";
import APIImageComponent from "@/hooks/imageAPI";
import {MdOutlineDeleteForever} from "react-icons/md";


export default function AddConferenceInputs() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDateTime, setStartDateTime] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [participantsLimit, setParticipantsLimit] = useState<string>("");
  const [imageId, setImageId] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File>(new File([], ""));

  const [statusError, setStatusError] = useState<boolean | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleNewImage = async () => {
      try {
        if (!imageFile.name) return;
        const result = await uploadFile(imageFile, "conferenceImage");
        if (typeof result !== "string" && result) setImageId(result.id);
      } catch (error) {
        console.error("Image adding failed:", error);
      }
    };

    handleNewImage();
  }, [imageFile]);

  const handleDeleteImage = () => {
    setImageFile(new File([], ""));
    setImageId(0);
    const form = document.getElementById("imageInput") as HTMLFormElement;
    if (form) {
      form.reset();
    }
  };

  const newConference : AddNewConferenceData = {
    startDateTime: startDateTime,
    name: name,
    description: description,
    logoId: imageId,
    tagsIds: [],
    location: {
      locX: 0,
      locY: 0,
      name: place,
    },
    participantsLimit: parseInt(participantsLimit, 10),
    format: 'STATIONARY',
    photosIds: [],
  }

  const handleAddConference = async () => {

    console.log(newConference);

    if (!name || !description || !startDateTime || !participantsLimit.trim() /*|| logoId === 0*/ || !place) {
      console.error("Wszystkie pola muszą być wypełnione");
      setStatusError(true);
      return;
    }

    const date = new Date();
    if(startDateTime < date.toISOString().slice(0, 16)){
      setStatusError(false);
      setMessage("Konferencja nie może się zaczynć przed dodaniem jej.")
      return;
    }

    try {
      const result = await addNewConference(newConference);
      if(result !== "Brak autoryzacji użytkownika" && result !== "Nie jesteś organizatorem" && result !== "Wystąpił błąd podczas dodawania konferencji"){
        setName("");
        setDescription("");
        setStartDateTime("");
        setParticipantsLimit("");
        setImageFile(new File([], ""));
        setImageId(0);
        const form = document.getElementById("imageInput") as HTMLFormElement;
        if (form) {
          form.reset();
        }
        setPlace("");
        setStatusError(false);
        setMessage(undefined);
        window.location.replace(`/myconference`);
      }
    } catch (error) {
      setStatusError(true);
      console.error("Adding conference failed:", error);
    }
  };



  return (
    <div className="text-darkblue w-full flex flex-col space-y-6">
      <div className="relative">
        <SingleFormInput
          type="text"
          id="name"
          name="name"
          placeholder=" "
          value={name}
          onChange={(e) => {
            const value = e.target.value;
            const isValid = /^[\w\s\/\d\WąęłńóśźżĄĘŁŃÓŚŹŻ]{0,40}$/i.test(value);

            if (isValid) {
              setName(value);
            }
          }}
        />
        <label htmlFor="name" className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all">
          Tytuł konferencji [3-40 znaków]
        </label>
      </div>
      <div className="relative">
        <SingleFormInput
          type="text"
          id="description"
          name="description"
          placeholder=" "
          value={description}
          onChange={(e) => {
            const value = e.target.value;
            const isValid = /^[\w\s\/\d\WąęłńóśźżĄĘŁŃÓŚŹŻ]{0,300}$/i.test(value);

            if (isValid) {
              setDescription(value);
            }
          }}
        />
        <label htmlFor="description" className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all">
          Opis [10-300 znaków]
        </label>
      </div>
      <div className="relative">
        <SingleFormInput
          type="datetime-local"
          id="startDateTime"
          name="startDateTime"
          placeholder=" "
          value={startDateTime}
          onChange={(e) => {
            setStartDateTime(e.target.value);
          }}
        />
        <label htmlFor="startDateTime" className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all">
          Termin rozpoczęcia
        </label>
      </div>
      <div className="relative">
        <SingleFormInput
          type="text"
          id="place"
          name="place"
          placeholder=" "
          value={place}
          onChange={(e) => {
            const value = e.target.value;
            const isValid = /^[\w\s\/\d\WąęłńóśźżĄĘŁŃÓŚŹŻ]*$/i.test(value);

            if (isValid) {
              setPlace(value);
            }
          }}
        />
        <label htmlFor="place" className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all">
          Miejsce konferencji
        </label>
      </div>
      <div className="relative">
        <SingleFormInput
          type="text"
          id="participantsLimit"
          name="participantsLimit"
          placeholder=" "
          value={participantsLimit}
          onChange={(e) => {
            const value = e.target.value;
            const isValidNumber = /^\d*$/.test(value);

            if (isValidNumber) {
              setParticipantsLimit(value);
            }
          }}
        />
        <label htmlFor="participantsLimit" className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all">
          Maksymalna liczba uczestników
        </label>
      </div>
      <div className="flex flex-col">
        <p className="w-full outline-none focus:outline-none bg-close2White text-darkblue font-bold">
          Logo konferencji
        </p>
        <form id="imageInput" className="py-3">
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            className="w-full outline-none focus:outline-none bg-close2White text-blue"
            onChange={(e) => {
              if (e.target.files) {
                setImageFile(e.target.files[0]);
              }
            }}
          />
        </form>
        <div className="flex flex-row items-center justify-center space-x-12 pt-2 bg-close2White ">
          <div className="w-[120px]">
            <APIImageComponent imageId={imageId} type="conference"/>
          </div>
          <MdOutlineDeleteForever
            className="h-8 w-8 text-darkblue cursor-pointer"
            onClick={handleDeleteImage}
          />
        </div>
      </div>


      <div className="flex flex-col items-center justify-center w-full">
        <button onClick={handleAddConference} className="text-nowrap w-fit bg-blue text-close2White text-lg font-medium py-2 px-6 rounded-3xl ">
          Zatwierdź
        </button>
        {(statusError !== undefined || message !== undefined) && (
          <p
            className={` ${
              statusError || message !== undefined ? "text-red-800" : "text-green-800"
            } bg-close2White w-full py-2 outline-none focus:outline-none text-sm text-center`}
          >
            {statusError
              ? "Wystąpił błąd podczas dodawania konferencji."
              : message === undefined
                ? "Konferencja została dodana poprawnie."
                : message}
          </p>
        )}
      </div>
    </div>
  );
}