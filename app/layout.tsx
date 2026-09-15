import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://gecw.ac.in/thaurathrikam";

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Thouryathrikam | Annual Arts Fest - GEC Wayanad",
    template: "%s | Thouryathrikam - GECW Arts Fest",
  },
  description:
    "Thouryathrikam is the premier annual cultural arts festival of Government Engineering College Wayanad (GECW). Celebrating Sangeetham (Music), Nritham (Dance), and Natyam (Theatre) in the misty hills of Wayanad, Kerala.",
  keywords: [
    "Thouryathrikam",
    "Thouryathrikam GECW",
    "Thaurathrikam",
    "GEC Wayanad Arts Fest",
    "Government Engineering College Wayanad",
    "GECW Arts Fest",
    "Kerala College Arts Fest",
    "KTU Arts Fest",
    "College Festival Wayanad",
    "Thouryathrikam 2026",
    "Thalappuzha Mananthavady",
    "GECW",
  ],
  authors: [{ name: "Government Engineering College Wayanad", url: "https://gecw.ac.in" }],
  creator: "GECW Arts Club & College Union",
  publisher: "Government Engineering College Wayanad",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "./",
  },
  manifest: "site.webmanifest",
  icons: {
    icon: [
      { url: "favicon.ico" },
      { url: "favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "logo.webp", type: "image/webp" },
    ],
    apple: [
      { url: "apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Thouryathrikam | Annual Arts Fest - GEC Wayanad",
    description:
      "The grand annual arts festival of Government Engineering College Wayanad (GECW). Celebrating music, dance, theatre, and the vibrant cultural heritage of Kerala.",
    url: siteUrl,
    siteName: "Thouryathrikam - GECW Arts Fest",
    images: [
      {
        url: "og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Thouryathrikam - Annual Arts Festival of Government Engineering College Wayanad",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thouryathrikam | Annual Arts Fest - GEC Wayanad",
    description:
      "The premier arts festival of Government Engineering College Wayanad (GECW). Experience Sangeetham, Nritham, and Natyam.",
    images: ["og-image.jpg"],
    creator: "@gec_wayanad",
  },
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Festival",
      "@id": `${siteUrl}/#festival`,
      "name": "Thouryathrikam Arts Fest",
      "alternateName": ["Thouryathrikam GECW", "Thaurathrikam", "GEC Wayanad Arts Festival"],
      "description":
        "The annual cultural arts festival of Government Engineering College Wayanad featuring music, dance, theatre, literary, and traditional Kerala art competitions.",
      "url": siteUrl,
      "image": `${siteUrl}/logo.webp`,
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "Government Engineering College Wayanad (GECW) Campus",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Thalappuzha PO, Mananthavady",
          "addressLocality": "Wayanad",
          "addressRegion": "Kerala",
          "postalCode": "670644",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "11.8347",
          "longitude": "75.9686"
        }
      },
      "organizer": {
        "@type": "EducationalOrganization",
        "name": "Government Engineering College Wayanad",
        "url": "https://gecw.ac.in",
        "logo": `${siteUrl}/logo.webp`,
        "sameAs": [
          "https://www.instagram.com/thouryathrikam_gecw/",
          "https://www.instagram.com/gec_wayanad/"
        ]
      },
      "inLanguage": ["en", "ml"]
    },
    {
      "@type": "EducationalOrganization",
      "@id": "https://gecw.ac.in/#organization",
      "name": "Government Engineering College Wayanad",
      "url": "https://gecw.ac.in",
      "logo": `${siteUrl}/logo.webp`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Thalappuzha PO, Mananthavady",
        "addressLocality": "Wayanad",
        "addressRegion": "Kerala",
        "postalCode": "670644",
        "addressCountry": "IN"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500 selection:text-black antialiased">
        {children}
      </body>
    </html>
  );
}
