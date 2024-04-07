import { appAPI } from "@/utils/appENV";
import { AxiosResponse } from "axios";

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