import serviceIcons from "./ServiceIcons";

const items = [
  { title: "Tax Preparation", text: "Reliable, accurate, and stress-free tax solutions.", href: "/services/tax-preparation" },
  { title: "Real Estate Services", text: "Buy, sell, or invest with a trusted professional.", href: "/services/real-estate" },
  { title: "Notary Services", text: "Certified Massachusetts Notary Public at your service.", href: "/services/notary" },
  { title: "DR Investment Referrals", text: "Exclusive opportunities in the Dominican Republic.", href: "/services/dr-investments" },
  { title: "Immigration Services", text: "Immigration Form Preparer — accurate forms, guidance, and support.", href: "/services/immigration" },
];

export default function Services() {
  return (
    <section id="services" className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Our Services</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {items.map((s, i) => (
            <a
              key={s.title}
              href={s.href}
              className="group relative rounded-2xl p-5 bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition overflow-hidden flex flex-col"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-blue-50 via-emerald-50 to-amber-50 transition" />
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="h-14 w-14 rounded-xl border border-blue-100 bg-white flex items-center justify-center shadow-inner text-blue-600 group-hover:scale-105 transition">
                  {serviceIcons[s.title]}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition leading-snug">
                  {s.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 relative z-10 flex-1 leading-relaxed group-hover:text-gray-700">
                {s.text}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:text-blue-700 relative z-10">
                Learn More
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
              <div className="absolute -right-6 -bottom-6 h-24 w-24 bg-blue-100/40 rounded-full blur-2xl group-hover:scale-125 transition" />
              <div className="absolute -left-4 -top-4 h-16 w-16 bg-emerald-100/40 rounded-full blur-xl group-hover:scale-110 transition" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
