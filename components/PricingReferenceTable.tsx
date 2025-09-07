"use client";
import React from 'react';
import { PRICING } from './PricingCalculator';

// Simple reference table presenting competitive pricing rationale.
// Values sourced from user-provided market research (Investopedia, local CPA ranges, notary benchmarks).
export default function PricingReferenceTable() {
  return (
    <section className="mt-20" aria-labelledby="pricing-benchmark-heading">
      <h2 id="pricing-benchmark-heading" className="text-2xl font-bold tracking-tight mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Competitive Pricing Reference (Massachusetts)</h2>

      {/* TAX TABLE */}
      <div className="mb-12 overflow-hidden rounded-2xl ring-1 ring-slate-200 bg-white shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/60 backdrop-blur-sm">
          <h3 className="font-semibold text-slate-800">1. Tax Preparation</h3>
          <p className="text-xs text-slate-500 mt-1">Affordable & transparent vs. big-chain & CPA averages.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-5 py-3 font-medium">Service Offered</th>
                <th className="text-left px-5 py-3 font-medium">Price</th>
                <th className="text-left px-5 py-3 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              <Tr service="Basic Individual Return (Federal only)" price={PRICING.tax.base.individual} notes="~40% below national CPA averages (~$220)" />
              <Tr service="Individual + State" price={PRICING.tax.base.indiv_state} notes="Still very budget‑friendly" />
              <Tr service="Self-Employed / 1099 Contractor" price={PRICING.tax.base.self_employed} notes="~50% lower than typical CPA Schedule C pricing" />
              <Tr service="Schedule C (with expenses)" price={PRICING.tax.base.schedule_c} notes="Competitive vs local $300–$500 range" />
              <Tr service="Rental Property (per property)" price={`+$${PRICING.tax.add_ons.rental_property}`} notes="Scales per door" />
              <Tr service="First 1099" price={`+$${PRICING.tax.add_ons.first_1099}`} notes="Transparent complexity fee" />
              <Tr service="Additional 1099" price={`+$${PRICING.tax.add_ons.each_additional_1099} ea.`} notes="Affordable scaling" />
              <Tr service="Investment / Stock Income" price={`+$${PRICING.tax.add_ons.investment_income}`} notes="Simple surcharge" />
              <Tr service="ITIN Application / Renewal" price={`$${PRICING.tax.add_ons.itin}`} notes="Accessible support" />
              <Tr service="Amended Return" price={`$${PRICING.tax.add_ons.amended_return}`} notes="Fair catch‑up" />
              <Tr service="Tax Planning (30 min)" price={`$${PRICING.tax.add_ons.tax_planning}`} notes="Intro advisory rate" />
              <Tr service="Audit Protection Add-On" price={`$${PRICING.tax.add_ons.audit_protection}`} notes="Peace of mind" />
            </tbody>
          </table>
        </div>
      </div>

      {/* IMMIGRATION TABLE */}
      <div className="mb-12 overflow-hidden rounded-2xl ring-1 ring-slate-200 bg-white shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/60 backdrop-blur-sm">
          <h3 className="font-semibold text-slate-800">2. Immigration Assistance</h3>
          <p className="text-xs text-slate-500 mt-1">Full-service form preparation vs higher law firm packages.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-5 py-3 font-medium">Package / Service</th>
                <th className="text-left px-5 py-3 font-medium">Price</th>
              </tr>
            </thead>
            <tbody>
              <Tr2 service="Naturalization (N-400) — Full Prep + Interview Prep" price={`$${PRICING.immigration.naturalization}`} />
              <Tr2 service="Family-based Green Card (I-130 + I-485)" price={`$${PRICING.immigration.green_card_package}`} />
              <Tr2 service="Additional USCIS Form" price={`+$${PRICING.immigration.additional_form} ea.`} />
              <Tr2 service="Mailing Assistance" price={`+$${PRICING.immigration.mailing_assistance}`} />
              <Tr2 service="Document Translation (per doc)" price={`+$${PRICING.immigration.document_translation}`} />
            </tbody>
          </table>
        </div>
      </div>

      {/* NOTARY TABLE */}
      <div className="mb-12 overflow-hidden rounded-2xl ring-1 ring-slate-200 bg-white shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/60 backdrop-blur-sm">
          <h3 className="font-semibold text-slate-800">3. Notary Services</h3>
          <p className="text-xs text-slate-500 mt-1">Transparent & below many mobile baselines.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-5 py-3 font-medium">Service Offered</th>
                <th className="text-left px-5 py-3 font-medium">Price</th>
                <th className="text-left px-5 py-3 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              <Tr service="First Notarization" price={`$${PRICING.notary.first_notarization}`} notes="Below many $30–$50 baselines" />
              <Tr service="Each Additional Document" price={`+$${PRICING.notary.additional_docs}`} notes="Low incremental" />
              <Tr service="Mobile Notary — Travel Fee" price={`$${PRICING.notary.travel_fee_min} – $${PRICING.notary.travel_fee_max}`} notes="Flat, distance‑scaled" />
            </tbody>
          </table>
        </div>
      </div>

      {/* REAL ESTATE NOTE */}
      <div className="rounded-2xl ring-1 ring-slate-200 bg-white shadow-sm p-6">
        <h3 className="font-semibold text-slate-800 mb-2">4. Real Estate Services</h3>
        <ul className="text-sm text-slate-600 space-y-1">
          <li>Buyer Representation — <span className="font-medium text-slate-800">After consultation</span></li>
          <li>Seller Representation — <span className="font-medium text-slate-800">After consultation</span></li>
          <li>Landlord Rental Service — <span className="font-medium text-slate-800">One month rent equivalent</span></li>
        </ul>
      </div>

      <p className="mt-10 text-[11px] leading-relaxed text-slate-500 max-w-3xl">
        Benchmarks referenced: national CPA averages & local ranges (Investopedia, regional CPA firm public ranges, user-supplied sources), local notary travel fee patterns, and form preparation market positioning. This table is informational; final quotes confirmed during consultation. Government filing fees not included.
      </p>
    </section>
  );
}

function Tr({ service, price, notes }: { service: string; price: string | number; notes?: string }) {
  return (
    <tr className="border-t border-slate-100">
      <td className="px-5 py-3 align-top font-medium text-slate-800 min-w-[200px]">{service}</td>
      <td className="px-5 py-3 align-top text-slate-700 whitespace-nowrap">{typeof price === 'number' ? `$${price}` : price}</td>
      <td className="px-5 py-3 align-top text-slate-500 text-xs">{notes || '—'}</td>
    </tr>
  );
}
function Tr2({ service, price }: { service: string; price: string | number }) {
  return (
    <tr className="border-t border-slate-100">
      <td className="px-5 py-3 align-top font-medium text-slate-800 min-w-[220px]">{service}</td>
      <td className="px-5 py-3 align-top text-slate-700">{typeof price === 'number' ? `$${price}` : price}</td>
    </tr>
  );
}
