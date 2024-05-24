import { appAPI } from "@/utils/appENV";
import { AxiosResponse } from "axios";
import { LogoInterface } from "./imageAPI";

export interface PageStats {
  organizersAmount: number,
  conferencesAmount: number,
  usersAmount: number
}

export async function getUsersStats(): Promise<PageStats | string> {
  try {
    const response: AxiosResponse<PageStats | string> = await appAPI.get(`/api/user/stats`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data;
    }
    else {
      return "Wystąpił błąd podczas pobierania danych strony";
    }
  } catch (error: any) {
    throw new Error("Wystąpił błąd podczas pobierania danych strony");
  }
}

export interface Location {
  locX: number;
  locY: number;
  name: string;
}

export interface Organizer {
  id: number;
  username: string;
  email: string;
  photo: string;
  verified: boolean;
}

export interface Conference {
  id: number;
  startDateTime: string;
  endDateTime: string;
  organizer: Organizer;
  name: string;
  logo: LogoInterface;
  location: Location;
  finished: boolean;
  canceled: boolean;
  participantsLimit: number;
  format: string;
  verified: boolean;
  participantsFull: boolean;
}

export interface UserData {
  id: number;
  googleId: string;
  username: string;
  role: string;
  email: string;
  photo: string;
  active: boolean;
  companyName: string;
  address: string;
  city: string;
  phone: string;
  conferencesOrganized: Conference[];
  conferencesParticipated: Conference[];
  verified: boolean;
}

export interface GetAllPendingBecomeOrganizerRequestData {
  id: number;
  user: UserData;
  status: string;
}

export async function getAllPendingBecomeOrganizerRequest(): Promise<
  GetAllPendingBecomeOrganizerRequestData[] | string
> {
  try {
    const response: AxiosResponse<
      GetAllPendingBecomeOrganizerRequestData[] | string
    > = await appAPI.get(`/api/user/organizer-requests`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data;
    }
    if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Nie jesteś administratorem!");
      return "Nie jesteś administratorem!";
    } else {
      console.error(
        "Wystąpił błąd podczas pobierania próśb o zostanie organizatorem",
      );
      return "Wystąpił błąd podczas pobierania próśb o zostanie organizatorem";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (error.response.status === 403) {
      console.error("Nie jesteś administratorem!");
      return "Nie jesteś administratorem!";
    } else {
      console.error(
        "Wystąpił błąd podczas pobierania próśb o zostanie organizatorem",
      );
      return "Wystąpił błąd podczas pobierania próśb o zostanie organizatorem";
    }
  }
}

export async function getCurrentUser(): Promise<UserData | null> {
  try {
    const response: AxiosResponse<UserData> = await appAPI.get(`/api/user/me`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data;
    }
    if (response.status === 401) {
      console.error("Brak autoryzacji użytkownika");
      return null;
    } else {
      throw new Error("Wystąpił błąd podczas pobierania danych użytkownika");
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      console.error("Brak autoryzacji użytkownika");
      return null;
    } else {
      throw new Error("Wystąpił błąd podczas pobierania danych użytkownika");
    }
  }
}

export interface GetAllUsersData {
  id: number;
  username: string;
  email: string;
  photo: string;
  verified: boolean;
}

export async function getAllUsers(): Promise<GetAllUsersData[] | string> {
  try {
    const response: AxiosResponse<GetAllUsersData[] | string> =
      await appAPI.get(`/api/user/all`, {
        withCredentials: true,
      });
    if (response.status === 200) {
      return response.data;
    }
    if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Nie jesteś administratorem!");
      return "Nie jesteś administratorem!";
    } else {
      console.error(
        "Wystąpił błąd podczas pobierania danych wszystkich użytkowników",
      );
      return "Wystąpił błąd podczas pobierania danych wszystkich użytkowników";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (error.response.status === 403) {
      console.error("Nie jesteś administratorem!");
      return "Nie jesteś administratorem!";
    } else {
      console.error(
        "Wystąpił błąd podczas pobierania danych wszystkich użytkowników",
      );
      return "Wystąpił błąd podczas pobierania danych wszystkich użytkowników";
    }
  }
}

export async function verifyUser(userId: number) {
  try {
    const response: AxiosResponse<void> = await appAPI.patch(
      `/api/user/${userId}/verify`,
      {},
      {
        withCredentials: true,
      },
    );
    if (response.status === 200) {
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Nie jesteś administratorem!");
      return "Nie jesteś administratorem!";
    } else {
      console.error("Wystąpił błąd podczas weryfikacji użytkownika");
      return "Wystąpił błąd podczas weryfikacji użytkownika";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (error.response.status === 403) {
      console.error("Nie jesteś administratorem!");
      return "Nie jesteś administratorem!";
    } else {
      console.error("Wystąpił błąd podczas weryfikacji użytkownika");
      return "Wystąpił błąd podczas weryfikacji użytkownika";
    }
  }
}

export async function changeUserRole(userId: number, newRole: string) {
  try {
    const response: AxiosResponse<void> = await appAPI.patch(
      `/api/user/${userId}/role?newRole=${newRole}`,
      {},
      {
        withCredentials: true,
      },
    );
    if (response.status === 200) {
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Nie jesteś administratorem!");
      return "Nie jesteś administratorem!";
    } else {
      console.error("Wystąpił błąd podczas zmiany roli użytkownika");
      return "Wystąpił błąd podczas zmiany roli użytkownika";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (error.response.status === 403) {
      console.error("Nie jesteś administratorem!");
      return "Nie jesteś administratorem!";
    } else {
      console.error("Wystąpił błąd podczas zmiany roli użytkownika");
      return "Wystąpił błąd podczas zmiany roli użytkownika";
    }
  }
}

export async function banUser(userId: number) {
  try {
    const response: AxiosResponse<void> = await appAPI.patch(
      `/api/user/${userId}/ban`,
      {},
      {
        withCredentials: true,
      },
    );
    if (response.status === 200) {
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Nie jesteś administratorem!");
      return "Nie jesteś administratorem!";
    } else {
      console.error("Wystąpił błąd podczas zablokowywania użytkownika");
      return "Wystąpił błąd podczas zablokowywania użytkownika";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (error.response.status === 403) {
      console.error("Nie jesteś administratorem!");
      return "Nie jesteś administratorem!";
    } else {
      console.error("Wystąpił błąd podczas zablokowywania użytkownika");
      return "Wystąpił błąd podczas zablokowywania użytkownika";
    }
  }
}

export async function updateProfileWithAdditionalData(
  phone: string,
  city: string,
) {
  try {
    const response: AxiosResponse<void> = await appAPI.post(
      `/api/user/update-profile`,
      {
        phone,
        city,
      },
      {
        withCredentials: true,
      },
    );
    if (response.status === 200) {
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas aktualizacji danych użytkownika");
      return "Wystąpił błąd podczas aktualizacji danych użytkownika";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas aktualizacji danych użytkownika");
      return "Wystąpił błąd podczas aktualizacji danych użytkownika";
    }
  }
}

export interface BecomeOrganizerData {
  companyName: string;
  address: string;
  city: string;
  phone: string;
}

export async function becomeOrganizerWithUpdateData(
  organizerData: BecomeOrganizerData,
) {
  try {
    const response: AxiosResponse<void> = await appAPI.post(
      `/api/user/become-organizer`,
      organizerData,
      {
        withCredentials: true,
      },
    );
    if (response.status === 200) {
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error(
        "Wystąpił błąd podczas dodawania wysyłania zapytania o otrzymania roli organizatora",
      );
      return "Wystąpił błąd podczas dodawania wysyłania zapytania o otrzymania roli organizatora";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error(
        "Wystąpił błąd podczas dodawania wysyłania zapytania o otrzymania roli organizatora",
      );
      return "Wystąpił błąd podczas dodawania wysyłania zapytania o otrzymania roli organizatora";
    }
  }
}

export async function reviewOrganizerRequest(
  requestId: number,
  approve: boolean,
) {
  try {
    const response: AxiosResponse<void> = await appAPI.put(
      `/api/user/${requestId}?approve=${approve}`,
      {},
      {
        withCredentials: true,
      },
    );
    if (response.status === 200) {
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Nie jesteś administratorem!");
      return "Nie jesteś administratorem!";
    } else {
      console.error(
        "Wystąpił błąd podczas rozpatrywania prośby o zostanie organizatorem",
      );
      return "Wystąpił błąd podczas rozpatrywania prośby o zostanie organizatorem";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (error.response.status === 403) {
      console.error("Nie jesteś administratorem!");
      return "Nie jesteś administratorem!";
    } else {
      console.error(
        "Wystąpił błąd podczas rozpatrywania prośby o zostanie organizatorem",
      );
      return "Wystąpił błąd podczas rozpatrywania prośby o zostanie organizatorem";
    }
  }
}
