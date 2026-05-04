"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Target, Heart, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      title: "সেরা মান",
      desc: "আমরা প্রতিটি পণ্যের গুণগত মান কঠোরভাবে যাচাই করি।",
      icon: <ShieldCheck size={24} className="text-blue-600" />,
    },
    {
      title: "সততা",
      desc: "স্বচ্ছতা এবং সততাই আস্তা বাজার-এর মূল ভিত্তি।",
      icon: <Target size={24} className="text-blue-600" />,
    },
    {
      title: "কাস্টমার ফার্স্ট",
      desc: "আমাদের কাছে আপনার সন্তুষ্টিই প্রথম অগ্রাধিকার।",
      icon: <Heart size={24} className="text-blue-600" />,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-40">
          <video
            src="/videos/banner.mp4"
            alt="Asta Bazar Background"
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 to-slate-900"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <p className="text-blue-400 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4">
            Since 2026 — Asta Bazar
          </p>
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
            আমাদের <span className="text-blue-600">গল্প</span>
          </h1>
        </div>
      </section>

      {/* --- MAIN STORY --- */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 mb-8">
              বিশ্বাস আর আধুনিকতার <br /> এক অনন্য{" "}
              <span className="text-blue-600">মেলবন্ধন</span>
            </h2>
            <div className="space-y-6 text-slate-600 font-medium leading-relaxed">
              <p>
                <strong className="text-slate-900 italic">আস্তা বাজার</strong>{" "}
                শুধুমাত্র একটি ই-কমার্স প্ল্যাটফর্ম নয়; এটি একটি আধুনিক
                জীবনযাত্রার স্বপ্ন। আমরা বিশ্বাস করি, অনলাইন কেনাকাটা শুধু পণ্য
                আদান-প্রদান নয়, এটি একটি আস্থার সম্পর্ক।
              </p>
              <p>
                আমাদের লক্ষ্য হলো বাংলাদেশের প্রতিটি মানুষের কাছে সাশ্রয়ী মূল্যে
                প্রিমিয়াম কোয়ালিটির ইলেকট্রনিক্স, কসমেটিকস এবং ফ্যাশন সামগ্রী
                পৌঁছে দেওয়া। প্রতিটি অর্ডার আমরা পরম যত্নে হ্যান্ডেল করি, যেন
                আপনি পান সেরা অভিজ্ঞতা।
              </p>
            </div>
          </div>

          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50">
            <Image
              src="/logo.png"
              alt="Our Mission"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section className="bg-slate-50 py-24 px-6 rounded-[4rem] mx-4 md:mx-10 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-2">
              Our Values
            </h3>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">
              আমরা যা <span className="text-blue-600">বিশ্বাস করি</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <div
                key={i}
                className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-600/5 transition-all group"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {val.icon}
                </div>
                <h4 className="text-xl font-black uppercase tracking-tight mb-4 text-slate-900">
                  {val.title}
                </h4>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- OWNER'S MESSAGE / SIGNATURE --- */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <Zap className="mx-auto text-blue-600 mb-8" size={40} />
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter mb-8 leading-tight">
          "আমাদের মূল লক্ষ্য হলো আধুনিক প্রযুক্তির মাধ্যমে আপনার জীবনকে সহজ ও
          সুন্দর করে তোলা।"
        </h2>
        <div className="space-y-1">
          <p className="text-blue-600 font-black uppercase tracking-widest text-sm">
            আক্তার হোসাইন
          </p>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
            প্রতিষ্ঠাতা, আস্তা বাজার
          </p>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">
              এখনই কেনাকাটা <br />
              <span className="text-blue-600">শুরু করুন</span>
            </h2>
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white hover:text-slate-900 transition-all active:scale-95 shadow-2xl shadow-blue-600/20"
            >
              Shop the Collection <ArrowRight size={18} />
            </Link>
          </div>
          {/* Background Decorative Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
        </div>
      </section>
    </div>
  );
}
