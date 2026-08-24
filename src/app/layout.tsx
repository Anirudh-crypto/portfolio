import "./globals.css";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Playfair_Display, Manrope } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig, siteUrl } from "@/lib/site";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    // Page-level titles render as "Projects | Anirudh".
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.title,
  authors: [{ name: siteConfig.name, url: siteConfig.links.github }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.title,
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteUrl,
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f5ef" },
    { media: "(prefers-color-scheme: dark)", color: "#111823" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteUrl,
  email: `mailto:${siteConfig.links.email}`,
  jobTitle: "Software Engineer",
  sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${manrope.variable} ${playfair.variable} bg-background text-foreground antialiased transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:border focus:border-border focus:bg-card focus:px-4 focus:py-2"
          >
            Skip to content
          </a>
          <div className="site-bg" aria-hidden />
          <Navbar />
          {/*
            The single `<main>` for the whole site. Pages render plain `<div>`
            wrappers — nesting another `<main>` here would be invalid HTML and
            gives screen readers two competing main landmarks.
          */}
          <main
            id="main-content"
            className="mx-auto min-h-[calc(100vh-10rem)] w-full max-w-7xl px-5 pb-10 pt-8 sm:px-8 lg:px-12"
          >
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
