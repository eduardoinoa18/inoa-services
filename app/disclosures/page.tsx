export default function DisclosuresPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-white to-gray-50">
      <nav className="max-w-6xl mx-auto px-4 pt-24 text-sm" aria-label="Breadcrumb">
        <a href="/" className="text-gray-500 hover:text-gray-800">← Back to Home</a>
      </nav>
      <section className="max-w-4xl mx-auto px-4 pt-4 pb-20">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">Disclosures</h1>
        <p className="text-gray-600 mb-8">Please review the following disclosures carefully. By using our services, you acknowledge and accept these terms.</p>
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">General Service Disclaimer</h2>
            <p>Services are provided based on information clients submit. Inoa Services is not responsible for errors caused by inaccurate or incomplete client data or third‑party systems.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Tax Preparation Disclaimer</h2>
            <p>We prepare tax returns using current IRS and state guidelines. Refunds or tax outcomes are not guaranteed. Clients are responsible for reviewing and submitting accurate documentation and remain liable for all filings.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Immigration Services Disclaimer</h2>
            <p>Inoa Services is not a law firm and does not provide legal advice. We assist with document preparation only. For legal representation or counsel, consult a licensed attorney.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Notary Disclaimer</h2>
            <p>Notarial acts are performed according to Massachusetts law. Mobile notary services may include travel fees. We do not provide legal interpretation of documents.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Real Estate Disclaimer</h2>
            <p>Real estate services are offered in compliance with MA & NH licensing laws. Investment opportunities (including the Dominican Republic) carry risk; we do not guarantee appreciation, rental income, or financing approval.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Online & In‑Person Disclaimer</h2>
            <p>Many services are performed online using secure tools. In‑person appointments may be arranged. Inoa Services is not liable for issues caused by third‑party platforms, software outages, or internet interruptions.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Limitation of Liability</h2>
            <p>Inoa Services shall not be held liable for financial losses, penalties, delays, or consequential damages. Clients remain fully responsible for compliance with federal, state, and local laws.</p>
          </section>
        </div>

        {/* CTA strip */}
        <div className="mt-10 rounded-2xl border bg-gradient-to-r from-blue-50 to-emerald-50 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900">Questions about our policies?</h3>
            <p className="text-sm text-gray-600">We’re happy to clarify anything before you proceed.</p>
          </div>
          <div className="flex gap-3">
            <a href="/#contact" className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium">Contact us</a>
            <a href="/" className="px-4 py-2 rounded-xl border text-sm font-medium">Back to Home</a>
          </div>
        </div>
      </section>
    </main>
  );
}
