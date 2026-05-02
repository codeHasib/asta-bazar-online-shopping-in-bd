"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Trash2,
  Star,
  MessageSquare,
  User,
  Clock,
  CheckCircle2,
  ThumbsUp,
  Inbox,
} from "lucide-react";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState("pending"); // pending, approved, all
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/reviews?all=true", { cache: "no-store" });
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (err) {
      console.error("Error fetching reviews");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const approve = async (id) => {
    const res = await fetch(`/api/reviews/${id}`, {
      method: "PATCH",
      cache: "no-store",
    });

    if (res.ok) fetchReviews();
  };

  const remove = async (id) => {
    if (!window.confirm("Permanently delete this customer feedback?")) return;

    const res = await fetch(`/api/reviews/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    if (res.ok) fetchReviews();
  };

  const filteredReviews = reviews.filter((r) => {
    if (filter === "all") return true;
    return r.status === filter;
  });

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-12 pb-32">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight uppercase">
            Customer <span className="text-blue-600">Feedback</span>
          </h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
            আস্থা বাজার | Manage Your Store's Reputation
          </p>
        </div>

        {/* Tab Filter System */}
        <div className="flex bg-slate-100 border border-slate-200 p-1.5 rounded-2xl">
          {["pending", "approved", "all"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                filter === tab
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-4xl">
        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
            <Inbox size={12} /> Pending Queue
          </p>
          <p className="text-3xl font-bold tracking-tight">
            {reviews.filter((r) => r.status === "pending").length}
          </p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
            <ThumbsUp size={12} /> Published
          </p>
          <p className="text-3xl font-bold tracking-tight text-blue-600">
            {reviews.filter((r) => r.status === "approved").length}
          </p>
        </div>
      </div>

      {/* Review Feed */}
      <div className="space-y-4 max-w-4xl">
        <AnimatePresence mode="popLayout">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((r) => (
              <motion.div
                key={r._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:shadow-md transition-all relative group"
              >
                {/* User Identity */}
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 text-blue-600 flex-shrink-0">
                  <User size={24} />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-sm font-bold uppercase tracking-tight text-slate-800">
                      {r.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                      <Star
                        size={10}
                        className="fill-amber-500 text-amber-500"
                      />
                      <span className="text-[10px] font-bold text-amber-700">
                        {r.rating}/5
                      </span>
                    </div>
                    {r.status === "approved" && (
                      <span className="flex items-center gap-1 text-[9px] font-bold uppercase text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-100">
                        <CheckCircle2 size={10} /> Published
                      </span>
                    )}
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-4 font-medium italic">
                    "{r.comment}"
                  </p>

                  <div className="flex items-center gap-4">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <Clock size={12} /> Recent Submission
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col gap-2 justify-center">
                  {r.status === "pending" && (
                    <button
                      onClick={() => approve(r._id)}
                      className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl transition-all shadow-lg shadow-blue-600/10 active:scale-95 flex items-center justify-center gap-2"
                      title="Approve Review"
                    >
                      <ShieldCheck size={18} />
                      <span className="md:hidden text-[10px] font-bold uppercase tracking-widest">
                        Approve
                      </span>
                    </button>
                  )}
                  <button
                    onClick={() => remove(r._id)}
                    className="flex-1 md:flex-none bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 p-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
                    title="Delete Review"
                  >
                    <Trash2 size={18} />
                    <span className="md:hidden text-[10px] font-bold uppercase tracking-widest">
                      Delete
                    </span>
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-24 text-center border-2 border-dashed border-slate-100 rounded-[3rem] bg-slate-50/50">
              <MessageSquare
                size={40}
                className="mx-auto text-slate-200 mb-4"
              />
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                {isLoading
                  ? "Synchronizing reviews..."
                  : "No items found in this filter"}
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
