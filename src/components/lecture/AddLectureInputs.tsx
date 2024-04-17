import SingleFormInput from "@/components/common/Input/SingleFormInput";
import APIImageComponent from "@/hooks/imageAPI";
import { useEffect, useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { uploadFile } from "@/hooks/file";
import { TiDeleteOutline } from "react-icons/ti";

export default function AddLectureInputs() {

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [startDateTime, setStartDateTime] = useState<string>("");
    const [durationMinutes, setDurationMinutes] = useState<string>("");
    const [imageId, setImageId] = useState<number>(0);
    const [imageFile, setImageFile] = useState<File>(new File([], ""));
    const [lecturersIds, setLecturersIds] = useState<number[]>([]);
    const [place, setPlace] = useState<string>("");

    useEffect(() => {
        const handleNewImage = async () => {
          try {
            if (!imageFile.name) return;
            const result = await uploadFile(imageFile, "aa");
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

    const handleDeleteLecturers = (indexToDelete: number) => {
        setLecturersIds(lecturersIds.filter((_, index) => index !== indexToDelete));
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
              <label htmlFor="name" className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all">
                  Nazwa
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
                      const isValid = /^[\w\s\/\d\WąęłńóśźżĄĘŁŃÓŚŹŻ]{0,200}$/i.test(value);
            
                      if (isValid) {
                        setDescription(value);
                      }
                  }}
              />
              <label htmlFor="description" className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all">
                  Opis
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
              <label htmlFor="durationMinutes" className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all">
                  Czas trwania [min.]
              </label>
            </div>
            <div className="flex flex-col">
                <p className="w-full outline-none focus:outline-none bg-close2White text-darkblue font-bold">
                    Zdjęcie wykładu
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
                <div className="flex flex-row items-center justify-around py-2 bg-close2White ">
                    <div className="w-[150px]">
                        <APIImageComponent imageId={imageId} type="lecture"/>
                    </div>
                    <MdOutlineDeleteForever
                        className="h-8 w-8 text-darkblue cursor-pointer"
                        onClick={handleDeleteImage}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full text-blue pt-2">
                {lecturersIds.map((name, index) => (
                <span
                    key={index}
                    className="flex flex-row items-center justify-between p-1 border border-blue rounded-lg"
                >
                    {name}
                    <TiDeleteOutline
                    className="h-5 w-5"
                    onClick={() => handleDeleteLecturers(index)}
                    />
                </span>
                ))}
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
              <label htmlFor="name" className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all">
                  Miejsce odbycia wykładu
              </label>
            </div>
        </div>
    );
}