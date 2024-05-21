import { FcCancel } from "react-icons/fc";
import React from "react";

export default function Cancel({ showtext }: { showtext: boolean }) {
  return (
    <div className="flex items-center justify-center gap-x-1">
      <FcCancel />
      {showtext ? <p className="text-red-700">Odwołana</p> : null}
    </div>
  );
}
