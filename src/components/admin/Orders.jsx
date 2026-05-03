"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  MapPin,
  Phone,
  Check,
  X,
  Truck,
  Clock,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    const res = await fetch("/api/orders", { cache: "no-store" });
    const data = await res.json();
    setOrders(data.orders || []);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    await fetch(`/api/orders/${id}`, {
      cache: "no-store",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await fetchOrders();
    setUpdatingId(null);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "approved":
        return "text-blue-600 bg-blue-50 border-blue-100";
      case "delivered":
        return "text-green-600 bg-green-50 border-green-100";
      case "declined":
        return "text-red-600 bg-red-50 border-red-100";
      default:
        return "text-amber-600 bg-amber-50 border-amber-100";
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-4 lg:p-10 pb-28">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black uppercase">
            Order <span className="text-blue-600">Fulfillment</span>
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              আস্থা বাজার | {orders.length} Active Orders
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-6 max-w-5xl mx-auto">
        <AnimatePresence mode="popLayout">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className={`bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm transition-all ${
                updatingId === order._id
                  ? "opacity-50 grayscale"
                  : "opacity-100"
              }`}
            >
              {/* Order Header */}
              <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/50 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-black uppercase tracking-tight">
                      {order.customerName}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${getStatusStyles(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-slate-500">
                    <span className="flex items-center gap-1.5 text-xs font-semibold">
                      <Phone size={14} className="text-blue-600" />{" "}
                      {order.phone}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold">
                      <MapPin size={14} className="text-blue-600" />{" "}
                      {order.location}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                    Amount Payable
                  </p>
                  <p className="text-2xl font-bold text-black tracking-tight">
                    ৳ {order.totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Items Table-Style List */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-blue-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                          <Package size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 uppercase">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">
                            Size: {item.size || "Standard"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-400">QTY</p>
                        <p className="text-sm font-bold text-black">
                          ×{item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Actions */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-end items-center gap-3">
                  {order.status !== "declined" &&
                    order.status !== "delivered" && (
                      <button
                        onClick={() => updateStatus(order._id, "declined")}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-400 border border-slate-200 font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all"
                      >
                        <X size={16} /> Decline
                      </button>
                    )}

                  {order.status === "pending" && (
                    <button
                      onClick={() => updateStatus(order._id, "approved")}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                    >
                      <Check size={16} /> Approve Order
                    </button>
                  )}

                  {order.status === "approved" && (
                    <button
                      onClick={() => updateStatus(order._id, "delivered")}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-green-600 text-white font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-green-700 shadow-lg shadow-green-600/20 transition-all active:scale-95"
                    >
                      <Truck size={16} /> Mark Delivered
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {orders.length === 0 && (
          <div className="py-20 text-center bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
            <ShoppingBag className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
              No active shipments in the manifest
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
