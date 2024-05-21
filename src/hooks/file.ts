import { appAPI } from "@/utils/appENV";
import { AxiosResponse } from "axios";

export async function deleteFileById(fileId: number) {
  try {
    const response: AxiosResponse<void> = await appAPI.delete(
      `/api/file/${fileId}`,
      {
        withCredentials: true,
      },
    );
    if (response.status === 200) {
      console.log("Plik został usunięty poprawnie!");
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas usuwania pliku");
      return "Wystąpił błąd podczas usuwania pliku";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else {
      console.error("Wystąpił błąd podczas usuwania pliku");
      return "Wystąpił błąd podczas usuwania pliku";
    }
  }
}

export interface FileResponseData {
  id: number;
  path: string;
  desrciption: string;
  authorId: number;
  fileType: string;
}

export async function getAllFilesByAuthorId(authorId: number) {
  try {
    const response: AxiosResponse<FileResponseData[]> = await appAPI.get(
      `/api/file?authorId=${authorId}`,
      {
        withCredentials: true,
      },
    );
    if (response.status === 200) {
      console.log("Pliki danego autora pobrano poprawnie!");
      return response.data;
    } else {
      console.error("Wystąpił błąd podczas pobierania plików danego autora");
      return "Wystąpił błąd podczas pobierania plików danego autora";
    }
  } catch (error: any) {
    console.error("Wystąpił błąd podczas pobierania plików danego autora");
    return "Wystąpił błąd podczas pobierania plików danego autora";
  }
}

export async function downloadFileById(fileId: string) {
  try {
    const response: AxiosResponse<void> = await appAPI.get(
      `/api/file/${fileId}`,
      {
        withCredentials: true,
      },
    );
    if (response.status === 200) {
      console.log("Plik pobrano poprawnie!");
      return response.data;
    } else {
      console.error("Wystąpił błąd podczas pobierania pliku");
      return "Wystąpił błąd podczas pobierania pliku";
    }
  } catch (error: any) {
    console.error("Wystąpił błąd podczas pobierania pliku");
    return "Wystąpił błąd podczas pobierania pliku";
  }
}

export async function uploadFile(uploadedFile: File, description: string) {
  try {
    const formData = new FormData();
    formData.append("uploadedFile", uploadedFile);
    const response: AxiosResponse<FileResponseData> = await appAPI.post(
      `/api/file?description=${description}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if (response.status === 200) {
      console.log("Plik został przesłany poprawnie!");
      return response.data;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 413) {
      console.error("Plik jest zbyt duży!");
      return "Plik jest zbyt duży!";
    } else {
      console.error("Wystąpił błąd podczas przesyłania pliku");
      return "Wystąpił błąd podczas przesyłania pliku";
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (error.response.status === 413) {
      console.error("Plik jest zbyt duży!");
      return "Plik jest zbyt duży!";
    } else {
      console.error("Wystąpił błąd podczas przesyłania pliku");
      return "Wystąpił błąd podczas przesyłania pliku";
    }
  }
}
