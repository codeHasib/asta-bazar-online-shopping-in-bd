"use client";

import { useState, useEffect } from "react";
import { Star, MessageSquare, User, Calendar } from "lucide-react";

export default function Reviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/reviews?productId=${productId}`);
        const data = await res.json();
        // Filter only approved reviews if your backend has an 'isApproved' flag
        setReviews(data.reviews || []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchReviews();
  }, [productId]);

  // Calculate average rating
  const averageRating = reviews.length
    ? (
        reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
      ).toFixed(1)
    : 0;

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-slate-100 rounded-3xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* --- REVIEW SUMMARY BAR --- */}
      <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
        <div className="text-center md:text-left">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">
            Average Rating
          </p>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-black text-slate-900 leading-none">
              {averageRating}
            </span>
            <div className="flex flex-col">
              <div className="flex text-yellow-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={
                      i < Math.round(averageRating) ? "currentColor" : "none"
                    }
                  />
                ))}
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {reviews.length} Reviews
              </span>
            </div>
          </div>
        </div>

        <div className="hidden md:block w-[1px] h-12 bg-slate-200"></div>

        <p className="text-sm font-medium text-slate-500 max-w-xs text-center md:text-left">
          আমাদের পণ্য সম্পর্কে কাস্টমারদের বাস্তব অভিজ্ঞতা। আপনার মতামত আমাদের
          মান উন্নয়নে সাহায্য করে।
        </p>
      </div>

      {/* --- REVIEWS LIST --- */}
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((r) => (
            <div
              key={r._id}
              className="group p-8 bg-white rounded-[2rem] border border-slate-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-600/5 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <User size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm">
                      {r.name}
                    </h4>
                    <div className="flex items-center gap-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={10}
                            fill={i < r.rating ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                      <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1">
                        <Calendar size={10} />{" "}
                        {new Date(
                          r.createdAt || Date.now(),
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-2 bg-slate-50 rounded-lg text-slate-300 group-hover:text-blue-200 transition-colors">
                  <MessageSquare size={16} />
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed font-medium pl-16">
                {r.comment}
              </p>

              {/* Optional: Verified Purchase Tag */}
              <div className="mt-4 pl-16">
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  Verified Purchase
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-[3rem]">
            <MessageSquare className="mx-auto text-slate-200 mb-4" size={40} />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
              এখনো কোনো রিভিউ নেই। প্রথম রিভিউটি আপনি দিন।
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
