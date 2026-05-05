"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Menu, X, ChevronDown, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import LogoImg from "../../../public/logo.png";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useCartStore();

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Shop now", href: "/products" },
    { name: "Categories", href: "/categories", hasDropdown: true },
    { name: "About Us", href: "/about" },
  ];

  return (
    <nav className="sticky top-0 w-full z-[100] transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-[2rem] transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg border border-slate-200/50 py-3 px-6"
            : "bg-transparent py-5 px-8"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <Image
              src={LogoImg}
              alt="Brand Image"
              width={60}
              height={60}
              className="rounded-full"
            ></Image>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[11px] font-bold uppercase tracking-widest text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                {link.name}
                {link.hasDropdown && <ChevronDown size={12} />}
              </Link>
            ))}
          </div>

          {/* Icons & Actions */}
          <div className="flex items-center gap-2">
            <Link
              href={"/cart"}
              className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-full transition-all relative"
            >
              <ShoppingBag size={20} />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-blue-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            </Link>
            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 text-black hover:bg-slate-100 rounded-full transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-2xl lg:hidden z-50"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-bold uppercase tracking-tighter text-slate-800 border-b border-slate-50 pb-4 flex justify-between items-center"
                >
                  {link.name}
                  <ChevronDown
                    size={18}
                    className="-rotate-90 text-slate-300"
                  />
                </Link>
              ))}
              <div className="mt-4">
                <Link
                  href="/cart"
                  className="bg-slate-100 text-black py-4 rounded-2xl flex items-center justify-center gap-2 font-bold uppercase text-xs"
                >
                  <ShoppingBag size={18} /> Cart
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
