import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-white to-gray-50">
      <section className="max-w-6xl mx-auto px-4 pt-28 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">About Inoa Services</h1>
        <p className="text-lg text-gray-700 max-w-3xl">We deliver dependable, bilingual support across tax preparation, immigration forms, notary services, real estate advisory, and curated DR investments—focused on accuracy, clarity, and trust.</p>
      </section>
      <section className="max-w-6xl mx-auto px-4 pb-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">Bring structure and peace of mind to essential services through clear communication, precise execution, and respectful client care. We aim to remove confusion and deliver timely results with ethical practice.</p>
          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-2">Values</h3>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm text-gray-700">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Transparency</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Accessibility</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Bilingual service</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Professionalism</li>
            </ul>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium">Ready to work with us? Let’s connect</a>
        </div>
        <div className="relative w-56 h-56 md:w-64 md:h-64">
          <Image src="/images/founder.jpg" alt="Eduardo Inoa" fill className="rounded-2xl object-cover border" />
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 pb-28">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border bg-white p-5">
            <div className="relative w-28 h-28 mb-4">
              <Image src="/images/founder.jpg" alt="Eduardo Inoa" fill className="rounded-xl object-cover border" />
            </div>
            <div className="font-semibold text-gray-900">Eduardo Inoa</div>
            <div className="text-sm text-gray-500 mb-2">Founder · REALTOR® · Senior Tax Specialist · Notary Public</div>
            <p className="text-sm text-gray-600">Bilingual client-first operator focusing on accuracy and clear outcomes across services.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
