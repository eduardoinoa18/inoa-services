export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-6">
      <p>&copy; {new Date().getFullYear()} Inoa Services. All rights reserved.</p>
      <p className="mt-2">Follow us on Instagram: 
        <a href="https://instagram.com/eduardoinoa_" className="text-yellow-400 mx-1" target="_blank" rel="noreferrer">@eduardoinoa_</a>
        &amp;
        <a href="https://instagram.com/inoaservices_" className="text-yellow-400 mx-1" target="_blank" rel="noreferrer">@inoaservices_</a>
      </p>
      <div className="mt-1">
        <a href="#" className="mx-2 hover:text-yellow-400">Home</a>|
        <a href="#services" className="mx-2 hover:text-yellow-400">Services</a>|
        <a href="#" className="mx-2 hover:text-yellow-400">Privacy Policy</a>
      </div>
    </footer>
  );
}
