"use server";

import {
  isUserInLecturers,
  isUserInOrganizers,
  isUserLoggedIn,
} from "@/hooks/authorise/authorization";
import { GetLectureDetailsData } from "@/hooks/lecture";
import { Conference, UserData } from "@/hooks/user";

const isAuthorise = (
  isUserInLecturersRun?: boolean,
  isUserInOrganizersRun?: boolean,
  isUserLoggedInRun?: boolean,
  lectureData?: undefined | GetLectureDetailsData | string,
  conferenceData?: undefined | Conference | string,
  user: UserData,
) => {
  let isAuthorized = false;
  if (user) {
    if (isUserInLecturersRun) {
      if (lectureData === undefined) {
        console.error("Brak lectureData");
        throw new Error("Brak lectureData");
      }
      isAuthorized = isUserInLecturers(user, lectureData);
    }
    if (isUserInOrganizersRun) {
      if (conferenceData === undefined) {
        console.error("Brak conferenceData");
        throw new Error("Brak conferenceData");
      }
      isAuthorized = isUserInOrganizers(user, conferenceData);
    }
    if (isUserLoggedInRun) {
      isAuthorized = isUserLoggedIn(user);
    }
  } else {
    console.error("Brak user");
    throw new Error("Brak user");
  }
  return isAuthorized;
};

export default isAuthorise;
