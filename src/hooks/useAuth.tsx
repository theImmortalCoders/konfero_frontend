"use client";
import { useEffect, useMemo, useState } from "react";
import { getCurrentUser, UserData } from "./user";
import { useRouter } from "next/navigation";

const useAuth = (allowedRoles: string[], notPush?:boolean) => {
  const [isAuthorise, setIsAuthorise] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const router = useRouter();

  const checkUserRole = useMemo(
    () => async () => {
      try {
        const currentUser: UserData | null = await getCurrentUser();
        if (currentUser === null && !notPush) {
          router.push("/login");
        } else if (currentUser != null && allowedRoles.includes(currentUser.role)) {
          setIsAuthorise(true);
          setUserData(currentUser);
        } else {
          setIsAuthorise(false);
        }
      } catch (error) {
        console.error("Error while fetching user role:", error);
        setIsAuthorise(false);
      }
    },
    [allowedRoles, router],
  );

  useEffect(() => {
    checkUserRole();
  }, [refresh]);

  const refreshUserData = () => {
    setRefresh(!refresh);
  };

  return { isAuthorise, userData, refreshUserData };
};

export default useAuth;
