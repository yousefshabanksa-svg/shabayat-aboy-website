import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "شعبيات ابوي | Dad's Delicacies",
  description: "نكهات الماضي .. على سفرة اليوم. أطباق شعبية سعودية أصيلة في حي قرطبة، الرياض.",
  keywords: ["شعبيات ابوي", "مطعم شعبي", "فطور سعودي", "الرياض", "قرطبة", "فول", "تميس", "Dad's Delicacies"],
  openGraph: {
    title: "شعبيات ابوي | Dad's Delicacies",
    description: "نكهات الماضي .. على سفرة اليوم",
    locale: "ar_SA",
    type: "website",
  },
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
      </head>
      <body className="bg-brand-cream font-cairo antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
