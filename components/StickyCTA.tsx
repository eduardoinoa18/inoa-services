"use client";

export default function StickyCTA() {
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 flex gap-3 md:hidden">
      <a
  href="https://wa.me/19783909619"
        target="_blank"
        rel="noopener"
        className="px-4 py-3 rounded-full bg-green-600 text-white shadow-lg"
        onClick={() => {
          try { window?.dispatchEvent(new Event("convert:whatsapp")); } catch {}
        }}
      >
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
