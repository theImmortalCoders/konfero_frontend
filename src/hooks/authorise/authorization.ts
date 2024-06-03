import { GetLectureDetailsData } from "@/hooks/lecture";
import { Conference, UserData } from "@/hooks/user";
import { GetConferenceDetailsWithRoleFilteringData } from "@/hooks/conference";

export async function isUserInLecturers(
  user: UserData,
  lectureData: GetLectureDetailsData,
): Promise<boolean> {
  return lectureData.lecturers.some((lecturer) => lecturer.id === user?.id);
}

export async function isUserInOrganizers(
  user: UserData,
  conferenceData: Conference | GetConferenceDetailsWithRoleFilteringData,
): Promise<boolean> {
  return conferenceData.organizer.id === user.id;
}

export async function isUserLoggedIn(user: UserData): Promise<boolean> {
  return user !== null;
}

export async function isUserAnAdmin(user: UserData): Promise<boolean> {
  return user.role === "ADMIN";
}
