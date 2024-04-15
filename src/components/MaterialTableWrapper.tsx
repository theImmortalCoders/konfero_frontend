import MaterialBlock from "./MaterialBlock";
import { GetLectureDetailsData } from "@/hooks/lecture";

export default function MaterialTableWrapper({
  lectureIdData,
}: {
  lectureIdData: GetLectureDetailsData;
}) {
  console.log("lectureIdData", lectureIdData);
  return (
    <div className="w-full flex justify-center items-center flex-col mb-4">
      <table className={"table-auto min-w-[40rem] w-full text-gray-400"}>
        <thead>
          <tr>
            <th className="text-center text-darkblue">Logo</th>
            <th className="text-center text-darkblue">Opis</th>
            <th className="text-center text-darkblue">Autor</th>
            <th className="text-center text-darkblue">Typ pliku</th>
          </tr>
        </thead>
        <tbody>
          {lectureIdData.materials.map((material, index) => (
            <MaterialBlock key={index} material={material} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
