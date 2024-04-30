import { appAPI } from "@/utils/appENV";
import { AxiosResponse } from "axios";

export async function deleteMaterialFromLecture(lectureId: number, materialId: number) {
  try {
    const response: AxiosResponse<void> = await appAPI.delete(
      `/api/lecture-material/${lectureId}?materialId=${materialId}`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Materiał został usunięty poprawnie!");
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Nie jesteś właścicielem prelekcji");
      return "Nie jesteś właścicielem prelekcji";
    } else {
      console.error("Wystąpił błąd podczas usuwania materiału");
      return "Wystąpił błąd podczas usuwania materiału";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (error.response.status === 403) {
      console.error("Nie jesteś właścicielem prelekcji");
      return "Nie jesteś właścicielem prelekcji";
    } else {
      throw new Error("Error500");
    }
  }
}

export async function addMaterialToLecture(lectureId: number, materialId: number) {
    try {
      const response: AxiosResponse<void> = await appAPI.post(
        `/api/lecture-material/${lectureId}?materialId=${materialId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("Materiał został dodany do prelekcji!");
        return response.status;
      } else if (response.status === 400) {
        console.error("Nie jesteś właścicielem materiału");
        return "Nie jesteś właścicielem materiału";
      } else if (response.status === 401) {
        window.location.replace("/login");
        console.error("Brak autoryzacji użytkownika");
        return "Brak autoryzacji użytkownika";
      } else if (response.status === 403) {
        console.error("Nie jesteś właścicielem prelekcji");
        return "Nie jesteś właścicielem prelekcji";
      } else {
        console.error(
          "Wystąpił błąd podczas dodawania materiału do prelekcji"
        );
        return "Wystąpił błąd podczas dodawania materiału do prelekcji";
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        console.error("Nie jesteś właścicielem materiału");
        return "Nie jesteś właścicielem materiału";
      } else if (error.response.status === 401) {
        window.location.replace("/login");
        console.error("Brak autoryzacji użytkownika");
        return "Brak autoryzacji użytkownika";
      } else if (error.response.status === 403) {
        console.error("Nie jesteś właścicielem prelekcji");
        return "Nie jesteś właścicielem prelekcji";
      } else {
        throw new Error("Error500");
      }
    }
}