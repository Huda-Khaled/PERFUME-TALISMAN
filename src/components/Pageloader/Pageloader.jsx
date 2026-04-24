import React from "react";
import logo from "../../assets/logo.PNG";

import { useEffect, useState } from "react";

export default function PageLoader({ isLoading }) {
  const [show, setShow] = useState(isLoading);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center
      bg-black/60 backdrop-blur-sm
      transition-opacity duration-300
      ${isLoading ? "opacity-100" : "opacity-0"}`}
    >
      {/* Loader */}
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>

        {/* Optional text */}
        <p className="text-white text-sm">Loading...</p>
      </div>
    </div>
  );
}