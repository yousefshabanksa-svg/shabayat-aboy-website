"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import StarRating from "@/components/ui/StarRating";

/* ─── Types ─── */
interface Review {
  id: number;
  name: string;
  initial: string;
  rating: number;
  text: string;
  highlight: string;
  timeAgo: string;
  avatarColor: string;
}

/* ─── Review Data ─── */
const reviews: Review[] = [
  {
    id: 1, name: "عبدالله المطيري", initial: "ع", rating: 5,
    text: "المحل نظيف ورايق والأكل طازج دايم. الفول والتميس ما يتفوت أبداً، كل يوم أفطر عندهم.",
    highlight: "المحل نظيف ورايق", timeAgo: "قبل أسبوعين",
    avatarColor: "from-blue-400 to-blue-600",
  },
  {
    id: 2, name: "محمد الشمري", initial: "م", rating: 5,
    text: "أقسم بالله مطعم محترم ولذيذ. البوكس السعودي يكفي ٣ أشخاص والسعر معقول جداً. أنصح فيه بقوة!",
    highlight: "مطعم محترم ولذيذ", timeAgo: "قبل شهر",
    avatarColor: "from-emerald-400 to-emerald-600",
  },
  {
    id: 3, name: "سارة العتيبي", initial: "س", rating: 5,
    text: "أفضل معصوب جربته في الرياض! والخدمة سريعة والعمال محترمين. صار مكاني المفضل للفطور.",
    highlight: "أفضل معصوب في الرياض", timeAgo: "قبل ٣ أسابيع",
    avatarColor: "from-purple-400 to-purple-600",
  },
  {
    id: 4, name: "فهد القحطاني", initial: "ف", rating: 5,
    text: "المطبق باللحم خرافي! العجينة رقيقة ومقرمشة والحشوة كثيرة. الأسعار حلوة وما تحس إنك مغبون.",
    highlight: "المطبق باللحم خرافي", timeAgo: "قبل ٥ أيام",
    avatarColor: "from-amber-400 to-amber-600",
  },
  {
    id: 5, name: "نورة الدوسري", initial: "ن", rating: 4,
    text: "بوكس الشاميات لذيذ مرة خصوصاً اللبنة والمناقيش. المكان مريح والديكور حلو. بس يحتاج مواقف أكثر.",
    highlight: "بوكس الشاميات لذيذ مرة", timeAgo: "قبل ٤ أيام",
    avatarColor: "from-rose-400 to-rose-600",
  },
  {
    id: 6, name: "خالد الحربي", initial: "خ", rating: 5,
    text: "أكل لذيذ وأسعار ممتازة. الفلافل طازجة ومقرمشة والحمص كريمي. أجي هنا كل جمعة مع العائلة.",
    highlight: "أكل لذيذ وأسعار ممتازة", timeAgo: "قبل أسبوع",
    avatarColor: "from-cyan-400 to-cyan-600",
  },
];

/* ─── Review Card ─── */
function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.div
      className="group premium-card p-8 cursor-default flex flex-col"
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${review.avatarColor} flex items-center justify-center text-white font-bold text-base shadow-lg flex-shrink-0`}>
            {review.initial}
          </div>
          <div>
            <p className="font-bold text-base text-brand-black">{review.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <StarRating rating={review.rating} />
              <span className="text-[11px] text-gray-400 font-medium">{review.timeAgo}</span>
            </div>
          </div>
        </div>
        <svg className="w-5 h-5 flex-shrink-0 opacity-30 mt-1" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      </div>

      {/* Text */}
      <p className="text-[15px] text-gray-600 leading-relaxed mb-4 flex-1">
        {review.text.split(review.highlight).map((part, i, arr) =>
          i < arr.length - 1 ? (
            <span key={i}>{part}<span className="text-brand-gold font-bold bg-brand-gold/5 px-1 rounded">{review.highlight}</span></span>
          ) : (<span key={i}>{part}</span>)
        )}
      </p>

      {/* Verified */}
      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
        <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        تقييم موثق من خرائط جوجل
      </div>
    </motion.div>
  );
}

/* ─── Slider Controls ─── */
function SliderDots({ total, active, onDotClick }: { total: number; active: number; onDotClick: (i: number) => void }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          className={`rounded-full transition-all duration-300 cursor-pointer ${
            active === i ? "w-8 h-3 bg-brand-red" : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
          }`}
          aria-label={`الانتقال للصفحة ${i + 1}`}
        />
      ))}
    </div>
  );
}

/* ─── Main Component ─── */
export default function Testimonials() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(reviews.length / perPage);
  const visibleReviews = reviews.slice(page * perPage, (page + 1) * perPage);

  return (
    <section id="reviews" className="relative section-padding bg-brand-warm-gray overflow-x-clip section-divider-gold">
      {/* Decorative */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-brand-red/[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-brand-gold/[0.05] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header — DIFFERENT STYLE: Quote-inspired */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-start gap-6">
            {/* Big Quote Mark */}
            <span className="text-7xl sm:text-8xl font-serif text-brand-gold/20 leading-none select-none hidden sm:block">"</span>
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-black mb-4 leading-[1.3]">
                كلامهم يتكلم <span className="text-gradient-gold">عنّا</span>
              </h2>
              <p className="text-gray-500 text-base sm:text-lg max-w-md leading-relaxed">
                +500 تقييم حقيقي من عملائنا على خرائط جوجل
              </p>
            </div>
          </div>
        </motion.div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {visibleReviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>

        {/* Slider Dots */}
        <SliderDots total={totalPages} active={page} onDotClick={setPage} />

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="https://maps.google.com/?q=Qurtubah,+Riyadh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 text-sm font-bold text-gray-600 hover:text-brand-red transition-colors duration-300 bg-white px-8 py-4 rounded-2xl shadow-sm hover:shadow-lg border border-gray-100"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            شاهد جميع التقييمات على جوجل
            <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
