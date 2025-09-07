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
      <section className="relative py-24 px-4 bg-gradient-to-b from-gray-50 via-white to-white">
        <div className="max-w-5xl mx-auto relative">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => {
              const active = open === i;
              return (
                <div
                  key={f.q}
                  className={`rounded-2xl border transition shadow-sm ${active ? "border-blue-200 shadow-md bg-white" : "border-gray-200 bg-white/80"}`}
                >
                  <button
                    className="w-full text-left px-6 py-5 flex justify-between items-center gap-6"
                    onClick={() => setOpen(active ? null : i)}
                  >
                    <span className="font-semibold text-gray-800 leading-snug">{f.q}</span>
                    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold transition ${active ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>
                      {active ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                        {f.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
}
