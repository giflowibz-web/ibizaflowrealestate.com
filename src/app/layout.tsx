import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { LangProvider } from "@/lib/i18n";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ibiza Flow Real Estate | Propiedades de Lujo en Ibiza",
  description: "Propiedades exclusivas en Ibiza. Villas de lujo, apartamentos premium y fincas en la isla mas deseada del Mediterraneo.",
  other: {
    "google": "notranslate",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" translate="no" className="notranslate">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="a6bda00f-9d85-4858-8c8d-a58f8ab1c935"
        />
        <LangProvider>
          {children}
          <VisualEditsMessenger />
        </LangProvider>
      </body>
    </html>
  );
}
