export default function Footer() {
  return (
    <footer className="relative bg-gray-950 text-gray-300 pt-20 pb-10 px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.4] bg-[radial-gradient(circle_at_15%_20%,rgba(13,110,253,0.25),transparent_60%),radial-gradient(circle_at_85%_70%,rgba(25,135,84,0.25),transparent_65%)]" />
      <div className="max-w-6xl mx-auto relative grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h3 className="font-semibold text-white text-lg mb-4 tracking-wide">Inoa Services</h3>
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
            <li><a href="https://wa.me/19783909619" target="_blank" className="hover:text-white">WhatsApp</a></li>
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
          </ul>
        </div>
      </div>
      <div className="relative mt-14 pt-6 border-t border-gray-800/70 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Inoa Services. All rights reserved.
      </div>
    </footer>
  );
}
