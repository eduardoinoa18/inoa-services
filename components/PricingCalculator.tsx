"use client";
import React, { useMemo, useState } from "react";

// Revised pricing per latest user instruction
export const PRICING = {
  tax: {
    services: {
      basic1040: 150,
      withDependents: 180,
      itemized: 220,
      selfEmploymentBase: 250, // base
      selfEmploymentAdditional: 50, // per extra Schedule C
      rentalProperty: 50, // per property
      stateReturn: 35, // each additional state
    },
    special: {
      student: 100,
      senior: 120,
    },
    addons: {
      extraW2: 20, // after first 2
      '1099First': 30,
      '1099Additional': 15,
      stocks: 60,
      auditProtection: 75,
    },
  },
  immigration: {
    consultation: 75,
    familyPetition: 450,
    greenCard: 650,
    citizenship: 400,
    workPermit: 350,
    fianceVisa: 600,
    documentTranslation: 65, // per page
    packageAssistance: 850, // starting
  },
  notary: {
    first: 25,
    additional: 10,
    travelFirstRate: 2, // per mile up to 20
    travelReducedRate: 1, // per mile beyond 20
  },
  realEstate: {
    buyer: 'After Consultation',
    seller: 'After Consultation',
    landlord: 'One Month’s Rent',
    dr: 'After Consultation'
  }
} as const;

// Translations (extended for new pricing model)
const T = {
  en: {
    title: 'Service Estimate',
    languageBtn: 'Español',
    category: 'Category',
    tax: 'Tax',
    immigration: 'Immigration',
    notary: 'Notary',
    realEstate: 'Real Estate',
    // tax labels
    taxHeader: 'Tax Services',
    specialPricing: 'Special Pricing (choose one if applies)',
    student: 'Student Basic (W-2 only)',
    senior: 'Senior (65+) Basic',
    rentals: 'Rental Properties',
    scheduleCs: 'Extra Schedule C (beyond first)',
    extraStates: 'Additional State Returns',
    extraW2: 'Extra W-2 (after first 2)',
    w2Count: 'Total W-2 Forms',
    form1099Count: 'Total 1099 Forms',
    stocks: 'Stock / Investments Reporting',
    auditProtection: 'Audit Protection',
    // immigration
    immigrationHeader: 'Immigration Services',
    translations: 'Document Translations (pages)',
    // notary
    notaryHeader: 'Notary Services',
    notaryDocs: 'Documents to notarize',
    travelMiles: 'Travel miles',
    // real estate
    realEstateHeader: 'Real Estate Services (informational)',
    disclaimer: 'Final pricing will be confirmed after consultation. Additional forms or services may apply.',
    sendEstimate: 'Send Estimate Request',
    backHome: 'Back to Home',
    details: 'Details',
    hide: 'Hide',
    total: 'Estimated Total',
    copied: 'Estimate copied',
    copy: 'Copy',
    name: 'Name',
    email: 'Email',
    message: 'Message (optional)',
    sending: 'Sending...',
    success: 'Request sent',
    failed: 'Send failed',
  },
  es: {
    title: 'Estimado de Servicios',
    languageBtn: 'English',
    category: 'Categoría',
    tax: 'Impuestos',
    immigration: 'Migración',
    notary: 'Notaría',
    realEstate: 'Bienes Raíces',
    taxHeader: 'Servicios de Impuestos',
    specialPricing: 'Precio Especial (uno si aplica)',
    student: 'Estudiante (W-2)',
    senior: 'Mayor (65+)',
    rentals: 'Propiedades en alquiler',
    scheduleCs: 'Anexos C adicionales',
    extraStates: 'Estados adicionales',
    extraW2: 'W-2 extra (después de 2)',
    w2Count: 'Total formularios W-2',
    form1099Count: 'Total formularios 1099',
    stocks: 'Inversiones',
    auditProtection: 'Protección auditoría',
    immigrationHeader: 'Servicios Migratorios',
    translations: 'Traducciones (páginas)',
    notaryHeader: 'Servicios de Notaría',
    notaryDocs: 'Documentos a notarizar',
    travelMiles: 'Millas de viaje',
    realEstateHeader: 'Servicios Inmobiliarios (informativo)',
    disclaimer: 'El precio final se confirmará tras la consulta. Pueden aplicar formularios o servicios adicionales.',
    sendEstimate: 'Enviar Solicitud',
    backHome: 'Volver',
    details: 'Desglose',
    hide: 'Ocultar',
    total: 'Total Estimado',
    copied: 'Estimado copiado',
    copy: 'Copiar',
    name: 'Nombre',
    email: 'Email',
    message: 'Mensaje (opcional)',
    sending: 'Enviando...',
    success: 'Enviado',
    failed: 'Error al enviar',
  }
};

// Assumption: first 10 miles cost travelPerMile, remaining miles cost travelExtraMile
function computeTravelFee(distanceMiles = 0) {
  const miles = Math.max(0, distanceMiles);
  const firstSegment = Math.min(20, miles) * PRICING.notary.travelFirstRate;
  const secondSegment = Math.max(0, miles - 20) * PRICING.notary.travelReducedRate;
  return firstSegment + secondSegment;
}

export interface EstimateInputs {
  // tax (checkbox-driven)
  taxSelected?: string[]; // list of service keys
  taxSpecial?: 'student' | 'senior' | 'none';
  rentals?: number;
  extraScheduleC?: number; // beyond first
  extraStates?: number;
  w2Count?: number; // total w2
  form1099Count?: number;
  includeStocks?: boolean;
  includeAudit?: boolean;
  // immigration
  immigrationSelected?: string[];
  translations?: number;
  // notary
  notaryDocs?: number;
  travelMiles?: number;
}

export interface BreakdownItem { label: string; amount: number; category: 'tax' | 'notary' | 'immigration' | 'other'; }

export function calculateEstimate(inputs: EstimateInputs = {}) {
  const s: Required<EstimateInputs> = {
    taxSelected: [],
    taxSpecial: 'none',
    rentals: 0,
    extraScheduleC: 0,
    extraStates: 0,
    w2Count: 2,
    form1099Count: 0,
    includeStocks: false,
    includeAudit: false,
    immigrationSelected: [],
    translations: 0,
    notaryDocs: 0,
    travelMiles: 0,
    ...inputs,
  } as any;
  let total = 0; const breakdown: BreakdownItem[] = [];

  // TAX
  if (s.taxSpecial !== 'none') {
    const specialPrice = PRICING.tax.special[s.taxSpecial];
    total += specialPrice; breakdown.push({ label: `tax:${s.taxSpecial}`, amount: specialPrice, category: 'tax' });
  } else {
    s.taxSelected.forEach(key => {
      const map: any = PRICING.tax.services;
      if (map[key]) { total += map[key]; breakdown.push({ label: `tax:${key}`, amount: map[key], category: 'tax' }); }
    });
    if (s.extraScheduleC > 0) {
      const amt = s.extraScheduleC * PRICING.tax.services.selfEmploymentAdditional;
      total += amt; breakdown.push({ label: `extra Schedule C x${s.extraScheduleC}`, amount: amt, category: 'tax' });
    }
    if (s.rentals > 0) {
      const amt = s.rentals * PRICING.tax.services.rentalProperty;
      total += amt; breakdown.push({ label: `rental properties x${s.rentals}`, amount: amt, category: 'tax' });
    }
    if (s.extraStates > 0) {
      const amt = s.extraStates * PRICING.tax.services.stateReturn;
      total += amt; breakdown.push({ label: `extra states x${s.extraStates}`, amount: amt, category: 'tax' });
    }
    if (s.w2Count > 2) {
      const amt = (s.w2Count - 2) * PRICING.tax.addons.extraW2;
      total += amt; breakdown.push({ label: `extra W-2 x${s.w2Count - 2}`, amount: amt, category: 'tax' });
    }
    if (s.form1099Count > 0) {
      const amt = PRICING.tax.addons['1099First'] + Math.max(0, s.form1099Count - 1) * PRICING.tax.addons['1099Additional'];
      total += amt; breakdown.push({ label: `1099 forms x${s.form1099Count}`, amount: amt, category: 'tax' });
    }
    if (s.includeStocks) { total += PRICING.tax.addons.stocks; breakdown.push({ label: 'stocks', amount: PRICING.tax.addons.stocks, category: 'tax' }); }
    if (s.includeAudit) { total += PRICING.tax.addons.auditProtection; breakdown.push({ label: 'audit protection', amount: PRICING.tax.addons.auditProtection, category: 'tax' }); }
  }

  // IMMIGRATION
  s.immigrationSelected.forEach(key => {
    const val = (PRICING.immigration as any)[key];
    if (typeof val === 'number') { total += val; breakdown.push({ label: `immigration:${key}`, amount: val, category: 'immigration' }); }
  });
  if (s.translations > 0) {
    const amt = s.translations * PRICING.immigration.documentTranslation;
    total += amt; breakdown.push({ label: `translations x${s.translations}`, amount: amt, category: 'immigration' });
  }

  // NOTARY
  if (s.notaryDocs > 0) {
    const base = PRICING.notary.first;
    const add = Math.max(0, s.notaryDocs - 1) * PRICING.notary.additional;
    const amt = base + add; total += amt; breakdown.push({ label: `notary docs x${s.notaryDocs}`, amount: amt, category: 'notary' });
    if (s.travelMiles > 0) {
      const upTo = Math.min(20, s.travelMiles) * PRICING.notary.travelFirstRate;
      const beyond = Math.max(0, s.travelMiles - 20) * PRICING.notary.travelReducedRate;
      const travel = upTo + beyond; total += travel; breakdown.push({ label: `travel ${s.travelMiles}mi`, amount: travel, category: 'notary' });
    }
  }

  return { total, breakdown };
}

export default function PricingCalculator({ initialLang = "en" }: { initialLang?: "en" | "es" }) {
  const [lang, setLang] = useState(initialLang);
  const t = T[lang];
  const [category, setCategory] = useState<'tax' | 'immigration' | 'notary' | 'real_estate'>('tax');
  // tax
  const [taxSelected, setTaxSelected] = useState<string[]>([]);
  const [taxSpecial, setTaxSpecial] = useState<'student' | 'senior' | 'none'>('none');
  const [rentals, setRentals] = useState(0);
  const [extraScheduleC, setExtraScheduleC] = useState(0);
  const [extraStates, setExtraStates] = useState(0);
  const [w2Count, setW2Count] = useState(2);
  const [form1099Count, setForm1099Count] = useState(0);
  const [includeStocks, setIncludeStocks] = useState(false);
  const [includeAudit, setIncludeAudit] = useState(false);
  // immigration
  const [immigrationSelected, setImmigrationSelected] = useState<string[]>([]);
  const [translations, setTranslations] = useState(0);
  // notary
  const [notaryDocs, setNotaryDocs] = useState(0);
  const [travelMiles, setTravelMiles] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const result = useMemo(() => calculateEstimate({ taxSelected, taxSpecial, rentals, extraScheduleC, extraStates, w2Count, form1099Count, includeStocks, includeAudit, immigrationSelected, translations, notaryDocs, travelMiles }), [taxSelected, taxSpecial, rentals, extraScheduleC, extraStates, w2Count, form1099Count, includeStocks, includeAudit, immigrationSelected, translations, notaryDocs, travelMiles]);

  const filteredBreakdown = result.breakdown.filter(b => b.category === category);
  const filteredTotal = filteredBreakdown.reduce((acc, b) => acc + b.amount, 0);

  const toggle = (setter: React.Dispatch<React.SetStateAction<string[]>>, arr: string[], key: string) => {
    setter(arr.includes(key) ? arr.filter(k => k !== key) : [...arr, key]);
  };

  const reset = () => {
    setCategory('tax');
    setTaxSelected([]); setTaxSpecial('none'); setRentals(0); setExtraScheduleC(0); setExtraStates(0); setW2Count(2); setForm1099Count(0); setIncludeStocks(false); setIncludeAudit(false);
    setImmigrationSelected([]); setTranslations(0);
    setNotaryDocs(0); setTravelMiles(0);
    setShowBreakdown(false);
  };

  const copyEstimate = async () => {
    const text = `${t.total}: $${filteredTotal}\n${filteredBreakdown.map(b=>`${b.label} $${b.amount}`).join('\n')}`;
    try { await navigator.clipboard.writeText(text); alert(t.copied); } catch { alert(t.failed); }
  };

  const [sending, setSending] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendRequest = async () => {
    if (!email || !name) return;
    setSending(true);
    try {
      await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, message, service: category, estimate: filteredTotal, breakdown: filteredBreakdown }) });
      alert(t.success); reset();
    } catch { alert(t.failed); } finally { setSending(false); }
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

      {/* CATEGORY PICKER */}
      <div className="mb-8">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">{t.category}</label>
        <select value={category} onChange={e=>{ setCategory(e.target.value as any); setShowBreakdown(false); }} className="p-3 border rounded-lg bg-white shadow-sm w-full max-w-xs">
          <option value="tax">{t.tax}</option>
          <option value="immigration">{t.immigration}</option>
          <option value="notary">{t.notary}</option>
          <option value="real_estate">{t.realEstate}</option>
        </select>
      </div>

      {/* TAX */}
      {category === 'tax' && (
        <div className="mb-10 space-y-6">
          <h2 className="text-lg font-semibold">{t.taxHeader}</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid sm:grid-cols-2 gap-3">
                {([
                  ['basic1040','Basic 1040',PRICING.tax.services.basic1040],
                  ['withDependents','1040 + Dependents',PRICING.tax.services.withDependents],
                  ['itemized','Itemized (Schedule A)',PRICING.tax.services.itemized],
                  ['selfEmploymentBase','Self-Employment (Schedule C)',PRICING.tax.services.selfEmploymentBase],
                ] as const).map(([key,label,price]) => (
                  <button key={key} onClick={()=>toggle(setTaxSelected,taxSelected,key)} className={`text-left px-4 py-3 rounded-lg border text-sm transition shadow-sm hover:border-blue-400 ${taxSelected.includes(key)?'border-blue-500 ring-1 ring-blue-300 bg-blue-50':'border-slate-200 bg-white'}`}>
                    <span className="block font-medium">{label}</span>
                    <span className="text-xs text-slate-500">${price}</span>
                  </button>
                ))}
              </div>
              <fieldset className="p-4 rounded-xl border bg-white/60">
                <legend className="text-sm font-semibold mb-3">{t.specialPricing}</legend>
                <div className="flex flex-wrap gap-3">
                  {(['none','student','senior'] as const).map(opt => (
                    <button key={opt} onClick={()=>setTaxSpecial(opt)} className={`px-4 py-2 rounded-full text-sm border transition ${taxSpecial===opt?'bg-emerald-600 text-white border-emerald-600 shadow':'bg-white border-slate-200 hover:border-emerald-400'}`}>{t[opt as keyof typeof t]}</button>
                  ))}
                </div>
              </fieldset>
              {taxSpecial==='none' && (
                <div className="grid md:grid-cols-2 gap-5">
                  <NumberInput label={t.rentals} value={rentals} setValue={setRentals} />
                  <NumberInput label={t.scheduleCs} value={extraScheduleC} setValue={setExtraScheduleC} />
                  <NumberInput label={t.extraStates} value={extraStates} setValue={setExtraStates} />
                  <NumberInput label={t.w2Count} value={w2Count} setValue={setW2Count} />
                  <NumberInput label={t.form1099Count} value={form1099Count} setValue={setForm1099Count} />
                  <div className="p-4 rounded-xl border bg-white/60 space-y-3">
                    <ToggleRow label={t.stocks} checked={includeStocks} onChange={setIncludeStocks} />
                    <ToggleRow label={t.auditProtection} checked={includeAudit} onChange={setIncludeAudit} />
                  </div>
                </div>
              )}
            </div>
            <aside className="p-4 rounded-xl border bg-gradient-to-br from-slate-50 to-white text-xs space-y-1 h-fit">
              <div>Self-employment extra Schedule C: ${PRICING.tax.services.selfEmploymentAdditional} each.</div>
              <div>1099 first ${PRICING.tax.addons['1099First']}, others ${PRICING.tax.addons['1099Additional']}.</div>
              <div>Extra W-2 ${PRICING.tax.addons.extraW2} (after 2).</div>
              <div>Audit protection optional.</div>
            </aside>
          </div>
        </div>
      )}

      {/* NOTARY */}
      {category === 'notary' && (
        <div className="mb-10 space-y-6">
          <h2 className="text-lg font-semibold mb-2">{t.notaryHeader}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <NumberInput label={t.notaryDocs} value={notaryDocs} setValue={setNotaryDocs} min={0} />
            <NumberInput label={t.travelMiles} value={travelMiles} setValue={setTravelMiles} min={0} />
            <p className="text-[11px] text-slate-500 md:col-span-2">First doc ${PRICING.notary.first}. Additional ${PRICING.notary.additional}. Travel: first 20mi @ ${PRICING.notary.travelFirstRate}/mi then ${PRICING.notary.travelReducedRate}/mi.</p>
          </div>
        </div>
      )}

      {/* IMMIGRATION */}
    {category === 'immigration' && (
        <div className="mb-12 space-y-8">
      <h2 className="text-lg font-semibold">{t.immigrationHeader}</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="space-y-5 lg:col-span-2">
              <div className="grid sm:grid-cols-2 gap-3">
                {(['consultation','familyPetition','greenCard','citizenship','workPermit','fianceVisa','packageAssistance'] as const).map(key => (
                  <button key={key} onClick={()=>toggle(setImmigrationSelected,immigrationSelected,key)} className={`text-left px-4 py-3 rounded-lg border transition shadow-sm hover:border-emerald-400 ${immigrationSelected.includes(key) ? 'border-emerald-500 ring-1 ring-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'}`}>
                    <span className="block font-medium text-sm">{t[key as keyof typeof t]}</span>
                    <span className="text-xs text-slate-500">${(PRICING.immigration as any)[key]}</span>
                  </button>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <NumberInput label={t.translations} value={translations} setValue={setTranslations} />
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
  {category === 'real_estate' && (
        <div className="mb-10 space-y-4">
      <h2 className="text-lg font-semibold mb-2">{t.realEstateHeader}</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border bg-white/70 backdrop-blur">
              <h3 className="font-medium text-sm mb-2">Overview</h3>
              <ul className="text-sm text-slate-600 space-y-1">
        <li>Buyer Representation — {PRICING.realEstate.buyer}</li>
        <li>Seller Representation — {PRICING.realEstate.seller}</li>
        <li>Landlord Rental Service — {PRICING.realEstate.landlord}</li>
        <li>DR Real Estate Investment — {PRICING.realEstate.dr}</li>
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
          <button onClick={reset} className="px-5 py-2.5 bg-white border rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50">Reset</button>
          <button onClick={copyEstimate} className="px-5 py-2.5 bg-white border rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50">{t.copy}</button>
          <button onClick={() => setShowBreakdown(v=>!v)} className="px-5 py-2.5 bg-white border rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50">{showBreakdown ? t.hide : t.details}</button>
        </div>
        <div className="flex-1 bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-sm font-medium text-gray-500">{t.total}</span>
            <span className="text-3xl font-bold tracking-tight text-gray-800">${filteredTotal}</span>
          </div>
          {/* Payment buttons removed */}
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
          <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm">
            <input placeholder={t.name} value={name} onChange={e=>setName(e.target.value)} className="p-2 rounded-md border bg-white" />
            <input placeholder={t.email} value={email} onChange={e=>setEmail(e.target.value)} className="p-2 rounded-md border bg-white" />
            <input placeholder={t.message} value={message} onChange={e=>setMessage(e.target.value)} className="p-2 rounded-md border bg-white md:col-span-1" />
            <div className="md:col-span-3 flex flex-wrap gap-3 pt-2">
              <a href="/" className="px-5 py-2.5 bg-white border rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50">{t.backHome}</a>
              <button disabled={sending || !email || !name} onClick={sendRequest} className="px-5 py-2.5 bg-emerald-600 disabled:opacity-50 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium shadow">{sending ? t.sending : t.sendEstimate}</button>
              <button onClick={copyEstimate} className="px-5 py-2.5 bg-white border rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50">{t.copy}</button>
              <button onClick={()=>setShowBreakdown(v=>!v)} className="px-5 py-2.5 bg-white border rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50">{showBreakdown ? t.hide : t.details}</button>
            </div>
          </div>
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
