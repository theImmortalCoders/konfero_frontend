"use client";
import Page from "@/components/common/Page/Page";
import { useQuery } from "react-query";
import {
  getFavouriteLectures,
  GetFavouriteLecturesData,
} from "@/hooks/lecture";
import LectureList from "@/components/myconferenceId/Lectures/LectureList";
import { Box } from "@/components/common/Box/Box";
import Error500 from "@/components/common/Error/Error500";
import TitleHeader from "@/components/common/Box/TitleHeader";

const FavouriteLectures = ({
  lectures,
}: {
  lectures: GetFavouriteLecturesData[];
}) => {
  return (
    <Box className="text-darkblue w-[90%] lg:w-[60%] my-5">
      {lectures.length > 0 ? (
        <>
          <TitleHeader title={"Polubione wykłady"} />
          <p className="font-semibold text-xs sm:text-sm xl:text-base text-center xs:text-left">
            Znalezione wykłady: {lectures.length}
          </p>

          {lectures.map((lecture) => {
            return (
              <div key={lecture.id}>
                <div className="py-3" key={lecture.id}>
                  <LectureList key={lecture.id} lecture={lecture} />
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <p className="w-full font-semibold text-center">
          Brak ulubionych wykładów
        </p>
      )}
    </Box>
  );
};

const Favourites = () => {
  const {
    data: favouritesData,
    isLoading: isFavouritesLoading,
    isError: isFavouritesError,
  } = useQuery(
    "Favourites lectures",
    () => {
      return getFavouriteLectures();
    },
    {
      refetchOnMount: "always",
    },
  );

  if (isFavouritesError) return <Error500 />;

  return (
    <Page className="flex flex-col items-center justify-center">
      {!isFavouritesLoading &&
      typeof favouritesData !== "string" &&
      favouritesData ? (
        <FavouriteLectures lectures={favouritesData} />
      ) : (
        <p>Ładowanie...</p>
      )}
    </Page>
  );
};

export default Favourites;
