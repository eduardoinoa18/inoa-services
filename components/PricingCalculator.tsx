"use client";
import React, { useMemo, useState } from "react";

// Updated Pricing JSON (service-first refined model)
export const PRICING = {
  tax: {
    basic1040: 120,
    "1040Dependents": 150,
    itemized: 180,
    selfEmployment: 250,
    rentalProperty: 50, // per property
    stateReturn: 40, // first additional state (if primary is federal only)
    studentBasic: 80,
    seniorBasic: 100,
    addons: {
      extraW2: 15, // after first 2
      "1099First": 25,
      "1099Additional": 10,
      stocks: 40,
      multiState: 35, // each additional beyond first stateReturn
      auditProtection: 50,
    },
  },
  immigration: {
    consultation: 50,
    familyPetition: 350,
    greenCard: 500,
    citizenship: 300,
    workPermit: 250,
    fianceVisa: 450,
    documentTranslation: 50,
    packageAssistance: 600,
    addons: {
      expedited: 100,
      extraCopies: 25,
    },
  },
  notary: {
    firstNotarization: 20,
    additionalDoc: 5,
    travelPerMile: 2,
    travelExtraMile: 1, // applied after threshold (assumed 10mi)
  },
  realEstate: {
    buyer: "After Consultation",
    seller: "After Consultation",
    landlordService: "1 Month’s Rent",
    drInvestment: "After Consultation",
  },
} as const;

// Translations (extended for new pricing model)
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
    // Tax new wording
    baseReturn: "Return Type",
    basic1040: "Basic 1040 (No Dependents)",
    withDependents: "1040 w/ Dependents",
    itemized: "1040 + Schedule A",
    selfEmployment: "Self-Employment (Schedule C)",
    studentBasic: "Student Basic Return (W-2 only)",
    seniorBasic: "Senior (65+) Basic Return",
    specialCategory: "Special Pricing (optional)",
    rentalProps: "Rental properties (Schedule E)",
    stateIncluded: "Add first state return",
    extraStates: "Additional states (beyond first)",
    extraW2: "Extra W-2 (after first 2)",
    w2Count: "Total W-2 forms",
    form1099Count: "1099 forms",
    stocks: "Stock / investment reporting",
    auditProtection: "Audit Protection",
    // Immigration
    immigrationServices: "Immigration Services",
    consultation: "Consultation",
    familyPetition: "Family Petition",
    greenCard: "Green Card",
    citizenship: "Citizenship",
    workPermit: "Work Permit",
    fianceVisa: "Fiancé Visa",
    documentTranslation: "Document translations",
    packageAssistance: "Full Package Assistance",
    expedited: "Expedited handling",
    extraCopies: "Extra copies",
    copiesCount: "Copies (extra)",
    translationsCount: "Translations",
    // Notary
    notaryCount: "Documents to notarize",
    travelMiles: "Travel distance (miles)",
    includeTravel: "Include travel",
    // Shared
    calculate: "Recalculate",
    estimate: "Estimated Price",
    clear: "Clear",
    copy: "Copy Estimate",
    viewDetails: "View breakdown",
    hideDetails: "Hide breakdown",
    buyerRep: "Buyer Representation — After consultation",
    sellerRep: "Seller Representation — After consultation",
    landlordFee: "Landlord service — One month's rent",
    drInvestment: "DR Property Investment — After consultation",
    estimateCopied: "Estimate copied to clipboard",
    copyFail: "Copy failed",
    disclaimer: "Estimates exclude government / filing fees. Special pricing overrides base return. Travel fee assumption: first 10mi @ $2/mi, remaining @ $1/mi.",
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
    // Tax
    baseReturn: "Tipo de Declaración",
    basic1040: "1040 Básica (Sin Dependientes)",
    withDependents: "1040 con Dependientes",
    itemized: "1040 + Anexo A",
    selfEmployment: "Autónomos (Anexo C)",
    studentBasic: "Estudiante (W-2) Básica",
    seniorBasic: "Mayor (65+) Básica",
    specialCategory: "Precio Especial (opcional)",
    rentalProps: "Propiedades en alquiler",
    stateIncluded: "Agregar declaración estatal",
    extraStates: "Estados adicionales",
    extraW2: "W-2 extra (después de 2)",
    w2Count: "Total de W-2",
    form1099Count: "Formularios 1099",
    stocks: "Reportar inversiones",
    auditProtection: "Protección Auditoría",
    // Immigration
    immigrationServices: "Servicios Migratorios",
    consultation: "Consulta",
    familyPetition: "Petición Familiar",
    greenCard: "Green Card",
    citizenship: "Ciudadanía",
    workPermit: "Permiso de Trabajo",
    fianceVisa: "Visa Fiancé",
    documentTranslation: "Traducciones de documentos",
    packageAssistance: "Asistencia Paquete Completo",
    expedited: "Prioritario",
    extraCopies: "Copias extra",
    copiesCount: "Copias (extra)",
    translationsCount: "Traducciones",
    // Notary
    notaryCount: "Docs a notarizar",
    travelMiles: "Distancia (millas)",
    includeTravel: "Incluir viaje",
    // Shared
    calculate: "Recalcular",
    estimate: "Precio Estimado",
    clear: "Limpiar",
    copy: "Copiar Estimado",
    viewDetails: "Ver desglose",
    hideDetails: "Ocultar desglose",
    buyerRep: "Representación comprador — Tras consulta",
    sellerRep: "Representación vendedor — Tras consulta",
    landlordFee: "Servicio alquiler — 1 mes de renta",
    drInvestment: "Inversión RD — Tras consulta",
    estimateCopied: "Estimado copiado",
    copyFail: "Error al copiar",
    disclaimer: "Estimados excluyen tarifas gubernamentales. Precio especial reemplaza base. Viaje: primeros 10mi $2/mi, resto $1/mi.",
  },
};

// Assumption: first 10 miles cost travelPerMile, remaining miles cost travelExtraMile
function computeTravelFee(distanceMiles = 0) {
  const miles = Math.max(0, distanceMiles);
  const threshold = 10;
  const first = Math.min(miles, threshold) * PRICING.notary.travelPerMile;
  const extra = Math.max(0, miles - threshold) * PRICING.notary.travelExtraMile;
  return first + extra;
}

export interface EstimateInputs {
  // tax
  taxBase?: string; // basic1040 | 1040Dependents | itemized | selfEmployment
  specialCategory?: string; // studentBasic | seniorBasic | none
  rentalProps?: number;
  includeState?: boolean;
  extraStates?: number; // beyond first state
  w2Count?: number; // total
  form1099Count?: number;
  includeStocks?: boolean;
  includeAuditProtection?: boolean;
  // immigration (multi-select counts/booleans)
  immigrationSelected?: string[]; // list of keys (consultation, familyPetition, etc except translations & packageAssistance included as keys too)
  translationsCount?: number;
  copiesCount?: number;
  expedited?: boolean;
  // notary
  notaryDocs?: number;
  travelMiles?: number;
  includeTravel?: boolean;
}

export interface BreakdownItem { label: string; amount: number; category: 'tax' | 'notary' | 'immigration'; }

export function calculateEstimate(inputs: EstimateInputs = {}) {
  const s: Required<EstimateInputs> = {
    taxBase: 'basic1040',
    specialCategory: 'none',
    rentalProps: 0,
    includeState: false,
    extraStates: 0,
    w2Count: 2,
    form1099Count: 0,
    includeStocks: false,
    includeAuditProtection: false,
    immigrationSelected: [],
    translationsCount: 0,
    copiesCount: 0,
    expedited: false,
    notaryDocs: 0,
    travelMiles: 0,
    includeTravel: false,
    ...inputs,
  } as any;

  let total = 0;
  const breakdown: BreakdownItem[] = [];

  // TAX CALC
  const specialMap: Record<string, number | undefined> = {
    studentBasic: PRICING.tax.studentBasic,
    seniorBasic: PRICING.tax.seniorBasic,
  };
  if (s.specialCategory !== 'none' && specialMap[s.specialCategory]) {
    const price = specialMap[s.specialCategory]!;
    total += price;
    breakdown.push({ label: s.specialCategory, amount: price, category: 'tax' });
  } else {
    const baseKey = s.taxBase as keyof typeof PRICING.tax;
    const basePrice = (PRICING.tax as any)[baseKey] ?? PRICING.tax.basic1040;
    total += basePrice;
    breakdown.push({ label: baseKey, amount: basePrice, category: 'tax' });
  }
  if (s.rentalProps > 0) {
    const amt = s.rentalProps * PRICING.tax.rentalProperty;
    total += amt;
    breakdown.push({ label: `rental x${s.rentalProps}`, amount: amt, category: 'tax' });
  }
  if (s.includeState) {
    total += PRICING.tax.stateReturn;
    breakdown.push({ label: 'state return', amount: PRICING.tax.stateReturn, category: 'tax' });
  }
  if (s.extraStates > 0) {
    const amt = s.extraStates * PRICING.tax.addons.multiState;
    total += amt;
    breakdown.push({ label: `extra states x${s.extraStates}`, amount: amt, category: 'tax' });
  }
  if (s.w2Count > 2) {
    const extra = (s.w2Count - 2) * PRICING.tax.addons.extraW2;
    total += extra;
    breakdown.push({ label: `extra W-2 x${s.w2Count - 2}`, amount: extra, category: 'tax' });
  }
  if (s.form1099Count > 0) {
  const amt = PRICING.tax.addons["1099First"] + Math.max(0, s.form1099Count - 1) * PRICING.tax.addons["1099Additional"];
    total += amt;
    breakdown.push({ label: `1099 forms x${s.form1099Count}`, amount: amt, category: 'tax' });
  }
  if (s.includeStocks) {
    total += PRICING.tax.addons.stocks;
    breakdown.push({ label: 'stocks', amount: PRICING.tax.addons.stocks, category: 'tax' });
  }
  if (s.includeAuditProtection) {
    total += PRICING.tax.addons.auditProtection;
    breakdown.push({ label: 'audit protection', amount: PRICING.tax.addons.auditProtection, category: 'tax' });
  }

  // NOTARY CALC
  if (s.notaryDocs > 0) {
    const base = PRICING.notary.firstNotarization;
    const additional = Math.max(0, s.notaryDocs - 1) * PRICING.notary.additionalDoc;
    const nt = base + additional;
    total += nt;
    breakdown.push({ label: `notary docs x${s.notaryDocs}`, amount: nt, category: 'notary' });
    if (s.includeTravel && s.travelMiles > 0) {
      const travel = computeTravelFee(s.travelMiles);
      total += travel;
      breakdown.push({ label: `travel ${s.travelMiles}mi`, amount: travel, category: 'notary' });
    }
  }

  // IMMIGRATION CALC
  if (s.immigrationSelected.length) {
    s.immigrationSelected.forEach(key => {
      const base = (PRICING.immigration as any)[key];
      if (typeof base === 'number') {
        total += base;
        breakdown.push({ label: key, amount: base, category: 'immigration' });
      }
    });
    if (s.translationsCount > 0) {
      const amt = s.translationsCount * PRICING.immigration.documentTranslation;
      total += amt;
      breakdown.push({ label: `translations x${s.translationsCount}`, amount: amt, category: 'immigration' });
    }
    if (s.copiesCount > 0) {
      const amt = s.copiesCount * PRICING.immigration.addons.extraCopies;
      total += amt;
      breakdown.push({ label: `extra copies x${s.copiesCount}`, amount: amt, category: 'immigration' });
    }
    if (s.expedited) {
      total += PRICING.immigration.addons.expedited;
      breakdown.push({ label: 'expedited', amount: PRICING.immigration.addons.expedited, category: 'immigration' });
    }
  }

  return { total, breakdown };
}

export default function PricingCalculator({ initialLang = "en" }: { initialLang?: "en" | "es" }) {
  const [lang, setLang] = useState(initialLang);
  const t = T[lang];
  const [selectedService, setSelectedService] = useState<'tax' | 'notary' | 'immigration' | 'real_estate'>('tax');
  // tax state
  const [taxBase, setTaxBase] = useState('basic1040');
  const [specialCategory, setSpecialCategory] = useState<'none' | 'studentBasic' | 'seniorBasic'>('none');
  const [rentalProps, setRentalProps] = useState(0);
  const [includeState, setIncludeState] = useState(false);
  const [extraStates, setExtraStates] = useState(0);
  const [w2Count, setW2Count] = useState(2);
  const [form1099Count, setForm1099Count] = useState(0);
  const [includeStocks, setIncludeStocks] = useState(false);
  const [includeAuditProtection, setIncludeAuditProtection] = useState(false);
  // immigration
  const [immigrationSelected, setImmigrationSelected] = useState<string[]>([]);
  const [translationsCount, setTranslationsCount] = useState(0);
  const [copiesCount, setCopiesCount] = useState(0);
  const [expedited, setExpedited] = useState(false);
  // notary
  const [notaryDocs, setNotaryDocs] = useState(0);
  const [includeTravel, setIncludeTravel] = useState(false);
  const [travelMiles, setTravelMiles] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const result = useMemo(() => calculateEstimate({
    taxBase,
    specialCategory,
    rentalProps,
    includeState,
    extraStates,
    w2Count,
    form1099Count,
    includeStocks,
    includeAuditProtection,
    immigrationSelected,
    translationsCount,
    copiesCount,
    expedited,
    notaryDocs,
    includeTravel,
    travelMiles,
  }), [taxBase, specialCategory, rentalProps, includeState, extraStates, w2Count, form1099Count, includeStocks, includeAuditProtection, immigrationSelected, translationsCount, copiesCount, expedited, notaryDocs, includeTravel, travelMiles]);

  const filteredBreakdown = result.breakdown.filter(b => b.category === selectedService);
  const filteredTotal = filteredBreakdown.reduce((acc, b) => acc + b.amount, 0);

  const toggleImmigration = (key: string) => {
    setImmigrationSelected(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  const reset = () => {
    setTaxBase('basic1040');
    setSpecialCategory('none');
    setRentalProps(0);
    setIncludeState(false);
    setExtraStates(0);
    setW2Count(2);
    setForm1099Count(0);
    setIncludeStocks(false);
    setIncludeAuditProtection(false);
    setImmigrationSelected([]);
    setTranslationsCount(0);
    setCopiesCount(0);
    setExpedited(false);
    setNotaryDocs(0);
    setIncludeTravel(false);
    setTravelMiles(0);
    setShowBreakdown(false);
  };

  const copyEstimate = async () => {
    const text = `${t.estimate}: $${filteredTotal}\n\n${filteredBreakdown.map(b=>`${b.label}: $${b.amount}`).join('\n')}`;
    try { await navigator.clipboard.writeText(text); alert(t.estimateCopied); } catch { alert(t.copyFail); }
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
      {selectedService === 'tax' && (
        <div className="mb-10 space-y-8">
          <h2 className="text-lg font-semibold mb-2">{t.tax}</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="space-y-5 lg:col-span-2">
              <fieldset className="p-4 rounded-xl border bg-white/60 backdrop-blur">
                <legend className="text-sm font-semibold mb-3">{t.baseReturn}</legend>
                <div className="grid sm:grid-cols-2 gap-3">
                  {([
                    ['basic1040', t.basic1040, PRICING.tax.basic1040],
                    ['1040Dependents', t.withDependents, PRICING.tax["1040Dependents"]],
                    ['itemized', t.itemized, PRICING.tax.itemized],
                    ['selfEmployment', t.selfEmployment, PRICING.tax.selfEmployment],
                  ] as const).map(([key,label,price]) => (
                    <button key={key} onClick={()=>setTaxBase(key)} className={`text-left px-4 py-3 rounded-lg border transition shadow-sm hover:border-blue-400 ${taxBase===key && specialCategory==='none' ? 'border-blue-500 ring-1 ring-blue-300 bg-blue-50' : 'border-slate-200 bg-white'}`}> 
                      <span className="block font-medium text-sm">{label}</span>
                      <span className="text-xs text-slate-500">${price}</span>
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-slate-500">Selecting a special pricing option below will override this base.</p>
              </fieldset>
              <fieldset className="p-4 rounded-xl border bg-white/60 backdrop-blur">
                <legend className="text-sm font-semibold mb-3">{t.specialCategory}</legend>
                <div className="flex flex-wrap gap-3">
                  {(['none','studentBasic','seniorBasic'] as const).map(opt => (
                    <button key={opt} onClick={()=>setSpecialCategory(opt)} className={`px-4 py-2 rounded-full text-sm border transition ${specialCategory===opt ? 'bg-emerald-600 text-white border-emerald-600 shadow' : 'bg-white border-slate-200 hover:border-emerald-400'}`}>{t[opt as keyof typeof t] || 'None'}</button>
                  ))}
                </div>
              </fieldset>
              <div className="grid md:grid-cols-2 gap-5">
                <NumberInput label={t.rentalProps} value={rentalProps} setValue={setRentalProps} />
                <div className="space-y-3 p-4 rounded-xl border bg-white/60">
                  <ToggleRow label={t.stateIncluded} checked={includeState} onChange={setIncludeState} />
                  <NumberInput label={t.extraStates} value={extraStates} setValue={setExtraStates} min={0} />
                </div>
                <div className="space-y-3 p-4 rounded-xl border bg-white/60">
                  <NumberInput label={t.w2Count} value={w2Count} setValue={setW2Count} min={0} />
                  <NumberInput label={t.form1099Count} value={form1099Count} setValue={setForm1099Count} min={0} />
                </div>
                <div className="space-y-3 p-4 rounded-xl border bg-white/60">
                  <ToggleRow label={t.stocks} checked={includeStocks} onChange={setIncludeStocks} />
                  <ToggleRow label={t.auditProtection} checked={includeAuditProtection} onChange={setIncludeAuditProtection} />
                </div>
              </div>
            </div>
            <aside className="p-4 border rounded-xl bg-gradient-to-br from-slate-50 to-white space-y-3 h-fit">
              <h3 className="text-sm font-semibold">Reference</h3>
              <ul className="text-xs space-y-1 text-slate-600">
                <li>First 2 W-2s included.</li>
                <li>1099 pricing: first $25, others $10.</li>
                <li>Multi-state beyond first: ${PRICING.tax.addons.multiState} ea.</li>
                <li>Rental property: ${PRICING.tax.rentalProperty} each.</li>
                <li>Audit protection optional.</li>
              </ul>
            </aside>
          </div>
        </div>
      )}

      {/* NOTARY */}
      {selectedService === 'notary' && (
        <div className="mb-10 space-y-6">
          <h2 className="text-lg font-semibold mb-2">{t.notary}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <NumberInput label={t.notaryCount} value={notaryDocs} setValue={setNotaryDocs} min={0} />
            <div className="p-4 rounded-xl border bg-white/60 space-y-3">
              <ToggleRow label={t.includeTravel} checked={includeTravel} onChange={setIncludeTravel} />
              {includeTravel && (
                <NumberInput label={t.travelMiles} value={travelMiles} setValue={setTravelMiles} min={0} />
              )}
              <p className="text-[11px] text-slate-500">First doc ${PRICING.notary.firstNotarization}, additional ${PRICING.notary.additionalDoc}. Travel assumption applied.</p>
            </div>
          </div>
        </div>
      )}

      {/* IMMIGRATION */}
      {selectedService === 'immigration' && (
        <div className="mb-12 space-y-8">
          <h2 className="text-lg font-semibold">{t.immigrationServices}</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="space-y-5 lg:col-span-2">
              <div className="grid sm:grid-cols-2 gap-3">
                {(['consultation','familyPetition','greenCard','citizenship','workPermit','fianceVisa','packageAssistance'] as const).map(key => (
                  <button key={key} onClick={()=>toggleImmigration(key)} className={`text-left px-4 py-3 rounded-lg border transition shadow-sm hover:border-emerald-400 ${immigrationSelected.includes(key) ? 'border-emerald-500 ring-1 ring-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'}`}>
                    <span className="block font-medium text-sm">{t[key as keyof typeof t]}</span>
                    <span className="text-xs text-slate-500">${(PRICING.immigration as any)[key]}</span>
                  </button>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <NumberInput label={t.translationsCount} value={translationsCount} setValue={setTranslationsCount} min={0} />
                <NumberInput label={t.copiesCount} value={copiesCount} setValue={setCopiesCount} min={0} />
                <div className="p-4 rounded-xl border bg-white/60">
                  <ToggleRow label={t.expedited} checked={expedited} onChange={setExpedited} />
                  <p className="mt-2 text-[11px] text-slate-500">Translations @ ${PRICING.immigration.documentTranslation} each. Copies @ ${PRICING.immigration.addons.extraCopies} each.</p>
                </div>
              </div>
            </div>
            <aside className="p-4 border rounded-xl bg-gradient-to-br from-emerald-50 to-white space-y-2 h-fit">
              <h3 className="text-sm font-semibold">Notes</h3>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>Multi-select packages allowed.</li>
                <li>Package assistance is an advanced bundle.</li>
                <li>Government fees not included.</li>
              </ul>
            </aside>
          </div>
        </div>
      )}

      {/* REAL ESTATE */}
      {selectedService === 'real_estate' && (
        <div className="mb-10 space-y-4">
          <h2 className="text-lg font-semibold mb-2">{t.realEstate}</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border bg-white/70 backdrop-blur">
              <h3 className="font-medium text-sm mb-2">Overview</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>{t.buyerRep}</li>
                <li>{t.sellerRep}</li>
                <li>{t.landlordFee}</li>
                <li>{t.drInvestment}</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl border bg-gradient-to-br from-sky-50 to-white text-xs text-slate-600">
              Strategy & representation pricing are tailored post consultation for transparency & alignment with market dynamics.
            </div>
          </div>
        </div>
      )}

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

// Small reusable components
function NumberInput({ label, value, setValue, min = 0 }: { label: string; value: number; setValue: (n: number) => void; min?: number }) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium p-4 rounded-xl border bg-white/60">
      <span className="text-slate-600 text-xs uppercase tracking-wide font-semibold">{label}</span>
      <input type="number" min={min} value={value} onChange={e=>setValue(Number(e.target.value))} className="p-2 border rounded-md bg-white/80" />
    </label>
  );
}
function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (b: boolean)=>void }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" checked={checked} onChange={e=>onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}
