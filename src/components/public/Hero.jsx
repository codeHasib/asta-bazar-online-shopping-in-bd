"use client";

import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  // Brand highlights for the marquee
  const marqueeItems = [
    "প্রিমিয়াম কোয়ালিটি",
    "দ্রুত ডেলিভারি",
    "আস্থা ও বিশ্বাস",
    "সেরা কালেকশন",
    "সঠিক মূল্য",
  ];

  return (
    <section className="relative w-full overflow-hidden">
      {/* ================= HERO CONTENT ================= */}
      <div className="relative h-[90vh] min-h-[600px] w-full flex items-center justify-center">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover grayscale-[30%]"
          >
            <source src="/videos/banner.mp4" type="video/mp4" />
            {/* Fallback image if video fails */}
            <div className="w-full h-full bg-slate-900" />
          </video>
          {/* Overlay Gradient for Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-white z-10" />
        </div>

        {/* Text Content */}
        <div className="relative z-20 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-blue-500 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 block">
              Welcome to Asta Bazar
            </span>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.2] mb-6 drop-shadow-2xl">
              আপনার আস্থার সঠিক <br />
              <span className="text-blue-600">ঠিকানা।</span>
            </h1>
            <p className="text-slate-200 text-sm md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              সেরা মানের পণ্য এবং দ্রুততম ডেলিভারির মাধ্যমে আপনার প্রতিদিনের
              শপিংকে করুন আরও সহজ এবং আনন্দদায়ক। আমরা বিশ্বাস করি গুণগত মানে।
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/shop"
                className="group bg-blue-600 text-white px-10 py-4 rounded-full font-bold uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-white hover:text-black transition-all shadow-xl shadow-blue-600/20 active:scale-95"
              >
                Shop Now{" "}
                <ShoppingBag
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/new-arrivals"
                className="px-10 py-4 rounded-full border border-white/30 text-white font-bold uppercase text-xs tracking-widest hover:bg-white/10 backdrop-blur-md transition-all active:scale-95"
              >
                New Arrivals
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden md:block"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-blue-600 to-transparent" />
        </motion.div>
      </div>

      {/* ================= INFINITE CAROUSEL ================= */}
      <div className="relative py-6 bg-white border-y border-slate-100 overflow-hidden select-none">
        <div className="flex w-fit animate-marquee whitespace-nowrap items-center">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center">
              {marqueeItems.map((item, index) => (
                <div key={index} className="flex items-center mx-8">
                  <span className="text-slate-800 text-sm md:text-lg font-black uppercase tracking-tighter">
                    {item}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-blue-600 mx-8" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
