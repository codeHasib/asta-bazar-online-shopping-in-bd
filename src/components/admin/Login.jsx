"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, ShieldCheck } from "lucide-react";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { data, error: signInError } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
    });

    setIsLoading(false);

    if (signInError) {
      setError(signInError.message || "Invalid credentials. Please try again.");
      setSuccess(false);
    } else if (data) {
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1500);
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 font-sans text-black px-6 py-12 relative overflow-hidden">
      
      {/* Soft Background Accents */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        className="w-full max-w-md bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-slate-200 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-black">
            আস্থা <span className="text-green-600">বাজার</span>
          </h1>
          <div className="h-1 w-12 bg-blue-600 mx-auto mt-2 rounded-full" />
          <p className="text-slate-500 font-medium text-xs tracking-widest mt-4 uppercase">
            Admin Management Portal
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-50 text-red-600 p-4 mb-6 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-green-50 text-green-700 p-4 mb-6 rounded-xl text-sm font-medium border border-green-100 flex items-center gap-2"
            >
              <ShieldCheck size={18} />
              Verified. Opening Dashboard...
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={onSubmit} className="space-y-6">
          <motion.div variants={itemVariants}>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@astabazar.com"
                className="block w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none transition-all placeholder:text-slate-300"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none transition-all placeholder:text-slate-300"
              />
            </div>
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            type="submit"
            disabled={isLoading || success}
            className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-lg shadow-green-600/10 ${
              success
                ? "bg-blue-600 text-white"
                : isLoading
                  ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {isLoading ? "Checking Security..." : success ? "Welcome" : "Login to Marketplace"}
          </motion.button>
        </form>

        <motion.p
          variants={itemVariants}
          className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-10"
        >
          &copy; {new Date().getFullYear()} Asta Bazar. Managed by Akther Hossain.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
