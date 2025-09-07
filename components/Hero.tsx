import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="relative flex flex-col justify-center items-center text-center min-h-screen px-4 pt-24 overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-center bg-cover"
        style={{
          backgroundImage: 'url(/images/hero-bg-low.jpg)',
          filter: 'blur(2px)',
          transform: 'scale(1.05)',
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/95 via-white/85 to-blue-50/70" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/80 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      <Reveal>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-800 mb-6 drop-shadow-sm max-w-4xl">
          Trusted Expertise in <span className="text-blue-600">Taxes</span>, <span className="text-emerald-600">Real Estate</span>, Notary & More
        </h1>
      </Reveal>
      <Reveal delay={100}>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mb-8 leading-relaxed">
          We simplify complex processes with accuracy, integrity, and personal attention—empowering your financial and investment decisions.
        </p>
      </Reveal>
      <Reveal delay={200}>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#contact" className="btn-primary shadow-md hover:shadow-lg">Get Started</a>
          <a href="#services" className="btn-accent shadow-md hover:shadow-lg">Explore Services</a>
          <a href="https://wa.me/19783909619" target="_blank" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-6 py-3 rounded-xl shadow transition">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.51 14.94L2 22l5.2-1.37A9.9 9.9 0 1 0 12.04 2Zm5.84 14.25c-.24.68-1.4 1.3-1.93 1.34-.49.04-1.1.06-1.78-.11-.41-.1-.94-.31-1.63-.61-2.87-1.24-4.74-4.14-4.89-4.33-.14-.19-1.17-1.55-1.17-2.96 0-1.4.74-2.08 1-2.36.24-.27.53-.34.7-.34.17 0 .35 0 .5.01.16.01.38-.06.6.46.24.57.82 1.98.89 2.13.07.15.12.32.02.51-.1.2-.15.32-.3.49-.15.17-.31.38-.44.52-.15.15-.3.31-.13.6.17.3.77 1.27 1.64 2.06 1.13 1.03 2.07 1.36 2.38 1.52.31.15.49.13.67-.08.18-.2.77-.9.98-1.21.21-.31.41-.26.68-.15.27.11 1.72.81 2.02.96.3.15.5.22.57.34.07.13.07.75-.17 1.43Z" /></svg>
            WhatsApp
          </a>
        </div>
      </Reveal>
      <Reveal delay={350}>
        <div className="mt-10 flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Accuracy</div>
          <div className="hidden sm:flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" /> Compliance</div>
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" /> Trust</div>
        </div>
      </Reveal>
    </section>
  );
}
