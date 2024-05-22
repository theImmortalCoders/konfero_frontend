import { getCurrentUser } from "@/hooks/user";

export async function getId() {
    const userData = await getCurrentUser();
    if (userData && typeof userData === 'object' && 'id' in userData) {
      return userData.id;
    }
    return null;
  }

  export async function getRole() {
    const userData = await getCurrentUser();
    if (userData && typeof userData === "object" && "role" in userData) {
      return userData.role;
    }
    return null;
  }