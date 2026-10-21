import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { businessData } from "@/data/business";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: "#0A0B0D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: `${businessData.name} | Soluciones Digitales & Software para Negocios`,
  description:
    "Desarrollo plataformas comerciales, catálogos interactivos y software a medida para comercios, talleres y pymes que buscan digitalizar sus ventas y ordenar su operación.",
  keywords: [
    "Desarrollo de software",
    "Plataformas comerciales",
    "Catálogos digitales",
    "Presupuestos a medida",
    "Valentín Sznitowski",
    "Aplicaciones web",
    "Next.js",
    "Soluciones digitales para pymes",
  ],
  authors: [{ name: businessData.name }],
  creator: businessData.name,
  metadataBase: new URL(businessData.urls.portfolio),
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: businessData.urls.portfolio,
    title: `${businessData.name} | Soluciones Digitales & Software para Negocios`,
    description:
      "Plataformas comerciales, catálogos a medida y herramientas de gestión pensadas para negocios reales.",
    siteName: `${businessData.name} · Soluciones Digitales`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${businessData.name} | Soluciones Digitales & Software para Negocios`,
    description:
      "Plataformas comerciales, catálogos a medida y herramientas de gestión pensadas para negocios reales.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${plusJakarta.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-[100dvh] flex flex-col bg-[#0A0B0D] text-[#F3F4F6] selection:bg-[#D97706] selection:text-[#0A0B0D]">
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
