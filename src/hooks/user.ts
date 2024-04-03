import { appAPI } from "@/utils/appENV";
import { AxiosResponse } from "axios";

export interface GetCurrentUserData {
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
}

export async function getCurrentUser(): Promise<GetCurrentUserData | null> {
  try {
    const response: AxiosResponse<GetCurrentUserData> = await appAPI.get(
      `/api/user/me`,
      {
        withCredentials: true,
      }
    );
    console.log("Dane użytkownika pobrano poprawnie!");
    return response.data;
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
    } else {
      console.error("Wystąpił błąd podczas zmiany roli użytkownika");
      return "Wystąpił błąd podczas zmiany roli użytkownika";
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
    } else {
      console.error("Wystąpił błąd podczas zablokowywania użytkownika");
      return "Wystąpił błąd podczas zablokowywania użytkownika";
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
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas aktualizacji danych użytkownika");
      return "Wystąpił błąd podczas aktualizacji danych użytkownika";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
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
      console.log("Użytkownik stał się organizatorem!");
      return response.status;
    } else if (response.status === 401) {
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error(
        "Wystąpił błąd podczas dodawania użytkownikowi roli organizatora"
      );
      return "Wystąpił błąd podczas dodawania użytkownikowi roli organizatora";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      throw new Error("Error500");
    }
  }
}
