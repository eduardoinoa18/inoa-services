export const metadata = {
  title: "DR Investment Referrals | Inoa Services",
  description: "Curated Dominican Republic real estate and investment introductions with structured referral support.",
};

const focus = [
  "Pre‑construction condo projects",
  "Residential / vacation properties",
  "Select land opportunities",
  "Lifestyle & rental yield alignment",
  "Local professional introductions",
  "Process & due diligence clarity",
];

const steps = [
  { step: "01", title: "Profile & Goals", text: "Clarify budget, location, yield, or lifestyle focus." },
  { step: "02", title: "Curated Matches", text: "Provide vetted partner introductions and property angles." },
  { step: "03", title: "Connection & Review", text: "Intro calls, document review, and follow‑up questions." },
  { step: "04", title: "Decision Support", text: "Next steps toward reservation, diligence, or pass." },
];

export default function Page() {
  return (
    <main className="relative pb-24">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-emerald-600" />
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.35),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-24 relative">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white max-w-4xl leading-tight">Dominican Republic Investment Referrals</h1>
          <p className="text-white/90 mt-6 text-lg max-w-2xl leading-relaxed">Aligned introductions to reputable partners and opportunities across key DR markets.</p>
          <div className="flex flex-wrap gap-4 mt-10">
            <a href="#focus" className="bg-white text-blue-700 font-semibold px-7 py-3 rounded-xl shadow hover:shadow-lg transition">Explore Focus</a>
            <a href="https://wa.me/19783909619" target="_blank" className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-7 py-3 rounded-xl shadow transition inline-flex items-center gap-2">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.51 14.94L2 22l5.2-1.37A9.9 9.9 0 1 0 12.04 2Zm5.84 14.25c-.24.68-1.4 1.3-1.93 1.34-.49.04-1.1.06-1.78-.11-.41-.1-.94-.31-1.63-.61-2.87-1.24-4.74-4.14-4.89-4.33-.14-.19-1.17-1.55-1.17-2.96 0-1.4.74-2.08 1-2.36.24-.27.53-.34.7-.34.17 0 .35 0 .5.01.16.01.38-.06.6.46.24.57.82 1.98.89 2.13.07.15.12.32.02.51-.1.2-.15.32-.3.49-.15.17-.31.38-.44.52-.15.15-.3.31-.13.6.17.3.77 1.27 1.64 2.06 1.13 1.03 2.07 1.36 2.38 1.52.31.15.49.13.67-.08.18-.2.77-.9.98-1.21.21-.31.41-.26.68-.15.27.11 1.72.81 2.02.96.3.15.5.22.57.34.07.13.07.75-.17 1.43Z" /></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
      <section id="focus" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10">Advisory Focus Areas</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {focus.map(f => (
            <div key={f} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm text-sm font-medium text-gray-700 hover:shadow-md transition">
              <span className="block mb-1 text-blue-600">•</span>{f}
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10">Referral Process</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map(s => (
            <div key={s.step} className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg transition">
              <span className="text-xs font-semibold tracking-widest text-blue-600">STEP {s.step}</span>
              <h3 className="mt-2 font-semibold text-gray-800">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-600 p-10 text-center shadow-xl">
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_30%_30%,#fff,transparent_60%),radial-gradient(circle_at_70%_70%,#fff,transparent_65%)]" />
          <h2 className="relative text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">Explore Opportunities</h2>
          <p className="relative text-white/90 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">Outline your goals and we’ll introduce you to aligned professionals and vetted options.</p>
          <div className="relative flex flex-wrap gap-4 justify-center">
            <a href="/" className="bg-white text-blue-700 font-semibold px-7 py-3 rounded-xl shadow hover:shadow-lg transition">Back Home</a>
            <a href="https://wa.me/19783909619" target="_blank" className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-7 py-3 rounded-xl shadow transition inline-flex items-center gap-2">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.51 14.94L2 22l5.2-1.37A9.9 9.9 0 1 0 12.04 2Zm5.84 14.25c-.24.68-1.4 1.3-1.93 1.34-.49.04-1.1.06-1.78-.11-.41-.1-.94-.31-1.63-.61-2.87-1.24-4.74-4.14-4.89-4.33-.14-.19-1.17-1.55-1.17-2.96 0-1.4.74-2.08 1-2.36.24-.27.53-.34.7-.34.17 0 .35 0 .5.01.16.01.38-.06.6.46.24.57.82 1.98.89 2.13.07.15.12.32.02.51-.1.2-.15.32-.3.49-.15.17-.31.38-.44.52-.15.15-.3.31-.13.6.17.3.77 1.27 1.64 2.06 1.13 1.03 2.07 1.36 2.38 1.52.31.15.49.13.67-.08.18-.2.77-.9.98-1.21.21-.31.41-.26.68-.15.27.11 1.72.81 2.02.96.3.15.5.22.57.34.07.13.07.75-.17 1.43Z" /></svg>
              WhatsApp
            </a>
            <a href="/#contact" className="bg-black/30 hover:bg-black/40 text-white font-semibold px-7 py-3 rounded-xl backdrop-blur-sm border border-white/30 shadow transition">Contact Form</a>
          </div>
        </div>
      </section>
    </main>
  );
}
