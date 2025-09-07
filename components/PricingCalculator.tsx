"use client";
import React, { useMemo, useState } from "react";

export const PRICING = {
  tax: {
    base: {
      individual: 130,
      indiv_state: 155,
      self_employed: 240,
      schedule_c: 290,
    },
    add_ons: {
      rental_property: 60,
      first_1099: 25,
      each_additional_1099: 10,
      investment_income: 40,
      itin: 90,
      amended_return: 130,
      tax_planning: 55,
      audit_protection: 45,
    },
  },
  notary: {
    first_notarization: 20,
    additional_docs: 5,
    travel_fee_min: 20,
    travel_fee_max: 40,
  },
  immigration: {
    naturalization: 800,
    green_card_package: 2800,
    additional_form: 60,
    mailing_assistance: 25,
    document_translation: 50,
  },
  real_estate: {
    buyer_rep: null as number | null,
    seller_rep: null as number | null,
    landlord_rental_fee: "1 month rent",
  },
};

const T = {
  en: {
    title: "Inoa Services — Pricing Estimator",
    languageBtn: "Español",
  selectService: "Select a service",
  service: "Service",
    tax: "Tax Preparation",
    notary: "Notary",
    immigration: "Immigration Assistance",
    realEstate: "Real Estate Services",
    selectTaxType: "Select tax return type",
    individual: "Individual (W-2)",
    individualState: "Individual + State",
    selfEmployed: "Self-Employed / 1099",
    scheduleC: "Schedule C",
    rentalProperties: "Rental properties",
    numberOf1099s: "Number of 1099s",
    includeInvestments: "Include investment/stock income",
    includeITIN: "Include ITIN application/renewal",
    includeAmended: "Amended return",
    includeTaxPlanning: "Tax planning session (30 min)",
    includeAuditProtection: "Audit protection add-on",
    calculate: "Recalculate",
    estimate: "Estimated Price",
    notaryCount: "Documents to notarize",
    mobileNotary: "Mobile notary (travel fee)",
    travelDistance: "Travel distance (miles)",
    immigrationPackage: "Immigration package",
    naturalization: "Naturalization (N-400)",
    greenCard: "Family-based Green Card (I-130 + I-485)",
    extraForms: "Additional USCIS forms",
    mailing: "Mailing assistance",
    translation: "Document translations (per doc)",
    clear: "Clear",
    copy: "Copy Estimate",
    viewDetails: "View breakdown",
    hideDetails: "Hide breakdown",
    buyerRep: "Buyer Representation — After consultation",
    sellerRep: "Seller Representation — After consultation",
    landlordFee: "Landlord rental service — Fee: One month's rent",
    estimateCopied: "Estimate copied to clipboard",
    copyFail: "Copy failed",
    disclaimer: "Estimates exclude government / filing fees. Real estate representation fees determined after consultation.",
  },
  es: {
    title: "Inoa Services — Estimador de Precios",
    languageBtn: "English",
  selectService: "Seleccione un servicio",
  service: "Servicio",
    tax: "Preparación de Impuestos",
    notary: "Notaría",
    immigration: "Asistencia Migratoria",
    realEstate: "Servicios Inmobiliarios",
    selectTaxType: "Seleccione tipo de declaración",
    individual: "Individual (W-2)",
    individualState: "Individual + Estado",
    selfEmployed: "Autónomo / 1099",
    scheduleC: "Schedule C",
    rentalProperties: "Propiedades en alquiler",
    numberOf1099s: "Número de 1099s",
    includeInvestments: "Incluir inversiones/acciones",
    includeITIN: "Incluir solicitud/renovación ITIN",
    includeAmended: "Declaración enmendada",
    includeTaxPlanning: "Planificación fiscal (30 min)",
    includeAuditProtection: "Protección auditoría",
    calculate: "Recalcular",
    estimate: "Precio Estimado",
    notaryCount: "Documentos a notarizar",
    mobileNotary: "Notaría móvil (tarifa viaje)",
    travelDistance: "Distancia (millas)",
    immigrationPackage: "Paquete migratorio",
    naturalization: "Naturalización (N-400)",
    greenCard: "Green Card familiar (I-130 + I-485)",
    extraForms: "Formularios USCIS adicionales",
    mailing: "Asistencia de envío",
    translation: "Traducciones (por doc)",
    clear: "Limpiar",
    copy: "Copiar Estimado",
    viewDetails: "Ver desglose",
    hideDetails: "Ocultar desglose",
    buyerRep: "Representación comprador — Tras consulta",
    sellerRep: "Representación vendedor — Tras consulta",
    landlordFee: "Servicio alquiler propietario — Tarifa: 1 mes de renta",
    estimateCopied: "Estimado copiado",
    copyFail: "Error al copiar",
    disclaimer: "Los estimados excluyen tarifas oficiales/gubernamentales. Honorarios inmobiliarios se definen tras consulta.",
  },
};

function computeTravelFee(distanceMiles = 0) {
  const min = PRICING.notary.travel_fee_min;
  const max = PRICING.notary.travel_fee_max;
  const capped = Math.max(0, Math.min(distanceMiles, 30));
  const ratio = capped / 30;
  return Math.round(min + (max - min) * ratio);
}

export interface EstimateInputs {
  taxType?: string;
  rentalProps?: number;
  num1099s?: number;
  hasInvestments?: boolean;
  hasITIN?: boolean;
  isAmended?: boolean;
  taxPlanning?: boolean;
  auditProtection?: boolean;
  notaryDocs?: number;
  mobileNotary?: boolean;
  travelMiles?: number;
  immPackage?: string;
  immExtraForms?: number;
  immMailing?: boolean;
  immTranslations?: number;
}

export interface BreakdownItem { label: string; amount: number; category: 'tax' | 'notary' | 'immigration'; }

export function calculateEstimate(inputs: EstimateInputs = {}) {
  const s = {
    taxType: "individual",
    rentalProps: 0,
    num1099s: 0,
    hasInvestments: false,
    hasITIN: false,
    isAmended: false,
    taxPlanning: false,
    auditProtection: false,
    notaryDocs: 0,
    mobileNotary: false,
    travelMiles: 0,
    immPackage: "none",
    immExtraForms: 0,
    immMailing: false,
    immTranslations: 0,
    ...inputs,
  };

  let total = 0;
  const breakdown: BreakdownItem[] = [];

  const taxBaseMap: Record<string, number> = {
    individual: PRICING.tax.base.individual,
    indiv_state: PRICING.tax.base.indiv_state,
    self_employed: PRICING.tax.base.self_employed,
    schedule_c: PRICING.tax.base.schedule_c,
  };
  const basePrice = taxBaseMap[s.taxType] ?? PRICING.tax.base.individual;
  total += basePrice;
  breakdown.push({ label: s.taxType, amount: basePrice, category: 'tax' });

  if (s.rentalProps > 0) {
    const amt = s.rentalProps * PRICING.tax.add_ons.rental_property;
    total += amt;
  breakdown.push({ label: `Rental properties: ${s.rentalProps}`, amount: amt, category: 'tax' });
  }
  if (s.num1099s > 0) {
    const first = PRICING.tax.add_ons.first_1099;
    const extra = Math.max(0, s.num1099s - 1) * PRICING.tax.add_ons.each_additional_1099;
    const amt = first + extra;
    total += amt;
  breakdown.push({ label: `1099s: ${s.num1099s}`, amount: amt, category: 'tax' });
  }
  if (s.hasInvestments) {
    total += PRICING.tax.add_ons.investment_income;
  breakdown.push({ label: "Investments", amount: PRICING.tax.add_ons.investment_income, category: 'tax' });
  }
  if (s.hasITIN) {
    total += PRICING.tax.add_ons.itin;
  breakdown.push({ label: "ITIN", amount: PRICING.tax.add_ons.itin, category: 'tax' });
  }
  if (s.isAmended) {
    total += PRICING.tax.add_ons.amended_return;
  breakdown.push({ label: "Amended return", amount: PRICING.tax.add_ons.amended_return, category: 'tax' });
  }
  if (s.taxPlanning) {
    total += PRICING.tax.add_ons.tax_planning;
  breakdown.push({ label: "Tax planning", amount: PRICING.tax.add_ons.tax_planning, category: 'tax' });
  }
  if (s.auditProtection) {
    total += PRICING.tax.add_ons.audit_protection;
  breakdown.push({ label: "Audit protection", amount: PRICING.tax.add_ons.audit_protection, category: 'tax' });
  }

  if (s.notaryDocs > 0) {
    const first = PRICING.notary.first_notarization;
    const additional = Math.max(0, s.notaryDocs - 1) * PRICING.notary.additional_docs;
    const amt = first + additional;
    total += amt;
  breakdown.push({ label: `Notary (${s.notaryDocs})`, amount: amt, category: 'notary' });
    if (s.mobileNotary) {
      const travel = computeTravelFee(s.travelMiles || 0);
      total += travel;
  breakdown.push({ label: `Mobile notary travel (${s.travelMiles}mi)`, amount: travel, category: 'notary' });
    }
  }

  if (s.immPackage && s.immPackage !== "none") {
    if (s.immPackage === "naturalization") {
      total += PRICING.immigration.naturalization;
  breakdown.push({ label: "Naturalization (N-400)", amount: PRICING.immigration.naturalization, category: 'immigration' });
    } else if (s.immPackage === "green_card") {
      total += PRICING.immigration.green_card_package;
  breakdown.push({ label: "Family-based Green Card", amount: PRICING.immigration.green_card_package, category: 'immigration' });
    }
    if (s.immExtraForms > 0) {
      const amt = s.immExtraForms * PRICING.immigration.additional_form;
      total += amt;
  breakdown.push({ label: `Extra USCIS forms: ${s.immExtraForms}`, amount: amt, category: 'immigration' });
    }
    if (s.immMailing) {
      total += PRICING.immigration.mailing_assistance;
  breakdown.push({ label: "Mailing assistance", amount: PRICING.immigration.mailing_assistance, category: 'immigration' });
    }
    if (s.immTranslations > 0) {
      const amt = s.immTranslations * PRICING.immigration.document_translation;
      total += amt;
  breakdown.push({ label: `Document translations: ${s.immTranslations}`, amount: amt, category: 'immigration' });
    }
  }

  return { total: Math.round(total), breakdown };
}

export default function PricingCalculator({ initialLang = "en" }: { initialLang?: "en" | "es" }) {
  const [lang, setLang] = useState(initialLang);
  const t = T[lang];

  const [selectedService, setSelectedService] = useState<'tax' | 'notary' | 'immigration' | 'real_estate'>('tax');
  const [taxType, setTaxType] = useState("individual");
  const [rentalProps, setRentalProps] = useState(0);
  const [num1099s, setNum1099s] = useState(0);
  const [hasInvestments, setHasInvestments] = useState(false);
  const [hasITIN, setHasITIN] = useState(false);
  const [isAmended, setIsAmended] = useState(false);
  const [taxPlanning, setTaxPlanning] = useState(false);
  const [auditProtection, setAuditProtection] = useState(false);
  const [notaryDocs, setNotaryDocs] = useState(0);
  const [mobileNotary, setMobileNotary] = useState(false);
  const [travelMiles, setTravelMiles] = useState(0);
  const [immPackage, setImmPackage] = useState("none");
  const [immExtraForms, setImmExtraForms] = useState(0);
  const [immMailing, setImmMailing] = useState(false);
  const [immTranslations, setImmTranslations] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const fullResult = useMemo(
    () =>
      calculateEstimate({
        taxType,
        rentalProps,
        num1099s,
        hasInvestments,
        hasITIN,
        isAmended,
        taxPlanning,
        auditProtection,
        notaryDocs,
        mobileNotary,
        travelMiles,
        immPackage,
        immExtraForms,
        immMailing,
        immTranslations,
      }),
    [taxType, rentalProps, num1099s, hasInvestments, hasITIN, isAmended, taxPlanning, auditProtection, notaryDocs, mobileNotary, travelMiles, immPackage, immExtraForms, immMailing, immTranslations]
  );

  const filteredBreakdown = fullResult.breakdown.filter(b => b.category === selectedService);
  const filteredTotal = filteredBreakdown.reduce((acc, b) => acc + b.amount, 0);

  const reset = () => {
    setTaxType("individual");
    setRentalProps(0);
    setNum1099s(0);
    setHasInvestments(false);
    setHasITIN(false);
    setIsAmended(false);
    setTaxPlanning(false);
    setAuditProtection(false);
    setNotaryDocs(0);
    setMobileNotary(false);
    setTravelMiles(0);
    setImmPackage("none");
    setImmExtraForms(0);
    setImmMailing(false);
    setImmTranslations(0);
    setShowBreakdown(false);
  };

  const copyEstimate = async () => {
    const text = `${t.estimate}: $${filteredTotal}\n\n${filteredBreakdown
      .map((b) => `${b.label}: $${b.amount}`)
      .join("\n")}`;
    try {
      await navigator.clipboard.writeText(text);
      alert(t.estimateCopied);
    } catch {
      alert(t.copyFail);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-8 bg-white rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br from-blue-100 via-teal-100 to-emerald-100 blur-3xl opacity-40 pointer-events-none" />
      <div className="flex items-center justify-between mb-8 relative">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t.title}</h1>
        <button
          onClick={() => setLang((l) => (l === "en" ? "es" : "en"))}
          className="px-4 py-2 rounded-md border bg-white hover:bg-gray-50 text-sm font-medium shadow-sm"
        >
          {t.languageBtn}
        </button>
      </div>

      {/* SERVICE PICKER */}
      <div className="mb-8 grid md:grid-cols-3 gap-5 items-end">
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">{t.service}</label>
          <select
            value={selectedService}
            onChange={(e) => { setSelectedService(e.target.value as any); setShowBreakdown(false); }}
            className="p-3 border rounded-lg bg-white shadow-sm w-full"
          >
            <option value="tax">{t.tax}</option>
            <option value="notary">{t.notary}</option>
            <option value="immigration">{t.immigration}</option>
            <option value="real_estate">{t.realEstate}</option>
          </select>
        </div>
      </div>

      {/* TAX */}
      {selectedService === 'tax' && (<div className="mb-10">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">{t.tax}</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <select
            value={taxType}
            onChange={(e) => setTaxType(e.target.value)}
            className="p-3 border rounded-lg bg-white shadow-sm"
            aria-label={t.selectTaxType}
          >
            <option value="individual">{t.individual} — ${PRICING.tax.base.individual}</option>
            <option value="indiv_state">{t.individualState} — ${PRICING.tax.base.indiv_state}</option>
            <option value="self_employed">{t.selfEmployed} — ${PRICING.tax.base.self_employed}</option>
            <option value="schedule_c">{t.scheduleC} — ${PRICING.tax.base.schedule_c}</option>
          </select>
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium w-1/2">{t.rentalProperties}</label>
            <input
              type="number"
              min={0}
              value={rentalProps}
              onChange={(e) => setRentalProps(Number(e.target.value))}
              className="p-3 border rounded-lg w-1/2 shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium w-1/2">{t.numberOf1099s}</label>
            <input
              type="number"
              min={0}
              value={num1099s}
              onChange={(e) => setNum1099s(Number(e.target.value))}
              className="p-3 border rounded-lg w-1/2 shadow-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            {[
              [hasInvestments, setHasInvestments, t.includeInvestments],
              [hasITIN, setHasITIN, t.includeITIN],
              [isAmended, setIsAmended, t.includeAmended],
              [taxPlanning, setTaxPlanning, t.includeTaxPlanning],
              [auditProtection, setAuditProtection, t.includeAuditProtection],
            ].map(([val, setter, label], i) => (
              <label key={i} className="text-sm flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={val as boolean}
                  onChange={(e) => (setter as React.Dispatch<React.SetStateAction<boolean>>)(e.target.checked)}
                />
                <span>{label as string}</span>
              </label>
            ))}
          </div>
        </div>
      </div>)}

      {/* NOTARY */}
      {selectedService === 'notary' && (<div className="mb-10">
        <h2 className="text-lg font-semibold mb-4">{t.notary}</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium w-1/2">{t.notaryCount}</label>
            <input
              type="number"
              min={0}
              value={notaryDocs}
              onChange={(e) => setNotaryDocs(Number(e.target.value))}
              className="p-3 border rounded-lg w-1/2 shadow-sm"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-sm flex items-center gap-2">
              <input
                type="checkbox"
                checked={mobileNotary}
                onChange={(e) => setMobileNotary(e.target.checked)}
              />
              <span>{t.mobileNotary}</span>
            </label>
            {mobileNotary && (
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium w-1/2">{t.travelDistance}</label>
                <input
                  type="number"
                  min={0}
                  value={travelMiles}
                  onChange={(e) => setTravelMiles(Number(e.target.value))}
                  className="p-3 border rounded-lg w-1/2 shadow-sm"
                />
              </div>
            )}
          </div>
        </div>
      </div>)}

      {/* IMMIGRATION */}
      {selectedService === 'immigration' && (<div className="mb-10">
        <h2 className="text-lg font-semibold mb-4">{t.immigration}</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <select
            value={immPackage}
            onChange={(e) => setImmPackage(e.target.value)}
            className="p-3 border rounded-lg bg-white shadow-sm"
          >
            <option value="none">—</option>
            <option value="naturalization">{t.naturalization} — ${PRICING.immigration.naturalization}</option>
            <option value="green_card">{t.greenCard} — ${PRICING.immigration.green_card_package}</option>
          </select>
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium w-1/2">{t.extraForms}</label>
            <input
              type="number"
              min={0}
              value={immExtraForms}
              onChange={(e) => setImmExtraForms(Number(e.target.value))}
              className="p-3 border rounded-lg w-1/2 shadow-sm"
            />
          </div>
          <label className="text-sm flex items-center gap-2">
            <input
              type="checkbox"
              checked={immMailing}
              onChange={(e) => setImmMailing(e.target.checked)}
            />
            <span>{t.mailing}</span>
          </label>
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium w-1/2">{t.translation}</label>
            <input
              type="number"
              min={0}
              value={immTranslations}
              onChange={(e) => setImmTranslations(Number(e.target.value))}
              className="p-3 border rounded-lg w-1/2 shadow-sm"
            />
          </div>
        </div>
      </div>)}

      {/* REAL ESTATE */}
      {selectedService === 'real_estate' && (<div className="mb-10">
        <h2 className="text-lg font-semibold mb-2">{t.realEstate}</h2>
        <div className="text-sm text-gray-700 space-y-1 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <div>{t.buyerRep}</div>
            <div>{t.sellerRep}</div>
            <div>{t.landlordFee}</div>
        </div>
      </div>)}

      {/* RESULT */}
      <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => { /* state auto recalculates */ }}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium shadow"
          >
            {t.calculate}
          </button>
          <button
            onClick={reset}
            className="px-5 py-2.5 bg-white border rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50"
          >
            {t.clear}
          </button>
          <button
            onClick={copyEstimate}
            className="px-5 py-2.5 bg-white border rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50"
          >
            {t.copy}
          </button>
          <button
            onClick={() => setShowBreakdown((v) => !v)}
            className="px-5 py-2.5 bg-white border rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50"
          >
            {showBreakdown ? t.hideDetails : t.viewDetails}
          </button>
        </div>
        <div className="flex-1 bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-sm font-medium text-gray-500">{t.estimate}</span>
            <span className="text-3xl font-bold tracking-tight text-gray-800">${filteredTotal}</span>
          </div>
          {showBreakdown && (
            <div className="max-h-56 overflow-auto pr-1 space-y-2 text-sm">
              {filteredBreakdown.map((b, i) => (
                <div key={i} className="flex justify-between border-b border-gray-100 pb-1">
                  <span className="text-gray-600 truncate pr-4">{b.label}</span>
                  <span className="font-semibold text-gray-800">${b.amount}</span>
                </div>
              ))}
              {filteredBreakdown.length === 0 && <div className="text-gray-400">—</div>}
            </div>
          )}
          <p className="mt-5 text-[11px] leading-relaxed text-gray-500 italic">{t.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}
