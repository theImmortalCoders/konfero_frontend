import { appAPI } from "@/utils/appENV";
import { AxiosResponse } from "axios";

export interface Logo {
  id: number;
  path: string;
  description: string;
  authorId: number;
  fileType: string;
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

interface Conference {
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

export async function getAllPendingBecomeOrganizerRequest(): Promise<GetAllPendingBecomeOrganizerRequestData[] | string> {
  try {
    const response: AxiosResponse<GetAllPendingBecomeOrganizerRequestData[] | string> = await appAPI.get(
      `/api/user/organizer-requests`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Prośby o zostanie organizatorem pobrano poprawnie!");
      return response.data;
    }
    if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if(response.status === 403) {
      console.error("Nie jesteś administratorem!");
      return "Nie jesteś administratorem!";
    } else {
      throw new Error("Wystąpił błąd podczas pobierania próśb o zostanie organizatorem");
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if(error.response.status === 403) {
      console.error("Nie jesteś administratorem!");
      return "Nie jesteś administratorem!";
    } else {
      throw new Error("Wystąpił błąd podczas pobierania próśb o zostanie organizatorem");
    }
  }
}

export async function getCurrentUser(): Promise<UserData | null> {
  try {
    const response: AxiosResponse<UserData> = await appAPI.get(
      `/api/user/me`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Dane użytkownika pobrano poprawnie!");
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

export async function changeUserRole(userId: number, newRole: string) {
  try {
    const response: AxiosResponse<void> = await appAPI.patch(
      `/api/user/${userId}/role?newRole=${newRole}`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Rola użytkownika została zmieniona poprawnie!");
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if(response.status === 403) {
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
    } else if(error.response.status === 403) {
      console.error("Nie jesteś administratorem!");
      return "Nie jesteś administratorem!";
    } else {
      throw new Error("Error500");
    }
  }
}

export async function banUser(userId: number) {
  try {
    const response: AxiosResponse<void> = await appAPI.patch(
      `/api/user/${userId}/ban`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Użytkownik został zablokowany poprawnie!");
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if(response.status === 403) {
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
    } else if(error.response.status === 403) {
      console.error("Nie jesteś administratorem!");
      return "Nie jesteś administratorem!";
    } else {
      throw new Error("Error500");
    }
  }
}

export async function updateProfileWithAdditionalData(
  phone: string,
  city: string
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
      }
    );
    if (response.status === 200) {
      console.log("Dane użytkownika zaktualizowane poprawnie!");
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
      throw new Error("Error500");
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
  organizerData: BecomeOrganizerData
) {
  try {
    const response: AxiosResponse<void> = await appAPI.post(
      `/api/user/become-organizer`,
      organizerData,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Użytkownik wysłał zapytanie o zostanie organizatorem!");
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error(
        "Wystąpił błąd podczas dodawania wysyłania zapytania o otrzymania roli organizatora"
      );
      return "Wystąpił błąd podczas dodawania wysyłania zapytania o otrzymania roli organizatora";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      throw new Error("Error500");
    }
  }
}

export async function rewievOrganizerRequest(
  requestId: number,
  approve: boolean,
) {
  try {
    const response: AxiosResponse<void> = await appAPI.put(
      `/api/user/${requestId}?approve=${approve}`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Prośba o zostanie organizatorem rozpatrzona");
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if(response.status === 403) {
      console.error("Nie jesteś administratorem!");
      return "Nie jesteś administratorem!";
    } else {
      console.error(
        "Wystąpił błąd podczas rozpatrywania prośby o zostanie organizatorem"
      );
      return "Wystąpił błąd podczas rozpatrywania prośby o zostanie organizatorem";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if(error.response.status === 403) {
      console.error("Nie jesteś administratorem!");
      return "Nie jesteś administratorem!";
    } else {
      throw new Error("Error500");
    }
  }
}