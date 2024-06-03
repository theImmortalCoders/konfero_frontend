"use client";

import AdminTags from "@/components/admindashboard/AdminTags";
import AcceptOrganizer from "@/components/admindashboard/AcceptOrganizer";
import AdminVerifyUser from "@/components/admindashboard/AdminVerifyUser";
import { useState } from "react";

const AdminSidebar = () => {
  const [panel, setPanel] = useState<string>("ORGANIZER-REQUESTS");

  return (
    <>
      <div className="flex flex-col xs:flex-row lg:flex-col gap-x-0 sm:gap-x-6 lg:gap-x-0 lg:mb-0 justify-around w-full mb-6 pb-4 lg:w-min lg:min-w-44 lg:border-r-4 lg:border-b-0 border-b-4 h-min font-bold text-xs sm:text-sm lg:text-lg">
        <button
          className={`min-h-14 sm:min-w-32 lg:text-start text-center hover:bg-gray-300 px-3 lg:py-4 transition-colors duration-75 rounded-2xl lg:rounded-none ${panel === "ORGANIZER-REQUESTS" && "bg-gray-200"}`}
          onClick={() => {
            setPanel("ORGANIZER-REQUESTS");
          }}
        >
          Prośby o zostanie organizatorem
        </button>
        <button
          className={`min-h-14 sm:min-w-32 lg:text-start text-center hover:bg-gray-300 px-3 transition-colors duration-75 rounded-2xl lg:rounded-none ${panel === "USERS" && "bg-gray-200"}`}
          onClick={() => {
            setPanel("USERS");
          }}
        >
          Zarządzaj użytkownikami
        </button>
        <button
          className={`min-h-14 sm:min-w-32 lg:text-start text-center hover:bg-gray-300 px-3 transition-colors duration-75 rounded-2xl lg:rounded-none ${panel === "TAGS" && "bg-gray-200"}`}
          onClick={() => {
            setPanel("TAGS");
          }}
        >
          Tagi
        </button>
      </div>
      <div className="flex flex-col gap-y-6 w-full">
        {(panel === "TAGS" && <AdminTags />) ||
          (panel === "USERS" && <AdminVerifyUser />) ||
          (panel === "ORGANIZER-REQUESTS" && <AcceptOrganizer />)}
      </div>
    </>
  );
};

export default AdminSidebar;
