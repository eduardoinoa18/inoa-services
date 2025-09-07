"use client";

import { useEffect, useState } from "react";

const data = [
  { name: "Maria G.", text: "Fast, accurate, and super helpful with my return.", rating: 5 },
  { name: "John D.", text: "Clear guidance for my first home purchase!", rating: 5 },
  { name: "Luis R.", text: "They made the process easy. Highly recommend.", rating: 5 },
];

function Stars({ n }: { n: number }) {
  return (
    <span aria-label={`${n} star rating`} className="text-yellow-400">
      {Array.from({ length: n }).map((_, i) => ("★"))}
    </span>
  );
}

export default function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % data.length), 4000);
    return () => clearInterval(t);
  }, []);
  const item = data[i];
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">What Clients Say</h2>
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow relative">
          <div className="text-2xl absolute left-4 top-2 text-blue-200 select-none">“</div>
          <p className="text-gray-700 italic mb-4">{item.text}</p>
          <Stars n={item.rating} />
          <p className="mt-2 font-semibold text-gray-800">{item.name}</p>
          <div className="mt-6 flex gap-2 justify-center">
            {data.map((_, idx) => (
              <button
                key={idx}
                className={`h-2 w-2 rounded-full ${i === idx ? "bg-blue-600" : "bg-gray-300"}`}
                aria-label={`Go to testimonial ${idx + 1}`}
                onClick={() => setI(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
