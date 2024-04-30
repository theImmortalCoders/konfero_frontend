"use client";
import { useEffect, useState } from "react";
import { getCurrentUser, UserData } from "./user";

const useAuth = (allowedRoles: string[]) => {
  const [isAuthorise, setIsAuthorise] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const currentUser: UserData | null = await getCurrentUser();
        if (currentUser && allowedRoles.includes(currentUser.role)) {
          setIsAuthorise(true);
        } else {
          setIsAuthorise(false);
        }
      } catch (error) {
        console.error("Error while fetching user role:", error);
        setIsAuthorise(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserRole();
  }, [allowedRoles]);

  return { isAuthorise, isLoading };
};

export default useAuth;
