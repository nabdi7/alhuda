import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: "AlHuda Islamic Center of Kent, WA",
    template: "%s | AlHuda Islamic Center",
  },
  description:
    "AlHuda Islamic Center in Kent, WA! We’re a vibrant mosque where you can pray, learn, and connect with the community. Join us for daily prayers, educational programs, and events for the whole family.",
  keywords: [
    "AlHuda Islamic Center",
    "Mosque in Kent, WA",
    "Muslim community Kent WA",
    "Prayer times Kent WA",
    "Quran classes",
    "Islamic events",
    "Kent mosque activities",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL ?? siteConfig.url),
  authors: [
    {
      name: "AlHuda Islamic Center",
      url: "https://alhudaislamiccenter.com",
    },
  ],
  creator: "AlHuda Islamic Center",
  publisher: "AlHuda Islamic Center",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "AlHuda Islamic Center of Kent, WA",
    description:
      "At AlHuda Islamic Center, we’re more than just a mosque. We’re a place for spiritual growth, education, and building connections in the Kent, WA community. Check out our events, prayer times, and programs today!",
    type: "website",
    siteName: "AlHuda Islamic Center",
    url: "https://alhudaislamiccenter.com",
    locale: "en_US",
    images: [
      {
        url: "https://alhudaislamiccenter.com/logo.png",
        width: 500,
        height: 500,
        alt: "AlHuda Islamic Center of Kent, WA",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AlHuda Islamic Center of Kent, WA",
    description:
      "Discover AlHuda Islamic Center in Kent, WA. We offer daily prayers, community events, and educational programs to help you grow spiritually and stay connected.",
    images: ["https://alhudaislamiccenter.com/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `/site.webmanifest`,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // verification: {
  //   google: "",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="relative overflow-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
