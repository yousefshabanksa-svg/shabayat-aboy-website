"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  unitPrice: number;
  onAddToCart: (name: string, price: number, quantity: number) => void;
}

export default function OrderModal({ isOpen, onClose, itemName, unitPrice, onAddToCart }: OrderModalProps) {
  const [quantity, setQuantity] = useState(1);
  const totalPrice = quantity * unitPrice;

  /* Reset quantity when modal opens with new item */
  useEffect(() => {
    if (isOpen) setQuantity(1);
  }, [isOpen, itemName]);

  /* Close on Escape */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  /* Lock body scroll */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const decrease = useCallback(() => setQuantity((q) => Math.max(1, q - 1)), []);
  const increase = useCallback(() => setQuantity((q) => Math.min(99, q + 1)), []);

  const handleManualInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) setQuantity(1);
    else if (val > 99) setQuantity(99);
    else setQuantity(val);
  }, []);

  const handleConfirm = useCallback(() => {
    onAddToCart(itemName, unitPrice, quantity);
    onClose();
  }, [itemName, unitPrice, quantity, onAddToCart, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full sm:max-w-md mx-0 sm:mx-4 bg-white rounded-t-[28px] sm:rounded-[28px] shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
          >
            {/* Mobile Drag Handle */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 bg-gray-200 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-6 pt-4 sm:pt-7 pb-5 border-b border-gray-100">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-brand-red/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-extrabold text-brand-black truncate">{itemName}</h3>
                    <p className="text-sm text-gray-400 font-medium">{unitPrice} ريال للقطعة</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="إغلاق"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="px-6 py-7">
              <label className="block text-sm font-bold text-gray-500 mb-4 text-center">الكمية</label>
              <div className="flex items-center justify-center gap-4">
                {/* Decrease */}
                <motion.button
                  onClick={decrease}
                  disabled={quantity <= 1}
                  className="w-14 h-14 rounded-2xl bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
                  whileTap={{ scale: 0.9 }}
                  aria-label="إنقاص الكمية"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                  </svg>
                </motion.button>

                {/* Input */}
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={quantity}
                  onChange={handleManualInput}
                  className="w-20 h-14 text-center text-3xl font-extrabold text-brand-black bg-gray-50 border-2 border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 rounded-2xl outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  aria-label="الكمية"
                />

                {/* Increase */}
                <motion.button
                  onClick={increase}
                  disabled={quantity >= 99}
                  className="w-14 h-14 rounded-2xl bg-brand-red/10 hover:bg-brand-red/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
                  whileTap={{ scale: 0.9 }}
                  aria-label="زيادة الكمية"
                >
                  <svg className="w-6 h-6 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </motion.button>
              </div>

              {/* Price Summary */}
              <div className="mt-7 bg-gray-50 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 font-medium">سعر القطعة</span>
                  <span className="text-gray-600 font-semibold">{unitPrice} ريال</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 font-medium">الكمية</span>
                  <span className="text-gray-600 font-semibold">×{quantity}</span>
                </div>
                <div className="h-px bg-gray-200" />
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-brand-black">الإجمالي</span>
                  <span className="text-2xl font-extrabold text-brand-red">{totalPrice} <span className="text-sm font-bold text-gray-400">ريال</span></span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 sm:pb-7 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-sm transition-colors cursor-pointer"
              >
                إلغاء
              </button>
              <motion.button
                onClick={handleConfirm}
                className="flex-[2] py-4 rounded-2xl bg-brand-red hover:bg-brand-red/90 text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-lg shadow-brand-red/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                أضف إلى السلة
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
