import PayButtons from "@/components/PayButtons";

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Immigration Services</h1>
      <p className="text-gray-600 mb-6">Immigration Form Preparer — accurate forms, guidance, and support. (Not a law firm.)</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Pricing</h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>Form preparation: Starting at $149</li>
        <li>Package bundles: Custom quote</li>
      </ul>
      <div className="mt-6"><PayButtons /></div>
      <h2 className="text-xl font-semibold mt-10 mb-2">FAQ</h2>
      <p className="text-gray-700">We prepare and organize forms, help you avoid common mistakes, and keep you informed.</p>
    </main>
  );
}
