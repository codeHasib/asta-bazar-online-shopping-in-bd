"use client";

import React from "react";
import {
  RotateCcw,
  ShieldCheck,
  Truck,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function ReturnPolicy() {
  const steps = [
    {
      title: "আবেদন করুন",
      desc: "পণ্য পাওয়ার ৪৮ ঘণ্টার মধ্যে আমাদের ফেসবুক ইনবক্স বা হেল্পলাইনে যোগাযোগ করুন।",
      icon: <AlertCircle size={20} />,
    },
    {
      title: "যাচাইকরণ",
      desc: "আমাদের টিম আপনার অভিযোগটি যাচাই করবে এবং রিটার্ন রিকোয়েস্ট অ্যাপ্রুভ করবে।",
      icon: <ShieldCheck size={20} />,
    },
    {
      title: "পণ্য ফেরত",
      desc: "অরিজিনাল প্যাকেজিং সহ পণ্যটি আমাদের ঠিকানায় কুরিয়ার করুন।",
      icon: <Truck size={20} />,
    },
    {
      title: "রিফান্ড",
      desc: "পণ্য আমাদের কাছে পৌঁছানোর ৭-১০ কার্যদিবসের মধ্যে রিফান্ড সম্পন্ন হবে।",
      icon: <CheckCircle2 size={20} />,
    },
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-12 md:pt-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold uppercase tracking-widest text-[10px] mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-slate-900 leading-none mb-4">
          Return <span className="text-blue-600">&</span> <br />
          Refund Policy
        </h1>
        <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
          আস্তা বাজার-এ আমরা আপনার প্রতিটি কেনাকাটার নিরাপত্তা নিশ্চিত করি। কোনো
          কারণে পণ্য নিয়ে সন্তুষ্ট না হলে আমাদের সহজ রিটার্ন পলিসি ফলো করুন।
        </p>
      </div>

      {/* --- QUICK STEPS --- */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex flex-col items-start gap-4"
            >
              <div className="w-10 h-10 bg-white text-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                {step.icon}
              </div>
              <div>
                <h3 className="font-black text-slate-900 uppercase tracking-tight text-sm mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- DETAILED TERMS --- */}
      <section className="max-w-4xl mx-auto px-6 py-10 space-y-12">
        <div className="space-y-4">
          <h2 className="text-xl font-black uppercase tracking-widest text-slate-900 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-blue-600"></span> ১. রিটার্ন
            শর্তাবলী
          </h2>
          <ul className="list-disc pl-12 space-y-3 text-slate-600 font-medium text-sm leading-relaxed">
            <li>পণ্যটি অব্যবহৃত (Unused) এবং অরিজিনাল প্যাকেজিং সহ হতে হবে।</li>
            <li>
              পণ্য পাওয়ার সর্বোচ্চ <strong>৪৮ ঘণ্টার</strong> মধ্যে আমাদের
              জানাতে হবে।
            </li>
            <li>
              কসমেটিকস বা পার্সোনাল কেয়ার পণ্যের ক্ষেত্রে সিল খোলা থাকলে তা
              রিটার্নযোগ্য নয়।
            </li>
            <li>
              ডেলিভারি করার সময় যদি পণ্যটি ভাঙা বা নষ্ট অবস্থায় পান, তবে সাথে
              সাথেই ডেলিভারি ম্যানের সামনে আমাদের জানান।
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-black uppercase tracking-widest text-slate-900 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-blue-600"></span> ২. রিফান্ড পদ্ধতি
          </h2>
          <p className="pl-12 text-slate-600 font-medium text-sm leading-relaxed">
            রিটার্ন করা পণ্যটি আমাদের কোয়ালিটি চেক টিমের মাধ্যমে যাচাই হওয়ার পর
            রিফান্ড প্রসেস শুরু হবে। আপনি চাইলে আপনার প্রদানকৃত মূল্যের সমপরিমাণ
            টাকা <strong>বিকাশ, নগদ বা ব্যাংক ট্রান্সফারের</strong> মাধ্যমে ফেরত
            নিতে পারেন।
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-black uppercase tracking-widest text-slate-900 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-blue-600"></span> ৩. ডেলিভারি চার্জ
          </h2>
          <p className="pl-12 text-slate-600 font-medium text-sm leading-relaxed">
            পণ্য যদি ত্রুটিপূর্ণ (Defective) হয়, তবে রিটার্ন ডেলিভারি চার্জ
            আস্তা বাজার বহন করবে। তবে আপনি যদি ব্যক্তিগত পছন্দের কারণে পণ্য
            পরিবর্তন করতে চান, সেক্ষেত্রে ডেলিভারি চার্জ কাস্টমারকে বহন করতে
            হবে।
          </p>
        </div>
      </section>

      {/* --- HELP CTA --- */}
      <section className="max-w-7xl mx-auto px-6 pt-10">
        <div className="bg-slate-900 p-10 md:p-16 rounded-[3rem] text-center relative overflow-hidden">
          <div className="relative z-10">
            <RotateCcw className="mx-auto text-blue-600 mb-6" size={40} />
            <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">
              আপনার কি আরও কিছু{" "}
              <span className="text-blue-600">জানার আছে?</span>
            </h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-8">
              আমাদের সাপোর্ট টিম ২৪/৭ আপনার সেবায় নিয়োজিত।
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="tel:+8801973989270"
                className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all"
              >
                Call Helpline
              </a>
              <button className="bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-slate-900 transition-all">
                <a
                  href="https://wa.me/8801973989270"
                  className="inline-block h-full w-full cursor-pointer px-8 py-4 "
                >
                  Live Chat
                </a>
              </button>
            </div>
          </div>
          {/* Decorative Blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]"></div>
        </div>
      </section>
    </div>
  );
}
