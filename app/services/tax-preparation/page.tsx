import PayButtons from "@/components/PayButtons";
import Link from "next/link";

export const metadata = {
  title: "Individual Tax Preparation | Inoa Services",
  description: "Accurate, compliant, and stress-free individual tax preparation with bilingual support and year‑round guidance.",
};

const benefits = [
  {
    title: "Accurate Filing",
    text: "Thorough review to reduce errors and avoid IRS notices.",
  },
  {
    title: "Maximized Deductions",
    text: "Identify credits and legitimate deductions you may overlook.",
  },
  {
    title: "Year‑Round Support",
    text: "Not just seasonal—we answer tax questions even after filing.",
  },
  {
    title: "Secure & Confidential",
    text: "Your documents handled with strict privacy and care.",
  },
  {
    title: "Bilingual Guidance",
    text: "Clear explanations in English or Español.",
  },
  {
    title: "Transparent Pricing",
    text: "No surprise add‑ons—complexity quoted upfront.",
  },
];

const docs = [
  "W‑2 / 1099 income forms",
  "Social Security or ITIN numbers",
  "Prior year tax return",
  "Dependents' information",
  "Education (1098‑T), mortgage (1098), property tax",
  "Business / gig / self‑employment records",
  "Charitable donations & medical deductions",
];

const process = [
  { step: "01", title: "Intro & Intake", text: "Quick questionnaire + secure document upload." },
  { step: "02", title: "Review & Optimize", text: "We analyze deductions, credits, and compliance." },
  { step: "03", title: "Approval & E‑File", text: "You approve the summary; we submit and confirm." },
  { step: "04", title: "Post‑Filing Support", text: "Year‑round answers for notices & planning." },
];

const faqs = [
  {
    q: "How fast can you complete my return?",
    a: "Once all documents are received, standard individual returns are typically completed within 2–3 business days.",
  },
  {
    q: "Do you handle self‑employed income?",
    a: "Yes. We prepare Schedule C and help organize allowable expenses for freelancers and gig workers.",
  },
  {
    q: "Can you file amendments?",
    a: "Yes, we can prepare and submit amended returns (Form 1040‑X) if prior filings need corrections.",
  },
  {
    q: "What if I get an IRS letter?",
    a: "Contact us. We’ll help interpret it and guide your response—many letters are informational.",
  },
];

export default function Page() {
  return (
    <main className="relative pb-28">
      {/* Hero Banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-emerald-600" />
        <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.35),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.25),transparent_65%)]" />
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-24 relative">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">Individual Tax Preparation</h1>
          <p className="text-white/90 mt-6 text-lg max-w-2xl leading-relaxed">Stress‑free filing with proactive guidance, bilingual clarity, and year‑round support—so you file confidently and keep more of what you earn.</p>
          <div className="flex flex-wrap gap-4 mt-10">
            <a href="#get-started" className="bg-white text-blue-700 font-semibold px-7 py-3 rounded-xl shadow hover:shadow-lg transition">Start Now</a>
            <a href="https://wa.me/19783909619" target="_blank" className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-7 py-3 rounded-xl shadow transition inline-flex items-center gap-2">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.51 14.94L2 22l5.2-1.37A9.9 9.9 0 1 0 12.04 2Zm5.84 14.25c-.24.68-1.4 1.3-1.93 1.34-.49.04-1.1.06-1.78-.11-.41-.1-.94-.31-1.63-.61-2.87-1.24-4.74-4.14-4.89-4.33-.14-.19-1.17-1.55-1.17-2.96 0-1.4.74-2.08 1-2.36.24-.27.53-.34.7-.34.17 0 .35 0 .5.01.16.01.38-.06.6.46.24.57.82 1.98.89 2.13.07.15.12.32.02.51-.1.2-.15.32-.3.49-.15.17-.31.38-.44.52-.15.15-.3.31-.13.6.17.3.77 1.27 1.64 2.06 1.13 1.03 2.07 1.36 2.38 1.52.31.15.49.13.67-.08.18-.2.77-.9.98-1.21.21-.31.41-.26.68-.15.27.11 1.72.81 2.02.96.3.15.5.22.57.34.07.13.07.75-.17 1.43Z" /></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10">Why File With Us</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map(b => (
            <div key={b.title} className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg transition">
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-blue-100/40 blur-xl group-hover:scale-125 transition" />
              <h3 className="font-semibold text-gray-800 mb-2 tracking-tight">{b.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Required Docs */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Documents Checklist</h2>
            <p className="text-gray-600 mb-4">Have these ready to accelerate processing and reduce back‑and‑forth.</p>
            <ul className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
              {docs.map(d => (
                <li key={d} className="flex gap-2">
                  <span className="mt-1 h-4 w-4 rounded-md bg-gradient-to-br from-blue-500 to-emerald-600 text-white text-[11px] flex items-center justify-center">✓</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 via-emerald-50 to-amber-50 rounded-3xl blur opacity-70" />
            <div className="relative bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
              <h3 className="font-semibold text-gray-800 mb-4">Transparent Pricing</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li><strong>Basic Individual Return:</strong> $149+</li>
                <li><strong>Itemized / Self‑Employed:</strong> Custom quote after intake</li>
                <li><strong>Multi‑State / Amendments:</strong> Additional</li>
                <li><strong>E‑File Confirmation:</strong> Included</li>
              </ul>
              <div className="mt-6"><PayButtons /></div>
              <p className="text-xs text-gray-500 mt-4">Final pricing confirmed after document review. No hidden fees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10">Simple, Structured Process</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {process.map(p => (
            <div key={p.step} className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg transition">
              <span className="text-xs font-semibold tracking-widest text-blue-600">STEP {p.step}</span>
              <h3 className="mt-2 font-semibold text-gray-800">{p.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Tax FAQ</h2>
        <div className="space-y-4">
          {faqs.map(f => (
            <details key={f.q} className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <summary className="cursor-pointer list-none flex justify-between items-center font-semibold text-gray-800">
                {f.q}
                <span className="text-gray-400 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="get-started" className="max-w-5xl mx-auto px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-600 p-10 text-center shadow-xl">
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_30%_30%,#fff,transparent_60%),radial-gradient(circle_at_70%_70%,#fff,transparent_65%)]" />
          <h2 className="relative text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">Ready to File With Confidence?</h2>
          <p className="relative text-white/90 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">Start your secure intake now or message us for a quick document checklist review.</p>
          <div className="relative flex flex-wrap gap-4 justify-center">
            <a href="/" className="bg-white text-blue-700 font-semibold px-7 py-3 rounded-xl shadow hover:shadow-lg transition">Back Home</a>
            <a href="https://wa.me/19783909619" target="_blank" className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-7 py-3 rounded-xl shadow transition inline-flex items-center gap-2">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.51 14.94L2 22l5.2-1.37A9.9 9.9 0 1 0 12.04 2Zm5.84 14.25c-.24.68-1.4 1.3-1.93 1.34-.49.04-1.1.06-1.78-.11-.41-.1-.94-.31-1.63-.61-2.87-1.24-4.74-4.14-4.89-4.33-.14-.19-1.17-1.55-1.17-2.96 0-1.4.74-2.08 1-2.36.24-.27.53-.34.7-.34.17 0 .35 0 .5.01.16.01.38-.06.6.46.24.57.82 1.98.89 2.13.07.15.12.32.02.51-.1.2-.15.32-.3.49-.15.17-.31.38-.44.52-.15.15-.3.31-.13.6.17.3.77 1.27 1.64 2.06 1.13 1.03 2.07 1.36 2.38 1.52.31.15.49.13.67-.08.18-.2.77-.9.98-1.21.21-.31.41-.26.68-.15.27.11 1.72.81 2.02.96.3.15.5.22.57.34.07.13.07.75-.17 1.43Z" /></svg>
              WhatsApp
            </a>
            <Link href="/#contact" className="bg-black/30 hover:bg-black/40 text-white font-semibold px-7 py-3 rounded-xl backdrop-blur-sm border border-white/30 shadow transition">Contact Form</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
