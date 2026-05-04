"use client";

import { Star, Quote, CheckCircle2, User } from "lucide-react";

// Static Data for the Infinite Loop
const REVIEWS = [
  {
    id: 1,
    name: "তানভীর আহমেদ",
    comment:
      "জুতার কোয়ালিটি অসাধারণ! প্রিমিয়াম প্যাকেজিং এবং দ্রুত ডেলিভারি পেয়ে আমি খুব সন্তুষ্ট।",
    role: "Verified Buyer",
  },
  {
    id: 2,
    name: "শারমিন সুলতানা",
    comment:
      "বেডশিটের কাপড় একদম সফট এবং কালারটা ঠিক ছবির মতোই। আস্থা বাজারের সার্ভিস সত্যিই সেরা।",
    role: "Premium Member",
  },
  {
    id: 3,
    name: "ফয়সাল মাহমুদ",
    comment:
      "পাঞ্জাবির কাপড়টা বেশ আরামদায়ক। সাইজটা একদম পারফেক্ট ছিল। ডেলিভারি অনেক ফাস্ট।",
    role: "Verified Buyer",
  },
  {
    id: 4,
    name: "নুসরাত জাহান",
    comment:
      "এদের কাস্টমার সাপোর্ট অনেক হেল্পফুল। প্রোডাক্ট এক্সচেঞ্জ করতে গিয়ে কোনো ঝামেলা হয়নি।",
    role: "Loyal Customer",
  },
  {
    id: 5,
    name: "জাহিদুল ইসলাম",
    comment:
      "প্রিমিয়াম লুকিং সিকার্স! কোয়ালিটি নিয়ে কোনো কমপ্লেইন নেই। ইউনিক ডিজাইন কালেকশন।",
    role: "Verified Buyer",
  },
];

export default function InfiniteReviewLoop() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center md:text-left">
        <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] block mb-3">
          Customer Stories
        </span>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">
          আমাদের ওপর গ্রাহকদের <span className="text-blue-600">আস্থা।</span>
        </h2>
      </div>

      {/* --- INFINITE SCROLL TRACK --- */}
      <div className="flex flex-col gap-8">
        {/* First Row: Scrolling Left */}
        <div className="flex overflow-hidden select-none group">
          <div className="flex w-fit animate-loop-scroll py-4 group-hover:paused">
            {[...REVIEWS, ...REVIEWS].map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>

        {/* Second Row: Scrolling Right (Optional for more variety) */}
        <div className="flex overflow-hidden select-none group">
          <div className="flex w-fit animate-loop-scroll-reverse py-4 group-hover:paused">
            {[...REVIEWS, ...REVIEWS].reverse().map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="w-[350px] md:w-[450px] mx-4 flex-shrink-0 bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem] transition-all hover:bg-white hover:shadow-xl hover:shadow-blue-600/5 group/card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-0.5 text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill="currentColor" />
          ))}
        </div>
        <Quote
          className="text-blue-100 group-hover/card:text-blue-600 transition-colors"
          size={24}
        />
      </div>

      <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium italic mb-8">
        &quot;{review.comment}&quot;
      </p>

      <div className="flex items-center gap-4 pt-6 border-t border-slate-200/50">
        <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm">
          <User size={20} />
        </div>
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
            {review.name}
            <CheckCircle2 size={12} className="text-green-500" />
          </h4>
          <p className="text-[9px] font-bold text-blue-600 uppercase tracking-widest mt-0.5">
            {review.role}
          </p>
        </div>
      </div>
    </div>
  );
}
