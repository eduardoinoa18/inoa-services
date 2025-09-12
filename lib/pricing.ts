export const PRICING = {
  tax: {
    basic1040: 150,
    "1040Dependents": 180,
    itemized: 220,
    selfEmploymentBase: 250,
    scheduleCAdditional: 50,
    rentalProperty: 50,
    stateReturn: 35,
    studentBasic: 100,
    seniorBasic: 120,
    addons: {
      extraW2: 20,
      "1099First": 30,
      "1099Additional": 15,
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
    documentTranslation: 65,
    packageAssistance: 850,
    addons: { expedited: 150, extraCopies: 40 },
  },
  notary: { firstNotarization: 25, additionalDoc: 10, travelPerMile: 2, travelExtraMile: 1 },
  realEstate: { buyer: "After Consultation", seller: "After Consultation", landlordService: "1 Month’s Rent", drInvestment: "After Consultation" },
} as const;

type Category = keyof typeof PRICING;

export type EstimateInput = {
  category: Category;
  items?: string[];
  addons?: string[];
  quantities?: Record<string, number>;
};

export function calculateEstimate(input: EstimateInput): number {
  const { category, items = [], addons = [], quantities = {} } = input;
  const catalog: any = PRICING[category];
  let total = 0;
  const add = (key: string) => {
    const q = quantities[key] ?? 1;
    const v = catalog[key];
    if (typeof v === "number") total += v * Math.max(1, q);
  };
  for (const k of items) add(k);
  const addAddOn = (key: string) => {
    const q = quantities[key] ?? 1;
    const v = catalog.addons?.[key];
    if (typeof v === "number") total += v * Math.max(1, q);
  };
  for (const k of addons) addAddOn(k);
  return Math.max(0, Math.round(total));
}
