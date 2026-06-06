"use client";

import { motion } from "framer-motion";
import { openWhatsAppInquiry } from "@/utils/whatsapp";
import { trackCTAClick, trackWhatsAppInquiry } from "@/lib/analytics";

export default function CTABanner() {
  return (
    <section className="relative py-20 sm:py-28 overflow-x-clip">
      {/* Background */}
      <div className="absolute inset-0 bg-brand-charcoal" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 via-transparent to-brand-gold/10" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gold/10 mb-6">
            <svg className="w-8 h-8 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M16.5 8.25V4.125a2.625 2.625 0 00-5.25 0v.5" />
            </svg>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-[1.3]">
            جاهز تجرب{" "}
            <span className="text-gradient-gold">ألذ فطور</span>
            <br className="hidden sm:block" />
            في الرياض؟
          </h2>

          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            اطلب الحين عبر واتساب أو زورنا في حي قرطبة — نستقبلك يومياً من ٦ صباحاً
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              onClick={() => { trackCTAClick("اطلب عبر واتساب", "CTA Banner"); trackWhatsAppInquiry(); openWhatsAppInquiry(); }}
              className="group relative inline-flex items-center gap-3 bg-brand-red hover:bg-brand-red-dark text-white font-bold text-lg px-10 py-5 rounded-2xl overflow-hidden transition-all duration-300 shadow-2xl shadow-brand-red/30 hover:shadow-brand-red/50 cursor-pointer"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer bg-[length:200%_100%]" />
              <span className="relative z-10 flex items-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                اطلب عبر واتساب
              </span>
            </motion.button>

            <motion.a
              href="#location"
              onClick={() => trackCTAClick("موقعنا", "CTA Banner")}
              className="inline-flex items-center gap-2.5 glass text-white/70 hover:text-white font-semibold text-lg px-10 py-5 rounded-2xl transition-all duration-300 hover:bg-white/15"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              موقعنا
            </motion.a>
          </div>

          {/* Delivery Apps */}
          <motion.div
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-xs text-white/30 font-semibold ml-2">متوفر أيضاً على:</span>
            {["هنقرستيشن", "جاهز", "مرسول", "ذا شيفز"].map((app) => (
              <span
                key={app}
                className="text-xs text-white/50 bg-white/5 px-4 py-2 rounded-xl font-medium border border-white/10 hover:border-brand-gold/30 hover:text-brand-gold-light transition-all duration-300"
              >
                {app}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
