// Allow RealScout web components without TypeScript errors
declare namespace JSX {
  interface IntrinsicElements {
    'realscout-simple-search': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { 'partner-key'?: string; market?: string };
    'realscout-your-listings': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { 'partner-key'?: string; market?: string };
    'realscout-home-value': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { 'partner-key'?: string; market?: string };
  }
}
