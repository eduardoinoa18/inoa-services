"use client";

import { useState, useEffect } from "react";

export default function LangToggle() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored) setLang(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <button
      onClick={() => setLang(lang === "en" ? "es" : "en")}
      className="text-sm px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50"
      aria-label="Toggle language"
      title="Toggle language"
    >
      {lang === "en" ? "ES" : "EN"}
    </button>
  );
}
