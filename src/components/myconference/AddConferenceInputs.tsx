"use client";
import React, { useEffect, useState } from "react";
import SingleFormInput from "@/components/common/Input/SingleFormInput";
import {
  addNewConference,
  AddNewConferenceData,
  getConferenceDetailsWithRoleFiltering,
  updateInfoAboutConference,
} from "@/hooks/conference";
import { uploadFile, FileResponseData } from "@/hooks/file";
import APIImageComponent from "@/hooks/imageAPI";
import { MdOutlineDeleteForever } from "react-icons/md";
import { LocationMap } from "../common/Input/LocationMap";
import { useQuery } from "react-query";

export default function AddConferenceInputs({
  isUpdate,
  conferenceid,
}: {
  isUpdate: boolean;
  conferenceid?: string;
}) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDateTime, setStartDateTime] = useState<string>("");
  const [locX, setLocX] = useState<number>(0);
  const [locY, setLocY] = useState<number>(0);
  const [place, setPlace] = useState<string>("");
  const [participantsLimit, setParticipantsLimit] = useState<string>("");
  const [format, setFormat] = useState<string>("STATIONARY");
  const [imageId, setImageId] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File>(new File([], ""));
  const [galleryPhotosIds, setGalleryPhotosIds] = useState<number[]>([]);
  const [imageGalleryFiles, setImageGalleryFiles] = useState<File[]>([]);

  const [statusError, setStatusError] = useState<boolean | undefined>(
    undefined
  );
  const [message, setMessage] = useState<string | undefined>(undefined);

  if (isUpdate) {
    const {
      data: conferenceDetailsData,
      isLoading: conferenceDetailsLoading,
      isError: conferenceDetailsError,
      refetch: refetchClub,
    } = useQuery("conferenceDetails", () =>
      getConferenceDetailsWithRoleFiltering(Number(conferenceid))
    );

    useEffect(() => {
      refetchClub();
      if (isUpdate && !conferenceDetailsLoading) {
        if (
          typeof conferenceDetailsData !== "string" &&
          !conferenceDetailsError
        ) {
          if (conferenceDetailsData) {
            setName(conferenceDetailsData.name);
            setDescription(conferenceDetailsData.description);
            setStartDateTime(conferenceDetailsData.startDateTime);
            setLocX(conferenceDetailsData.location.locX);
            setLocY(conferenceDetailsData.location.locY);
            setPlace(conferenceDetailsData.location.name);
            setParticipantsLimit(
              conferenceDetailsData.participantsLimit.toString()
            );
            setFormat(conferenceDetailsData.format);
            setImageId(conferenceDetailsData.logo.id);
            setGalleryPhotosIds(
              conferenceDetailsData.photos.map((photo) => photo.id)
            );
          } else {
            setName("");
            setDescription("");
            setStartDateTime("");
            setPlace("");
            setParticipantsLimit("");
            setFormat("STATIONARY");
            setImageId(0);
            setGalleryPhotosIds([]);
          }
        } else {
          console.error("Loading data error");
        }
      }
    }, [conferenceDetailsData]);
  }

  useEffect(() => {
    const handleNewImage = async () => {
      try {
        if (!imageFile.name) return;
        const result = await uploadFile(imageFile, "conferenceLogo");
        if (typeof result !== "string" && result) setImageId(result.id);
      } catch (error) {
        console.error("Image adding failed:", error);
      }
    };

    handleNewImage();
  }, [imageFile]);

  useEffect(() => {
    const handleNewImages = async () => {
      try {
        if (!imageGalleryFiles.length) return;
        const results = await Promise.all(
          imageGalleryFiles.map((file) => {
            return uploadFile(file, description);
          })
        );
        const validResults = results.filter(
          (result) => result !== undefined
        ) as FileResponseData[];
        setGalleryPhotosIds(
          validResults.map((img) => {
            return img.id;
          })
        );
      } catch (error) {
        console.error("Images adding failed:", error);
      }
    };

    handleNewImages();
  }, [imageGalleryFiles]);

  useEffect(() => {
    setLocX(0);
    setLocY(0);
    setPlace("");
  }, [format])

  const handleDeleteImage = () => {
    setImageFile(new File([], ""));
    setImageId(0);
    const form = document.getElementById("imageInput") as HTMLFormElement;
    if (form) {
      form.reset();
    }
  };

  const newConference: AddNewConferenceData = {
    startDateTime: startDateTime,
    name: name,
    description: description,
    logoId: imageId,
    tagsIds: [],
    location: {
      locX: locX,
      locY: locY,
      name: place,
    },
    participantsLimit: parseInt(participantsLimit, 10),
    format: format,
    photosIds: galleryPhotosIds,
  };

  const handleAddConference = async () => {
    if (
      !name ||
      !description ||
      !startDateTime ||
      !participantsLimit.trim() ||
      imageId === 0 ||
      (format === "STATIONARY" && !place)
    ) {
      console.error("Wszystkie pola muszą być wypełnione");
      setStatusError(true);
      return;
    }

    const date = new Date();
    if (startDateTime < date.toISOString().slice(0, 16)) {
      setStatusError(false);
      setMessage("Data konferencji nie może być wcześniejsza niż aktualna");
      return;
    }

    try {
      if (!isUpdate) {
        const result = await addNewConference(newConference);
        if (
          result !== "Brak autoryzacji użytkownika" &&
          result !== "Nie jesteś organizatorem" &&
          result !== "Wystąpił błąd podczas dodawania konferencji"
        ) {
          setName("");
          setDescription("");
          setStartDateTime("");
          setParticipantsLimit("");
          setFormat("STATIONARY");
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
      } else {
        const conferenceId = Number(conferenceid);
        const result = await updateInfoAboutConference(
          conferenceId,
          newConference
        );
        if (result === 200) {
          setStatusError(false);
        } else {
          console.error("Błąd aktualizowania konferencji");
          setStatusError(true);
        }
      }
    } catch (error) {
      setStatusError(true);
      console.error("Adding conference failed:", error);
    }
  };

  const handleFormat = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFormat = e.target.value;
    setFormat(selectedFormat);
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
        <label
          htmlFor="name"
          className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all"
        >
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
            const isValid = /^[\w\s\/\d\WąęłńóśźżĄĘŁŃÓŚŹŻ]{0,300}$/i.test(
              value
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
        <label
          htmlFor="startDateTime"
          className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all"
        >
          Termin rozpoczęcia
        </label>
      </div>
      <div className="flex flex-col w-min text-nowrap">
        <label className="text-darkblue cursor-text font-bold">
          Forma odbycia konferencji
        </label>
        <select
          id="format"
          name="format"
          value={format}
          onChange={handleFormat}
          className="bg-close2White border-b-[1px] border-darkblue focus:outline-none"
        >
          <option value="STATIONARY">Stacjonarnie</option>
          <option value="ONLINE">Online</option>
        </select>
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
            <APIImageComponent imageId={imageId} type="conference" />
          </div>
          <MdOutlineDeleteForever
            className="h-8 w-8 text-darkblue cursor-pointer"
            onClick={handleDeleteImage}
          />
        </div>
      </div>
      { format === "STATIONARY" && (
        <div>
          <h1 className="text-xs text-darkblue font-bold font-sans">
            Miejsce konferencji:
          </h1>
          <LocationMap
            locX={locX}
            setLocX={setLocX}
            locY={locY}
            setLocY={setLocY}
            locName={place}
            setLocName={setPlace}
          />
        </div>
        ) }
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
        <label
          htmlFor="participantsLimit"
          className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all"
        >
          Maksymalna liczba uczestników
        </label>
      </div>

      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        id="fileAlbumInput"
        multiple
        className="w-full pt-2 outline-none focus:outline-none bg-close2White text-darkGrey hidden"
        onChange={(e) => {
          if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setImageGalleryFiles(filesArray);
          }
        }}
      />
      <div className="flex flex-row space-x-2 items-center">
        <label
          htmlFor="fileAlbumInput"
          className="cursor-pointer text-darkGrey"
        >
          Kliknij, aby wybrać pliki ({galleryPhotosIds.length} wybrano)
        </label>
      </div>
      <div className="flex flex-row md:flex-wrap space-x-8 md:space-x-0 items-center justify-around py-2 bg-close2White overflow-x-auto md:overflow-x-hidden">
        {galleryPhotosIds.map((imgId, index) => (
          <div
            key={index}
            className="flex flex-row space-x-2 items-center justify-evenly mb-2 pb-2 border-b border-darkBlue"
          >
            <div className="w-[150px]">
              <APIImageComponent imageId={imgId} type="conference" />
            </div>
            <MdOutlineDeleteForever
              className="h-10 w-10 text-close2Black cursor-pointer"
              onClick={() => {
                const newGalleryPhotosIds = [...galleryPhotosIds];
                newGalleryPhotosIds.splice(index, 1);
                setGalleryPhotosIds(newGalleryPhotosIds);
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        <button
          onClick={handleAddConference}
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
              ? "Wystąpił błąd podczas dodawania konferencji."
              : message === undefined
              ? `Konferencja została ${isUpdate ? 'zaktualizowana' : 'dodana'} poprawnie.`
              : message}
          </p>
        )}
      </div>
    </div>
  );
}
