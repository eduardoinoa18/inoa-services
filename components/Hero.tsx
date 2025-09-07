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
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/90 via-white/85 to-white/60" />
      <Reveal>
  <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 drop-shadow-sm">Your Trusted Partner in Taxes & Real Estate</h1>
      </Reveal>
      <Reveal delay={100}>
  <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-6">
          Expert Tax Solutions • Real Estate • Notary Services • Investment Referrals
        </p>
      </Reveal>
      <Reveal delay={200}>
        <div className="flex gap-4">
          <a href="#contact" className="btn-primary">Get Started</a>
          <a href="#services" className="btn-accent">Explore Services</a>
        </div>
      </Reveal>
    </section>
  );
}
