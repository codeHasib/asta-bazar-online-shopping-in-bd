"use client";

import { PhoneCall, Mail, MapPin, MessageCircle, Send } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="bg-white min-h-screen text-slate-900 font-jakarta px-6 py-12 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
            Get in <span className="text-blue-500">Touch</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl uppercase tracking-widest font-medium">
            Experience premium support for your luxury lifestyle needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Contact Form */}
          <div className="space-y-8">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    className="border-b-2 border-slate-200 py-3 focus:border-orange-500 outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="hello@astabazar.com"
                    className="border-b-2 border-slate-200 py-3 focus:border-orange-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  placeholder="How can we help you today?"
                  className="border-b-2 border-slate-200 py-3 focus:border-orange-500 outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <button className="w-full md:w-auto bg-slate-900 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-orange-500 transition-all shadow-2xl active:scale-95">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>

          {/* Right: Contact Info & Support Cards */}
          <div className="flex flex-col gap-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* WhatsApp Support Card */}
              <a
                href="https://wa.me/8801973989270"
                target="_blank"
                rel="noreferrer"
                className="group p-8 border border-slate-100 rounded-[2rem] hover:bg-green-50 transition-all"
              >
                <MessageCircle
                  className="text-green-500 mb-4 group-hover:scale-110 transition-transform"
                  size={32}
                />
                <h3 className="font-black uppercase tracking-tighter text-xl">
                  WhatsApp
                </h3>
                <p className="text-sm text-slate-500 mt-2">+880 1973-989270</p>
              </a>

              {/* Phone Support Card */}
              <a
                href="tel:+8801973989270"
                className="group p-8 border border-slate-100 rounded-[2rem] hover:bg-blue-50 transition-all"
              >
                <PhoneCall
                  className="text-blue-600 mb-4 group-hover:scale-110 transition-transform"
                  size={32}
                />
                <h3 className="font-black uppercase tracking-tighter text-xl">
                  Call Us
                </h3>
                <p className="text-sm text-slate-500 mt-2">Available 24/7</p>
              </a>
            </div>

            {/* Office Info Section */}
            <div className="bg-slate-50 p-8 rounded-[2rem] flex items-start gap-6">
              <div className="bg-white p-4 rounded-2xl shadow-sm">
                <MapPin className="text-orange-500" size={24} />
              </div>
              <div>
                <h3 className="font-black uppercase tracking-tighter text-xl mb-2">
                  Our Location
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  Riyazuddin Bazar, Chattogram, Chittagong Division
                  <br />
                  Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
