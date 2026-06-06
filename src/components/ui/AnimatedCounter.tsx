"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Shared animated counter that counts up when scrolled into view.
 * Uses IntersectionObserver so animation only fires when visible.
 * Used by Hero (trust badges) and WhyChooseUs (stats bar).
 */
export default function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  /* Trigger when element enters viewport */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  /* Animate the count */
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target]);

  return <span ref={ref}>{count.toLocaleString("ar-SA")}{suffix}</span>;
}
