"use client";
import { useEffect, useMemo, useState } from "react";
import { getCurrentUser, UserData } from "./user";
import { useRouter } from "next/navigation";

const useAuth = (allowedRoles: string[]) => {
  const [isAuthorise, setIsAuthorise] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  const checkUserRole = useMemo(
    () => async () => {
      try {
        const currentUser: UserData | null = await getCurrentUser();
        console.log("currentUser", currentUser);
        if (currentUser === null) {
          router.push("/login");
        } else if (currentUser && allowedRoles.includes(currentUser.role)) {
          setIsAuthorise(true);
          setUserRole(currentUser.role);
        } else {
          setIsAuthorise(false);
        }
      } catch (error) {
        console.error("Error while fetching user role:", error);
        setIsAuthorise(false);
      }
    },
    [allowedRoles]
  );

  useEffect(() => {
    checkUserRole();
  }, [checkUserRole]);

  return { isAuthorise, userRole };
};

export default useAuth;
