import Image from "next/image";
import TeamGrid from "@/components/TeamGrid";
import { team } from "@/lib/team-data";
import fs from "node:fs";
import path from "node:path";

export default function AboutPage() {
  // Discover any images placed under /public/images/about
  let gallery: string[] = [];
  try {
    const dir = path.join(process.cwd(), "public", "images", "about");
    const files = fs.readdirSync(dir);
    gallery = files
      .filter((f) => /\.(png|jpe?g|webp|gif|svg)$/i.test(f))
      .slice(0, 12)
      .map((f) => `/images/about/${f}`);
  } catch {}
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-white to-gray-50">
      {/* Breadcrumbs / Back to home */}
      <nav className="max-w-6xl mx-auto px-4 pt-24 text-sm" aria-label="Breadcrumb">
        <a href="/" className="text-gray-500 hover:text-gray-800">← Back to Home</a>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-4 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">About Inoa Services</h1>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl">Bilingual, detail‑oriented support across Tax Preparation, Immigration document assistance (non‑legal), Notary Public, Real Estate advisory, and curated Dominican Republic investments. Built on accuracy, clarity, and trust.</p>
      </section>

  {/* Mission + Founder */}
      <section className="max-w-6xl mx-auto px-4 pb-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">We bring structure and peace of mind to essential services with clear communication and precise execution. Our approach removes confusion, sets expectations, and delivers timely results with integrity.</p>
          <div className="mt-6 grid gap-3">
            <div className="flex items-center gap-3 text-sm text-gray-700"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Transparent, no‑surprise pricing</div>
            <div className="flex items-center gap-3 text-sm text-gray-700"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Clear timelines and documentation checklists</div>
            <div className="flex items-center gap-3 text-sm text-gray-700"><span className="w-2 h-2 rounded-full bg-emerald-500" /> English / Spanish bilingual service</div>
          </div>

          <div className="mt-8 flex gap-3">
            <a href="/#contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium">Let’s connect</a>
            <a href="/pricing" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium">View Pricing</a>
          </div>
        </div>
        <div className="relative aspect-[4/4] w-full max-w-sm mx-auto">
          <Image src="/images/founder.png" alt="Eduardo Inoa" fill className="rounded-2xl object-cover border" />
        </div>
      </section>

      {/* Photo gallery (easy to extend) */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Photos</h2>
        <p className="text-gray-600 text-sm mb-6">Add your real images under <code className="px-1 py-0.5 rounded bg-gray-100 border">/public/images/about/</code>. The gallery below will display them automatically.</p>
        {gallery.length === 0 ? (
          <div className="rounded-xl border p-6 bg-white text-sm text-gray-600">No photos yet. Drop images into <code className="px-1 py-0.5 rounded bg-gray-100 border">public/images/about</code> and redeploy.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((src) => (
              <div key={src} className="relative aspect-[4/3] rounded-xl overflow-hidden border bg-white">
                <Image src={src} alt="About photo" fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Meet the Team */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Meet the Team</h2>
        <p className="text-gray-600 mb-6">As we grow, we’ll introduce the team here. Start by replacing the founder photo and adding new members in <code className="px-1 py-0.5 rounded bg-gray-100 border">lib/team-data.ts</code>.</p>
        <TeamGrid members={team} />
      </section>

      {/* Founder card */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="rounded-2xl border bg-white p-6 md:p-8 grid md:grid-cols-[auto,1fr] gap-6 items-center">
          <div className="relative w-28 h-28">
            <Image src="/images/founder.jpg" alt="Eduardo Inoa portrait" fill className="rounded-xl object-cover border" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Eduardo Inoa</h3>
            <p className="text-sm text-gray-500 mt-0.5">Founder · REALTOR® · Senior Tax Specialist · Notary Public</p>
            <p className="text-gray-700 text-sm mt-3">Eduardo leads with a client‑first mindset. He focuses on making complex processes simple and actionable—through clear explanations, smart checklists, and consistent follow‑through.</p>
            <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-sm text-gray-700">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> NAR & local board member (REALTOR®)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Notary Public (MA)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Senior Tax Specialist experience</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> DR investment referral network</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="max-w-6xl mx-auto px-4 pb-28">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Why clients choose Inoa</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border bg-white p-5">
            <h3 className="font-semibold text-gray-900">Accuracy first</h3>
            <p className="text-sm text-gray-600 mt-1">We use checklists, document reviews, and clear sign‑offs to reduce errors and rework.</p>
          </div>
          <div className="rounded-2xl border bg-white p-5">
            <h3 className="font-semibold text-gray-900">Bilingual clarity</h3>
            <p className="text-sm text-gray-600 mt-1">Transparent steps and timelines—explained in English or Spanish, as you prefer.</p>
          </div>
          <div className="rounded-2xl border bg-white p-5">
            <h3 className="font-semibold text-gray-900">Practical results</h3>
            <p className="text-sm text-gray-600 mt-1">We focus on getting things done—appointments booked, forms submitted, milestones met.</p>
          </div>
        </div>

        {/* CTA strip */}
        <div className="mt-10 rounded-2xl border bg-gradient-to-r from-blue-50 to-emerald-50 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900">Ready to get started?</h3>
            <p className="text-sm text-gray-600">Tell us briefly what you need—we’ll reply with next steps.</p>
          </div>
          <div className="flex gap-3">
            <a href="/#contact" className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium">Contact us</a>
            <a href="https://wa.me/19783909619" target="_blank" className="px-4 py-2 rounded-xl border text-sm font-medium">WhatsApp</a>
          </div>
        </div>
      </section>
    </main>
  );
}
