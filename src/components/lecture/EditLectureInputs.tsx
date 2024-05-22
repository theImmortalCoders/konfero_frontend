import { useEffect, useState } from "react";
import SingleFormInput from "@/components/common/Input/SingleFormInput";
import APIImageComponent from "@/hooks/imageAPI";
import { MdOutlineDeleteForever } from "react-icons/md";
import { getAllUsers, GetAllUsersData, UserData } from "@/hooks/user";
import {
  modifyLectureInfoByLecturer,
  modifyLectureInfoByOrganizer,
  deleteLecture,
  GetLectureDetailsData,
  ModifyLectureInfoByOrganizerData,
} from "@/hooks/lecture";
import { GetConferenceDetailsWithRoleFilteringData } from "@/hooks/conference";
import SearchBarLecture from "@/components/lecture/SearchBarLecture";
import { TiDeleteOutline } from "react-icons/ti";
import { uploadFile } from "@/hooks/file";
import { ImageCropFrame } from "../common/ImageCrop/ImageCropFrame";

type params = {
  lectureData: GetLectureDetailsData;
  conferenceData: GetConferenceDetailsWithRoleFilteringData;
  currentUserData: UserData;
};

export default function EditLectureInputs({
  lectureData,
  conferenceData,
  currentUserData,
}: params) {
  const [name, setName] = useState<string>(lectureData.name);
  const [description, setDescription] = useState<string>(
    lectureData.description,
  );
  const [startDateTime, setStartDateTime] = useState<string>(
    lectureData.startDateTime,
  );
  const [durationMinutes, setDurationMinutes] = useState<string>(
    lectureData.durationMinutes.toString(),
  );
  const [imageId, setImageId] = useState<number>(lectureData.image.id);
  const [imageFile, setImageFile] = useState<File>(new File([], ""));
  const [lecturersIds, setLecturersIds] = useState<number[]>(
    lectureData.lecturers.map((lecturer) => lecturer.id),
  );
  const [place, setPlace] = useState<string>(lectureData.place);

  const [users, setUsers] = useState<GetAllUsersData[]>([]);
  const [lecturersUsernames, setLecturersUsernames] = useState<string[]>(
    lectureData.lecturers.map((lecturer) => lecturer.username),
  );
  const [cleanSearchBar, setCleanSearchBar] = useState<boolean>(false);

  const [submitStatusError, setSubmitStatusError] = useState<
    boolean | undefined
  >(undefined);
  const [submitMessage, setSubmitMessage] = useState<string | undefined>(
    undefined,
  );
  const [deleteStatusError, setDeleteStatusError] = useState<
    boolean | undefined
  >(undefined);
  const [deleteMessage, setDeleteMessage] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchUsers = async () => {
      if (currentUserData.role !== "USER") {
        const result = await getAllUsers();
        if (typeof result !== "string") {
          setUsers(result);
        }
      }
    };

    fetchUsers();
  }, []);

  const handleLecturerSelected = (user: GetAllUsersData) => {
    setLecturersIds((prevState) => {
      if (!prevState.includes(user.id)) {
        return [...prevState, user.id];
      }
      return prevState;
    });
    setLecturersUsernames((prevState) => {
      if (!prevState.includes(user.username)) {
        return [...prevState, user.username];
      }
      return prevState;
    });
    setCleanSearchBar(true);
  };

  useEffect(() => {
    if (lecturersIds.length !== 0) {
      setSubmitStatusError(undefined);
      setCleanSearchBar(false);
    }
  }, [lecturersIds]);

  const handleDeleteLecturers = (indexToDelete: number) => {
    setLecturersIds(lecturersIds.filter((_, index) => index !== indexToDelete));
    setLecturersUsernames(
      lecturersUsernames.filter((_, index) => index !== indexToDelete),
    );
  };

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

  const modifyLecture: ModifyLectureInfoByOrganizerData = {
    name: name,
    description: description,
    startDateTime: startDateTime,
    durationMinutes: parseInt(durationMinutes, 10),
    imageId: imageId,
    lecturersIds: lecturersIds,
    place: place,
  };

  const handleEditLectureOrganizer = async () => {
    if (
      !name ||
      !description ||
      !startDateTime ||
      !durationMinutes.trim() ||
      imageId === 0 ||
      !place
    ) {
      console.error("Wszystkie pola muszą być wypełnione");
      setSubmitStatusError(true);
      return;
    }

    if (startDateTime < conferenceData.startDateTime) {
      setSubmitStatusError(false);
      setSubmitMessage("Wykład musi odbyć się w czasie konferencji!");
      return;
    }

    try {
      const result = await modifyLectureInfoByOrganizer(
        lectureData.id,
        modifyLecture,
      );
      if (
        result !== "Brak autoryzacji użytkownika" &&
        result !== "Nie jesteś właścicielem konferencji lub nie masz roli" &&
        result !== "Wystąpił błąd podczas modyfikacji danych prelekcji"
      ) {
        setCleanSearchBar(true);
        setSubmitStatusError(false);
        setSubmitMessage(undefined);
        window.location.replace(`/lecture/${lectureData.id}`);
      }
    } catch (error) {
      setSubmitStatusError(true);
      console.error("Modifying lecture failed:", error);
    }
  };

  const handleEditLectureLecturer = async () => {
    if (!name || !description) {
      console.error("Wszystkie pola muszą być wypełnione");
      setSubmitStatusError(true);
      return;
    }

    try {
      const result = await modifyLectureInfoByLecturer(lectureData.id, {
        description,
        imageId,
      });
      if (
        result !== "Brak autoryzacji użytkownika" &&
        result !== "Nie jesteś prelegentem" &&
        result !== "Wystąpił błąd podczas modyfikacji danych prelekcji"
      ) {
        setName("");
        setDescription("");
        const form = document.getElementById("imageInput") as HTMLFormElement;
        if (form) {
          form.reset();
        }
        setSubmitStatusError(false);
        setSubmitMessage(undefined);
        window.location.replace(`/lecture/${lectureData.id}`);
      }
    } catch (error) {
      setSubmitStatusError(true);
      console.error("Modifying lecture failed:", error);
    }
  };

  const handleDeleteLecture = async () => {
    try {
      const result = await deleteLecture(lectureData.id);
      if (
        result !== "Brak autoryzacji użytkownika" &&
        result !== "Nie jesteś właścicielem konferencji lub nie masz roli" &&
        result !== "Wystąpił błąd podczas usuwania prelekcji"
      ) {
        window.location.replace(`/myconference/${conferenceData.id}`);
        setDeleteMessage(undefined);
        setDeleteStatusError(false);
      }
    } catch (error) {
      setDeleteStatusError(true);
      console.error("Deleting lecture failed:", error);
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
        <SingleFormInput
          type="text"
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
          {lecturersUsernames.map((name, index) => (
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
      <div className="relative">
        <SingleFormInput
          type="text"
          id="place"
          name="place"
          placeholder=" "
          value={place}
          onChange={(e) => {
            const value = e.target.value;
            const isValid = /^[\w\s\/\d\WąęłńóśźżĄĘŁŃÓŚŹŻ]{0,20}$/i.test(value);

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
      <div className="flex flex-col items-center justify-center w-full">
        <button
          onClick={
            currentUserData.role !== "USER"
              ? handleEditLectureOrganizer
              : handleEditLectureLecturer
          }
          className="text-nowrap w-fit bg-blue text-close2White text-lg font-medium py-2 px-6 rounded-3xl "
        >
          Zatwierdź
        </button>
        {(submitStatusError !== undefined || submitMessage !== undefined) && (
          <p
            className={` ${
              submitStatusError || submitMessage !== undefined
                ? "text-red-800"
                : "text-green-800"
            } bg-close2White w-full py-2 outline-none focus:outline-none text-sm text-center`}
          >
            {submitStatusError
              ? "Wystąpił błąd podczas modyfikowania wykładu."
              : submitMessage === undefined
                ? "Wykład został zmodyfikowany poprawnie."
                : submitMessage}
          </p>
        )}
      </div>
      {currentUserData.role !== "USER" && (
        <div className="flex flex-col items-center justify-center w-full">
          <button
            onClick={handleDeleteLecture}
            className="text-nowrap w-fit bg-red-700 text-close2White text-lg font-medium py-2 px-6 rounded-3xl"
          >
            Usuń wykład
          </button>
          {(deleteStatusError !== undefined || deleteMessage !== undefined) && (
            <p
              className={` ${
                deleteStatusError || deleteMessage !== undefined
                  ? "text-red-800"
                  : "text-green-800"
              } bg-close2White w-full py-2 outline-none focus:outline-none text-sm text-center`}
            >
              {deleteStatusError
                ? "Wystąpił błąd podczas usuwania wykładu."
                : deleteMessage === undefined
                  ? "Wykład został usunięty poprawnie."
                  : deleteMessage}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
