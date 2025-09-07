import PayButtons from "@/components/PayButtons";

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Tax Preparation</h1>
      <p className="text-gray-600 mb-6">Reliable, accurate, and stress-free tax solutions for individuals and small businesses.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Pricing</h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>Basic Return: $149+</li>
        <li>Itemized / Self-Employed: Custom quote</li>
      </ul>
      <div className="mt-6"><PayButtons /></div>
      <h2 className="text-xl font-semibold mt-10 mb-2">FAQ</h2>
      <p className="text-gray-700">What documents do I need? W-2s/1099s, prior return, ID, dependents' info, and deductions.</p>
    </main>
  );
}
