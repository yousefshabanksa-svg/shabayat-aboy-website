"use client";

import { useEffect, useRef } from "react";
import { trackScrollDepth } from "@/lib/analytics";

/**
 * Tracks scroll depth milestones (25%, 50%, 75%, 100%).
 * Each milestone fires only once per page load.
 */
export default function useScrollDepth() {
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const milestones = [25, 50, 75, 100];

    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      for (const milestone of milestones) {
        if (scrollPercent >= milestone && !firedRef.current.has(milestone)) {
          firedRef.current.add(milestone);
          trackScrollDepth(milestone);
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
