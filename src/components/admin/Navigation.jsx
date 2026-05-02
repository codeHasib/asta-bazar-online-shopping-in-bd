"use client";

import { useState } from "react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  PlusSquare,
  ShoppingBag,
  Layers,
  LogOut,
  Menu,
  X,
  Star,
} from "lucide-react";
import { signOut } from "@/lib/auth-client";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  function out() {
    signOut();
    redirect("/");
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Add Product", href: "/admin/products", icon: PlusSquare },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Categories", href: "/admin/categories", icon: Layers },
    { name: "Reviews", href: "/admin/reviews", icon: Star },
  ];

  const NavLink = ({ item, onClick = () => {} }) => {
    const isActive = pathname === item.href;
    return (
      <Link
        href={item.href}
        onClick={onClick}
        className={`flex items-center gap-4 px-6 py-3.5 rounded-xl transition-all duration-300 ${
          isActive
            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
            : "text-slate-500 hover:text-green-600 hover:bg-green-50"
        }`}
      >
        <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
        <span className="font-bold uppercase tracking-wider text-xs">
          {item.name}
        </span>
      </Link>
    );
  };

  return (
    <>
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-72 bg-white border-r border-slate-100 flex-col p-6 z-50">
        <div className="mb-10 px-4">
          <h1 className="text-2xl font-bold tracking-tight text-black">
            আস্থা <span className="text-green-600">বাজার</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
            Marketplace Admin
          </p>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </nav>

        <div className="pt-6 border-t border-slate-50">
          <button
            onClick={out}
            className="w-full flex items-center gap-4 px-6 py-4 text-red-500 font-bold uppercase tracking-widest text-xs hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* --- MOBILE TOP BAR --- */}
      <header className="lg:hidden sticky top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center z-40">
        <h1 className="text-xl font-bold tracking-tight text-black">
          আস্থা <span className="text-green-600">বাজার</span>
        </h1>
        <button onClick={() => setIsOpen(true)} className="text-black p-1">
          <Menu size={24} />
        </button>
      </header>

      {/* --- MOBILE OVERLAY SIDEBAR --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[80%] bg-white z-[70] p-8 shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <h1 className="text-lg font-bold text-black">Menu</h1>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-black"
                >
                  <X size={28} />
                </button>
              </div>
              <nav className="space-y-4 flex-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    item={item}
                    onClick={() => setIsOpen(false)}
                  />
                ))}
              </nav>
              <button
                onClick={out}
                className="flex items-center gap-4 px-6 py-4 text-red-500 font-bold uppercase tracking-widest text-xs bg-red-50 rounded-xl mt-auto"
              >
                <LogOut size={20} />
                <span>Sign Out</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- MOBILE BOTTOM NAV (Quick Actions) --- */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 px-4 py-3 flex justify-around items-center z-40 pb-safe">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} className="relative p-2">
              <item.icon
                size={22}
                className={isActive ? "text-blue-600" : "text-slate-400"}
                strokeWidth={isActive ? 2.5 : 2}
              />
              {isActive && (
                <motion.div
                  layoutId="bottomTab"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-600"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Navigation;