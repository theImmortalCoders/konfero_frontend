/*
import {
  isUserInLecturers,
  isUserInOrganizers,
  isUserLoggedIn,
} from "@/hooks/authorise/authorization";
import { GetLectureDetailsData } from "@/hooks/lecture";
import { Conference, UserData } from "@/hooks/user";
import { GetConferenceDetailsWithRoleFilteringData } from "@/hooks/conference";

export interface AuthoriseAuthorise {
  isUserInLecturers: boolean | undefined;
  isUserInOrganizers: boolean | undefined;
  isUserLoggedIn: boolean | undefined;
}

export default function isAuthorise(
  user: UserData,
  isUserInLecturersRun?: boolean,
  isUserInOrganizersRun?: boolean,
  isUserLoggedInRun?: boolean,
  lectureData?: string | GetLectureDetailsData,
  conferenceData?:
    | string
    | Conference
    | GetConferenceDetailsWithRoleFilteringData,
) {
  let isUserInLecturersAuthorized: boolean | undefined;
  if (user && isUserInLecturersRun) {
    if (lectureData === undefined || typeof lectureData === "string") {
      console.error("Brak lectureData");
      throw new Error("Brak lectureData");
    }
    isUserInLecturersAuthorized = isUserInLecturers(user, lectureData);
  }

  let isUserInOrganizersAuthorized: boolean | undefined;
  if (user && isUserInOrganizersRun) {
    if (conferenceData === undefined || typeof conferenceData === "string") {
      console.error("Brak conferenceData");
      throw new Error("Brak conferenceData");
    }
    isUserInOrganizersAuthorized = isUserInOrganizers(user, conferenceData);
  }

  let isUserLoggedInAuthorized: boolean | undefined;
  if (user && isUserLoggedInRun) {
    isUserLoggedInAuthorized = isUserLoggedIn(user);
  }
  const isAuth: AuthoriseAuthorise = {
    isUserInLecturers: isUserInLecturersAuthorized,
    isUserInOrganizers: isUserInLecturersAuthorized,
    isUserLoggedIn: isUserInLecturersAuthorized,
  };
  return isAuth;
}
*/
