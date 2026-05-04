"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  ArrowRight,
  Clock,
  ShieldCheck,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

export default function ContactSection() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    const SERVICE_ID = "service_tjvncwr";
    const TEMPLATE_ID = "template_2m3nlje";
    const PUBLIC_KEY = "-GaV6jMONa3JU0pwm";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY).then(
      (result) => {
        alert("আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।");
        formRef.current.reset();
        setLoading(false);
      },
      (error) => {
        alert("বার্তা পাঠানো সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
        setLoading(false);
      }
    );
  };

  return (
    <section className="bg-white py-24 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-50/40 blur-[140px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* --- HEADER --- */}
        <div className="mb-20 space-y-4">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.5em] block"
          >
            Connect With Us
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-900 leading-none"
          >
            আপনার মতামত আমাদের <br /> <span className="text-blue-600 underline decoration-slate-100 underline-offset-8">অনুপ্রেরণা।</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* --- LEFT: CONTACT INFO CARDS --- */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group transition-all hover:bg-white hover:shadow-xl hover:shadow-blue-600/5"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                <MessageCircle size={24} />
              </div>
              <h4 className="text-[11px] tracking-[0.3em] uppercase font-black mb-2 text-slate-900">
                WhatsApp Support
              </h4>
              <p className="text-sm text-slate-500 mb-4 font-medium">পণ্য এবং সাইজিং সম্পর্কে সরাসরি পরামর্শ পেতে মেসেজ দিন।</p>
              <a href="tel:+880XXXXXXXXXX" className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors">
                +880 XXXX XXXXXX
              </a>
            </motion.div>

            {/* Email Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group transition-all hover:bg-white hover:shadow-xl hover:shadow-blue-600/5"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                <Mail size={24} />
              </div>
              <h4 className="text-[11px] tracking-[0.3em] uppercase font-black mb-2 text-slate-900">
                Official Enquiries
              </h4>
              <p className="text-sm text-slate-500 mb-4 font-medium">অর্ডার এবং কর্পোরেট গিফটিং সংক্রান্ত তথ্যের জন্য ইমেইল করুন।</p>
              <a href="mailto:hello@astabazar.com" className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors">
                hello@astabazar.com
              </a>
            </motion.div>

            {/* Service Status */}
            <div className="flex items-center gap-4 px-8 py-6 bg-blue-600 rounded-[2rem] text-white shadow-lg shadow-blue-600/20">
               <div className="p-3 bg-white/10 rounded-xl">
                 <ShieldCheck size={20} />
               </div>
               <div>
                 <p className="text-[9px] font-bold uppercase tracking-widest opacity-80">Store Reliability</p>
                 <p className="text-xs font-bold uppercase tracking-tighter">আস্থা ও বিশ্বাসের সাথে আপনার পাশে।</p>
               </div>
            </div>
          </div>

          {/* --- RIGHT: THE CONTACT FORM --- */}
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-[3rem] p-8 md:p-12 shadow-sm">
            <form ref={formRef} onSubmit={sendEmail} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">আপনার নাম</label>
                  <input
                    type="text"
                    name="from_name"
                    required
                    placeholder="Full Name"
                    className="w-full bg-slate-50 rounded-2xl px-6 py-4 text-sm font-bold border border-slate-50 outline-none focus:border-blue-600 focus:bg-white transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">ইমেইল ঠিকানা</label>
                  <input
                    type="email"
                    name="reply_to"
                    required
                    placeholder="Email Address"
                    className="w-full bg-slate-50 rounded-2xl px-6 py-4 text-sm font-bold border border-slate-50 outline-none focus:border-blue-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">বিষয় নির্বাচন করুন</label>
                <div className="relative">
                  <select
                    name="subject"
                    required
                    className="w-full bg-slate-50 rounded-2xl px-6 py-4 text-sm font-bold border border-slate-50 outline-none focus:border-blue-600 focus:bg-white appearance-none transition-all cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Status">Order Status</option>
                    <option value="Business Inquiries">Business Inquiries</option>
                  </select>
                  <ArrowRight size={16} className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-slate-300" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">বার্তা লিখুন</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Your Message..."
                  className="w-full bg-slate-50 rounded-2xl px-6 py-4 text-sm font-bold border border-slate-50 outline-none focus:border-blue-600 focus:bg-white transition-all resize-none"
                />
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full bg-blue-600 text-white py-5 rounded-[1.5rem] text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-slate-900 transition-all duration-500 group shadow-xl shadow-blue-600/20 disabled:bg-slate-200"
              >
                {loading ? "Sending..." : "বার্তা পাঠান"}
                <Send
                  size={16}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}