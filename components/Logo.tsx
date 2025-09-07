type LogoProps = {
  size?: number;
  withText?: boolean;
  tagline?: boolean;
  variant?: 'default' | 'footer' | 'outline';
  className?: string;
};

// Brand palette pulled from provided reference (approximate)
const NAVY = '#013866';
const TEAL = '#06B1B7';
const TEAL_DARK = '#05939A';

export default function Logo({ size = 48, withText = false, tagline = false, variant = 'default', className = '' }: LogoProps) {
  const isFooter = variant === 'footer';
  const isOutline = variant === 'outline';
  const houseFill = isFooter ? '#ffffff' : NAVY;
  const globeStroke = isFooter ? 'rgba(255,255,255,0.9)' : NAVY;
  const leafFill = isFooter ? 'rgba(255,255,255,0.85)' : TEAL;
  const leafAccent = isFooter ? 'rgba(255,255,255,0.7)' : TEAL_DARK;
  const textColor = isFooter ? 'text-white' : 'text-blue-800';
  const taglineColor = isFooter ? 'text-teal-200' : 'text-teal-600';

  const mark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Inoa Services Logo"
      className={className}
    >
      <title>Inoa Services</title>
      {/* Outer circular form (globe + leaf) */}
      <circle cx="60" cy="60" r="54" fill={isOutline ? 'none' : '#ffffff'} stroke={globeStroke} strokeWidth={isOutline ? 5 : 4} />
      {/* Globe meridians (simplified) */}
      <path d="M30 50c18 8 42 8 60 0M34 70c16 7 36 7 52 0M54 26c-8 10-8 48 0 68M66 26c8 10 8 48 0 68" stroke={globeStroke} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={isOutline ? 0.25 : 0.35} />
      {/* Leaf base (lower right) */}
      <path d="M58 96c22 0 34-10 42-24-14-2-30 2-42 12-4-6-8-10-14-14 4 12 6 26 14 26Z" fill={isOutline ? 'none' : leafFill} stroke={leafAccent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" opacity={isOutline ? 0.3 : 1} />
      {/* House / roof */}
      <path d="M38 64V52l22-20 22 20v12" fill={houseFill} stroke={isFooter ? leafAccent : TEAL_DARK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M46 64v26h28V64" fill={houseFill} stroke={globeStroke} strokeWidth={3} strokeLinejoin="round" />
      {/* Window (4 panes) */}
      <g fill={isFooter ? leafAccent : TEAL_DARK}>
        <rect x="56" y="66" width="6" height="6" rx="1" />
        <rect x="68" y="66" width="6" height="6" rx="1" />
        <rect x="56" y="78" width="6" height="6" rx="1" />
        <rect x="68" y="78" width="6" height="6" rx="1" />
      </g>
    </svg>
  );

  if (!withText) return mark;

  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex items-center gap-3">
        {mark}
        <span className={`font-semibold text-xl leading-tight ${textColor}`}>Inoa Services</span>
      </div>
      {tagline && (
        <span className={`text-sm font-medium tracking-wide ${taglineColor}`}>Simply Great Service</span>
      )}
    </div>
  );
}
