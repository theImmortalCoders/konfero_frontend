import { appAPI } from "@/utils/appENV";
import { AxiosResponse } from "axios";
import { Location, Organizer } from "@/hooks/user";
import { ImageInterface, LogoInterface } from "./imageAPI";

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
      console.error("Wystąpił błąd podczas usuwania konferencji");
      return "Wystąpił błąd podczas usuwania konferencji";
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
      console.error("Wystąpił błąd podczas usuwania konferencji");
      return "Wystąpił błąd podczas usuwania konferencji";
    }
  }
}

export async function signOutFromConference(conferenceId: number) {
  try {
    const response: AxiosResponse<void> = await appAPI.delete(
      `/api/conference/${conferenceId}/attend`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Wypisano z konferencji poprawnie!");
      return response.status;
    } else if (response.status === 400) {
      console.error("Nie byłeś zarejestrowany na tę konferencję!");
      return "Nie byłeś zarejestrowany na tę konferencję!";
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas wypisywania z konferencji");
      return "Wystąpił błąd podczas wypisywania z konferencji";
    }
  } catch (error: any) {
    if (error.response.status === 400) {
      console.error("Nie byłeś zarejestrowany na tę konferencję!");
      return "Nie byłeś zarejestrowany na tę konferencję!";
    } else if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas wypisywania z konferencji");
      return "Wystąpił błąd podczas wypisywania z konferencji";
    }
  }
}

export async function cancelConference(conferenceId: number) {
  try {
    const response: AxiosResponse<void> = await appAPI.delete(
      `/api/conference/${conferenceId}/cancel`,
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
      console.error("Wystąpił błąd podczas anulowania konferencji");
      return "Wystąpił błąd podczas anulowania konferencji";
    }
  }
}

export interface Content {
  id: number;
  startDateTime: string;
  endDateTime: string;
  organizer: Organizer;
  name: string;
  tags: Tag[];
  logo: LogoInterface;
  location: Location;
  finished: boolean;
  canceled: boolean;
  participantsLimit: number;
  format: string;
  verified: boolean;
  participantsFull: boolean;
  participantsAmount: number;
  amISignedUp: boolean;
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

export async function getAllConferences(
  organizerId?: number
): Promise<GetAllConferencesData | string> {
  try {
    const response: AxiosResponse<GetAllConferencesData | string> =
      await appAPI.get(
        organizerId
          ? `/api/conference?organizerId=${organizerId.toString()}`
          : `/api/conference`,
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
      console.error(
        "Wystąpił błąd podczas pobierania wszystkich konferencji"
      );
      return "Wystąpił błąd podczas pobierania wszystkich konferencji";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error(
        "Wystąpił błąd podczas pobierania wszystkich konferencji"
      );
      return "Wystąpił błąd podczas pobierania wszystkich konferencji";
    }
  }
}

export async function getNotCanceledConferences(
  organizerId?: number
): Promise<GetAllConferencesData | string> {
  try {
    const response: AxiosResponse<GetAllConferencesData | string> =
      await appAPI.get(
        organizerId
          ? `/api/conference?sort=startDateTime&sortDirection=ASC&organizerId=${organizerId.toString()}`
          : `/api/conference?sort=startDateTime&sortDirection=ASC`,
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
      console.error(
        "Wystąpił błąd podczas pobierania wszystkich konferencji"
      );
      return "Wystąpił błąd podczas pobierania wszystkich konferencji";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error(
        "Wystąpił błąd podczas pobierania wszystkich konferencji"
      );
      return "Wystąpił błąd podczas pobierania wszystkich konferencji";
    }
  }
}

export interface Tag {
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

export interface Lecture {
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
  logo: ImageInterface;
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
  participantsAmount: number;
  amISignedUp: boolean;
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
      console.error(
        "Wystąpił błąd podczas pobierania szczegółów konferencji"
      );
      return "Wystąpił błąd podczas pobierania szczegółów konferencji";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error(
        "Wystąpił błąd podczas pobierania szczegółów konferencji"
      );
      return "Wystąpił błąd podczas pobierania szczegółów konferencji";
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

export async function addNewConference(conferenceData: AddNewConferenceData) {
  try {
    const response: AxiosResponse<void> = await appAPI.post(
      `/api/conference`,
      conferenceData,
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
      console.error("Wystąpił błąd podczas dodawania konferencji");
      return "Wystąpił błąd podczas dodawania konferencji";
    }
  }
}

export async function signUpForConference(conferenceId: number) {
  try {
    const response: AxiosResponse<void> = await appAPI.post(
      `/api/conference/${conferenceId}/attend`,
      {},
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Zapisano na konferencję poprawnie!");
      return response.status;
    } else if (response.status === 400) {
      console.error("Jesteś już zapisany na tę konferencję");
      return "Jesteś już zapisany na te konferencję";
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas zapisywania na konferencję");
      return "Wystąpił błąd podczas zapisywania na konferencję";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (error.response.status === 400) {
      console.error("Jesteś już zapisany na tę konferencję");
      return "Jesteś już zapisany na te konferencję";
    } else {
      console.error("Wystąpił błąd podczas zapisywania na konferencję");
      return "Wystąpił błąd podczas zapisywania na konferencję";
    }
  }
}

export async function updateInfoAboutConference(
  conferenceId: number,
  conferenceData: AddNewConferenceData
) {
  try {
    const response: AxiosResponse<void> = await appAPI.put(
      `/api/conference/${conferenceId}`,
      conferenceData,
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
