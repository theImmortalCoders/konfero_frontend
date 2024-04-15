import { ImageInterface } from "@/hooks/conference";
import { NEXT_PUBLIC_API_BASE_URL } from "@/utils/appENV";
import Link from "next/link";
import { FaFileAudio } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { FaFileImage } from "react-icons/fa";
import { FaFileVideo } from "react-icons/fa";
import { FaFile } from "react-icons/fa";

export default function MaterialBlock({
  material,
}: {
  material: ImageInterface;
}) {
  return (
    <Link
      href={`${NEXT_PUBLIC_API_BASE_URL}/api/file/${material.id}`}
      className="w-[80%] z-10"
    >
      <div className="flex flex-row">
        {material.fileType == "IMAGE" && <FaFileImage />}
        {material.fileType == "DOCUMENT" && <FaFileAlt />}
        {material.fileType == "VIDEO" && <FaFileVideo />}
        {material.fileType == "SOUND" && <FaFileAudio />}
        {material.fileType == "UNDEFINED" && <FaFile />}
        <h1>{material.description}</h1>
        {material.authorId !== null ? (
          <h1>{material.authorId}</h1>
        ) : (
          <>Brak autora</>
        )}
        <h1>{material.fileType}</h1>
      </div>
    </Link>
  );
}
