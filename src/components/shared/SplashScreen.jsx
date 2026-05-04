"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LogoImg from "../../../public/logo.png";

export default function SplashScreen({ onComplete }) {
  const [step, setStep] = useState(0);

  // The sequence of brand messaging
  const messages = ["আপনার আস্থার সঠিক ঠিকানা।"];

  useEffect(() => {
    // Timing for text phase
    const timer = setInterval(() => {
      setStep((prev) => prev + 1);
    }, 2400);

    // End splash after slogan + final branding display
    if (step > messages.length) {
      clearInterval(timer);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1800);
    }

    return () => clearInterval(timer);
  }, [step, onComplete, messages.length]);

  return (
    <div className="fixed inset-0 z-[999] bg-white flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {step < messages.length ? (
          /* --- CINEMATIC SLOGAN REVEAL --- */
          <motion.div
            key={`text-${step}`}
            initial={{ opacity: 0, letterSpacing: "0.2em", filter: "blur(10px)" }}
            animate={{ opacity: 1, letterSpacing: "0.4em", filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4 px-6"
          >
            <p className="text-slate-800 text-sm md:text-base font-medium text-center">
              {messages[step]}
            </p>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "40px" }}
              className="h-[1px] bg-blue-600"
            />
          </motion.div>
        ) : (
          /* --- FINAL BRANDING DISPLAY --- */
          <motion.div
            key="logo-final"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative w-28 h-28 drop-shadow-sm">
              <Image
                src={LogoImg}
                fill
                alt="Asta Bazar Logo"
                className="object-contain"
                priority
              />
            </div>
            
            <div className="flex flex-col items-center">
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-black text-2xl font-black tracking-tighter uppercase"
              >
                ASTA <span className="text-blue-600">BAZAR</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em] mt-2"
              >
                আস্থা বাজার
              </motion.p>

              {/* Progress bar loader */}
              <div className="w-48 h-[2px] bg-slate-100 mt-8 overflow-hidden rounded-full relative">
                <motion.div 
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-blue-600 to-transparent"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Corporate Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-50/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-slate-50 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}