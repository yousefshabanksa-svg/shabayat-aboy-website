import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import StructuredData from "@/components/StructuredData";

/* ─── Production URL (used by Next.js to resolve relative OG images, canonical, etc.) ─── */
const SITE_URL = "https://resturaunt.vercel.app";

/* ─── SEO Metadata — Next.js Metadata API (v1.1.0 Phase 1) ─── */
export const metadata: Metadata = {
  /* ── Base URL for resolving relative paths ── */
  metadataBase: new URL(SITE_URL),

  /* ── Title ── */
  title: {
    default: "شعبيات ابوي | Dad's Delicacies — فطور شعبي سعودي أصيل في الرياض",
    template: "%s | شعبيات ابوي",
  },

  /* ── Description ── */
  description:
    "نكهات الماضي .. على سفرة اليوم. فول، تميس، معصوب وأطباق شعبية سعودية أصيلة يومياً من مطعم شعبيات ابوي في حي قرطبة، الرياض. اطلب الآن عبر واتساب!",

  /* ── Keywords ── */
  keywords: [
    "شعبيات ابوي",
    "مطعم شعبي",
    "فطور سعودي",
    "فطور شعبي",
    "الرياض",
    "حي قرطبة",
    "فول",
    "تميس",
    "معصوب",
    "أكلات شعبية",
    "مطعم الرياض",
    "Dad's Delicacies",
    "Saudi breakfast",
    "Riyadh restaurant",
  ],

  /* ── Canonical & Alternates ── */
  alternates: {
    canonical: "/",
    languages: {
      "ar-SA": "/",
    },
  },

  /* ── Open Graph ── */
  openGraph: {
    title: "شعبيات ابوي | Dad's Delicacies",
    description:
      "نكهات الماضي .. على سفرة اليوم — أطباق شعبية سعودية أصيلة يومياً في حي قرطبة، الرياض.",
    url: SITE_URL,
    siteName: "شعبيات ابوي — Dad's Delicacies",
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: "/hero-bg.png",
        width: 1200,
        height: 630,
        alt: "شعبيات ابوي — فطور شعبي سعودي أصيل",
        type: "image/png",
      },
    ],
  },

  /* ── Twitter Card ── */
  twitter: {
    card: "summary_large_image",
    title: "شعبيات ابوي | Dad's Delicacies",
    description:
      "نكهات الماضي .. على سفرة اليوم — أطباق شعبية سعودية أصيلة يومياً في حي قرطبة، الرياض.",
    images: ["/hero-bg.png"],
  },

  /* ── Icons & Favicon ── */
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  /* ── Language & Locale ── */
  other: {
    "content-language": "ar",
  },

  /* ── Miscellaneous ── */
  creator: "Yousef Shaban",
  publisher: "شعبيات ابوي",
  category: "restaurant",
  classification: "Restaurant, Food & Dining",

  /* ── Search Console Verification ── */
  verification: {
    google: "MBhSF4sFQH1ooDGoAhc8Z00X1x6RSR7kcw1qADN4HCM",
  },
};

/* ─── Viewport & Theme Color (separate export per Next.js 14+ requirement) ─── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <StructuredData />
      </head>
      <body className="bg-brand-cream font-cairo antialiased">
        <GoogleAnalytics />
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
