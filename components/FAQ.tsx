"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What documents do I need for tax preparation?",
    a: "W-2s/1099s, prior return, ID, dependents' info, and any relevant deductions (mortgage statements, tuition, etc.).",
  },
  {
    q: "Do you offer virtual/remote services?",
    a: "Yes. Secure, remote tax prep and consultations are available by phone or video.",
  },
  {
    q: "Can you help with immigration forms?",
    a: "Yes. Immigration Form Preparer services to ensure accurate, timely submissions.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="max-w-5xl mx-auto px-4 py-16" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-3xl font-bold text-gray-800 text-center mb-8">Frequently Asked Questions</h2>
      <div className="divide-y rounded-xl bg-white shadow border border-gray-100 overflow-hidden">
        {faqs.map((item, i) => (
          <div key={i}>
            <button
              className="w-full text-left px-5 py-4 flex justify-between items-center hover:bg-gray-50"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className="font-semibold text-gray-800">{item.q}</span>
              <span className="ml-4 text-gray-500">{open === i ? "−" : "+"}</span>
            </button>
            <div className={`px-5 transition-all ${open === i ? "max-h-40 py-2" : "max-h-0 overflow-hidden"}`}>
              <p className="text-gray-600">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
