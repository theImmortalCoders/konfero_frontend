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

export async function getAllConferences(): Promise<GetAllConferencesData | string> {
  try {
    const response: AxiosResponse<GetAllConferencesData | string> = await appAPI.get(
      `/api/conference`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Wszystkie konferencje pobrano poprawnie!");
      return response.data;
    }
    if (response.status === 401) {
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      throw new Error("Wystąpił błąd podczas pobierania wszystkich konferencji");
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      throw new Error("Wystąpił błąd podczas pobierania wszystkich konferencji");
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

interface Image {
  id: number;
  path: string;
  hasThumbnail: boolean;
  authorId: number;
}

interface Lecture {
  id: number;
  name: string;
  startDateTime: string;
  durationMinutes: number;
  image: Image;
  place: string;
}

interface Photo {
  id: number;
  path: string;
  hasThumbnail: boolean;
  authorId: number;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author: Participant;
}

interface GetConferenceDetailsWithRoleFilteringData {
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
  photos: Photo[];
  verified: boolean;
  comments: Comment[];
  participantsFull: boolean;
}

export async function getConferenceDetailsWithRoleFiltering(conferenceId: number): Promise<GetConferenceDetailsWithRoleFilteringData | string> {
  try {
    const response: AxiosResponse<GetConferenceDetailsWithRoleFilteringData | string> = await appAPI.get(
      `/api/conference/${conferenceId}/details`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Szczegóły konferencji pobrano poprawnie!");
      return response.data;
    }
    if (response.status === 401) {
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      throw new Error("Wystąpił błąd podczas pobierania szczegółów konferencji");
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      throw new Error("Wystąpił błąd podczas pobierania szczegółów konferencji");
    }
  }
}

export async function cancelConference(conferenceId: number) {
  try {
    const response: AxiosResponse<void> = await appAPI.patch(
      `/api/lecture/${conferenceId}/organizer`,
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