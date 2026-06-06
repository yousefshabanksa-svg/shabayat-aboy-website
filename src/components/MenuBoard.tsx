"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import OrderModal from "@/components/OrderModal";
import { useCart } from "@/context/CartContext";
import { trackCategoryViewed, trackProductViewed } from "@/lib/analytics";

/* ─── Types ─── */
interface MenuItem {
  name: string;
  description: string;
  price: number;
  badge?: string;
  popular?: boolean;
}

interface Category {
  id: string;
  label: string;
  emoji: string;
  color: string;
  image: string;
  items: MenuItem[];
}

/* ─── Menu Data ─── */
const categories: Category[] = [
  {
    id: "breakfast",
    label: "فطور",
    emoji: "🍳",
    color: "bg-amber-500",
    image: "/food-breakfast.png",
    items: [
      { name: "فول تميس", description: "فول مدمس مع خبز التميس الطازج", price: 12, popular: true },
      { name: "حمص تميس", description: "حمص كريمي مع زيت الزيتون والتميس", price: 12 },
      { name: "فلافل طبق", description: "فلافل مقرمشة مع السلطة والطحينة", price: 14 },
      { name: "شكشوكة", description: "بيض مع صلصة الطماطم والفلفل", price: 16 },
      { name: "بيض غنم", description: "بيض مقلي بالسمن البلدي", price: 15 },
      { name: "فطور سعودي", description: "فول، حمص، تميس، بيض، فلافل، مربى، زبدة، عسل، جبن", price: 59, badge: "الأكثر طلباً" },
    ],
  },
  {
    id: "tamees",
    label: "تميس",
    emoji: "🫓",
    color: "bg-orange-500",
    image: "/food-tamees.png",
    items: [
      { name: "تميس ساده", description: "خبز تميس طازج من التنور", price: 3 },
      { name: "تميس بالجبن", description: "تميس محشي بالجبن الذائب", price: 7 },
      { name: "تميس بالبيض", description: "تميس مع بيض مقلي وخضار", price: 8 },
      { name: "تميس بالعسل", description: "تميس مع عسل وزبدة", price: 8 },
      { name: "تميس مكس", description: "تميس بالجبن والبيض والخضار", price: 10, popular: true },
    ],
  },
  {
    id: "foul",
    label: "فول",
    emoji: "🫘",
    color: "bg-emerald-600",
    image: "/food-foul.png",
    items: [
      { name: "فول ساده", description: "فول مدمس بالليمون والكمون", price: 8 },
      { name: "فول بالجبن", description: "فول مدمس مع جبن أبيض ذائب", price: 12 },
      { name: "فول بالبيض", description: "فول مدمس مع بيض مقلي", price: 14 },
      { name: "فول بالسمن", description: "فول مدمس بالسمن البلدي", price: 12 },
      { name: "حمص بالطحينة", description: "حمص كريمي مع صوص الطحينة", price: 10 },
      { name: "حمص بالزبدة", description: "حمص ساخن بالزبدة المذابة", price: 12 },
      { name: "حمص باللحم", description: "حمص مع قطع اللحم المفروم", price: 18, popular: true },
    ],
  },
  {
    id: "masoob",
    label: "معصوب",
    emoji: "🍌",
    color: "bg-yellow-600",
    image: "/food-masoob.png",
    items: [
      { name: "معصوب عادي", description: "خبز بر مع الموز والعسل", price: 15 },
      { name: "معصوب بالقشطة", description: "خبز بر مع الموز والعسل والقشطة", price: 18, popular: true },
      { name: "معصوب مكس", description: "معصوب بالقشطة والمكسرات", price: 22 },
      { name: "مطبق موز", description: "مطبق حلو بالموز والعسل", price: 14 },
      { name: "مطبق بيض", description: "عجينة رقيقة محشية بالبيض", price: 10 },
      { name: "مطبق جبن", description: "مطبق مقرمش بالجبن الذائب", price: 12 },
      { name: "مطبق لحم", description: "مطبق محشي باللحم المفروم والبصل", price: 18 },
    ],
  },
  {
    id: "drinks",
    label: "مشروبات",
    emoji: "☕",
    color: "bg-rose-600",
    image: "/food-drinks.png",
    items: [
      { name: "شاي حليب", description: "شاي كرك بالحليب والهيل", price: 5 },
      { name: "شاي أحمر", description: "شاي تقليدي بالنعناع", price: 4 },
      { name: "قهوة عربية", description: "قهوة بالهيل والزعفران", price: 8 },
      { name: "عصير برتقال", description: "عصير برتقال طازج", price: 10 },
      { name: "عصير مانجو", description: "عصير مانجو طبيعي", price: 12 },
      { name: "ماء", description: "مياه معدنية", price: 2 },
    ],
  },
];

/* ─── Best Sellers ─── */
const bestSellers = [
  {
    name: "فطور سعودي",
    description: "فول، حمص، تميس، بيض، فلافل، مربى، زبدة، عسل، جبن — وجبة فطور متكاملة",
    price: 59,
    badge: "الأكثر طلباً",
    image: "/saudi-breakfast.png",
  },
  {
    name: "شاميات",
    description: "حمص، فلافل، مناقيش، لبنة، زيتون، خضار طازجة — نكهة شامية أصيلة",
    price: 55,
    badge: "مميز",
    image: "/shamiyat-box.png",
  },
];

/* ─── Animation Variants ─── */
const tabContentVariants = {
  enter: { opacity: 0, y: 24, filter: "blur(8px)" },
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -16,
    filter: "blur(8px)",
    transition: { duration: 0.2 },
  },
};

/* ─── Best Seller Card ─── */
function BestSellerCard({ item, index, onOrder }: { item: (typeof bestSellers)[0]; index: number; onOrder: (name: string, price: number) => void }) {
  return (
    <motion.div
      className="group relative rounded-[28px] overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-700"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
      whileHover={{ y: -6 }}
    >
      {/* Glow */}
      <div className="absolute -inset-px rounded-[28px] bg-gradient-to-br from-brand-gold/40 via-transparent to-brand-gold/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-sm" />

      <div className="relative bg-white rounded-[28px] overflow-hidden">
        {/* Image */}
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Badge */}
          <div className="absolute top-5 right-5">
            <span className="inline-flex items-center gap-1.5 bg-brand-red text-white text-xs font-bold px-4 py-2 rounded-full shadow-xl">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {item.badge}
            </span>
          </div>

          {/* Price */}
          <div className="absolute bottom-5 left-5">
            <span className="glass-dark text-white font-extrabold text-2xl px-5 py-2.5 rounded-2xl">
              {item.price}{" "}
              <span className="text-sm font-medium text-white/60">ر.س</span>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-7">
          <h3 className="text-xl font-extrabold text-brand-black mb-2">{item.name}</h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">{item.description}</p>
          <motion.button
            onClick={() => onOrder(item.name, item.price)}
            className="w-full flex items-center justify-center gap-2.5 bg-brand-black hover:bg-brand-red text-white font-bold py-4 rounded-2xl transition-all duration-400 text-sm cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            اطلب عبر واتساب
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Menu Item Card (Redesigned) ─── */
function MenuItemCard({ item, index, categoryColor, onOrder }: { item: MenuItem; index: number; categoryColor: string; onOrder: (name: string, price: number) => void }) {
  return (
    <motion.div
      className="group relative bg-white rounded-[20px] border border-gray-100 hover:border-brand-gold/20 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {/* Category color accent line */}
      <div className={`absolute top-0 right-0 left-0 h-1 ${categoryColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="p-5 sm:p-6">
        {/* Top Row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h4 className="font-bold text-brand-black text-base sm:text-lg leading-tight">{item.name}</h4>
              {item.popular && (
                <span className="inline-flex items-center bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                  🔥 رائج
                </span>
              )}
              {item.badge && (
                <span className="inline-flex items-center bg-brand-red/10 text-brand-red text-[10px] font-bold px-2 py-0.5 rounded-full border border-brand-red/10 whitespace-nowrap">
                  ⭐ {item.badge}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{item.description}</p>
          </div>

          {/* Price Bubble */}
          <div className="flex-shrink-0 text-left">
            <div className="bg-brand-cream rounded-2xl px-3 py-2 text-center min-w-[60px]">
              <span className="text-xl font-extrabold text-brand-black block leading-none">{item.price}</span>
              <span className="text-[10px] text-gray-400 font-medium">ر.س</span>
            </div>
          </div>
        </div>

        {/* Order Button */}
        <motion.button
          onClick={() => onOrder(item.name, item.price)}
          className="w-full flex items-center justify-center gap-2 bg-brand-charcoal hover:bg-brand-red text-white text-xs font-bold py-3 rounded-xl transition-all duration-300 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          اطلب عبر واتساب
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ─── Main MenuBoard ─── */
export default function MenuBoard() {
  const [activeTab, setActiveTab] = useState("breakfast");
  const activeCategory = categories.find((c) => c.id === activeTab)!;

  /* Order modal state */
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({ name: "", price: 0 });

  const handleOrder = useCallback((name: string, price: number) => {
    trackProductViewed(name, activeCategory.label, price);
    setSelectedItem({ name, price });
    setModalOpen(true);
  }, [activeCategory.label]);

  /* Cart */
  const { addItem, openDrawer } = useCart();

  const handleAddToCart = useCallback((name: string, price: number, quantity: number) => {
    addItem(name, price, quantity);
    openDrawer();
  }, [addItem, openDrawer]);

  const handleCloseModal = useCallback(() => setModalOpen(false), []);

  return (
    <section id="menu" className="relative bg-brand-cream overflow-x-clip">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      {/* Best Sellers Section */}
      <div className="section-padding relative">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header — DIFFERENT STYLE: Left-aligned with accent bar */}
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-1.5 h-12 bg-brand-red rounded-full" />
              <div>
                <span className="text-brand-gold text-sm font-semibold tracking-wider">
                  الأكثر طلباً
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-black leading-[1.3]">
                  وجبات <span className="text-gradient-gold">لا تُقاوم</span>
                </h2>
              </div>
            </div>
            <p className="text-gray-500 text-base sm:text-lg max-w-xl mr-8 leading-relaxed">
              اكتشف أشهر أطباقنا التي يعشقها الجميع
            </p>
          </motion.div>

          {/* Best Seller Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {bestSellers.map((item, i) => (
              <BestSellerCard key={item.name} item={item} index={i} onOrder={handleOrder} />
            ))}
          </div>
        </div>
      </div>

      {/* Full Menu Section */}
      <div className="pb-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          {/* Menu Header — DIFFERENT STYLE: Center with decorative lines */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-brand-gold/40" />
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-black">
                القائمة <span className="text-gradient-gold">الكاملة</span>
              </h2>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-brand-gold/40" />
            </div>
          </motion.div>

          {/* Category Tabs — Sticky */}
          <div className="sticky top-0 z-40 bg-brand-cream/80 backdrop-blur-xl py-4 -mx-6 px-6 mb-10">
            <div className="flex justify-center">
              <div className="flex gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-[20px] shadow-sm border border-gray-100 overflow-x-auto max-w-full scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveTab(cat.id); trackCategoryViewed(cat.label); }}
                    className={`relative flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                      activeTab === cat.id
                        ? "text-white shadow-lg"
                        : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    {activeTab === cat.id && (
                      <motion.div
                        className="absolute inset-0 bg-brand-red rounded-2xl"
                        layoutId="menuActiveTab"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="text-lg">{cat.emoji}</span>
                      <span>{cat.label}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Items Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabContentVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* Category Banner Image */}
              <div className="relative h-40 sm:h-52 rounded-[24px] overflow-hidden mb-8 group">
                <Image
                  src={activeCategory.image}
                  alt={activeCategory.label}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 right-8 flex items-center gap-3">
                  <span className="text-3xl">{activeCategory.emoji}</span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{activeCategory.label}</h3>
                    <p className="text-white/60 text-sm font-medium">{activeCategory.items.length} أصناف</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {activeCategory.items.map((item, i) => (
                  <MenuItemCard key={item.name} item={item} index={i} categoryColor={activeCategory.color} onOrder={handleOrder} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Note */}
          <motion.p
            className="text-center text-xs text-gray-400 mt-10 font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            الأسعار شاملة ضريبة القيمة المضافة • التوصيل متوفر عبر التطبيقات
          </motion.p>
        </div>
      </div>

      {/* Order Modal */}
      <OrderModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        itemName={selectedItem.name}
        unitPrice={selectedItem.price}
        onAddToCart={handleAddToCart}
      />
    </section>
  );
}
