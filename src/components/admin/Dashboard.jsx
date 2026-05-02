"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  ShoppingBag,
  CheckCircle2,
  Calendar,
  Filter,
  ArrowUpRight,
  Package,
} from "lucide-react";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    let url = "/api/orders";
    if (startDate && endDate) {
      url += `?startDate=${startDate}&endDate=${endDate}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Stats Logic
  const totalSales = orders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const totalOrders = orders.length;
  const approvedOrders = orders.filter((o) => o.status === "approved").length;

  const stats = [
    {
      label: "Total Sales",
      value: `৳ ${totalSales.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      label: "Total Orders",
      value: totalOrders,
      icon: Package,
      color: "text-slate-700",
      bg: "bg-slate-50",
      border: "border-slate-200",
    },
    {
      label: "Approved Orders",
      value: approvedOrders,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-100",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black p-6 lg:p-10 pb-24 lg:pb-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black">
            Business <span className="text-blue-600">Overview</span>
          </h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
            আস্থা বাজার | Real-time Performance
          </p>
        </div>

        {/* Date Filters */}
        <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
            <Calendar size={16} className="text-blue-600" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent text-xs font-bold outline-none w-28 text-slate-700"
            />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
            <Calendar size={16} className="text-blue-600" />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent text-xs font-bold outline-none w-28 text-slate-700"
            />
          </div>
          <button
            onClick={fetchOrders}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-green-600/20"
          >
            <Filter size={18} />
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative overflow-hidden bg-white border ${stat.border} p-6 rounded-3xl group shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                <stat.icon size={24} />
              </div>
              <ArrowUpRight
                size={20}
                className="text-slate-300 group-hover:text-blue-600 transition-colors"
              />
            </div>

            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
              {stat.label}
            </p>
            <h2 className="text-3xl font-bold mt-1 tracking-tight text-black">
              {loading ? "..." : stat.value}
            </h2>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      {/* Recent Orders Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm"
      >
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg font-bold text-black uppercase tracking-tight">
            Recent Orders
          </h3>
          <button className="text-blue-600 text-xs font-bold uppercase tracking-widest hover:text-blue-800 transition-colors">
            View All Transactions
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="py-12 text-center text-slate-400 font-medium bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            No orders found for the selected period.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <p className="text-sm text-slate-500 font-medium">
                Displaying {orders.length} recent transactions from the market.
              </p>
              {/* Table logic remains here */}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}