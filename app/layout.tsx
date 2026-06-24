import type { Metadata } from "next";
import { Outfit, Sora } from "next/font/google";
import Script from "next/script";
import Analytics from "./components/Analytics";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NTU GPA Calculator",
  description: "A polished and animated GPA platform for NTU students.",
  icons: {
    icon: "/ntu-logo.png",
    shortcut: "/ntu-logo.png",
    apple: "/ntu-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-T6QFLW1EVW";
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${sora.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/ntu-logo.png" />
        <meta name="theme-color" content="#081d2b" />
        {/* Google tag (gtag.js) - placed immediately after <head> */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}');`}
        </Script>
      </head>
      <body className="min-h-full font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
