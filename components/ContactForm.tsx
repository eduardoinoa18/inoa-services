"use client";

import { useState } from "react";
import Toast from "./Toast";

export default function ContactForm() {
  const [status, setStatus] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  setStatus("Sending...");
  setBusy(true);
    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        service: formData.get("service"),
        message: formData.get("message"),
      }),
    });
    if (res.ok) {
      setStatus("Message sent successfully!");
      setToast({ message: "Thanks! We’ll be in touch shortly.", type: "success" });
      (e.target as HTMLFormElement).reset();
  try { window?.dispatchEvent(new Event("convert:contact")); } catch {}
    } else {
      setStatus("Failed to send message.");
      setToast({ message: "Oops, something went wrong.", type: "error" });
    }
    setBusy(false);
  };

  return (
    <section id="contact" className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
        <p className="text-gray-600">Fill out the form and we’ll get back to you shortly.</p>
      </div>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto grid gap-4">
        <input name="name" placeholder="Full Name" required className="border p-3 rounded-lg w-full" />
        <input name="email" type="email" placeholder="Email" required className="border p-3 rounded-lg w-full" />
        <input name="phone" placeholder="Phone" className="border p-3 rounded-lg w-full" />
        <select name="service" required className="border p-3 rounded-lg w-full bg-white">
          <option value="">Select a Service of Interest</option>
          <option value="Tax Preparation">Tax Preparation</option>
          <option value="Real Estate Services">Real Estate Services</option>
          <option value="Notary Services">Notary Services</option>
          <option value="DR Investment Referrals">DR Investment Referrals</option>
          <option value="Immigration Services">Immigration Services</option>
        </select>
  <textarea name="message" placeholder="Your Message" required className="border p-3 rounded-lg w-full" rows={5} />
        <button disabled={busy} className={`bg-blue-600 text-white py-3 rounded-lg transition ${busy ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"}`}>
          {busy ? "Sending..." : "Send Message"}
        </button>
        {status && <p className="text-center text-gray-700 mt-2">{status}</p>}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </form>
    </section>
  );
}
