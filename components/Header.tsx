"use client";
import { useState } from "react";
import Logo from "./Logo";
import LangToggle from "./LangToggle";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="w-full bg-white/90 backdrop-blur shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-2">
          <Logo size={56} withText />
        </div>
        <button aria-label="Toggle Menu" className="md:hidden p-2" onClick={() => setOpen((v) => !v)}>
          <span className="block w-6 h-[2px] bg-gray-700 mb-1"></span>
          <span className="block w-6 h-[2px] bg-gray-700 mb-1"></span>
          <span className="block w-6 h-[2px] bg-gray-700"></span>
        </button>
        <nav className="hidden md:flex items-center gap-4">
          <ul className="flex gap-6 text-gray-700 font-medium">
            <li><a href="#about" className="hover:text-blue-600">About</a></li>
            <li><a href="#services" className="hover:text-blue-600">Services</a></li>
            <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
          </ul>
          <LangToggle />
        </nav>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white">
          <a href="#about" className="block px-4 py-3" onClick={() => setOpen(false)}>About</a>
          <a href="#services" className="block px-4 py-3" onClick={() => setOpen(false)}>Services</a>
          <a href="#contact" className="block px-4 py-3" onClick={() => setOpen(false)}>Contact</a>
        </div>
      )}
    </header>
  );
}
