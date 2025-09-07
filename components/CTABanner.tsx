export default function CTABanner() {
  return (
    <section className="py-10 px-4">
      <div className="max-w-6xl mx-auto rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white p-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
        <div>
          <h3 className="text-2xl font-bold">Ready to get started?</h3>
          <p className="text-white/90">Book a quick call or message us. We’ll guide you from start to finish.</p>
        </div>
        <div className="flex gap-3">
          <a href="#contact" className="bg-white text-blue-700 font-semibold px-5 py-3 rounded-lg">Contact Us</a>
          <a href="https://wa.me/19783909619" target="_blank" rel="noopener" className="bg-black/20 border border-white/40 text-white px-5 py-3 rounded-lg">WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
