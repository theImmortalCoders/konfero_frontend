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
      <table>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Opis</th>
            <th>Autor</th>
            <th>Typ pliku</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {material.fileType === "IMAGE" && <FaFileImage />}
              {material.fileType === "DOCUMENT" && <FaFileAlt />}
              {material.fileType === "VIDEO" && <FaFileVideo />}
              {material.fileType === "SOUND" && <FaFileAudio />}
              {material.fileType === "UNDEFINED" && <FaFile />}
            </td>
            <td>{material.description}</td>
            <td>
              {material.authorId !== null ? material.authorId : "Brak autora"}
            </td>
            <td>{material.fileType}</td>
          </tr>
        </tbody>
      </table>
    </Link>
  );
}
