import type { Metadata } from "next";
import type { ReactNode } from "react";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "Inoa Services — Taxes, Real Estate, Notary",
    template: "%s | Inoa Services",
  },
  description:
    "Your trusted partner for Tax Preparation, Real Estate, Notary Services, and Dominican Republic investment referrals.",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "Inoa Services — Taxes, Real Estate, Notary",
    description:
      "Expert Tax Solutions, Real Estate services, Notary Public, and DR investment referrals.",
    type: "website",
    url: "/",
    images: [
      { url: "/logo.svg", width: 1200, height: 630, alt: "Inoa Services" },
    ],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans text-gray-900 bg-white">
        <Providers>
          {children}
        </Providers>
        <Analytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(){
              function track(name){ try{ window.va && window.va.track && window.va.track(name); }catch(e){} }
              window.addEventListener('convert:whatsapp', function(){ track('whatsapp_click'); });
              window.addEventListener('convert:contact', function(){ track('contact_submit'); });
            })();
          `,
          }}
        />
      </body>
    </html>
  );
}
