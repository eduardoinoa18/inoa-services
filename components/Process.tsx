export default function Process() {
  const steps = [
    { title: "Contact & Schedule", text: "Reach out by form, phone, or WhatsApp to schedule a quick intro." },
    { title: "Review & Advise", text: "We go over your goals and details, then advise the best path." },
    { title: "We Execute", text: "We prepare, file, and deliver the service — keeping you updated." },
  ];
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="rounded-xl border border-gray-100 bg-gray-50 p-6 shadow-sm hover:shadow transition"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="mx-auto mb-3 h-10 w-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                {i + 1}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{s.title}</h3>
              <p className="text-gray-600 mt-1">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
