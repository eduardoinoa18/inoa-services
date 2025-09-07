"use client";

export default function StickyCTA() {
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 flex gap-3 md:hidden">
      <a
        href="https://wa.me/19783909619"
        target="_blank"
        rel="noopener"
        className="px-4 py-3 rounded-full bg-green-600 text-white shadow-lg flex items-center gap-2"
        onClick={() => {
          try { window?.dispatchEvent(new Event("convert:whatsapp")); } catch {}
        }}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.51 14.94L2 22l5.2-1.37A9.9 9.9 0 1 0 12.04 2Zm5.84 14.25c-.24.68-1.4 1.3-1.93 1.34-.49.04-1.1.06-1.78-.11-.41-.1-.94-.31-1.63-.61-2.87-1.24-4.74-4.14-4.89-4.33-.14-.19-1.17-1.55-1.17-2.96 0-1.4.74-2.08 1-2.36.24-.27.53-.34.7-.34.17 0 .35 0 .5.01.16.01.38-.06.6.46.24.57.82 1.98.89 2.13.07.15.12.32.02.51-.1.2-.15.32-.3.49-.15.17-.31.38-.44.52-.15.15-.3.31-.13.6.17.3.77 1.27 1.64 2.06 1.13 1.03 2.07 1.36 2.38 1.52.31.15.49.13.67-.08.18-.2.77-.9.98-1.21.21-.31.41-.26.68-.15.27.11 1.72.81 2.02.96.3.15.5.22.57.34.07.13.07.75-.17 1.43Z" /></svg>
        WhatsApp
      </a>
      <a
        href="mailto:inoaserv@gmail.com?subject=Consultation%20Request"
        className="px-4 py-3 rounded-full bg-blue-600 text-white shadow-lg"
      >
        Book Call
      </a>
    </div>
  );
}
