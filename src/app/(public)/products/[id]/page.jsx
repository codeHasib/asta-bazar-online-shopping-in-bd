"use client";

import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Reviews from "@/components/public/ProductReviews";
import {
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  Send,
  PhoneCall,
  MessageCircle,
} from "lucide-react";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCartStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // --- FIX: Form state now matches your backend (name, rating, comment) ---
  const [form, setForm] = useState({
    name: "",
    rating: 5,
    comment: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/`, { cache: "no-store" });
        const data = await res.json();
        const foundProduct = data.products.find((item) => item._id == id);
        console.log(foundProduct);
        setProduct(foundProduct);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // --- FIX: submitReview function matching your successful logic ---
  const submitReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: id,
          ...form,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("রিভিউটি সফলভাবে জমা দেওয়া হয়েছে এবং অনুমোদনের অপেক্ষায় আছে।");
        setForm({ name: "", rating: 5, comment: "" });
      }
    } catch (error) {
      alert("দুঃখিত, রিভিউ জমা দেওয়া সম্ভব হয়নি।");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-black uppercase text-slate-400">
        Loading...
      </div>
    );
  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center font-black uppercase text-red-500">
        Product Not Found
      </div>
    );

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-12">
        {/* TOP SECTION: PRODUCT DETAILS */}
        <div className="grid lg:grid-cols-2 gap-16 mb-32">
          {/* Left: Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-inner">
              <Image
                alt={product.title}
                fill
                src={product.images?.[activeImage] || "/placeholder.png"}
                className="object-cover"
              />
            </div>
            <div className="flex gap-4">
              {product.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${activeImage === idx ? "border-blue-600" : "border-transparent opacity-60"}`}
                >
                  <Image src={img} fill className="object-cover" alt="thumb" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          {/* Out of Stock Message Overlay */}
          {!product.inStock && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-2xl animate-pulse">
              <p className="text-red-700 font-black uppercase tracking-widest text-xs flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                This Product is Currently Out of Stock
              </p>
            </div>
          )}

          <div className="w-full space-y-3 mb-10">
            <div className="grid grid-cols-2 gap-3">
              {/* ADD TO CART - Disabled State Applied */}
              <button
                onClick={() => addToCart(product, quantity)}
                disabled={!product.inStock}
                className={`py-4 rounded-2xl font-black uppercase tracking-tighter flex items-center justify-center gap-2 transition-all shadow-lg text-[10px] sm:text-xs
        ${
          !product.inStock
            ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
            : "bg-orange-500 text-white hover:bg-blue-600 active:scale-95"
        }`}
              >
                <ShoppingBag size={16} className="shrink-0" />
                <span className="truncate">Add to Cart</span>
              </button>

              {/* ORDER NOW - Remove shake and change color if out of stock */}
              <button
                onClick={() => {
                  addToCart(product, quantity);
                  redirect("/cart");
                }}
                disabled={!product.inStock}
                className={`py-4 rounded-2xl font-black uppercase tracking-tighter flex items-center justify-center gap-2 transition-all shadow-lg text-[10px] sm:text-xs
        ${
          !product.inStock
            ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
            : "animate-shake bg-slate-900 text-white hover:bg-blue-600 active:scale-95"
        }`}
              >
                <ShoppingBag size={16} className="shrink-0" />
                <span className="truncate">Order Now</span>
              </button>

              {/* CALL FOR ORDER - Stays active but turns neutral if you prefer to allow inquiries */}
              <a
                href={product.inStock ? "tel:+8801973989270" : "#"}
                className={`py-4 rounded-2xl font-black uppercase tracking-tighter flex items-center justify-center gap-2 transition-all shadow-lg text-[10px] sm:text-xs
        ${
          !product.inStock
            ? "bg-slate-100 text-slate-400 pointer-events-none"
            : "bg-blue-600 hover:bg-blue-700 text-white active:scale-95"
        }`}
              >
                <PhoneCall size={16} className="shrink-0" />
                <span className="truncate">Call for Order</span>
              </a>

              {/* WHATSAPP ORDER */}
              <a
                href={product.inStock ? "https://wa.me/8801973989270" : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`py-4 rounded-2xl font-black uppercase tracking-tighter flex items-center justify-center gap-2 transition-all shadow-lg text-[10px] sm:text-xs
        ${
          !product.inStock
            ? "bg-slate-100 text-slate-400 pointer-events-none"
            : "bg-green-500 hover:bg-green-600 text-white active:scale-95"
        }`}
              >
                <MessageCircle size={16} className="shrink-0" />
                <span className="truncate">WhatsApp</span>
              </a>
            </div>
            <div className="my-5">
              <h2 className="text-xl font-bold text-blue-600 mb-5 underline">
                <span className="text-green-600">পণ্যের</span>{" "}
                <span>বিবরণ</span>
              </h2>

              <p className="text-black font-medium leading-relaxed mb-10 border-l-4 border-blue-600 pl-6">
                &quot;{product.description}&quot;
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: REVIEWS AREA */}
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Add Review Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">
                Share Your <span className="text-blue-600">Experience</span>
              </h3>

              <form
                onSubmit={submitReview}
                className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 space-y-4"
              >
                <div>
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Full Name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white rounded-xl py-3 px-5 text-sm font-bold shadow-sm outline-none focus:ring-2 focus:ring-blue-600/20 transition-all mt-1"
                    placeholder="আপনার নাম"
                  />
                </div>

                <div>
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Rating
                  </label>
                  <select
                    value={form.rating}
                    onChange={(e) =>
                      setForm({ ...form, rating: Number(e.target.value) })
                    }
                    className="w-full bg-white rounded-xl py-3 px-5 text-sm font-bold shadow-sm outline-none mt-1 appearance-none cursor-pointer"
                  >
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>
                        {n} Stars
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Comment
                  </label>
                  <textarea
                    required
                    value={form.comment}
                    onChange={(e) =>
                      setForm({ ...form, comment: e.target.value })
                    }
                    rows={4}
                    className="w-full bg-white rounded-xl py-3 px-5 text-sm font-bold shadow-sm outline-none resize-none mt-1"
                    placeholder="রিভিউ লিখুন..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all flex items-center justify-center gap-2 disabled:bg-slate-300 shadow-lg shadow-blue-600/20"
                >
                  {submitting ? "Sending..." : "Submit Review"}{" "}
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-8">
            <Reviews productId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
