import { ImageInterface } from "@/hooks/imageAPI";
import { NEXT_PUBLIC_API_BASE_URL } from "@/utils/appENV";
import { renderFileTypeIcon, translateType } from "@/utils/translateType";
import Link from "next/link";
import { BsFillTrash3Fill } from "react-icons/bs";
import {
  FaFileAudio,
  FaFileAlt,
  FaFileImage,
  FaFileVideo,
  FaFile,
} from "react-icons/fa";
import {useCallback, useState} from "react";
import {deleteMaterialFromLecture} from "@/hooks/lectureMaterial";
import {formatDate} from "@/utils/date";

export default function MaterialBlock({
  material,
  handleRefetch,
  lectureId,
}: {
  material: ImageInterface;
  handleRefetch: ()=>void
  lectureId: number
}) {

  const [hideDel, setHideDel] = useState<boolean>(true);

  const handleDelete = useCallback(async () => {
    await deleteMaterialFromLecture(lectureId, material.id)
    handleRefetch()
  },[])

  return (
    <tr
      onMouseOver={() => setHideDel(false)}
      onMouseLeave={() => setHideDel(true)}
    >
      <td className="w-full h-8 text-center text-darkblue flex flex-row items-center">
        <Link
          href={`${NEXT_PUBLIC_API_BASE_URL}/api/file/${material.id}`}
          className="w-full h-[50%] justify-center items-center"
        >
          {renderFileTypeIcon(material.fileType)}
        </Link>
      </td>
      <td className="text-center text-darkblue">
        <Link href={`${NEXT_PUBLIC_API_BASE_URL}/api/file/${material.id}`}>
          {material.description}
        </Link>
      </td>
      <td className="text-center text-darkblue">
        <Link href={`${NEXT_PUBLIC_API_BASE_URL}/api/file/${material.id}`}>
          {material.author.username !== null
            ? material.author.username
            : "Brak autora"}
        </Link>
      </td>
      <td className="text-center text-darkblue">
        <Link
          href={`${NEXT_PUBLIC_API_BASE_URL}/api/file/${material.id}`}
          className="uppercase"
        >
          {translateType(material.fileType)}
        </Link>
      </td>
      <td className="text-center text-darkblue text-nowrap">
        <Link href={`${NEXT_PUBLIC_API_BASE_URL}/api/file/${material.id}`}>
          {material.createdDate !== null ? formatDate(material.createdDate) : "Brak daty"}
        </Link>
      </td>
      <td>
        <button
          className={`${hideDel?"opacity-0" : "opacity-1"} flex justify-center items-center bg-gray-200 rounded-full w-8 h-8 transition-all duration-100`}
          onClick={handleDelete}
        >
          <BsFillTrash3Fill className="text-red-600"/>
        </button>
      </td>
    </tr>
  );
}
