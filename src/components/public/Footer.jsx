"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Globe, // Lucide still has general icons like Globe
} from "lucide-react";

// Standard Brand SVGs for a consistent look
const SocialIcons = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    svg: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    svg: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849s-.011 3.585-.069 4.85c-.149 3.222-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.849-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849s.012-3.584.07-4.849c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.353 2.62 6.777 6.98 6.977 1.28.057 1.688.072 4.948.072s3.668-.015 4.948-.072c4.351-.2 6.777-2.62 6.977-6.977.058-1.28.072-1.688.072-4.947s-.015-3.668-.072-4.947c-.2-4.353-2.612-6.77-6.977-6.977C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: "Shop Now", href: "/products" },
      { name: "Categories", href: "/categories" },
    ],
    support: [
      { name: "Return Policy", href: "/returns" },
      { name: "Contact Us", href: "/contact" },
    ],
    company: [
      { name: "About Asta Bazar", href: "/about" },
      { name: "Our Story", href: "/story" },
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  };

  return (
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter uppercase leading-none">
                Asta <span className="text-blue-600">Bazar</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500 mt-1">
                আস্থা বাজার
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-medium">
              আপনার আস্থার সঠিক ঠিকানা। সেরা মানের পণ্য এবং দ্রুততম ডেলিভারির
              মাধ্যমে আপনার শপিং অভিজ্ঞতাকে করছি আরও সহজ।
            </p>

            {/* UPDATED SOCIAL ICONS */}
            <div className="flex items-center gap-4">
              {SocialIcons.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm"
                >
                  {social.svg}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900 mb-6">
              Shopping
            </h4>
            <ul className="space-y-4">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-all group"
                  >
                    {link.name}{" "}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-all"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900 mb-6">
              Customer Care
            </h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900 mb-6">
              Contact Info
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-600 mt-0.5" />
                <p className="text-sm font-medium text-slate-600">
                  রিয়াজউদ্দিন বাজার, চট্টগ্রাম, বাংলাদেশ।
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-blue-600" />
                <p className="text-sm font-bold text-slate-900">
                  +8801973989270
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-600" />
                <p className="text-sm font-bold text-slate-900">
                  astabazarctg@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            © {currentYear} Asta Bazar. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Developed by{" "}
              <a
                href="https://github.com/codeHasib"
                className="text-black"
                target="_blank"
              >
                Mohammad Hasib
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
