import { appAPI } from "@/utils/appENV";
import { AxiosResponse } from "axios";

export async function deleteTag(tagId: number) {
  try {
    const response: AxiosResponse<void> = await appAPI.delete(
      `/api/tag/${tagId}`,
      {
        withCredentials: true,
      }
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
      throw new Error("Error500");
    }
  }
}

export interface SingleTagData{
    id: number;
    tagName: string;
}

export async function getAllTags(): Promise<SingleTagData[] | string> {
    try {
      const response: AxiosResponse<SingleTagData[] | string> =
        await appAPI.get(`/api/tag`, {
          withCredentials: true,
        });
      if (response.status === 200) {
        console.log("Wszystkie tagi pobrano poprawnie!");
        return response.data;
      }
      if (response.status === 401) {
        console.error("Brak autoryzacji użytkownika");
        return "Brak autoryzacji użytkownika";
      } else {
        throw new Error("Wystąpił błąd podczas pobierania wszystkich tagów");
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        console.error("Brak autoryzacji użytkownika");
        return "Brak autoryzacji użytkownika";
      } else {
        throw new Error("Wystąpił błąd podczas pobierania wszystkich tagów");
      }
    }
  }