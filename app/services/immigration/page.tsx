import PayButtons from "@/components/PayButtons";

export const metadata = {
  title: "Immigration Form Preparation | Inoa Services",
  description: "Accurate, organized immigration form preparation with bilingual support (not a law firm).",
};

const forms = [
  "Family-based forms (I‑130, I‑485, I‑864)",
  "Work authorization (I‑765)",
  "Removal of conditions (I‑751)",
  "Naturalization (N‑400)",
  "Green card renewals (I‑90)",
  "Travel documents (I‑131)",
];

const steps = [
  { step: "01", title: "Intake Review", text: "Collect information & identify correct forms." },
  { step: "02", title: "Document Assembly", text: "Organize supporting evidence & draft forms." },
  { step: "03", title: "Quality Check", text: "Consistency and completeness review." },
  { step: "04", title: "Package Delivery", text: "Provide filing-ready packet & guidance." },
];

const disclaimers = [
  "We are not attorneys and do not provide legal advice.",
  "Service limited to non-legal document preparation and organization.",
  "Pricing depends on form complexity and number of applicants.",
];

export default function Page() {
  return (
    <main className="relative pb-24">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-emerald-600" />
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.35),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-24 relative">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">Immigration Form Preparation</h1>
          <p className="text-white/90 mt-6 text-lg max-w-2xl leading-relaxed">Organized, accurate, bilingual assistance preparing USCIS forms and supporting evidence (not a law firm).</p>
          <div className="flex flex-wrap gap-4 mt-10">
            <a href="#forms" className="bg-white text-blue-700 font-semibold px-7 py-3 rounded-xl shadow hover:shadow-lg transition">Explore Forms</a>
            <a href="https://wa.me/19783909619" target="_blank" className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-7 py-3 rounded-xl shadow transition">WhatsApp</a>
          </div>
        </div>
      </section>
      <section id="forms" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10">Supported Forms</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map(f => (
            <div key={f} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm text-sm font-medium text-gray-700 hover:shadow-md transition">
              <span className="block mb-1 text-blue-600">✓</span>{f}
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10">Streamlined Process</h2>
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
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="rounded-3xl border border-gray-100 bg-white p-10 shadow-lg relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-40 w-40 bg-blue-100/40 blur-2xl rounded-full" />
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Pricing Framework</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li><strong>Single Form Prep:</strong> $149+ baseline</li>
            <li><strong>Bundled Family Package:</strong> Quoted after intake</li>
            <li><strong>Evidence Organization:</strong> Included</li>
            <li><strong>Follow‑Up Clarifications:</strong> Included (reasonable)</li>
          </ul>
          <div className="mt-6"><PayButtons /></div>
          <ul className="mt-6 space-y-2 text-xs text-gray-500">
            {disclaimers.map(d => <li key={d}>• {d}</li>)}
          </ul>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-600 p-10 text-center shadow-xl">
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_30%_30%,#fff,transparent_60%),radial-gradient(circle_at_70%_70%,#fff,transparent_65%)]" />
          <h2 className="relative text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">Ready to Begin?</h2>
          <p className="relative text-white/90 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">Get organized support preparing your forms and assembling evidence correctly.</p>
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
