import { appAPI } from "@/utils/appENV";
import { AxiosResponse } from "axios";

export async function deleteComment(commentId: number) {
  try {
    const response: AxiosResponse<void> = await appAPI.delete(
      `/api/comment/${commentId}`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Komentarz został usunięty poprawnie!");
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Nie masz odpowiedniej roli lub nie jesteś autorem komentarza");
      return "Nie masz odpowiedniej roli lub nie jesteś autorem komentarza";
    } else {
      console.error("Wystąpił błąd podczas usuwania komentarza");
      return "Wystąpił błąd podczas usuwania komentarza";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (error.response.status === 403) {
      console.error("Nie masz odpowiedniej roli lub nie jesteś autorem komentarza");
      return "Nie masz odpowiedniej roli lub nie jesteś autorem komentarza";
    } else {
      console.error("Wystąpił błąd podczas usuwania komentarza");
      return "Wystąpił błąd podczas usuwania komentarza";
    }
  }
}