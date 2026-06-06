"use client";

import useScrollDepth from "@/hooks/useScrollDepth";

/**
 * Invisible client component that activates scroll depth tracking.
 * Renders nothing — just hooks into the page scroll events.
 */
export default function ScrollDepthTracker() {
  useScrollDepth();
  return null;
}
