"use client";

import { useEffect } from "react";

export default function Toast({
  message,
  type = "success",
  onClose,
  duration = 3000,
}: {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
  duration?: number;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [onClose, duration]);

  const bg = type === "success" ? "bg-green-600" : "bg-red-600";

  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] text-white ${bg} px-4 py-2 rounded-lg shadow-lg`}>
      {message}
    </div>
  );
}
