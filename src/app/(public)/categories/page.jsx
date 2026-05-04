"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Cpu,
  Shirt,
  Footprints,
  Home,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    description: "Next-gen tech gadgets.",
    icon: <Cpu size={18} />,
    image: "/images/electronics.jpg",
    // Large square on mobile, wide on desktop
    gridClass: "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    name: "Cosmetics",
    slug: "cosmetics",
    description: "Premium beauty care.",
    icon: <Sparkles size={18} />,
    image: "/images/cosmetics.jpg",
    gridClass: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    name: "Fashion",
    slug: "clothing",
    description: "Modern trends.",
    icon: <Shirt size={18} />,
    image: "/images/fashion.jpg",
    gridClass: "col-span-1 row-span-2 md:col-span-1 md:row-span-2",
  },
  {
    id: 4,
    name: "Footwear",
    slug: "footwear",
    description: "Luxury steps.",
    icon: <Footprints size={18} />,
    image: "/images/footwear.jpg",
    gridClass: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
  },
  {
    id: 5,
    name: "Home",
    slug: "home-living",
    description: "Elevate your space.",
    icon: <Home size={18} />,
    image: "/images/home.jpg",
    gridClass: "col-span-2 row-span-1 md:col-span-2 md:row-span-1",
  },
];

export default function CategoriesPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-10 md:pt-20">
        {/* Header - Simplified for Mobile */}
        <div className="mb-10 md:mb-16">
          <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-2">
            Asta Bazar Collections
          </p>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-slate-900 leading-tight">
            Our <span className="text-blue-600">Categories</span>
          </h1>
        </div>

        {/* --- MOBILE-FIRST BENTO GRID --- */}
        {/* Changed to grid-cols-2 for mobile to keep items clickable and clear */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 auto-rows-[160px] md:auto-rows-[250px]">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products`}
              className={`group relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-slate-100 active:scale-95 transition-all duration-300 ${cat.gridClass}`}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${cat.image})` }}
              >
                {/* Gradient: Darker on mobile for instant text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-90"></div>
              </div>

              {/* Content Layer */}
              <div className="absolute inset-0 z-10 p-4 md:p-8 flex flex-col justify-end">
                {/* Icon: Smaller on mobile */}
                <div className="mb-2 hidden md:block">
                  <div className="inline-flex p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-blue-400">
                    {cat.icon}
                  </div>
                </div>

                <h2 className="text-lg md:text-3xl font-black text-white uppercase tracking-tighter leading-tight">
                  {cat.name}
                </h2>

                {/* Description: Hidden on very small cards on mobile to prevent clutter */}
                <p className="text-slate-300 text-[8px] md:text-[10px] font-bold uppercase tracking-widest mt-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  {cat.description}
                </p>

                {/* Mobile "Go" Arrow */}
                <div className="mt-3 flex items-center justify-between md:justify-start gap-2">
                  <span className="text-white font-black uppercase text-[8px] md:text-[10px] tracking-widest md:opacity-0 md:group-hover:opacity-100 transition-all">
                    Browse
                  </span>
                  <div className="p-2 bg-blue-600 rounded-full text-white md:bg-transparent md:p-0">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile-Friendly CTA */}
        <div className="mt-12 p-8 md:p-12 bg-slate-900 rounded-[2rem] md:rounded-[3rem] text-center relative overflow-hidden">
          <h3 className="text-white text-xl md:text-3xl font-black uppercase tracking-tighter mb-6 relative z-10">
            Explore Full Store
          </h3>
          <Link
            href="/products"
            className="flex items-center justify-center gap-3 bg-blue-600 text-white w-full md:w-auto md:inline-flex px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] active:scale-95 transition-all relative z-10"
          >
            View All Items <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
