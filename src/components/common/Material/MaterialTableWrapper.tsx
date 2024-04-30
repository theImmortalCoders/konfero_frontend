import MaterialBlock from "./MaterialBlock";
import { GetLectureDetailsData } from "@/hooks/lecture";

export default function MaterialTableWrapper({
  lectureIdData,
  handleRefetch,
}: {
  lectureIdData: GetLectureDetailsData;
  handleRefetch: ()=>void
}) {
  return (
    <div className="w-full flex-col mb-4 overflow-x-auto">
      <table className={"table-auto min-w-[40rem] w-full text-gray-400"}>
        <thead>
          <tr>
            <th className="text-center text-darkblue">Logo</th>
            <th className="text-center text-darkblue">Opis</th>
            <th className="text-center text-darkblue">Autor</th>
            <th className="text-center text-darkblue">Typ pliku</th>
            <th className="text-center text-darkblue">Data dodania</th>
          </tr>
        </thead>
        <tbody>
          {lectureIdData.materials.map((material, index) => (
            <MaterialBlock key={index} material={material} lectureId={lectureIdData.id} handleRefetch={handleRefetch}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}
