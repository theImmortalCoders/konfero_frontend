import APIImageComponent from "@/hooks/imageAPI";
import { useEffect, useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { uploadFile } from "@/hooks/file";
import { TiDeleteOutline } from "react-icons/ti";
import { getAllUsers, GetAllUsersData } from "@/hooks/user";
import SearchBarLecture from "./SearchBarLecture";
import {
  addLectureToConference,
  AddLectureToConferenceData,
} from "@/hooks/lecture";
import { GetConferenceDetailsWithRoleFilteringData } from "@/hooks/conference";
import { ImageCropFrame } from "../common/ImageCrop/ImageCropFrame";
import SingleFormInput from "../common/Input/SingleFormInput";
import { SingleFormTextArea } from "../common/Input/SingleFormTextArea";

export default function AddLectureInputs({
  conferenceData,
}: {
  conferenceData: GetConferenceDetailsWithRoleFilteringData;
}) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDateTime, setStartDateTime] = useState<string>(
    `${conferenceData.endDateTime}`,
  );
  const [durationMinutes, setDurationMinutes] = useState<string>("");
  const [imageId, setImageId] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File>(new File([], ""));
  const [lecturersIds, setLecturersIds] = useState<number[]>([]);
  const [place, setPlace] = useState<string>(`${conferenceData.location.name}`);

  const [users, setUsers] = useState<GetAllUsersData[]>([]);
  const [lecturersUserames, setLecturersUserames] = useState<string[]>([]);
  const [cleanSearchBar, setCleanSearchBar] = useState(false);

  const [statusError, setStatusError] = useState<boolean | undefined>(
    undefined,
  );
  const [message, setMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getAllUsers();
      if (typeof result !== "string") {
        setUsers(result);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const handleNewImage = async () => {
      try {
        if (!imageFile.name) return;
        const result = await uploadFile(imageFile, "lectureImage");
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

  const handleLecturerSelected = (user: GetAllUsersData) => {
    setLecturersIds((prevState) => {
      if (!prevState.includes(user.id)) {
        return [...prevState, user.id];
      }
      return prevState;
    });
    setLecturersUserames((prevState) => {
      if (!prevState.includes(user.username)) {
        return [...prevState, user.username];
      }
      return prevState;
    });
    setCleanSearchBar(true);
  };

  useEffect(() => {
    if (lecturersIds.length !== 0) {
      setStatusError(undefined);
      setCleanSearchBar(false);
    }
  }, [lecturersIds]);

  const handleDeleteLecturers = (indexToDelete: number) => {
    setLecturersIds(lecturersIds.filter((_, index) => index !== indexToDelete));
    setLecturersUserames(
      lecturersUserames.filter((_, index) => index !== indexToDelete),
    );
  };

  const newLecture: AddLectureToConferenceData = {
    name: name,
    description: description,
    startDateTime: startDateTime,
    durationMinutes: parseInt(durationMinutes, 10),
    imageId: imageId,
    lecturersIds: lecturersIds,
    place: conferenceData.format === "ONLINE" ? 'online' : place,
  };

  const handleAddLecture = async () => {
    if (
      !name ||
      !description ||
      !startDateTime ||
      !durationMinutes.trim() ||
      imageId === 0 ||
      (!place && conferenceData.format !== "ONLINE")
    ) {
      setStatusError(false);
      setMessage("Wszystkie pola muszą być wypełnione");
      setTimeout(() => {
        setMessage("");
      }, 4 * 1000);
      return;
    }

    if (startDateTime < conferenceData.startDateTime) {
      setStatusError(false);
      setMessage("Wykład musi odbyć się w czasie konferencji!");
      setTimeout(() => {
        setMessage("");
      }, 4 * 1000);
      return;
    }

    try {
      const result = await addLectureToConference(
        conferenceData.id,
        newLecture,
      );
      if (
        result !== "Brak autoryzacji użytkownika" &&
        result !== "Nie jesteś właścicielem konferencji lub nie masz roli" &&
        result !== "Wystąpił błąd podczas dodawania prelekcji do konferencji"
      ) {
        setName("");
        setDescription("");
        setStartDateTime("");
        setDurationMinutes("");
        setImageFile(new File([], ""));
        setImageId(0);
        const form = document.getElementById("imageInput") as HTMLFormElement;
        if (form) {
          form.reset();
        }
        setLecturersIds([]);
        setLecturersUserames([]);
        setPlace("");
        setCleanSearchBar(true);
        setStatusError(false);
        setMessage(undefined);
        window.location.replace(`/conference/${conferenceData.id}`);
      }
    } catch (error) {
      setStatusError(true);
      console.error("Adding lecture to conference failed:", error);
    }
  };

  return (
    <div className="flex flex-col space-y-6 text-darkblue">
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
        <label
          htmlFor="name"
          className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all"
        >
          Nazwa [3-40 znaków]
        </label>
      </div>
      <div className="relative">
        <SingleFormTextArea
          id="description"
          name="description"
          placeholder=" "
          value={description}
          onChange={(e) => {
            const value = e.target.value;
            const isValid = /^[\w\s\/\d\WąęłńóśźżĄĘŁŃÓŚŹŻ]{0,200}$/i.test(
              value,
            );

            if (isValid) {
              setDescription(value);
            }
          }}
        />
        <label
          htmlFor="description"
          className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all"
        >
          Opis [10-200 znaków]
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
        <label
          htmlFor="startDateTime"
          className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all"
        >
          Termin rozpoczęcia
        </label>
      </div>
      <div className="relative">
        <SingleFormInput
          type="text"
          id="durationMinutes"
          name="durationMinutes"
          placeholder=" "
          value={durationMinutes}
          onChange={(e) => {
            const value = e.target.value;
            const isValidNumber = /^\d*$/.test(value);

            if (isValidNumber) {
              setDurationMinutes(value);
            }
          }}
        />
        <label
          htmlFor="durationMinutes"
          className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all"
        >
          Czas trwania [min.]
        </label>
      </div>
      <div className="flex flex-col sm:flex-row">
        <ImageCropFrame
          formName="imageInput"
          inputDescription="Zdjęcie wykładu"
          croppingRatio={16 / 16}
          imageFile={imageFile}
          setImageFile={setImageFile}
        />
        <div className="flex flex-row items-center mt-10 justify-center space-x-12 pt-2 bg-close2White pr-0 sm:pr-10 lg:pr-20">
          <div className="w-[120px]">
            <APIImageComponent imageId={imageId} type="lecture" />
          </div>
          <MdOutlineDeleteForever
            className="h-8 w-8 text-darkblue cursor-pointer"
            onClick={handleDeleteImage}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <SearchBarLecture
          items={users}
          renderItem={(user) => `${user.username} ${user.email}`}
          onItemSelected={handleLecturerSelected}
          placeholder="Dodaj wykładowców"
          handleReset={cleanSearchBar}
          pt={-1}
        />
        <div className="grid grid-cols-2 gap-2 w-full text-blue pt-2">
          {lecturersUserames.map((name, index) => (
            <span
              key={index}
              className="flex flex-row items-center justify-between p-1 border border-blue rounded-lg"
            >
              {name}
              <TiDeleteOutline
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleDeleteLecturers(index)}
              />
            </span>
          ))}
        </div>
      </div>
      {conferenceData.format === "STATIONARY" ? (
        <div className="relative">
          <SingleFormInput
            type="text"
            id="place"
            name="place"
            placeholder=" "
            value={place}
            onChange={(e) => {
              const value = e.target.value;
              const isValid = /^[\w\s\/\d\WąęłńóśźżĄĘŁŃÓŚŹŻ]{0,20}$/i.test(
                value,
              );

              if (isValid) {
                setPlace(value);
              }
            }}
          />
          <label
            htmlFor="place"
            className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all"
          >
            Miejsce odbycia wykładu [3-20 znaków]
          </label>
        </div>
      ) : null}

      <div className="flex flex-col items-center justify-center w-full">
        <button
          onClick={handleAddLecture}
          className="text-nowrap w-fit bg-blue text-close2White text-lg font-medium py-2 px-6 rounded-3xl "
        >
          Zatwierdź
        </button>
        {(statusError !== undefined || message !== undefined) && (
          <p
            className={` ${
              statusError || message !== undefined
                ? "text-red-800"
                : "text-green-800"
            } bg-close2White w-full py-2 outline-none focus:outline-none text-sm text-center`}
          >
            {statusError
              ? "Wystąpił błąd podczas dodawania wykładu."
              : message === undefined
                ? "Wykład został dodany poprawnie."
                : message}
          </p>
        )}
      </div>
    </div>
  );
}
