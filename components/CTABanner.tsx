export default function CTABanner() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-600 rounded-3xl shadow-xl" />
        <div className="absolute inset-0 -z-0 rounded-3xl bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.25),transparent_60%),radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.2),transparent_65%)]" />
        <div className="relative text-center px-8 py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            Ready to Move Forward?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Book a consultation or send us a message — we’ll help you take the next step with clarity and confidence.
          </p>
          <div className="flex flex-wrap gap-5 justify-center">
            <a href="#contact" className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-7 py-3 rounded-xl shadow hover:shadow-lg active:scale-[0.98] transition">
              <span>Contact Form</span>
            </a>
            <a href="https://wa.me/19783909619" target="_blank" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-7 py-3 rounded-xl shadow hover:shadow-lg active:scale-[0.98] transition">
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
