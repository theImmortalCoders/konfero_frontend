import { appAPI } from "@/utils/appAPI";
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

export async function getCurrentUser() {
    try{
        const response: AxiosResponse<GetCurrentUserData> = await appAPI.get(
            `/api/user/me`,
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            console.log("Dane użytkownika pobrano poprawnie!")
            return response.data;
        } else if(response.status === 401) {
            window.location.replace("/login");
            console.error("Brak autoryzacji użytkownika");
            return "Brak autoryzacji użytkownika";
        } else {
            console.error("Wystąpił błąd podczas pobierania danych użytkownika");
            return "Wystąpił błąd podczas pobierania danych użytkownika";
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

export async function changeUserRole(userId: number, userRole: string) {
    try{
        const response: AxiosResponse<void> = await appAPI.patch(
            `/api/user/${userId}/role`,
            {
                userRole,
            },
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            console.log("Rola użytkownika została zmieniona poprawnie!")
            return response.status;
        } else if(response.status === 401) {
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
    try{
        const response: AxiosResponse<void> = await appAPI.patch(
            `/api/user/${userId}/ban`,
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            console.log("Użytkownik został zablokowany poprawnie!")
            return response.status;
        } else if(response.status === 401) {
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