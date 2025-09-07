export default function Badges() {
  const items = [
    { label: "REALTOR®", color: "bg-blue-50 text-blue-700" },
    { label: "Senior Tax Specialist", color: "bg-green-50 text-green-700" },
    { label: "Notary Public (MA)", color: "bg-yellow-50 text-yellow-800" },
    { label: "Immigration Form Preparer", color: "bg-purple-50 text-purple-700" },
  ];
  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-3 justify-center">
        {items.map((b) => (
          <span key={b.label} className={`px-4 py-2 rounded-full text-sm font-semibold border ${b.color} border-current`}>
            {b.label}
          </span>
        ))}
      </div>
    </section>
  );
}
