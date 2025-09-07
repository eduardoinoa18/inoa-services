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
