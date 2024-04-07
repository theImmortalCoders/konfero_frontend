import { appAPI } from "@/utils/appENV";
import { AxiosResponse } from "axios";

export async function deleteLecture(lectureId: number) {
  try {
    const response: AxiosResponse<void> = await appAPI.delete(
      `/api/lecture/${lectureId}`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Prelekcja zostało usunięte poprawnie!");
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Nie jesteś właścicielem konferencji lub nie masz roli");
      return "Nie jesteś właścicielem konferencji lub nie masz roli";
    } else {
      console.error("Wystąpił błąd podczas usuwania prelekcji");
      return "Wystąpił błąd podczas usuwania prelekcji";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (error.response.status === 403) {
      console.error("Nie jesteś właścicielem konferencji lub nie masz roli");
      return "Nie jesteś właścicielem konferencji lub nie masz roli";
    } else {
      throw new Error("Error500");
    }
  }
}

interface Image {
    id: number;
    path: string;
    hasThumbnail: boolean;
    authorId: number;
}
  
interface Lecturer {
    id: number;
    username: string;
    email: string;
    photo: string;
    verified: boolean;
}
  
interface Material {
    url: string;
    authorId: number;
}
  
interface Interested {
    id: number;
    username: string;
    email: string;
    photo: string;
    verified: boolean;
}
  
export interface GetLectureDetailsData {
    id: number;
    name: string;
    description: string;
    startDateTime: string;
    durationMinutes: number;
    image: Image;
    conferenceId: number;
    lecturers: Lecturer[];
    materials: Material[];
    interested: Interested[];
    place: string;
}

export async function getLectureDetails(lectureId: number): Promise<GetLectureDetailsData | string> {
    try {
      const response: AxiosResponse<GetLectureDetailsData | string> = await appAPI.get(
        `/api/lecture/${lectureId}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("Szczegóły prelekcji pobrano poprawnie!");
        return response.data;
      }
      if (response.status === 401) {
        console.error("Brak autoryzacji użytkownika");
        return "Brak autoryzacji użytkownika";
      } else {
        throw new Error("Wystąpił błąd podczas pobierania szczegółów prelekcji");
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        console.error("Brak autoryzacji użytkownika");
        return "Brak autoryzacji użytkownika";
      } else {
        throw new Error("Wystąpił błąd podczas pobierania szczegółów prelekcji");
      }
    }
}

export interface ModifyLectureInfoByOrganizerData {
  name: string,
  description: string,
  startDateTime: string,
  durationMinutes: number,
  imageId: number,
  lecturersIds: number[],
  place: string,
}

export async function modifyLectureInfoByOrganizer(lectureId: number, modifyLectureInfoData: ModifyLectureInfoByOrganizerData) {
    try {
      const response: AxiosResponse<void> = await appAPI.patch(
        `/api/lecture/${lectureId}/organizer`,
        modifyLectureInfoData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("Dane prelekcji zmodyfikowano poprawnie!");
        return response.status;
      } else if (response.status === 401) {
        window.location.replace("/login");
        console.error("Brak autoryzacji użytkownika");
        return "Brak autoryzacji użytkownika";
      } else if (response.status === 403) {
        console.error("Nie jesteś właścicielem konferencji lub nie masz roli");
        return "Nie jesteś właścicielem konferencji lub nie masz roli";
      } else {
        console.error("Wystąpił błąd podczas modyfikacji danych prelekcji");
        return "Wystąpił błąd podczas modyfikacji danych prelekcji";
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        window.location.replace("/login");
        console.error("Brak autoryzacji użytkownika");
        return "Brak autoryzacji użytkownika";
      } else if (error.response.status === 403) {
        console.error("Nie jesteś właścicielem konferencji lub nie masz roli");
        return "Nie jesteś właścicielem konferencji lub nie masz roli";
      } else {
        throw new Error("Error500");
      }
    }
}

export interface ModifyLectureInfoByLecturerData {
    description: string,
    imageId: number,
}

export async function modifyLectureInfoByLecturer(lectureId: number, modifyLectureInfoData: ModifyLectureInfoByLecturerData) {
    try {
      const response: AxiosResponse<void> = await appAPI.patch(
        `/api/lecture/${lectureId}/lecturer`,
        modifyLectureInfoData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("Dane prelekcji zmodyfikowano poprawnie!");
        return response.status;
      } else if (response.status === 401) {
        window.location.replace("/login");
        console.error("Brak autoryzacji użytkownika");
        return "Brak autoryzacji użytkownika";
      } else if (response.status === 403) {
        console.error("Nie jesteś prelegentem");
        return "Nie jesteś prelegentem";
      } else {
        console.error("Wystąpił błąd podczas modyfikacji danych prelekcji");
        return "Wystąpił błąd podczas modyfikacji danych prelekcji";
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        window.location.replace("/login");
        console.error("Brak autoryzacji użytkownika");
        return "Brak autoryzacji użytkownika";
      } else if (error.response.status === 403) {
        console.error("Nie jesteś prelegentem");
        return "Nie jesteś prelegentem";
      } else {
        throw new Error("Error500");
      }
    }
}

export interface AddLectureToConferenceData {
    name: string,
    description: string,
    startDateTime: string,
    durationMinutes: number,
    imageId: number,
    lecturersIds: number[],
    place: string,
}

export async function addLectureToConference(
    conferenceId: number,
    conferendeData: AddLectureToConferenceData
) {
    try {
      const response: AxiosResponse<void> = await appAPI.post(
        `/api/lecture/${conferenceId}`,
        conferendeData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("Prelekcja została dodana do konferencji!");
        return response.status;
      } else if (response.status === 401) {
        window.location.replace("/login");
        console.error("Brak autoryzacji użytkownika");
        return "Brak autoryzacji użytkownika";
      } else if (response.status === 403) {
        console.error("Nie jesteś właścicielem konferencji lub nie masz roli");
        return "Nie jesteś właścicielem konferencji lub nie masz roli";
      } else {
        console.error(
          "Wystąpił błąd podczas dodawania prelekcji do konferencji"
        );
        return "Wystąpił błąd podczas dodawania prelekcji do konferencji";
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        window.location.replace("/login");
        console.error("Brak autoryzacji użytkownika");
        return "Brak autoryzacji użytkownika";
      } else if (error.response.status === 403) {
        console.error("Nie jesteś właścicielem konferencji lub nie masz roli");
        return "Nie jesteś właścicielem konferencji lub nie masz roli";
      } else {
        throw new Error("Error500");
      }
    }
}