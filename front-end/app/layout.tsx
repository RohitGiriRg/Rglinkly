import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://toolzaar.in"),
  title: {
    default: "Toolzaar URL Shorten | Smart URL Shortener",
    template: "%s | Toolzaar URL Shorten",
  },
  description:
    "Shorten long URLs, manage links, and share clean short links instantly with Toolzaar URL Shorten.",
  applicationName: "Toolzaar URL Shorten",
  keywords: [
    "URL shortener",
    "link management",
    "short links",
    "Toolzaar URL Shorten",
    "QR links",
  ],
  openGraph: {
    title: "Toolzaar URL Shorten | Smart URL Shortener",
    description:
      "Create short links fast, track them, and share them beautifully with Toolzaar URL Shorten.",
    url: "https://Toolzaar URL Shorten.com",
    siteName: "Toolzaar URL Shorten",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolzaar URL Shorten | Smart URL Shortener",
    description:
      "Create short links fast, track them, and share them beautifully with Toolzaar URL Shorten.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
