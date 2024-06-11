"use client";
import { UserData, getCurrentUser } from "@/hooks/user";
import MaterialBlock from "./MaterialBlock";
import { GetLectureDetailsData } from "@/hooks/lecture";
import { useEffect, useState } from "react";

async function getUser() {
  const userData = await getCurrentUser();
  if (userData && typeof userData === "object" && "id" in userData) {
    return userData;
  }
  return null;
}

export default function MaterialTableWrapper({
  lectureIdData,
  handleRefetch,
}: {
  lectureIdData: GetLectureDetailsData;
  handleRefetch: () => void;
}) {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchId = async () => {
      const user = await getUser();
      setUser(user);
    };
    fetchId();
  }, []);

  return (
    <div className="w-full flex-col mb-4 overflow-x-auto">
      <table className={"table-auto min-w-[40rem] w-full text-gray-400"}>
        <thead>
          <tr>
            <th className="text-center  text-white">Logo</th>
            <th className="text-center text-white">Opis</th>
            <th className="text-center text-white">Autor</th>
            <th className="text-center text-white">Typ pliku</th>
            <th className="text-center text-white">Data dodania</th>
          </tr>
        </thead>
        <tbody>
          {lectureIdData.materials.map((material, index) => (
            <MaterialBlock
              key={index}
              material={material}
              lectureIdData={lectureIdData}
              handleRefetch={handleRefetch}
              user={user}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
