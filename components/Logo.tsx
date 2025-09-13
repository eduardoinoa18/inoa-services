type LogoProps = {
  size?: number;
  withText?: boolean;
  tagline?: boolean;
  variant?: 'default' | 'footer';
  className?: string;
};

// Colors based strictly on provided raster reference (approximate hex sampling)
const NAVY = '#073763';
const TEAL = '#08B4BD';
const TEAL_DARK = '#02A3AD';

export default function Logo({ size = 72, withText = false, tagline = false, variant = 'default', className = '' }: LogoProps) {
  const isFooter = variant === 'footer';
  const textColor = isFooter ? 'text-white' : 'text-[#073763]';
  const taglineColor = isFooter ? 'text-teal-300' : 'text-[#08B4BD]';

  const mark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label="Inoa Services Logo"
      className={className}
    >
      <title>Inoa Services</title>
      {/* Globe circle */}
      <circle cx="92" cy="104" r="68" fill={TEAL} />
      {/* Globe lines refined */}
      <path d="M32 104c22 12 100 18 120 0" stroke="#fff" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.9" />
      <path d="M50 72c10 16 10 76 0 96M134 72c10 16 10 76 0 96" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.9" />
      <path d="M44 134c30 12 76 12 104 0" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.85" />
      {/* Leaf overlay */}
      <path d="M70 152c26-4 48-12 66-28 10-10 18-22 24-36-2 26-12 48-30 62s-40 20-60 18" fill={TEAL_DARK} />
      <path d="M72 152c18-2 36-10 54-24" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* House mark */}
      <path d="M92 52l60 56h-24v52H56v-52H32l60-56Z" fill={NAVY} />
      <path d="M92 82l36 30v48H56v-48l36-30Z" fill="#fff" />
      {/* Window */}
      <g fill={NAVY}>
        <rect x="88" y="112" width="10" height="10" rx="1" />
        <rect x="108" y="112" width="10" height="10" rx="1" />
        <rect x="88" y="130" width="10" height="10" rx="1" />
        <rect x="108" y="130" width="10" height="10" rx="1" />
      </g>
    </svg>
  );

  if (!withText) return mark;

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-4">
        {mark}
        <div className="leading-none">
          <div className={`font-semibold tracking-tight text-2xl ${textColor}`}>Inoa Services</div>
          {tagline && (
            <div className={`mt-2 text-base font-medium tracking-wide ${taglineColor}`}>Simply Great Service</div>
          )}
        </div>
      </div>
    </div>
  );
}
