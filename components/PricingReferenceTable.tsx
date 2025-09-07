"use client";
import React from 'react';
import { PRICING } from './PricingCalculator';

// Simple reference table presenting competitive pricing rationale.
// Values sourced from user-provided market research (Investopedia, local CPA ranges, notary benchmarks).
export default function PricingReferenceTable() {
  return (
    <section className="mt-20" aria-labelledby="pricing-benchmark-heading">
      <h2 id="pricing-benchmark-heading" className="text-2xl font-bold tracking-tight mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Competitive Pricing Reference (Massachusetts)</h2>

      {/* TAX TABLE (Updated Schema) */}
      <div className="mb-16 overflow-hidden rounded-2xl ring-1 ring-slate-200 bg-white shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/60 backdrop-blur-sm">
          <h3 className="font-semibold text-slate-800">1. Tax Preparation (Individual)</h3>
          <p className="text-xs text-slate-500 mt-1">Core return types, special pricing, and scalable add‑ons.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-0">
          {/* Base Returns */}
          <div className="md:col-span-1 border-r border-slate-100">
            <div className="px-5 py-3 border-b bg-slate-100 text-[11px] font-semibold tracking-wide text-slate-600 uppercase">Return Types</div>
            <ul className="divide-y divide-slate-100 text-sm">
              <Li label="Basic 1040 (No Dependents)" value={`$${PRICING.tax.basic1040}`} note="~40% below many CPA averages" />
              <Li label="1040 with Dependents" value={`$${PRICING.tax["1040Dependents"]}`} />
              <Li label="1040 + Itemized (Schedule A)" value={`$${PRICING.tax.itemized}`} />
              <Li label="Self-Employment (Schedule C)" value={`$${PRICING.tax.selfEmployment}`} note="Competitive vs $300–$500 local" />
              <Li label="Rental Property (Schedule E)" value={`+$${PRICING.tax.rentalProperty}`} note="Per property" />
              <Li label="State Return (additional)" value={`+$${PRICING.tax.stateReturn}`} />
              <Li label="E‑file & Direct Deposit" value="Included" />
            </ul>
          </div>
          {/* Special Pricing */}
          <div className="md:col-span-1 border-r border-slate-100">
            <div className="px-5 py-3 border-b bg-slate-100 text-[11px] font-semibold tracking-wide text-slate-600 uppercase">Special Pricing</div>
            <ul className="divide-y divide-slate-100 text-sm">
              <Li label="Student Basic Return (W-2 only)" value={`$${PRICING.tax.studentBasic}`} />
              <Li label="Senior (65+) Basic Return" value={`$${PRICING.tax.seniorBasic}`} />
            </ul>
          </div>
          {/* Add‑Ons */}
            <div className="md:col-span-1">
            <div className="px-5 py-3 border-b bg-slate-100 text-[11px] font-semibold tracking-wide text-slate-600 uppercase">Add‑Ons</div>
            <ul className="divide-y divide-slate-100 text-sm">
              <Li label="Additional W‑2 (after first 2)" value={`+$${PRICING.tax.addons.extraW2} ea.`} />
              <Li label="1099 Form" value={`$${PRICING.tax.addons["1099First"]} first`} note={`$${PRICING.tax.addons["1099Additional"]} each additional`} />
              <Li label="Stock / Investments Reporting" value={`+$${PRICING.tax.addons.stocks}`} />
              <Li label="Multiple States (each additional)" value={`+$${PRICING.tax.addons.multiState}`} />
              <Li label="Audit Protection" value={`+$${PRICING.tax.addons.auditProtection}`} />
            </ul>
          </div>
        </div>
      </div>

      {/* IMMIGRATION TABLE (Updated Schema) */}
      <div className="mb-16 overflow-hidden rounded-2xl ring-1 ring-slate-200 bg-white shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/60 backdrop-blur-sm">
          <h3 className="font-semibold text-slate-800">2. Immigration Services</h3>
          <p className="text-xs text-slate-500 mt-1">Modular assistance—form prep & document handling (no legal advice).</p>
        </div>
        <div className="grid md:grid-cols-3 gap-0">
          <div className="md:col-span-2 border-r border-slate-100">
            <div className="px-5 py-3 border-b bg-slate-100 text-[11px] font-semibold tracking-wide text-slate-600 uppercase">Core Services</div>
            <ul className="divide-y divide-slate-100 text-sm">
              <Li label="Consultation" value={`$${PRICING.immigration.consultation}`} />
              <Li label="Family Petition" value={`$${PRICING.immigration.familyPetition}`} />
              <Li label="Green Card" value={`$${PRICING.immigration.greenCard}`} />
              <Li label="Citizenship" value={`$${PRICING.immigration.citizenship}`} />
              <Li label="Work Permit" value={`$${PRICING.immigration.workPermit}`} />
              <Li label="Fiancé Visa" value={`$${PRICING.immigration.fianceVisa}`} />
              <Li label="Document Translation (per doc)" value={`+$${PRICING.immigration.documentTranslation}`} />
              <Li label="Full Package Assistance" value={`$${PRICING.immigration.packageAssistance}`} />
            </ul>
          </div>
          <div className="md:col-span-1">
            <div className="px-5 py-3 border-b bg-slate-100 text-[11px] font-semibold tracking-wide text-slate-600 uppercase">Add‑Ons</div>
            <ul className="divide-y divide-slate-100 text-sm">
              <Li label="Expedited" value={`+$${PRICING.immigration.addons.expedited}`} />
              <Li label="Extra Copies" value={`+$${PRICING.immigration.addons.extraCopies} ea.`} />
            </ul>
          </div>
        </div>
      </div>

      {/* NOTARY TABLE (Updated Schema) */}
      <div className="mb-16 overflow-hidden rounded-2xl ring-1 ring-slate-200 bg-white shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/60 backdrop-blur-sm">
          <h3 className="font-semibold text-slate-800">3. Notary Services</h3>
          <p className="text-xs text-slate-500 mt-1">Simple, transparent, travel scaled by mileage.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="md:col-span-1 border-r border-slate-100">
            <div className="px-5 py-3 border-b bg-slate-100 text-[11px] font-semibold tracking-wide text-slate-600 uppercase">Core</div>
            <ul className="divide-y divide-slate-100 text-sm">
              <Li label="First Notarization" value={`$${PRICING.notary.firstNotarization}`} />
              <Li label="Each Additional Document" value={`+$${PRICING.notary.additionalDoc}`} />
            </ul>
          </div>
          <div className="md:col-span-1">
            <div className="px-5 py-3 border-b bg-slate-100 text-[11px] font-semibold tracking-wide text-slate-600 uppercase">Travel</div>
            <ul className="divide-y divide-slate-100 text-sm">
              <Li label="Mileage (first 10mi)" value={`$${PRICING.notary.travelPerMile}/mi`} note="applied when requested" />
              <Li label="Additional Miles" value={`$${PRICING.notary.travelExtraMile}/mi`} note=">10mi" />
            </ul>
          </div>
        </div>
      </div>

      {/* REAL ESTATE NOTE */}
      <div className="rounded-2xl ring-1 ring-slate-200 bg-white shadow-sm p-6">
        <h3 className="font-semibold text-slate-800 mb-2">4. Real Estate Services</h3>
        <ul className="text-sm text-slate-600 space-y-1">
          <li>Buyer Representation — <span className="font-medium text-slate-800">{PRICING.realEstate.buyer}</span></li>
          <li>Seller Representation — <span className="font-medium text-slate-800">{PRICING.realEstate.seller}</span></li>
          <li>Landlord Rental Service — <span className="font-medium text-slate-800">{PRICING.realEstate.landlordService}</span></li>
          <li>DR Investment Advisory — <span className="font-medium text-slate-800">{PRICING.realEstate.drInvestment}</span></li>
        </ul>
      </div>

      <p className="mt-10 text-[11px] leading-relaxed text-slate-500 max-w-3xl">
        Benchmarks referenced: national CPA averages, local market ranges, and user-provided research. Government & third‑party filing fees excluded. Travel pricing estimated — final confirmation during engagement.
      </p>
    </section>
  );
}

// Reusable list row
function Li({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <li className="flex flex-col px-5 py-3">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-medium text-slate-800 leading-snug">{label}</span>
        <span className="text-slate-700 whitespace-nowrap text-sm font-semibold">{value}</span>
      </div>
      {note && <span className="text-[11px] text-slate-500 mt-1">{note}</span>}
    </li>
  );
}
