"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderPlus,
  Hash,
  Trash2,
  Layers,
  Link as LinkIcon,
  AlertCircle,
  Plus,
} from "lucide-react";

export default function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    const res = await fetch("/api/categories", {cache: "no-store"});
    const data = await res.json();
    setCategories(data.categories || []);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    if (!name.trim()) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Failed to create category");
        setLoading(false);
        return;
      }

      setName("");
      fetchCategories();
      setLoading(false);
    } catch (err) {
      setError("System connection error");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Remove this category? This might affect existing product links.",
      )
    )
      return;
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) fetchCategories();
  };

  const generateSlugPreview = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-12 pb-32">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight uppercase">
          Category <span className="text-blue-600">Management</span>
        </h1>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
          আস্থা বাজার | Structure Your Store Collections
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* ================= INPUT PANEL ================= */}
        <div className="w-full lg:w-4/12">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm sticky top-24">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                <FolderPlus size={20} />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                Create Category
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 mb-2 block tracking-widest">
                  Display Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mens Clothing"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-bold focus:border-blue-600 outline-none transition-all placeholder:text-slate-300"
                />
              </div>

              {/* Slug Preview */}
              <AnimatePresence>
                {name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex items-center gap-3"
                  >
                    <LinkIcon size={14} className="text-blue-600" />
                    <p className="text-[11px] text-slate-600 font-medium truncate">
                      Store Path:{" "}
                      <span className="text-blue-700 font-bold">
                        /{generateSlugPreview(name)}
                      </span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Display */}
              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
                  <AlertCircle size={16} />
                  <p className="text-[10px] font-bold uppercase">{error}</p>
                </div>
              )}

              <button
                onClick={handleAdd}
                disabled={loading || !name.trim()}
                className="w-full bg-blue-600 text-white font-bold uppercase text-xs tracking-widest py-5 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all disabled:opacity-30 active:scale-95 flex items-center justify-center gap-2"
              >
                {loading ? (
                  "SAVING..."
                ) : (
                  <>
                    <Plus size={16} /> Initialize Category
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ================= LIST PANEL ================= */}
        <div className="w-full lg:w-8/12">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-slate-500">
              <Layers size={18} className="text-blue-600" /> Active Directories
            </h2>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200">
              {categories.length} CATEGORIES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {categories.map((cat) => (
                <motion.div
                  key={cat._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group bg-white border border-slate-100 p-5 rounded-[1.5rem] flex items-center justify-between hover:border-blue-600/20 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 transition-colors">
                      <Hash
                        size={16}
                        className="text-slate-400 group-hover:text-blue-600"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-tight text-slate-800">
                        {cat.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium italic">
                        /{cat.slug}
                      </p>
                    </div>
                  </div>

                  {/* Delete Function Later */}

                  {/* <button 
                    onClick={() => handleDelete(cat._id)}
                    className="p-3 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button> */}
                </motion.div>
              ))}
            </AnimatePresence>

            {categories.length === 0 && (
              <div className="col-span-full py-24 border-2 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center text-slate-400">
                <Layers size={40} className="mb-4 opacity-20" />
                <p className="text-xs font-bold uppercase tracking-widest">
                  No active categories found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
