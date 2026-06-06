"use client";

import { useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const WHATSAPP_NUMBER = "966533158148";

export default function CartDrawer() {
  const { items, updateQuantity, removeItem, clearCart, totalItems, subtotal, isDrawerOpen, closeDrawer } = useCart();

  /* Lock body scroll */
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isDrawerOpen]);

  const handleCheckout = useCallback(() => {
    if (items.length === 0) return;

    const itemLines = items
      .map((item, i) => `${i + 1}- ${item.name} × ${item.quantity} = ${item.price * item.quantity} ريال`)
      .join("\n\n");

    const message = `السلام عليكم،

أرغب في طلب:

${itemLines}

الإجمالي = ${subtotal} ريال

شكراً.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank", "noopener,noreferrer");
    clearCart();
    closeDrawer();
  }, [items, subtotal, clearCart, closeDrawer]);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[110]">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDrawer}
          />

          {/* Drawer — slides from the right (start edge in RTL) */}
          <motion.div
            className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-brand-red/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-brand-black">سلة الطلب</h3>
                  <p className="text-xs text-gray-400 font-medium">{totalItems} منتج</p>
                </div>
              </div>
              <button
                onClick={closeDrawer}
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="إغلاق السلة"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 font-bold text-base mb-2">السلة فارغة</p>
                  <p className="text-gray-300 text-sm">أضف منتجات من القائمة</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <CartItemCard
                        key={item.name}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeItem}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer — Totals + Checkout */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-5 space-y-4 bg-gray-50/50">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-500">المجموع</span>
                  <span className="text-2xl font-extrabold text-brand-black">
                    {subtotal} <span className="text-sm font-bold text-gray-400">ريال</span>
                  </span>
                </div>

                {/* Checkout */}
                <motion.button
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#1fbe5a] text-white font-bold text-base flex items-center justify-center gap-3 transition-colors cursor-pointer shadow-lg shadow-[#25D366]/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  إرسال الطلب عبر واتساب
                </motion.button>

                {/* Clear cart */}
                <button
                  onClick={clearCart}
                  className="w-full py-3 text-sm text-gray-400 hover:text-brand-red font-semibold transition-colors cursor-pointer"
                >
                  تفريغ السلة
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ─── Cart Item Card ─── */
function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: { name: string; price: number; quantity: number };
  onUpdateQuantity: (name: string, qty: number) => void;
  onRemove: (name: string) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm"
    >
      {/* Top: Name + Remove */}
      <div className="flex items-start justify-between mb-3">
        <div className="min-w-0">
          <h4 className="text-base font-bold text-brand-black truncate">{item.name}</h4>
          <p className="text-sm text-gray-400 font-medium">{item.price} ريال للقطعة</p>
        </div>
        <button
          onClick={() => onRemove(item.name)}
          className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors cursor-pointer"
          aria-label={`حذف ${item.name}`}
        >
          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Bottom: Quantity + Total */}
      <div className="flex items-center justify-between">
        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdateQuantity(item.name, item.quantity - 1)}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="إنقاص"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
            </svg>
          </button>
          <span className="w-8 text-center text-base font-extrabold text-brand-black">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.name, item.quantity + 1)}
            className="w-9 h-9 rounded-xl bg-brand-red/10 hover:bg-brand-red/20 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="زيادة"
          >
            <svg className="w-4 h-4 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Item Total */}
        <span className="text-lg font-extrabold text-brand-red">
          {item.price * item.quantity} <span className="text-xs font-bold text-gray-400">ريال</span>
        </span>
      </div>
    </motion.div>
  );
}
