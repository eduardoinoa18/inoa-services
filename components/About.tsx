export default function About() {
  return (
    <section id="about" className="relative py-24 px-4 bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] bg-[radial-gradient(circle_at_30%_20%,#0D6EFD_0,#0D6EFD_8%,transparent_60%),radial-gradient(circle_at_70%_60%,#198754_0,#198754_10%,transparent_65%)]" />
      <div className="max-w-6xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full border border-blue-100 bg-blue-50/60 text-xs font-medium text-blue-700 tracking-wide">OUR FOCUS</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-6 tracking-tight">
              Precision, clarity & trust<br className="hidden md:block" /> in every service we deliver
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5 text-lg">
              We provide integrated support across tax, real estate, notary, immigration form preparation and cross-border investment introductions. Our approach blends professionalism with a personable client experience.
            </p>
            <p className="text-gray-600 leading-relaxed">
              You get transparent guidance, compliant execution, and responsive follow‑through—so decisions feel informed, not overwhelming.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-blue-200/40 via-emerald-100/40 to-amber-100/40 rounded-[2.5rem] blur-xl" />
            <div className="relative bg-white/90 backdrop-blur border border-white/60 rounded-3xl p-10 shadow-xl ring-1 ring-gray-100">
              <ul className="space-y-5 text-[15px] font-medium">
                {[
                  'Bilingual client service (English / Español)',
                  'Accuracy-first, compliance-driven processes',
                  'Ethical & confidential handling of data',
                  'Structured, personalized strategy support',
                  'Responsive communication & follow-through',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-emerald-600 text-white text-[11px] shadow-sm">✓</span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 grid grid-cols-3 gap-4 text-center text-xs text-gray-600">
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <p className="font-semibold text-gray-800 text-sm">Accuracy</p>
                  <p>Detail checks</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <p className="font-semibold text-gray-800 text-sm">Integrity</p>
                  <p>Ethical practice</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <p className="font-semibold text-gray-800 text-sm">Support</p>
                  <p>Guided steps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
