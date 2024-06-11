import { ImageInterface } from "@/hooks/imageAPI";
import { NEXT_PUBLIC_API_BASE_URL } from "@/utils/appENV";
import { renderFileTypeIcon, translateType } from "@/utils/translateType";
import Link from "next/link";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useCallback, useState } from "react";
import { deleteMaterialFromLecture } from "@/hooks/lectureMaterial";
import { formatDate } from "@/utils/date";
import { UserData } from "@/hooks/user";
import { GetLectureDetailsData } from "@/hooks/lecture";

export default function MaterialBlock({
  material,
  handleRefetch,
  lectureIdData,
  user,
}: {
  material: ImageInterface;
  handleRefetch: () => void;
  lectureIdData: GetLectureDetailsData;
  user: UserData | null;
}) {
  console.log("lectureId", user?.id);
  console.log("material", material.author.id);
  console.log("lectureIdData", lectureIdData.lecturers);
  const [hideDel, setHideDel] = useState<boolean>(true);

  const handleDelete = useCallback(async () => {
    await deleteMaterialFromLecture(lectureIdData.id, material.id);
    handleRefetch();
  }, []);

  return (
    <tr
      onMouseOver={() => setHideDel(false)}
      onMouseLeave={() => setHideDel(true)}
    >
      <td className="w-full h-8 text-center text-white flex flex-row items-center">
        <Link
          href={`${NEXT_PUBLIC_API_BASE_URL}/api/file/${material.id}`}
          className="w-full h-[50%] justify-center items-center"
        >
          {renderFileTypeIcon(material.fileType)}
        </Link>
      </td>
      <td className="text-center text-white">
        <Link href={`${NEXT_PUBLIC_API_BASE_URL}/api/file/${material.id}`}>
          {material.description}
        </Link>
      </td>
      <td className="text-center text-white">
        <Link href={`${NEXT_PUBLIC_API_BASE_URL}/api/file/${material.id}`}>
          {material.author.username !== null
            ? material.author.username
            : "Brak autora"}
        </Link>
      </td>
      <td className="text-center text-white">
        <Link
          href={`${NEXT_PUBLIC_API_BASE_URL}/api/file/${material.id}`}
          className="uppercase"
        >
          {translateType(material.fileType)}
        </Link>
      </td>
      <td className="text-center text-white text-nowrap">
        <Link href={`${NEXT_PUBLIC_API_BASE_URL}/api/file/${material.id}`}>
          {material.createdDate !== null
            ? formatDate(material.createdDate)
              : "Brak daty"}
        </Link>
      </td>
      {lectureIdData.lecturers.map((lecturer) => (
        <>
          {user?.id === lecturer.id ? (
            <td>
              <button
                className={`${
                  hideDel ? "opacity-0" : "opacity-1"
                } flex justify-center items-center bg-gray-200 rounded-full w-8 h-8 transition-all duration-100`}
                onClick={handleDelete}
              >
                <BsFillTrash3Fill className="text-red-600" />
              </button>
            </td>
          ) : (
            <td></td>
          )}
        </>
      ))}
    </tr>
  );
}
