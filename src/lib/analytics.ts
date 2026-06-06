/**
 * Google Analytics 4 — Centralized Analytics Service
 *
 * All tracking events are routed through this single module.
 * To add a new event, define a typed function here — no gtag calls elsewhere.
 *
 * Environment: NEXT_PUBLIC_GA_MEASUREMENT_ID must be set.
 */

/* ─── Types ─── */
type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: string | number | undefined;
};

/* ─── Core ─── */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

/** Check if GA is available and configured */
function isGA(): boolean {
  return typeof window !== "undefined" && !!GA_MEASUREMENT_ID && typeof window.gtag === "function";
}

/** Send a custom GA4 event */
function sendEvent({ action, category, label, value, ...params }: GTagEvent): void {
  if (!isGA()) return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
    ...params,
  });
}

/* ─── Page View ─── */
export function trackPageView(url: string): void {
  if (!isGA()) return;
  window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
}

/* ─── Menu Interaction ─── */
export function trackCategoryViewed(categoryName: string): void {
  sendEvent({
    action: "category_viewed",
    category: "Menu",
    label: categoryName,
  });
}

export function trackProductViewed(productName: string, productCategory: string, price: number): void {
  sendEvent({
    action: "product_viewed",
    category: "Menu",
    label: productName,
    product_category: productCategory,
    price,
  });
}

export function trackProductAdded(productName: string, productCategory: string, quantity: number, price: number): void {
  sendEvent({
    action: "add_to_cart",
    category: "Cart",
    label: productName,
    product_category: productCategory,
    quantity,
    value: price * quantity,
  });
}

export function trackProductRemoved(productName: string, quantity: number): void {
  sendEvent({
    action: "remove_from_cart",
    category: "Cart",
    label: productName,
    quantity,
  });
}

/* ─── Cart Activity ─── */
export function trackCartOpened(totalItems: number, cartValue: number): void {
  sendEvent({
    action: "cart_opened",
    category: "Cart",
    total_items: totalItems,
    value: cartValue,
  });
}

export function trackCartCheckoutInitiated(totalItems: number, cartValue: number): void {
  sendEvent({
    action: "checkout_initiated",
    category: "Cart",
    total_items: totalItems,
    value: cartValue,
  });
}

export function trackCartCleared(totalItems: number, cartValue: number): void {
  sendEvent({
    action: "cart_cleared",
    category: "Cart",
    total_items: totalItems,
    value: cartValue,
  });
}

/* ─── WhatsApp Conversion Funnel ─── */
export function trackWhatsAppCheckoutClicked(totalItems: number, orderValue: number): void {
  sendEvent({
    action: "whatsapp_checkout_clicked",
    category: "Conversion",
    total_items: totalItems,
    value: orderValue,
  });
}

export function trackWhatsAppOrderSubmitted(totalItems: number, orderValue: number): void {
  sendEvent({
    action: "whatsapp_order_submitted",
    category: "Conversion",
    total_items: totalItems,
    value: orderValue,
  });
}

export function trackWhatsAppInquiry(): void {
  sendEvent({
    action: "whatsapp_inquiry",
    category: "Engagement",
    label: "General Inquiry",
  });
}

/* ─── Engagement ─── */
export function trackScrollDepth(depth: number): void {
  sendEvent({
    action: "scroll_depth",
    category: "Engagement",
    label: `${depth}%`,
    value: depth,
  });
}

export function trackCTAClick(ctaName: string, location: string): void {
  sendEvent({
    action: "cta_click",
    category: "Engagement",
    label: ctaName,
    location,
  });
}

export function trackPhoneClick(): void {
  sendEvent({
    action: "phone_click",
    category: "Engagement",
    label: "Phone Number",
  });
}

export function trackLocationClick(): void {
  sendEvent({
    action: "location_click",
    category: "Engagement",
    label: "Google Maps",
  });
}

/* ─── Global type augmentation ─── */
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}
