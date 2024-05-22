import { GetLectureDetailsData } from "@/hooks/lecture";
import { Conference, UserData } from "@/hooks/user";
import { GetConferenceDetailsWithRoleFilteringData } from "@/hooks/conference";

export function isUserInLecturers(
  user: UserData,
  lectureData: GetLectureDetailsData,
) {
  return (lectureData &&
    lectureData.lecturers.map((lecturer) => lecturer.id === user?.id).length >
      0) as boolean;
}

export function isUserInOrganizers(
  user: UserData,
  conferenceData: Conference | GetConferenceDetailsWithRoleFilteringData,
) {
  return (conferenceData && conferenceData.organizer.id === user.id) as boolean;
}

export function isUserLoggedIn(user: UserData) {
  return (user !== null) as boolean;
}
