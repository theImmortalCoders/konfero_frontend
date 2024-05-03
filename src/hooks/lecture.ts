import { appAPI } from "@/utils/appENV";
import { AxiosResponse } from "axios";
import { ImageInterface } from "./imageAPI";

export async function deleteLecture(lectureId: number) {
  try {
    const response: AxiosResponse<void> = await appAPI.delete(
      `/api/lecture/${lectureId}`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Prelekcja została usunięta poprawnie!");
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
      console.error("Wystąpił błąd podczas usuwania prelekcji");
      return "Wystąpił błąd podczas usuwania prelekcji";
    }
  }
}

export async function removeLectureFromFavourites(lectureId: number) {
  try {
    const response: AxiosResponse<void> = await appAPI.delete(
      `/api/lecture/${lectureId}/interested`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Prelekcja została usunięta z ulubionych!");
      return response.status;
    } else if (response.status === 400) {
      console.error("Prelekcja nie była dodana do ulubionych");
      return "Prelekcja nie była dodana do ulubionych";
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Nie jesteś zapisany na tę konferencję");
      return "Nie jesteś zapisany na tę konferencję";
    } else {
      console.error("Wystąpił błąd podczas usuwania prelekcji z ulubionych");
      return "Wystąpił błąd podczas usuwania prelekcji z ulubionych";
    }
  } catch (error: any) {
    if (error.response.status === 400) {
      console.error("Prelekcja nie była dodana do ulubionych");
      return "Prelekcja nie była dodana do ulubionych";
    } else if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (error.response.status === 403) {
      console.error("Nie jesteś zapisany na tę konferencję");
      return "Nie jesteś zapisany na tę konferencję";
    } else {
      console.error("Wystąpił błąd podczas usuwania prelekcji z ulubionych");
      return "Wystąpił błąd podczas usuwania prelekcji z ulubionych";
    }
  }
}

interface Lecturer {
  id: number;
  username: string;
  email: string;
  photo: string;
  verified: boolean;
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
  image: ImageInterface;
  conferenceId: number;
  lecturers: Lecturer[];
  materials: ImageInterface[];
  interested: Interested[];
  place: string;
}

export async function getLectureDetails(
  lectureId: number
): Promise<GetLectureDetailsData | string> {
  try {
    const response: AxiosResponse<GetLectureDetailsData | string> =
      await appAPI.get(`/api/lecture/${lectureId}`, {
        withCredentials: true,
      });
    if (response.status === 200) {
      console.log("Szczegóły prelekcji pobrano poprawnie!");
      return response.data;
    }
    if (response.status === 401) {
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas pobierania szczegółów prelekcji");
      return "Wystąpił błąd podczas pobierania szczegółów prelekcji";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas pobierania szczegółów prelekcji");
      return "Wystąpił błąd podczas pobierania szczegółów prelekcji";
    }
  }
}

export interface GetFavouriteLecturesData {
  id: number;
  name: string;
  startDateTime: string;
  durationMinutes: number;
  image: ImageInterface;
  place: string;
  interestedAmount: number;
  conferenceId: number;
  conferenceName: string;
}

export async function getFavouriteLectures(lectureStatus?: string): Promise<GetFavouriteLecturesData[] | string> {
  try {
    const response: AxiosResponse<GetFavouriteLecturesData[] | string> =
      await appAPI.get(lectureStatus ? `/api/lecture/favourite?lectureStatus=${lectureStatus}` : `/api/lecture/favourite`, {
        withCredentials: true,
      });
    if (response.status === 200) {
      console.log("Ulubione prelekcje pobrano poprawnie!");
      return response.data;
    }
    if (response.status === 401) {
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas pobierania ulubionych prelekcji");
      return "Wystąpił błąd podczas pobierania ulubionych prelekcji";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas pobierania ulubionych prelekcji");
      return "Wystąpił błąd podczas pobierania ulubionych prelekcji";
    }
  }
}


export interface ModifyLectureInfoByOrganizerData {
  name: string;
  description: string;
  startDateTime: string;
  durationMinutes: number;
  imageId: number;
  lecturersIds: number[];
  place: string;
}

export async function modifyLectureInfoByOrganizer(
  lectureId: number,
  modifyLectureInfoData: ModifyLectureInfoByOrganizerData
) {
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
      console.error("Wystąpił błąd podczas modyfikacji danych prelekcji");
      return "Wystąpił błąd podczas modyfikacji danych prelekcji";
    }
  }
}

export interface ModifyLectureInfoByLecturerData {
  description: string;
  imageId: number;
}

export async function modifyLectureInfoByLecturer(
  lectureId: number,
  modifyLectureInfoData: ModifyLectureInfoByLecturerData
) {
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
      console.error("Wystąpił błąd podczas modyfikacji danych prelekcji");
      return "Wystąpił błąd podczas modyfikacji danych prelekcji";
    }
  }
}

export async function addLectureToFavourites(
  lectureId: number,
) {
  try {
    const response: AxiosResponse<void> = await appAPI.post(
      `/api/lecture/${lectureId}/interested`,
      {},
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Prelekcja została dodana do ulubionych!");
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Nie jesteś zapisany na tę konferencję");
      return "Nie jesteś zapisany na tę konferencję";
    } else {
      console.error("Wystąpił błąd podczas dodawania prelekcji do ulubionych");
      return "Wystąpił błąd podczas dodawania prelekcji do ulubionych";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (error.response.status === 403) {
      console.error("Nie jesteś zapisany na tę konferencję");
      return "Nie jesteś zapisany na tę konferencję";
    } else {
      console.error("Wystąpił błąd podczas dodawania prelekcji do ulubionych");
      return "Wystąpił błąd podczas dodawania prelekcji do ulubionych";
    }
  }
}

export interface AddLectureToConferenceData {
  name: string;
  description: string;
  startDateTime: string;
  durationMinutes: number;
  imageId: number;
  lecturersIds: number[];
  place: string;
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
      console.error("Wystąpił błąd podczas dodawania prelekcji do konferencji");
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
      console.error("Wystąpił błąd podczas dodawania prelekcji do konferencji");
      return "Wystąpił błąd podczas dodawania prelekcji do konferencji";
    }
  }
}