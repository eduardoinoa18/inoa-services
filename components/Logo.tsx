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
      {/* Globe latitude / longitude simplified */}
      <path d="M36 100c20 10 92 18 116 0M60 60c10 14 10 70 0 88M124 60c10 14 10 70 0 88M46 128c28 12 72 12 100 0" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.85" />
      {/* Leaf overlay bottom right */}
      <path d="M72 150c26-4 44-10 62-26 10-9 18-20 26-32-2 24-12 44-30 58-18 14-38 18-58 16" fill={TEAL_DARK} />
      <path d="M72 150c18-2 36-8 54-22" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* House (roof + posts) */}
      <path d="M92 52l60 56h-24v52H56v-52H32l60-56Z" fill={NAVY} />
      {/* Inner white body (leave roof/navy edges) */}
      <path d="M92 80l36 32v40H56v-40l36-32Z" fill="#ffffff" />
      {/* 4-pane window */}
      <g fill={NAVY}>
        <rect x="86" y="108" width="12" height="12" />
        <rect x="106" y="108" width="12" height="12" />
        <rect x="86" y="128" width="12" height="12" />
        <rect x="106" y="128" width="12" height="12" />
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
