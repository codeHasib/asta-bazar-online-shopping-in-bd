"use client";

import { useCartStore } from "@/store/cartStore";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FloatingCart() {
  const cart = useCartStore((state) => state.cart);
  const [isAnimate, setIsAnimate] = useState(false);

  // Total items calculation
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Trigger bounce animation when cart updates
  useEffect(() => {
    if (totalItems === 0) return;
    setIsAnimate(true);
    const timer = setTimeout(() => setIsAnimate(false), 300);
    return () => clearTimeout(timer);
  }, [totalItems]);

  return (
    <Link
      href="/cart"
      className={`fixed bottom-8 right-8 z-[999] flex items-center justify-center w-16 h-16 bg-slate-900 text-white rounded-2xl shadow-2xl hover:bg-blue-600 hover:-translate-y-2 transition-all duration-300 group ${
        isAnimate ? "scale-110" : "scale-100"
      }`}
    >
      {/* Dynamic Badge */}
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-black h-6 w-6 flex items-center justify-center rounded-full border-2 border-white shadow-lg animate-in zoom-in duration-300">
          {totalItems}
        </span>
      )}

      <ShoppingBag size={24} className="group-hover:rotate-12 transition-transform" />

      {/* Label that appears on hover (Desktop) */}
      <span className="absolute right-20 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap border border-slate-800 shadow-xl">
        View Cart — ৳{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
      </span>
    </Link>
  );
}