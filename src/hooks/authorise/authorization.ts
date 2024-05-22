"use server";
import { GetLectureDetailsData } from "@/hooks/lecture";
import { Conference, UserData } from "@/hooks/user";

export function isUserInLecturers(
  user: UserData,
  lectureData: undefined | GetLectureDetailsData | string,
) {
  return (
    lectureData &&
    typeof lectureData != "string" &&
    lectureData.lecturers.map((lecturer) => lecturer.id === user?.id).length > 0
  );
}

export function isUserInOrganizers(
  user: UserData,
  conferenceData: undefined | Conference | string,
) {
  return (
    conferenceData &&
    typeof conferenceData != "string" &&
    conferenceData.organizer.id === user.id
  );
}

export function isUserLoggedIn(user: UserData) {
  return user !== null;
}
