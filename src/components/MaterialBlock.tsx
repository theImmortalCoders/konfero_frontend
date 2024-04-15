import { ImageInterface } from "@/hooks/conference";
import { NEXT_PUBLIC_API_BASE_URL } from "@/utils/appENV";
import Link from "next/link";
import {
  FaFileAudio,
  FaFileAlt,
  FaFileImage,
  FaFileVideo,
  FaFile,
} from "react-icons/fa";

export default function MaterialBlock({
  material,
}: {
  material: ImageInterface;
}) {
  return (
    <tr>
      <td className="text-center text-darkblue flex flex-row items-center">
        <Link
          href={`${NEXT_PUBLIC_API_BASE_URL}/api/file/${material.id}`}
          className="w-full"
        >
          {material.fileType === "IMAGE" && (
            <FaFileImage className="flex items-center w-full" />
          )}
          {material.fileType === "DOCUMENT" && (
            <FaFileAlt className="flex items-center w-full" />
          )}
          {material.fileType === "VIDEO" && (
            <FaFileVideo className="flex items-center w-full" />
          )}
          {material.fileType === "SOUND" && (
            <FaFileAudio className="flex items-center w-full" />
          )}
          {material.fileType === "UNDEFINED" && (
            <FaFile className="flex items-center w-full" />
          )}
        </Link>
      </td>
      <td className="text-center text-darkblue">
        <Link href={`${NEXT_PUBLIC_API_BASE_URL}/api/file/${material.id}`}>
          {material.description}
        </Link>
      </td>
      <td className="text-center text-darkblue">
        <Link href={`${NEXT_PUBLIC_API_BASE_URL}/api/file/${material.id}`}>
          {material.authorId !== null ? material.authorId : "Brak autora"}
        </Link>
      </td>
      <td className="text-center text-darkblue">
        <Link href={`${NEXT_PUBLIC_API_BASE_URL}/api/file/${material.id}`}>
          {material.fileType}
        </Link>
      </td>
      <td className="text-center text-darkblue">
        <Link href={`${NEXT_PUBLIC_API_BASE_URL}/api/file/${material.id}`}>
          {material.createdDate !== null ? material.createdDate : "Brak daty"}
        </Link>
      </td>
    </tr>
  );
}
