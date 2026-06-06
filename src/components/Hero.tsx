"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { openWhatsAppInquiry } from "@/utils/whatsapp";
import { useCart } from "@/context/CartContext";
import StarRating from "@/components/ui/StarRating";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

/* ─── Animation Variants ─── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.4 },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* ─── Cart Button ─── */
function CartButton() {
  const { totalItems, openDrawer } = useCart();

  return (
    <button
      onClick={openDrawer}
      className="relative w-10 h-10 rounded-xl bg-white/[0.08] border border-white/[0.08] hover:bg-white/15 flex items-center justify-center text-white transition-all duration-300 cursor-pointer"
      aria-label={`السلة (${totalItems} منتج)`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.span
            key={totalItems}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1.5 -left-1.5 min-w-[20px] h-5 px-1 rounded-full bg-brand-red text-white text-[11px] font-bold flex items-center justify-center shadow-lg shadow-brand-red/30"
          >
            {totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "الرئيسية", href: "#hero" },
    { label: "القائمة", href: "#menu" },
    { label: "آراء العملاء", href: "#reviews" },
    { label: "موقعنا", href: "#location" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-brand-black/95 backdrop-blur-2xl shadow-2xl shadow-black/30 border-b border-brand-gold/15 py-3"
          : "bg-gradient-to-b from-black/60 via-black/30 to-transparent backdrop-blur-sm py-5"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-brand-red flex items-center justify-center shadow-lg shadow-brand-red/20 group-hover:shadow-brand-red/40 transition-shadow duration-300">
            <span className="text-white font-extrabold text-lg">ش</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-white font-extrabold text-base leading-tight">شعبيات ابوي</p>
            <p className="text-brand-gold text-[10px] font-medium tracking-wider">DAD&apos;S DELICACIES</p>
          </div>
        </a>

        {/* Desktop Links — with elegant separators */}
        <div className="hidden md:flex items-center">
          <div className="flex items-center bg-white/[0.04] backdrop-blur-md rounded-2xl border border-white/[0.06] px-1.5 py-1">
            {links.map((link, i) => (
              <div key={link.label} className="flex items-center">
                <a
                  href={link.href}
                  className="text-white/65 hover:text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-white/[0.08] transition-all duration-300"
                >
                  {link.label}
                </a>
                {i < links.length - 1 && (
                  <div className="w-px h-4 bg-white/10 mx-0.5" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA + Cart + Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#menu"
            className="hidden sm:inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-brand-red/30"
          >
            اطلب الآن
          </a>
          <CartButton />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white cursor-pointer"
            aria-label="القائمة"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-brand-black/95 backdrop-blur-xl border-b border-white/5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/70 hover:text-white text-base font-medium px-4 py-3 rounded-xl hover:bg-white/5 transition-all duration-300"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#menu"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 bg-brand-red text-white text-base font-bold px-6 py-3.5 rounded-xl"
              >
                اطلب الآن
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}



/* ─── Main Hero ─── */
export default function Hero() {
  return (
    <>
      <Navbar />
      <section
        id="hero"
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with Ken Burns */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.png"
            alt="أطباق شعبيات ابوي"
            fill
            priority
            className="object-cover object-center"
            style={{ animation: "ken-burns 25s ease-in-out infinite alternate" }}
            sizes="100vw"
          />
        </div>

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/60 to-black/40" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/50 to-transparent" />

        {/* Film Grain */}
        <div className="absolute inset-0 z-[2] grain pointer-events-none" />

        {/* Content */}
        <motion.div
          className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8 text-center pt-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={scaleInVariant} className="mb-10">
            <span className="inline-flex items-center gap-2 glass-dark rounded-full px-6 py-3 text-sm text-white/70 tracking-wide font-medium">
              <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
              مطعم شعبيات ابوي — حي قرطبة، الرياض
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeUpVariant}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.25] text-white mb-8"
          >
            نكهات أصيلة
            <br />
            <span className="text-gradient-gold">تُحضّر بحب</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUpVariant}
            className="text-lg md:text-xl lg:text-2xl text-white/60 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
          >
            فطور، تميس، فول، ومعصوب بطابع سعودي أصيل
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUpVariant}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            {/* Primary */}
            <motion.a
              href="#menu"
              className="group relative inline-flex items-center gap-3 bg-brand-red hover:bg-brand-red-dark text-white font-bold text-lg px-10 py-5 rounded-2xl overflow-hidden transition-all duration-300 shadow-2xl shadow-brand-red/30 hover:shadow-brand-red/50"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer bg-[length:200%_100%]" />
              <span className="relative z-10 flex items-center gap-3">
                اطلب الآن
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </motion.a>

            {/* Secondary */}
            <motion.button
              onClick={openWhatsAppInquiry}
              className="inline-flex items-center gap-3 glass text-white/80 hover:text-white font-semibold text-lg px-10 py-5 rounded-2xl transition-all duration-300 hover:bg-white/15 cursor-pointer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              تواصل معنا
            </motion.button>
          </motion.div>

          {/* Trust Badges Row */}
          <motion.div
            variants={fadeUpVariant}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {/* Google Rating Badge */}
            <div className="glass-dark rounded-2xl px-5 py-3.5 flex items-center gap-3 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-center w-10 h-10 bg-white rounded-xl shadow-md">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-bold text-lg">4.8</span>
                  <StarRating rating={4.8} />
                </div>
                <span className="text-white/40 text-[11px] font-medium">+500 تقييم على جوجل</span>
              </div>
            </div>

            {/* Delivery Apps */}
            <div className="glass-dark rounded-2xl px-5 py-3.5 flex items-center gap-3 hover:bg-white/10 transition-all duration-300">
              <span className="text-sm text-white/50 font-medium">متوفر على:</span>
              <span className="text-sm text-white/70 font-semibold">هنقرستيشن • جاهز • مرسول</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <span className="text-white/30 text-xs font-medium tracking-wider">اكتشف المنيو</span>
          <motion.div
            className="w-7 h-11 rounded-full border-2 border-white/15 flex items-start justify-center p-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-brand-gold rounded-full"
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
