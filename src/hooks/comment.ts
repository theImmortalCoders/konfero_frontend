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
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error(
        "Nie masz odpowiedniej roli lub nie jesteś autorem komentarza"
      );
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
      console.error(
        "Nie masz odpowiedniej roli lub nie jesteś autorem komentarza"
      );
      return "Nie masz odpowiedniej roli lub nie jesteś autorem komentarza";
    } else {
      console.error("Wystąpił błąd podczas usuwania komentarza");
      return "Wystąpił błąd podczas usuwania komentarza";
    }
  }
}

export async function addCommentToConference(
  conferenceId: number,
  value: string
) {
  try {
    const response: AxiosResponse<void> = await appAPI.post(
      `/api/comment?conferenceId=${conferenceId}`,
      { value },
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Komentarz został dodany poprawnie!");
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas dodawania komentarza");
      return "Wystąpił błąd podczas dodawania komentarza";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas dodawania komentarza");
      return "Wystąpił błąd podczas dodawania komentarza";
    }
  }
}

export async function respondToComment(commentId: number, value: string) {
  try {
    const response: AxiosResponse<void> = await appAPI.post(
      `/api/comment/${commentId}/respond`,
      { value },
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Odpowiedź na komentarz zostaa dodana poprawnie!");
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas dodawania odpowiedzi na komentarz");
      return "Wystąpił błąd podczas dodawania odpowiedzi na komentarz";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas dodawania odpowiedzi na komentarz");
      return "Wystąpił błąd podczas dodawania odpowiedzi na komentarz";
    }
  }
}
