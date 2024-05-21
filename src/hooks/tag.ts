import { appAPI } from "@/utils/appENV";
import { AxiosResponse } from "axios";
import { Tag } from "./conference";

export async function deleteTag(tagId: number) {
  try {
    const response: AxiosResponse<void> = await appAPI.delete(
      `/api/tag/${tagId}`,
      {
        withCredentials: true,
      },
    );
    if (response.status === 200) {
      console.log("Tag został usunięty poprawnie!");
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Nie masz odpowiedniej roli");
      return "Nie masz odpowiedniej roli";
    } else {
      console.error("Wystąpił błąd podczas usuwania taga");
      return "Wystąpił błąd podczas usuwania taga";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (error.response.status === 403) {
      console.error("Nie masz odpowiedniej roli");
      return "Nie masz odpowiedniej roli";
    } else {
      console.error("Wystąpił błąd podczas usuwania taga");
      return "Wystąpił błąd podczas usuwania taga";
    }
  }
}

export async function getAllTags(): Promise<Tag[] | string> {
  try {
    const response: AxiosResponse<Tag[] | string> = await appAPI.get(
      `/api/tag`,
      {
        withCredentials: true,
      },
    );
    if (response.status === 200) {
      console.log("Wszystkie tagi pobrano poprawnie!");
      return response.data;
    }
    if (response.status === 401) {
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas pobierania wszystkich tagów");
      return "Wystąpił błąd podczas pobierania wszystkich tagów";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas pobierania wszystkich tagów");
      return "Wystąpił błąd podczas pobierania wszystkich tagów";
    }
  }
}

export async function addNewTag(value: string) {
  try {
    const response: AxiosResponse<void> = await appAPI.post(
      `/api/tag`,
      {
        value,
      },
      {
        withCredentials: true,
      },
    );
    if (response.status === 200) {
      console.log("Tag został dodany!");
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Nie masz odpowiedniej roli");
      return "Nie masz odpowiedniej roli";
    } else {
      console.error("Wystąpił błąd podczas dodawania taga");
      return "Wystąpił błąd podczas dodawania taga";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (error.response.status === 403) {
      console.error("Nie masz odpowiedniej roli");
      return "Nie masz odpowiedniej roli";
    } else {
      console.error("Wystąpił błąd podczas dodawania taga");
      return "Wystąpił błąd podczas dodawania taga";
    }
  }
}
