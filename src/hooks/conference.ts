import { appAPI } from "@/utils/appENV";
import { AxiosResponse } from "axios";
import { Logo, Location, Organizer } from "@/hooks/user";

export async function deleteConference(conferenceId: number) {
  try {
    const response: AxiosResponse<void> = await appAPI.delete(
      `/api/conference/${conferenceId}`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Konferencja została usunięta poprawnie!");
      return response.status;
    } else if (response.status === 400) {
      console.error("Konferencja ma uczestników!");
      return "Konferencja ma uczestników!";
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
    if (error.response.status === 400) {
      console.error("Konferencja ma uczestników!");
      return "Konferencja ma uczestników!";
    } else if (error.response.status === 401) {
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

interface Content {
  id: number;
  startDateTime: string;
  endDateTime: string;
  organizer: Organizer;
  name: string;
  logo: Logo;
  location: Location;
  finished: boolean;
  canceled: boolean;
  participantsLimit: number;
  format: string;
  verified: boolean;
  participantsFull: boolean;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  offset: number;
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
}

export interface GetAllConferencesData {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Content[];
  number: number;
  sort: Sort;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}

export async function getAllConferences(): Promise<
  GetAllConferencesData | string
> {
  try {
    const response: AxiosResponse<GetAllConferencesData | string> =
      await appAPI.get(`/api/conference`, {
        withCredentials: true,
      });
    if (response.status === 200) {
      console.log("Wszystkie konferencje pobrano poprawnie!");
      return response.data;
    }
    if (response.status === 401) {
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      throw new Error(
        "Wystąpił błąd podczas pobierania wszystkich konferencji"
      );
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      throw new Error(
        "Wystąpił błąd podczas pobierania wszystkich konferencji"
      );
    }
  }
}

interface Tag {
  id: number;
  tagName: string;
}

interface Participant {
  id: number;
  username: string;
  email: string;
  photo: string;
  verified: boolean;
}

export interface ImageInterface {
  id: number;
  path: string;
  description: string;
  authorId: number;
  fileType: string;
}

interface Lecture {
  id: number;
  name: string;
  startDateTime: string;
  durationMinutes: number;
  image: ImageInterface;
  place: string;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author: Participant;
}

export interface GetConferenceDetailsWithRoleFilteringData {
  id: number;
  startDateTime: string;
  endDateTime: string;
  organizer: Organizer;
  name: string;
  description: string;
  logo: Logo;
  tags: Tag[];
  location: Location;
  participants: Participant[];
  lectures: Lecture[];
  finished: boolean;
  canceled: boolean;
  participantsLimit: number;
  format: string;
  photos: ImageInterface[];
  verified: boolean;
  comments: Comment[];
  participantsFull: boolean;
}

export async function getConferenceDetailsWithRoleFiltering(
  conferenceId: number
): Promise<GetConferenceDetailsWithRoleFilteringData | string> {
  try {
    const response: AxiosResponse<
      GetConferenceDetailsWithRoleFilteringData | string
    > = await appAPI.get(`/api/conference/${conferenceId}/details`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      console.log("Szczegóły konferencji pobrano poprawnie!");
      return response.data;
    }
    if (response.status === 401) {
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      throw new Error(
        "Wystąpił błąd podczas pobierania szczegółów konferencji"
      );
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      throw new Error(
        "Wystąpił błąd podczas pobierania szczegółów konferencji"
      );
    }
  }
}

export async function cancelConference(conferenceId: number) {
  try {
    const response: AxiosResponse<void> = await appAPI.patch(
      `/api/lecture/${conferenceId}/cancel`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Konferencja anulowana poprawnie!");
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Nie jesteś właścicielem konferencji lub nie masz roli");
      return "Nie jesteś właścicielem konferencji lub nie masz roli";
    } else {
      console.error("Wystąpił błąd podczas anulowania konferencji");
      return "Wystąpił błąd podczas anulowania konferencji";
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

export interface AddNewConferenceData {
  startDateTime: string;
  name: string;
  description: string;
  logoId: number;
  tagsIds: number[];
  location: Location;
  participantsLimit: number;
  format: string;
  photosIds: number[];
}

export async function addNewConference(conferendeData: AddNewConferenceData) {
  try {
    const response: AxiosResponse<void> = await appAPI.post(
      `/api/conference`,
      conferendeData,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Konferencja została dodana poprawnie!");
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Nie jesteś organizatorem");
      return "Nie jesteś organizatorem";
    } else {
      console.error("Wystąpił błąd podczas dodawania konferencji");
      return "Wystąpił błąd podczas dodawania konferencji";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (error.response.status === 403) {
      console.error("Nie jesteś organizatorem");
      return "Nie jesteś organizatorem";
    } else {
      throw new Error("Error500");
    }
  }
}

export async function updateInfoAboutConference(
  conferenceId: number,
  conferendeData: AddNewConferenceData
) {
  try {
    const response: AxiosResponse<void> = await appAPI.put(
      `/api/conference/${conferenceId}`,
      conferendeData,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Dane konferencji zostały zaktualizowane poprawnie!");
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Nie jesteś właścicielem konferencji lub nie masz roli");
      return "Nie jesteś właścicielem konferencji lub nie masz roli";
    } else {
      console.error("Wystąpił błąd podczas aktualizowania danych konferencji");
      return "Wystąpił błąd podczas aktualizowania danych konferencji";
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
