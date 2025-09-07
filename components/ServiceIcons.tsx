import React from "react";

type IconProps = { className?: string; size?: number };

const base = (extra = "") => `stroke-current ${extra}`;

export const TaxIcon = ({ className = "", size = 40 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-label="Tax Preparation Icon">
    <rect x="6" y="8" width="36" height="28" rx="4" className={base("fill-white stroke-blue-500 drop-shadow-sm")} strokeWidth={2} />
    <path d="M12 14h12M12 20h24M12 26h16" strokeWidth={2} className={base("stroke-blue-600")} strokeLinecap="round" />
    <circle cx="34" cy="27" r="6" className="fill-emerald-500/10 stroke-emerald-600" strokeWidth={2} />
    <path d="M32.2 27.8l3.6-3.6M32.2 24.2l3.6 3.6" strokeWidth={2} className="stroke-emerald-700" strokeLinecap="round" />
  </svg>
);

export const RealEstateIcon = ({ className = "", size = 40 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-label="Real Estate Icon">
    <path d="M8 22L24 10l16 12v16a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V22Z" className="fill-gradient-to-br from-blue-500 to-emerald-600" />
    <path d="M8 22L24 10l16 12" strokeWidth={2} className={base("stroke-blue-600")} strokeLinejoin="round" />
    <path d="M18 34V24h12v10" strokeWidth={2} className={base("stroke-white")}/>
    <rect x="21" y="27" width="6" height="7" className="fill-white/70" />
  </svg>
);

export const NotaryIcon = ({ className = "", size = 40 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-label="Notary Icon">
    <circle cx="24" cy="24" r="14" className="fill-white stroke-emerald-600" strokeWidth={2} />
    <path d="M24 16v8l5 5" strokeWidth={2} className={base("stroke-blue-600")} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 24h24" strokeWidth={2} className={base("stroke-emerald-500/60")} strokeLinecap="round" />
  </svg>
);

export const DRIcon = ({ className = "", size = 40 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-label="DR Investments Icon">
    <rect x="8" y="8" width="32" height="32" rx="4" className="fill-white stroke-blue-500" strokeWidth={2} />
    <path d="M14 30c4-6 8-9 12-3 3-5 6-7 10-2" strokeWidth={2} className={base("stroke-emerald-600")} strokeLinecap="round" />
    <circle cx="20" cy="18" r="3" className="fill-blue-500" />
    <circle cx="28" cy="21" r="2" className="fill-emerald-500" />
  </svg>
);

export const ImmigrationIcon = ({ className = "", size = 40 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-label="Immigration Services Icon">
    <path d="M10 34c0-6 5-14 14-14s14 8 14 14" strokeWidth={2} className={base("stroke-blue-600")} strokeLinecap="round" />
    <circle cx="24" cy="16" r="6" className="fill-white stroke-emerald-600" strokeWidth={2} />
    <path d="M6 12l6 4M42 12l-6 4" strokeWidth={2} className={base("stroke-emerald-500/60")} strokeLinecap="round" />
  </svg>
);

export const serviceIcons: Record<string, React.ReactNode> = {
  "Tax Preparation": <TaxIcon />,
  "Real Estate Services": <RealEstateIcon />,
  "Notary Services": <NotaryIcon />,
  "DR Investment Referrals": <DRIcon />,
  "Immigration Services": <ImmigrationIcon />,
};

export default serviceIcons;