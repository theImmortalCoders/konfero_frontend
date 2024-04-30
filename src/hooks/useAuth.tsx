"use client";
import { useEffect, useMemo, useState } from "react";
import { getCurrentUser, UserData } from "./user";

const useAuth = (allowedRoles: string[]) => {
  const [isAuthorize, setIsAuthorize] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkUserRole = useMemo(
    () => async () => {
      try {
        const currentUser: UserData | null = await getCurrentUser();
        if (currentUser && allowedRoles.includes(currentUser.role)) {
          setIsAuthorize(true);
          setUserRole(currentUser.role);
        } else {
          setIsAuthorize(false);
        }
      } catch (error) {
        console.error("Error while fetching user role:", error);
        setIsAuthorize(false);
      } finally {
        setIsLoading(false);
      }
    },
    [allowedRoles]
  );

  useEffect(() => {
    checkUserRole();
  }, [checkUserRole]);

  return { isAuthorize, isLoading, userRole };
};

export default useAuth;
