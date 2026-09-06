import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Sora, Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://tmsdigitalhub.com";
const TITLE = "TMS DigitalHub — Digital Solutions, Crafted to Perfection";
const DESCRIPTION =
  "Custom software development, cloud architecture, and IT infrastructure for government, enterprise, and scale-up teams worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | TMS DigitalHub",
  },
  description: DESCRIPTION,
  keywords: [
    "custom software development",
    "cloud solutions",
    "IT infrastructure",
    "digital transformation",
    "enterprise software",
    "cybersecurity",
    "TMS DigitalHub",
  ],
  authors: [{ name: "TMS DigitalHub" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "TMS DigitalHub",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05060a" },
    { media: "(prefers-color-scheme: light)", color: "#f6f8fc" },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TMS DigitalHub",
  url: SITE_URL,
  description: DESCRIPTION,
  email: "hello@tmsdigitalhub.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1001 S Main St STE 500",
    addressLocality: "Kalispell",
    addressRegion: "MT",
    postalCode: "59901",
    addressCountry: "US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
                  var theme = stored || (prefersLight ? 'light' : 'dark');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${sora.variable} ${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Script
          id="org-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
