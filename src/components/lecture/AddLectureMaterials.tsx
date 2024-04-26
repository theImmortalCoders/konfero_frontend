import {FaPlus} from "react-icons/fa6";
import {useEffect, useState} from "react";
import {FileResponseData, uploadFile} from "@/hooks/file";
import {addMaterialToLecture} from "@/hooks/lectureMaterial";

const AddLectureMaterials = ({lectureId}: { lectureId: string }) => {

    const [description, setDescription] = useState<string>("");
    const [filesIds, setFilesIds] = useState<number[]>([]);
    const [files, setFiles] = useState<File[]>([]);


    useEffect(() => {
        const handleNewImages = async () => {
            try {
                if (!files.length) return;
                const results = await Promise.all(files.map(file => {
                    return uploadFile(file, description);
                }));
                const validResults = results.filter(result => result !== undefined) as FileResponseData[];
                validResults.map((file) => {
                    return addMaterialToLecture(parseInt(lectureId), file.id);
                });
                console.log(filesIds);
            } catch (error) {
                console.error("Images adding failed:", error);
            }
        };
        handleNewImages();
    }, [files]);

    return (
        <div
            className="w-min ml-4 mb-4 hover:bg-darkblue hover:text-close2White rounded-2xl border-2 border-darkblue overflow-hidden"
        >
            <input
                type={"file"}
                className="hidden"
                id="filesInput"
                multiple
                onChange={(e) => {
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
