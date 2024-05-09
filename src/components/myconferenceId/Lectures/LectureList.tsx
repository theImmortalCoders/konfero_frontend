"use client";
import { Lecture, GetConferenceDetailsWithRoleFilteringData } from "@/hooks/conference";
import { getCurrentUser } from "@/hooks/user";
import { getLectureDetails, addLectureToFavourites, removeLectureFromFavourites } from "@/hooks/lecture";
import ListItemImage from "../../common/List/ListItemImage";
import { formatDateWithHour } from "@/utils/date";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useState, useEffect } from "react";

async function getId() {
  const userData = await getCurrentUser();
  if (userData && typeof userData === 'object' && 'id' in userData) {
    return userData.id;
  }
  return null;
}

export default function LectureList({
  lecture,
  conference
}: { 
  lecture: Lecture;
  conference?: GetConferenceDetailsWithRoleFilteringData;
}) {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchId = async () => {
      const id = await getId();
      setUserId(id);
    };
    fetchId();
  }, []);

  const [update, setUpdate] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getLectureDetails(lecture.id);
      if (typeof result !== 'string') {
        setIsFavourite(result.interested.some(user => user.id === userId));
      }
    };
    console.log(conference?.amISignedUp);

    fetchData();
  }, [update, userId]); // fetchData zależy od userId (używany do sprawdzenia, czy użytkownik jest na liście zainteresowanych).

  const handleAddToFavourites  = async () => {
    try {
      const result = await addLectureToFavourites(lecture.id);
      if (result === 200) {
        if (setUpdate)
          setUpdate(!update);
      } else {
        console.error("Błąd dodawania wykładu do ulubionych.");
      }
    } catch (error) {
      console.error("Błąd dodawania wykładu do ulubionych.", error);
    }
  }

  const handleRemoveFromFavourites = async() => {
    try {
      const result = await removeLectureFromFavourites(lecture.id);
      if (result === 200) {
        if (setUpdate)
          setUpdate(!update);
      } else {
        console.error("Błąd usuwania wykładu z ulubionych.");
      }
    } catch (error) {
      console.error("Błąd usuwania wykładu z ulubionych.", error);
    }    
  }

  return (
    <div className="flex flex-col xs:flex-row items-center xs:items-start w-full text-black bg-close2White shadow-whiteShadow h-auto z-0 rounded-3xl">
      <ListItemImage
        href={`/lecture/${lecture.id}`}
        logo={lecture.image}
        className="rounded-3xl"
      >
        <div className="flex flex-col w-full pl-4">
          <p className="font-black text-xl">{lecture.name}</p>
          <p>{formatDateWithHour(lecture.startDateTime)}</p>
          <p>Czas: {lecture.durationMinutes} min</p>
          <p className="font-bold">Miejsce: {lecture?.place}</p>
        </div>
      </ListItemImage>
      {conference?.amISignedUp && (
        <span
          onClick={() => {
            isFavourite ? handleRemoveFromFavourites() : handleAddToFavourites();
          }}
            className="w-fit h-min flex justify-center items-center xs:h-min gap-x-2 my-4 xs:my-0 xs:mr-4 xs:mt-4 2xs:px-2 xs:px-0 cursor-pointer text-darkblue"
          >
            {isFavourite ? <FaStar className="text-base xs:text-2xl" /> :  <FaRegStar className="text-base xs:text-2xl" />}
            <p className="text-xs font-semibold hidden 2xs:block xs:hidden ">
              {isFavourite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
            </p>
          </span>
      )}
    </div>
  );
}