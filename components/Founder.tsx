"use client";
import Image from "next/image";
import Reveal from "./Reveal";

export default function Founder() {
  return (
    <section id="founder" className="relative py-24 px-4 bg-gradient-to-b from-white via-white to-gray-50 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.12] bg-[radial-gradient(circle_at_25%_25%,#0D6EFD_0,#0D6EFD_8%,transparent_55%),radial-gradient(circle_at_75%_65%,#198754_0,#198754_10%,transparent_60%)]" />
      <div className="max-w-6xl mx-auto relative grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="relative w-60 h-60 md:w-72 md:h-72 mx-auto lg:mx-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 via-emerald-500/10 to-amber-400/10 blur-2xl" />
            <Image
              src="/profile.jpg"
              alt="Eduardo Inoa — Founder"
              fill
              priority
              sizes="(max-width: 768px) 240px, 288px"
              className="rounded-full object-cover ring-4 ring-white shadow-xl border border-gray-200"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-blue-100 bg-blue-50/70 text-xs font-medium text-blue-700 tracking-wide">FOUNDER</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-6 tracking-tight">
              Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-emerald-600 to-amber-500">Eduardo Inoa</span>
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              I founded Inoa Services to bridge structured professional execution with an approachable, bilingual client experience. Clients come to us when they want precision—without being overwhelmed by jargon or uncertainty.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              My work spans U.S. tax preparation, real estate advisory support, notary services, immigration form preparation, and curated Dominican Republic investment referrals. Across each area, I emphasize ethical practice, accuracy-first processes, and consistent follow‑through.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Whether you&apos;re filing a return, evaluating a property decision, organizing immigration forms, or exploring cross‑border opportunities, you get structured clarity and dependable responsiveness.
            </p>
            <div className="flex flex-wrap gap-3 text-xs font-medium">
              {["Bilingual (EN/ES)", "Compliance Mindset", "Detail Oriented", "Client-Centered", "Trust Focused"].map(t => (
                <span key={t} className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-600">{t}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
