export const metadata = {
  title: "Notary Public (MA) | Inoa Services",
  description: "Professional Massachusetts notary services for affidavits, real estate, POA, and more with identity verification and confidentiality.",
};

const docs = [
  "Affidavits & acknowledgments",
  "Power of Attorney",
  "Real estate / closing docs",
  "Oaths & affirmations",
  "Consent & authorization forms",
  "Travel permission letters",
];

const notes = [
  "Valid, non‑expired government photo ID required",
  "Signer must be present and aware",
  "No advice on document legality (non‑attorney)",
  "All signatures occur in-person (no remote unless permitted)",
];

export default function Page() {
  return (
    <main className="relative pb-24">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-emerald-600" />
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.35),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-6 pt-32 pb-20 relative">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">Notary Public Services (MA)</h1>
          <p className="text-white/90 mt-6 text-lg max-w-2xl leading-relaxed">Accurate, compliant, and courteous notarization for critical personal and real estate documents.</p>
          <div className="flex flex-wrap gap-4 mt-10">
            <a href="#schedule" className="bg-white text-blue-700 font-semibold px-7 py-3 rounded-xl shadow hover:shadow-lg transition">Schedule</a>
            <a href="https://wa.me/19783909619" target="_blank" className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-7 py-3 rounded-xl shadow transition">WhatsApp</a>
          </div>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Commonly Notarized Documents</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map(d => (
            <div key={d} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm text-sm font-medium text-gray-700 hover:shadow-md transition">
              <span className="block mb-1 text-blue-600">✓</span>{d}
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="rounded-3xl border border-gray-100 bg-white p-10 shadow-lg relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-40 w-40 bg-blue-100/40 blur-2xl rounded-full" />
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Before You Arrive</h2>
          <ul className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
            {notes.map(n => (
              <li key={n} className="flex gap-2"><span className="mt-1 h-4 w-4 rounded-md bg-gradient-to-br from-blue-500 to-emerald-600 text-white text-[11px] flex items-center justify-center">i</span>{n}</li>
            ))}
          </ul>
        </div>
      </section>
      <section id="schedule" className="max-w-4xl mx-auto px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-600 p-10 text-center shadow-xl">
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_30%_30%,#fff,transparent_60%),radial-gradient(circle_at_70%_70%,#fff,transparent_65%)]" />
          <h2 className="relative text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">Need a Document Notarized?</h2>
          <p className="relative text-white/90 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">Reach out to confirm availability and required identification.</p>
          <div className="relative flex flex-wrap gap-4 justify-center">
            <a href="/" className="bg-white text-blue-700 font-semibold px-7 py-3 rounded-xl shadow hover:shadow-lg transition">Back Home</a>
            <a href="https://wa.me/19783909619" target="_blank" className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-7 py-3 rounded-xl shadow transition">WhatsApp</a>
            <a href="/#contact" className="bg-black/30 hover:bg-black/40 text-white font-semibold px-7 py-3 rounded-xl backdrop-blur-sm border border-white/30 shadow transition">Contact Form</a>
          </div>
        </div>
      </section>
    </main>
  );
}
