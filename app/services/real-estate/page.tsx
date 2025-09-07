import React from "react";
import Script from "next/script";

// Local declaration to ensure TS recognizes RealScout custom elements even if global types file isn't picked up
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'realscout-simple-search': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { 'partner-key'?: string; market?: string };
      'realscout-your-listings': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { 'partner-key'?: string; market?: string };
      'realscout-home-value': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { 'partner-key'?: string; market?: string };
    }
  }
}

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
            <a href="https://wa.me/19783909619" target="_blank" className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-7 py-3 rounded-xl shadow transition inline-flex items-center gap-2">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.51 14.94L2 22l5.2-1.37A9.9 9.9 0 1 0 12.04 2Zm5.84 14.25c-.24.68-1.4 1.3-1.93 1.34-.49.04-1.1.06-1.78-.11-.41-.1-.94-.31-1.63-.61-2.87-1.24-4.74-4.14-4.89-4.33-.14-.19-1.17-1.55-1.17-2.96 0-1.4.74-2.08 1-2.36.24-.27.53-.34.7-.34.17 0 .35 0 .5.01.16.01.38-.06.6.46.24.57.82 1.98.89 2.13.07.15.12.32.02.51-.1.2-.15.32-.3.49-.15.17-.31.38-.44.52-.15.15-.3.31-.13.6.17.3.77 1.27 1.64 2.06 1.13 1.03 2.07 1.36 2.38 1.52.31.15.49.13.67-.08.18-.2.77-.9.98-1.21.21-.31.41-.26.68-.15.27.11 1.72.81 2.02.96.3.15.5.22.57.34.07.13.07.75-.17 1.43Z" /></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
      {/* Property Search Widget */}
      <section className="max-w-6xl mx-auto px-6 py-12" id="property-search">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Search Properties</h2>
        <p className="text-gray-600 mb-6 max-w-2xl">Begin exploring available listings. Enter a location, city, or ZIP to start narrowing results instantly.</p>
        <div className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <Script src="https://em.realscout.com/widgets/realscout-web-components.umd.js" type="module" strategy="lazyOnload" />
          <style>{`realscout-simple-search { --rs-ss-font-primary-color:#374151; --rs-ss-searchbar-border-color:hsl(215 16% 82%); --rs-ss-box-shadow:0 6px 14px -4px #0000001a; --rs-ss-widget-width:100%; }`}</style>
          {React.createElement('realscout-simple-search', { 'agent-encoded-id': 'QWdlbnQtMjc5Mjgz' })}
          <p className="text-xs text-gray-500 mt-3">Search powered by RealScout. Results are for discovery and may update frequently.</p>
        </div>
      </section>

      {/* Listings Showcase */}
      <section className="max-w-6xl mx-auto px-6 py-12" id="listings">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Recent & Past Listings</h2>
        <p className="text-gray-600 mb-6 max-w-2xl">Browse active, past, and sold listings to get a feel for market dynamics and representation quality.</p>
        <div className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <style>{`realscout-your-listings { --rs-listing-divider-color:rgb(101,141,172); width:100%; display:block; }`}</style>
          {React.createElement('realscout-your-listings', {
            'agent-encoded-id': 'QWdlbnQtMjc5Mjgz',
            'sort-order': 'STATUS_AND_SIGNIFICANT_CHANGE',
            'listing-status': 'For Sale,For Rent,In Contract,Sold,Rented',
            'property-types': 'SFR,MF,TC,LAL,MOBILE,OTHER'
          })}
          <p className="text-xs text-gray-500 mt-3">Historical and active listing data provided via RealScout integration.</p>
        </div>
      </section>

      {/* Home Valuation */}
      <section className="max-w-6xl mx-auto px-6 py-12" id="home-value">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Free Home Value Snapshot</h2>
        <p className="text-gray-600 mb-6 max-w-2xl">Curious what your property could sell for? Get an instant guided valuation baseline—then we refine it with local insight.</p>
        <div className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <style>{`realscout-home-value { --rs-hvw-background-color:#ffffff; --rs-hvw-title-color:#111827; --rs-hvw-subtitle-color:rgba(55,65,81,.7); --rs-hvw-primary-button-text-color:#ffffff; --rs-hvw-primary-button-color:rgb(35,93,137); --rs-hvw-secondary-button-text-color:rgb(35,93,137); --rs-hvw-secondary-button-color:#ffffff; --rs-hvw-widget-width:100%; display:block; }`}</style>
          {React.createElement('realscout-home-value', { 'agent-encoded-id': 'QWdlbnQtMjc5Mjgz' })}
          <p className="text-xs text-gray-500 mt-3">Automated valuation is an estimate. Request a full comparative analysis for accuracy.</p>
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
            <a href="https://wa.me/19783909619" target="_blank" className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-7 py-3 rounded-xl shadow transition inline-flex items-center gap-2">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.51 14.94L2 22l5.2-1.37A9.9 9.9 0 1 0 12.04 2Zm5.84 14.25c-.24.68-1.4 1.3-1.93 1.34-.49.04-1.1.06-1.78-.11-.41-.1-.94-.31-1.63-.61-2.87-1.24-4.74-4.14-4.89-4.33-.14-.19-1.17-1.55-1.17-2.96 0-1.4.74-2.08 1-2.36.24-.27.53-.34.7-.34.17 0 .35 0 .5.01.16.01.38-.06.6.46.24.57.82 1.98.89 2.13.07.15.12.32.02.51-.1.2-.15.32-.3.49-.15.17-.31.38-.44.52-.15.15-.3.31-.13.6.17.3.77 1.27 1.64 2.06 1.13 1.03 2.07 1.36 2.38 1.52.31.15.49.13.67-.08.18-.2.77-.9.98-1.21.21-.31.41-.26.68-.15.27.11 1.72.81 2.02.96.3.15.5.22.57.34.07.13.07.75-.17 1.43Z" /></svg>
              WhatsApp
            </a>
            <a href="/#contact" className="bg-black/30 hover:bg-black/40 text-white font-semibold px-7 py-3 rounded-xl backdrop-blur-sm border border-white/30 shadow transition">Contact Form</a>
          </div>
        </div>
      </section>
    </main>
  );
}
