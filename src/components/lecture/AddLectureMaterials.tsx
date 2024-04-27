import {FaPlus} from "react-icons/fa6";
import {useEffect, useRef, useState} from "react";
import {FileResponseData, uploadFile} from "@/hooks/file";
import {addMaterialToLecture} from "@/hooks/lectureMaterial";
import {useQuery} from "react-query";
import {getLectureDetails} from "@/hooks/lecture";

const AddLectureMaterials = ({lectureId, handleRefetch}: {lectureId: string, handleRefetch: ()=>void}) => {

  const [files, setFiles] = useState<File[]>([]);
  const hasPageBeenRendered = useRef<boolean>(false)

  useEffect(() => {
    if(hasPageBeenRendered.current) {
      const handleNewImages = async () => {
        try {
          if (!files.length) return;
          const results = await Promise.all(files.map((file, index) => {
            return uploadFile(file, file.name);
          }));
          const validResults = results.filter(result => result !== undefined) as FileResponseData[];
          const addingMaterials = await Promise.all(validResults.map((file) => {
            return addMaterialToLecture(parseInt(lectureId), file.id);
          }))
          handleRefetch()
        } catch (error) {
          console.error("Images adding failed:", error);
        }
      };
      handleNewImages();
    }
    hasPageBeenRendered.current = true;
  }, [files]);

  return(
    <div
      className="w-min ml-4 mb-4 hover:bg-darkblue hover:text-close2White rounded-2xl border-2 border-darkblue overflow-hidden"
    >
      <input
        type={"file"}
        className="hidden"
        id="filesInput"
        multiple
        onChange={async (e) => {
          if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setFiles(filesArray);
          }
        }}
      />
      <label
        htmlFor="filesInput"
        className="flex justify-center items-center cursor-pointer px-3"
      >
        <FaPlus/>
        <p className="text-nowrap text-sm md:text-lg font-medium pl-2">Dodaj materiały</p>
      </label>
    </div>
  );
};

export default AddLectureMaterials;
