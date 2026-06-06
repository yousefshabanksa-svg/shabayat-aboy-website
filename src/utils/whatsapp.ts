/**
 * WhatsApp utility for شعبيات ابوي
 * Cart-based checkout is handled directly in CartDrawer.tsx.
 * This module provides the general inquiry helper used by FloatingWhatsApp & CTABanner.
 */

const WHATSAPP_NUMBER = "966533158148";

/**
 * Opens a general WhatsApp inquiry (no specific item).
 */
export function openWhatsAppInquiry(): void {
  const message = encodeURIComponent(
    "مرحباً شعبيات ابوي، لدي استفسار 🙏",
  );
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
    "_blank",
    "noopener,noreferrer",
  );
}
