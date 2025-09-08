import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative bg-gray-950 text-gray-300 pt-24 pb-10 px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.4] bg-[radial-gradient(circle_at_15%_20%,rgba(13,110,253,0.25),transparent_60%),radial-gradient(circle_at_85%_70%,rgba(25,135,84,0.25),transparent_65%)]" />
      <div className="max-w-6xl mx-auto relative grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="mb-6">
            <Logo size={80} withText tagline variant="footer" />
          </div>
          <p className="text-sm text-gray-400 leading-relaxed max-w-md">
            Integrated support across Tax Preparation, Real Estate guidance, Notary Public, Immigration form preparation, and DR investment referrals—delivered with precision and integrity.
          </p>
          <div className="mt-6 flex gap-4 text-xs text-gray-500">
            <span className="px-3 py-1 rounded-full border border-gray-700/60 bg-gray-800/50">Accuracy</span>
            <span className="px-3 py-1 rounded-full border border-gray-700/60 bg-gray-800/50">Confidentiality</span>
            <span className="px-3 py-1 rounded-full border border-gray-700/60 bg-gray-800/50">Support</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Connect</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="https://wa.me/19783909619" target="_blank" className="hover:text-white inline-flex items-center gap-2">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.51 14.94L2 22l5.2-1.37A9.9 9.9 0 1 0 12.04 2Zm5.84 14.25c-.24.68-1.4 1.3-1.93 1.34-.49.04-1.1.06-1.78-.11-.41-.1-.94-.31-1.63-.61-2.87-1.24-4.74-4.14-4.89-4.33-.14-.19-1.17-1.55-1.17-2.96 0-1.4.74-2.08 1-2.36.24-.27.53-.34.7-.34.17 0 .35 0 .5.01.16.01.38-.06.6.46.24.57.82 1.98.89 2.13.07.15.12.32.02.51-.1.2-.15.32-.3.49-.15.17-.31.38-.44.52-.15.15-.3.31-.13.6.17.3.77 1.27 1.64 2.06 1.13 1.03 2.07 1.36 2.38 1.52.31.15.49.13.67-.08.18-.2.77-.9.98-1.21.21-.31.41-.26.68-.15.27.11 1.72.81 2.02.96.3.15.5.22.57.34.07.13.07.75-.17 1.43Z" /></svg>
              WhatsApp
            </a></li>
            <li><a href="https://instagram.com/eduardoinoa_" target="_blank" className="hover:text-white">@eduardoinoa_</a></li>
            <li><a href="https://instagram.com/inoaservices_" target="_blank" className="hover:text-white">@inoaservices_</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Navigate</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#services" className="hover:text-white">Services</a></li>
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
             <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
          </ul>
        </div>
      </div>
      <div className="relative mt-14 pt-6 border-t border-gray-800/70 text-center text-xs text-gray-500">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between max-w-6xl mx-auto px-2">
          <span>© {new Date().getFullYear()} Inoa Services. All rights reserved.</span>
          <a href="/admin" className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-700/60 bg-gray-800/40 text-gray-300 hover:text-white hover:border-gray-600 hover:bg-gray-800/70 transition text-[11px] tracking-wide font-medium uppercase">Admin Login</a>
        </div>
      </div>
    </footer>
  );
}
