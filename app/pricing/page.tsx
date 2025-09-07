import React from 'react';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing & Estimates | Inoa Services',
  description: 'Interactive bilingual pricing calculator for tax preparation, immigration assistance, notary, and real estate services in Massachusetts.'
};

const PricingCalculator = dynamic(() => import('../../components/PricingCalculator'), { ssr: false });

export default function PricingPage() {
  return (
    <main className="relative py-28 md:py-32 bg-gradient-to-br from-slate-50 via-white to-emerald-50 min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(56,189,248,0.15),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <header className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
            Pricing & Estimates
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Explore transparent, competitive pricing across our service lines. Build a tailored estimate instantly in English or Spanish.
          </p>
        </header>
        <PricingCalculator initialLang="en" />
        <section className="prose prose-slate max-w-none dark:prose-invert">
          <h2 className="text-xl font-semibold">How Estimates Work</h2>
          <p className="text-slate-600">The calculator provides an estimated professional service fee based on your inputs. Government filing fees, postage costs, and third-party platform fees (if any) are not included. Final quotes are confirmed during consultation.</p>
          <ul className="list-disc pl-6 text-slate-600">
            <li>Immigration packages cover form preparation, assembly, and interview readiness (no legal representation).</li>
            <li>Real estate representation fees are defined after a strategy consultation.</li>
            <li>Mobile notary travel scales by distance and is capped within a 30‑mile service area.</li>
            <li>Tax planning is an optional 30‑minute advisory session you can add.</li>
          </ul>
          <p className="text-slate-600">Need a written quote or a Spanish-language PDF summary? Contact us after generating an estimate and we can formalize it for you.</p>
        </section>
      </div>
    </main>
  );
}
