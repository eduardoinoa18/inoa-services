export const metadata = {
  title: "Real Estate Advisory | Inoa Services",
  description: "Guided real estate support for buyers, sellers, and investors with strategic negotiation and trusted referrals.",
};

const pillars = [
  { title: "Buyer Guidance", text: "From budget framing to closing coordination—clarity at each step." },
  { title: "Seller Strategy", text: "Pricing insight, marketing positioning, and negotiation alignment." },
  { title: "Investment Insight", text: "Evaluate opportunities with grounded financial perspective." },
  { title: "Negotiation Support", text: "Structured offers and responsive counter positioning." },
  { title: "Referral Network", text: "Access to lending, inspection, legal, and closing professionals." },
  { title: "Process Transparency", text: "Clear timelines and expectation setting to reduce stress." },
];

export default function Page() {
  return (
    <main className="relative pb-24">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-emerald-600" />
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.4),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-24 relative">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">Real Estate Advisory</h1>
          <p className="text-white/90 mt-6 text-lg max-w-2xl leading-relaxed">Informed strategy and hands-on guidance for purchasing, selling, or evaluating investment opportunities.</p>
          <div className="flex flex-wrap gap-4 mt-10">
            <a href="#contact-section" className="bg-white text-blue-700 font-semibold px-7 py-3 rounded-xl shadow hover:shadow-lg transition">Discuss Goals</a>
            <a href="https://wa.me/19783909619" target="_blank" className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-7 py-3 rounded-xl shadow transition">WhatsApp</a>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10">Core Support Areas</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map(p => (
            <div key={p.title} className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg transition">
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-blue-100/40 blur-xl" />
              <h3 className="font-semibold text-gray-800 mb-2 tracking-tight">{p.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="contact-section" className="max-w-5xl mx-auto px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-600 p-10 text-center shadow-xl">
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_30%_30%,#fff,transparent_60%),radial-gradient(circle_at_70%_70%,#fff,transparent_65%)]" />
          <h2 className="relative text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">Let’s Discuss Your Next Move</h2>
          <p className="relative text-white/90 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">Schedule a strategy conversation or message us now to outline a plan.</p>
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
