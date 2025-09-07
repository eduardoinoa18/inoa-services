const items = [
  {
    title: "Tax Preparation",
    text: "Reliable, accurate, and stress-free tax solutions.",
    href: "/services/tax-preparation",
    img: "/images/service-tax.jpg",
  },
  {
    title: "Real Estate Services",
    text: "Buy, sell, or invest with a trusted professional.",
    href: "/services/real-estate",
    img: "/images/service-real-estate.jpg",
  },
  {
    title: "Notary Services",
    text: "Certified Massachusetts Notary Public at your service.",
    href: "/services/notary",
    img: "/images/service-notary.jpg",
  },
  {
    title: "DR Investment Referrals",
    text: "Exclusive opportunities in the Dominican Republic.",
    href: "/services/dr-investments",
    img: "/images/service-dr-investments.jpg",
  },
  {
    title: "Immigration Services",
    text: "Immigration Form Preparer — accurate forms, guidance, and support.",
    href: "/services/immigration",
    img: "/images/service-immigration.jpg",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Our Services</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {items.map((s, i) => (
            <div
              key={s.title}
              className="bg-white shadow rounded-xl hover:shadow-lg transition text-left border border-gray-100 flex flex-col"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="h-32 w-full overflow-hidden rounded-t-xl relative">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm flex-1">{s.text}</p>
                <a href={s.href} className="text-blue-600 font-semibold inline-block mt-4">Learn More →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
