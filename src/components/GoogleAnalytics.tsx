"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { GA_MEASUREMENT_ID, trackPageView } from "@/lib/analytics";

/**
 * Google Analytics 4 script loader.
 * Loads gtag.js with afterInteractive strategy and tracks page views on route changes.
 * Renders nothing if NEXT_PUBLIC_GA_MEASUREMENT_ID is not set.
 */
export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) trackPageView(pathname);
  }, [pathname]);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            send_page_view: false
          });
        `}
      </Script>
    </>
  );
}
