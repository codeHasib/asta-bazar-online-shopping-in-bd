"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import Image from "next/image";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  MapPin,
  Truck,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart, updateQuantity, removeFromCart } =
    useCartStore();

  const [hydrated, setHydrated] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState("inside"); // inside or outside
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    setHydrated(true);
  }, []);

  // --- Calculations ---
  const subtotal = getTotalPrice();
  const deliveryCharge = deliveryLocation === "inside" ? 60 : 120;
  const finalTotal = subtotal + deliveryCharge;

  const handleOrder = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("অনুগ্রহ করে আপনার নাম, ফোন নম্বর এবং ঠিকানা দিন।");
      return;
    }

    setSubmitting(true);
    const orderPayload = {
      customerName: form.name,
      phone: form.phone,
      location: form.address,
      deliveryArea: deliveryLocation,
      items: cart,
      totalPrice: finalTotal,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (data.success) {
        setOrderSuccess(true);
        clearCart();
      }
    } catch (err) {
      alert("অর্ডার সম্পন্ন করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSubmitting(false);
    }
  };

  if (!hydrated) return null;

  // --- SUCCESS STATE ---
  if (orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="max-w-md w-full text-center space-y-6 animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={40} />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            অর্ডার সফল হয়েছে!
          </h1>
          <p className="text-slate-500 font-medium">
            আপনার অর্ডারটি আমাদের সিস্টেমে জমা হয়েছে। খুব শীঘ্রই আমাদের
            প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।
          </p>
          <Link
            href="/products"
            className="block w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl"
          >
            Shop More Items
          </Link>
        </div>
      </div>
    );
  }

  // --- EMPTY CART STATE ---
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
        <ShoppingBag size={60} className="text-slate-200" />
        <h2 className="text-xl font-black uppercase tracking-widest text-slate-400">
          আপনার ব্যাগটি খালি
        </h2>
        <Link
          href="/products"
          className="text-blue-600 font-black uppercase tracking-widest border-b-2 border-blue-600 pb-1"
        >
          শপিং শুরু করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="flex items-center gap-4 mb-12">
          <Link
            href="/products"
            className="p-2 bg-white rounded-full shadow-sm hover:text-blue-600"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            Your <span className="text-blue-600">Cart</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* --- LEFT: ITEMS LIST --- */}
          <div className="lg:col-span-7 space-y-4">
            {cart.map((item) => (
              <div
                key={`${item._id}-${item.size}`}
                className="bg-white p-2 rounded-[2rem] border border-slate-100 flex items-center gap-6 shadow-sm"
              >
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <Image
                    src={item.images?.[0] || "/placeholder.png"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-black text-slate-900 uppercase tracking-tight text-sm">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">
                    Size: {item.size}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            item.size,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                        className="p-1 hover:text-blue-600"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-bold text-xs">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.size, item.quantity + 1)
                        }
                        className="p-1 hover:text-blue-600"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-black text-blue-600 text-sm">
                      ৳{item.price * item.quantity}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item._id, item.size)}
                  className="p-3 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* --- RIGHT: CHECKOUT FORM --- */}
          <div className="lg:col-span-5">
            <div className="bg-white p-3 rounded-[2.5rem] border border-slate-100 shadow-xl sticky top-24">
              <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
                <MapPin size={20} className="text-blue-600" /> Shipping Details
              </h2>

              <div className="space-y-4 mb-8">
                <input
                  placeholder="আপনার নাম"
                  className="w-full bg-slate-50 rounded-xl py-4 px-6 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-600/20"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  placeholder="ফোন নম্বর"
                  className="w-full bg-slate-50 rounded-xl py-4 px-6 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-600/20"
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <textarea
                  placeholder="বিস্তারিত ঠিকানা (বাসা নং, রোড, এলাকা...)"
                  rows={3}
                  className="w-full bg-slate-50 rounded-xl py-4 px-6 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-600/20 resize-none"
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
              </div>

              <div className="mb-8">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                  Delivery Area
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setDeliveryLocation("inside")}
                    className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${deliveryLocation === "inside" ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200" : "bg-white text-slate-500 border-slate-200"}`}
                  >
                    Inside Dhaka (৳60)
                  </button>
                  <button
                    onClick={() => setDeliveryLocation("outside")}
                    className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${deliveryLocation === "outside" ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200" : "bg-white text-slate-500 border-slate-200"}`}
                  >
                    Outside Dhaka (৳120)
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6 space-y-3">
                <div className="flex justify-between text-sm font-bold text-slate-400 uppercase tracking-tight">
                  <span>Subtotal</span>
                  <span>৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-400 uppercase tracking-tight">
                  <span>Delivery</span>
                  <span>৳{deliveryCharge}</span>
                </div>
                <div className="flex justify-between text-xl font-black text-slate-900 uppercase tracking-tighter pt-2">
                  <span>Total</span>
                  <span className="text-blue-600">৳{finalTotal}</span>
                </div>
              </div>

              <button
                disabled={submitting}
                onClick={handleOrder}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] mt-8 hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-xl"
              >
                {submitting ? "Processing..." : "Confirm Order"}{" "}
                <Truck size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
