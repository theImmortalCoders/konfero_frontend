"use client";
import { appFRONT } from "@/utils/appENV";
import { useEffect } from "react";

export default function AboutUsPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      if (pathname !== "/login") {
        localStorage.setItem(
          "lastVisitedPage",
          appFRONT.defaults.baseURL + pathname
        );
      }
    }
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black2darkblue-gradient"></div>
  );
}
