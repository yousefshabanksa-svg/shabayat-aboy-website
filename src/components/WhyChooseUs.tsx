"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

/* ─── Main Component ─── */
export default function WhyChooseUs() {
  return (
    <section className="relative overflow-x-clip">
      {/* ── Top: Dark Story Band ── */}
      <div className="relative bg-brand-charcoal py-20 sm:py-28 overflow-x-clip">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a96e' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        {/* Gradient accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Story */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 text-brand-gold text-sm font-semibold tracking-wider mb-6 bg-brand-gold/10 px-5 py-2 rounded-full">
                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                قصتنا
              </span>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-[1.3]">
                من مطبخ الوالد
                <br />
                <span className="text-gradient-gold">إلى سفرتكم</span>
              </h2>

              <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg">
                بدأنا بوصفات أبوي اللي تربّينا عليها — فول بالطريقة الأصلية، تميس من التنور على طول، ومعصوب بالحب. كل طبق عندنا يحكي قصة بيت سعودي أصيل.
              </p>

              {/* Value Props - Inline, Not Cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🔥", text: "تنور يشتغل من الفجر" },
                  { icon: "🫘", text: "فول يُنقع ١٢ ساعة" },
                  { icon: "🍯", text: "عسل سدر طبيعي" },
                  { icon: "🧈", text: "سمن بلدي أصلي" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Food Image Grid */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-48 sm:h-56 rounded-[20px] overflow-hidden group">
                    <Image
                      src="/hero-bg.png"
                      alt="أطباق شعبية"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="relative h-32 sm:h-40 rounded-[20px] overflow-hidden bg-brand-red flex items-center justify-center">
                    <div className="text-center p-4">
                      <p className="text-white/80 text-xs font-semibold mb-1">نفتح يومياً</p>
                      <p className="text-white text-2xl font-extrabold">٦ص — ١٢م</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative h-32 sm:h-40 rounded-[20px] overflow-hidden bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 border border-brand-gold/20 flex items-center justify-center">
                    <div className="text-center p-4">
                      <p className="text-brand-gold text-4xl font-extrabold">4.8</p>
                      <div className="flex justify-center gap-0.5 my-1">
                        {[1,2,3,4,5].map(s => (
                          <svg key={s} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-brand-gold-light text-xs font-medium">تقييم جوجل</p>
                    </div>
                  </div>
                  <div className="relative h-48 sm:h-56 rounded-[20px] overflow-hidden group">
                    <Image
                      src="/saudi-breakfast.png"
                      alt="فطور سعودي"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[
              { value: 15000, suffix: "+", label: "طلب تم تقديمه" },
              { value: 500, suffix: "+", label: "تقييم على جوجل" },
              { value: 98, suffix: "%", label: "رضا العملاء" },
              { value: 7, suffix: "", label: "سنوات خبرة" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
