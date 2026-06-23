import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { company, siteUrl } from "@/lib/content";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} | Empowering Growth & Building Legacy`,
    template: `%s | ${company.name}`,
  },
  description:
    "Royal Wealth Heritage LLC — Texas-registered financial consulting and RWH Life Skills & Learning Academy. Empowering growth, building independence, creating opportunity.",
  keywords: [
    "Royal Wealth Heritage",
    "financial consulting Texas",
    "life skills academy",
    "special education support",
    "autism learning support",
    "Helena Puati",
  ],
  authors: [{ name: company.name }],
  openGraph: {
    title: company.name,
    description: company.tagline,
    type: "website",
    locale: "en_US",
    siteName: company.name,
  },
  twitter: {
    card: "summary_large_image",
    title: company.name,
    description: company.tagline,
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
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} h-full scroll-smooth`}>
      <body className="marble-bg flex min-h-full flex-col font-sans antialiased">
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
