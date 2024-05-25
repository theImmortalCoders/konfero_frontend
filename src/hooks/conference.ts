import { appAPI } from "@/utils/appENV";
import { AxiosResponse } from "axios";
import { Location, Organizer } from "@/hooks/user";
import { ImageInterface } from "./imageAPI";

export async function deleteConference(conferenceId: number) {
  try {
    const response: AxiosResponse<void> = await appAPI.delete(
      `/api/conference/${conferenceId}`,
      {
        withCredentials: true,
      },
    );
    if (response.status === 200) {
      return response.status;
    } else if (response.status === 400) {
      return "Konferencja ma uczestników!";
    } else if (response.status === 401) {
      window.location.replace("/login");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      return "Nie jesteś właścicielem konferencji lub nie masz roli";
    } else {
      console.error("Wystąpił błąd podczas usuwania konferencji");
      return "Wystąpił błąd podczas usuwania konferencji";
    }
  } catch (error: any) {
    if (error.response.status === 400) {
      return "Konferencja ma uczestników!";
    } else if (error.response.status === 401) {
      window.location.replace("/login");
      return "Brak autoryzacji użytkownika";
    } else if (error.response.status === 403) {
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
      },
    );
    if (response.status === 200) {
      return response.status;
    } else if (response.status === 400) {
      return "Nie byłeś zarejestrowany na tę konferencję!";
    } else if (response.status === 401) {
      window.location.replace("/login");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas wypisywania z konferencji");
      return "Wystąpił błąd podczas wypisywania z konferencji";
    }
  } catch (error: any) {
    if (error.response.status === 400) {
      return "Nie byłeś zarejestrowany na tę konferencję!";
    } else if (error.response.status === 401) {
      window.location.replace("/login");
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
      },
    );
    if (response.status === 200) {
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      return "Nie jesteś właścicielem konferencji lub nie masz roli";
    } else {
      console.error("Wystąpił błąd podczas anulowania konferencji");
      return "Wystąpił błąd podczas anulowania konferencji";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      return "Brak autoryzacji użytkownika";
    } else if (error.response.status === 403) {
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
  logo: ImageInterface;
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
  sort?:
    | "startDateTime"
    | "location"
    | "canceled"
    | "format"
    | "participantsFull",
  sortDirection?: "ASC" | "DESC",
  startDateTimeFrom?: string,
  startDateTimeTo?: string,
  name?: string,
  tagsIds?: number[],
  canceled?: boolean,
  verified?: boolean,
  participantsFull?: boolean,
  organizerId?: number,
  locationName?: string,
): Promise<GetAllConferencesData | string> {
  try {
    let url = `/api/conference`;
    url =
      sort && sortDirection && organizerId
        ? url.concat(
            `?sort=${sort}&sortDirection=${sortDirection}&organizerId=${organizerId.toString()}`,
          )
        : sort && sortDirection
          ? url.concat(`?sort=${sort}&sortDirection=${sortDirection}`)
          : organizerId
            ? url.concat(`?organizerId=${organizerId.toString()}`)
            : url.concat(
              `?sort=startDateTime&sortDirection=DESC`,
            );
    url = startDateTimeFrom
      ? url.concat("&startDateTimeFrom=", startDateTimeFrom)
      : url;
    url = startDateTimeTo
      ? url.concat("&startDateTimeTo=", startDateTimeTo)
      : url;
    url = name ? url.concat("&name=", name) : url;
    tagsIds
      ? tagsIds.forEach((id) => {
          url = url.concat(`&tagsIds=${id.toString()}`);
        })
      : null;
    url = canceled !== undefined ? url.concat(`&canceled=${canceled}`) : url.concat(`&canceled=false`);
    url = verified !== undefined ? url.concat(`&verified=${verified}`) : url;
    url =
      participantsFull !== undefined
        ? url.concat(`&participantsFull=${participantsFull}`)
        : url;
    url = locationName ? url.concat("&locationName=", locationName) : url;
    const response: AxiosResponse<GetAllConferencesData | string> =
      await appAPI.get(`${url}`, {
        withCredentials: true,
      });
    if (response.status === 200) {
      return response.data;
    }
    if (response.status === 401) {
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas pobierania wszystkich konferencji");
      return "Wystąpił błąd podczas pobierania wszystkich konferencji";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas pobierania wszystkich konferencji");
      return "Wystąpił błąd podczas pobierania wszystkich konferencji";
    }
  }
}

export async function getAllConferencesByLocationName(
  locationName?: number,
  sort?:
    | "startDateTime"
    | "location"
    | "canceled"
    | "format"
    | "participantsFull",
): Promise<GetAllConferencesData | string> {
  try {
    let url = `/api/conference`;
    url =
      sort && locationName
        ? url.concat(`?sort=${sort}&locationName=${locationName.toString()}`)
        : sort
          ? url.concat(`?sort=${sort}`)
          : locationName
            ? url.concat(`?locationName=${locationName}`)
            : url;
    const response: AxiosResponse<GetAllConferencesData | string> =
      await appAPI.get(`${url}`, {
        withCredentials: true,
      });
    if (response.status === 200) {
      return response.data;
    }
    if (response.status === 401) {
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas pobierania wszystkich konferencji");
      return "Wystąpił błąd podczas pobierania wszystkich konferencji";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas pobierania wszystkich konferencji");
      return "Wystąpił błąd podczas pobierania wszystkich konferencji";
    }
  }
}

export async function getNotCanceledConferences(
  organizerId?: number,
): Promise<GetAllConferencesData | string> {
  try {
    const response: AxiosResponse<GetAllConferencesData | string> =
      await appAPI.get(
        organizerId
          ? `/api/conference?sort=startDateTime&sortDirection=ASC&organizerId=${organizerId.toString()}`
          : `/api/conference?sort=startDateTime&sortDirection=ASC`,
        {
          withCredentials: true,
        },
      );
    if (response.status === 200) {
      return response.data;
    }
    if (response.status === 401) {
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas pobierania wszystkich konferencji");
      return "Wystąpił błąd podczas pobierania wszystkich konferencji";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas pobierania wszystkich konferencji");
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
  role: string;
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

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author: Participant;
  responses?: Comment[];
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
  conferenceId: number,
): Promise<GetConferenceDetailsWithRoleFilteringData | string> {
  try {
    const response: AxiosResponse<
      GetConferenceDetailsWithRoleFilteringData | string
    > = await appAPI.get(`/api/conference/${conferenceId}/details`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data;
    }
    if (response.status === 401) {
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas pobierania szczegółów konferencji");
      return "Wystąpił błąd podczas pobierania szczegółów konferencji";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas pobierania szczegółów konferencji");
      return "Wystąpił błąd podczas pobierania szczegółów konferencji";
    }
  }
}

export async function getConferencesIAmSignedFor(
  conferenceStatus?: string,
): Promise<Content[] | string> {
  try {
    const response: AxiosResponse<Content[] | string> = await appAPI.get(
      conferenceStatus
        ? `/api/conference/my?conferenceStatus=${conferenceStatus}`
        : `/api/conference/my`,
      {
        withCredentials: true,
      },
    );
    if (response.status === 200) {
      return response.data;
    }
    if (response.status === 401) {
      return "Brak autoryzacji użytkownika";
    } else {
      return "Wystąpił błąd podczas pobierania konferencji użytkownika";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      return "Brak autoryzacji użytkownika";
    } else {
      return "Wystąpił błąd podczas pobierania konferencji użytkownika";
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
      },
    );
    if (response.status === 200) {
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      return "Nie jesteś organizatorem";
    } else {
      return "Wystąpił błąd podczas dodawania konferencji";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      return "Brak autoryzacji użytkownika";
    } else if (error.response.status === 403) {
      return "Nie jesteś organizatorem";
    } else {
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
      },
    );
    if (response.status === 200) {
      return "Zapisano na konferencję poprawnie!";
    } else if (response.status === 400) {
      return "Jesteś już zapisany na te konferencję";
    } else if (response.status === 401) {
      window.location.replace("/login");
      return "Brak autoryzacji użytkownika";
    } else {
      return "Wystąpił błąd podczas zapisywania na konferencję";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      return "Brak autoryzacji użytkownika";
    } else if (error.response.status === 400) {
      return "Jesteś już zapisany na te konferencję";
    } else {
      return "Wystąpił błąd podczas zapisywania na konferencję";
    }
  }
}

export async function updateInfoAboutConference(
  conferenceId: number,
  conferenceData: AddNewConferenceData,
) {
  try {
    const response: AxiosResponse<void> = await appAPI.put(
      `/api/conference/${conferenceId}`,
      conferenceData,
      {
        withCredentials: true,
      },
    );
    if (response.status === 200) {
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      return "Nie jesteś właścicielem konferencji lub nie masz roli";
    } else {
      return "Wystąpił błąd podczas aktualizowania danych konferencji";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      return "Brak autoryzacji użytkownika";
    } else if (error.response.status === 403) {
      return "Nie jesteś właścicielem konferencji lub nie masz roli";
    } else {
      return "Wystąpił błąd podczas aktualizowania danych konferencji";
    }
  }
}
