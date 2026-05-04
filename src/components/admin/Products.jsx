"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Box,
  LayoutGrid,
  X,
  Save,
  ShoppingBag,
} from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import Image from "next/image";

export default function AdminProducts() {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: "",
    sizes: "",
    video: "",
    inStock: true,
  });

  useEffect(() => {
    fetch("/api/categories", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []));
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products", { cache: "no-store" });
    const data = await res.json();
    setProducts(data.products || []);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (isUpdate = false) => {
    if (!form.title || !form.price)
      return alert("Product title and price are required");

    setIsLoading(true);

    let finalImages = images;

    if (images.length && images[0].startsWith("data:")) {
      const uploadedUrls = [];
      for (let img of images) {
        const res = await fetch("/api/upload", {
          cache: "no-store",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            file: img,
            folder: "astabazar/products",
          }),
        });
        const data = await res.json();
        if (data.success) uploadedUrls.push(data.url);
      }
      finalImages = uploadedUrls;
    }

    const payload = {
      ...form,
      price: Number(form.price),
      sizes: form.sizes ? form.sizes.split(",").map((s) => s.trim()) : [],
      images: finalImages,
      inStock: form.inStock,
    };

    console.log(payload);

    const url = isUpdate
      ? `/api/products/${editingProduct._id}`
      : "/api/products";
    const method = isUpdate ? "PUT" : "POST";

    const res = await fetch(
      url,
      {
        cache: "no-store",
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    const data = await res.json();
    setIsLoading(false);

    if (data.success) {
      closeModal();
      fetchProducts();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    const res = await fetch(`/api/products/${id}`, {
      cache: "no-store",
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success) fetchProducts();
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setForm({
      title: product.title,
      price: product.price,
      description: product.description,
      categoryId: product.categoryId,
      sizes: product.sizes?.join(", ") || "",
      video: product.video || "",
    });
    setImages(product.images || []);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      title: "",
      price: "",
      description: "",
      categoryId: "",
      sizes: "",
      video: "",
    });
    setImages([]);
  };

  return (
    <div className="min-h-screen bg-white text-black p-4 md:p-8 lg:p-12 pb-32">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black uppercase">
            Product <span className="text-blue-600">Management</span>
          </h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
            আস্থা বাজার | Inventory Control
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* ADD PRODUCT FORM */}
        <div className="w-full lg:w-4/12">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm sticky top-24">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-6 flex items-center gap-2 text-slate-700">
              <Plus size={18} className="text-green-600" /> Add New Item
            </h2>
            <ProductFormFields
              form={form}
              setForm={setForm}
              handleChange={handleChange}
              categories={categories}
            />
            <div className="mt-6">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">
                Media Gallery
              </label>
              <ImageUploader onUploadComplete={setImages} />
            </div>
            <button
              onClick={() => handleSubmit(false)}
              disabled={isLoading}
              className="w-full mt-8 bg-blue-600 text-white font-bold uppercase text-xs tracking-widest py-4 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
            >
              {isLoading ? "PROCESING..." : "SAVE PRODUCT"}
            </button>
          </div>
        </div>

        {/* PRODUCT LIST */}
        <div className="w-full lg:w-8/12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-slate-700">
              <ShoppingBag size={18} className="text-blue-600" /> Active Items
            </h2>
          </div>
          <div className="grid gap-4">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center gap-4 group hover:border-blue-600/30 hover:shadow-md transition-all flex-wrap"
              >
                <div className="relative h-16 w-16 bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                  <Image
                    src={p.images?.[0] || ""}
                    fill
                    className="object-cover"
                    alt=""
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-black uppercase tracking-tight truncate">
                    {p.title}
                  </h3>
                  <p className="text-green-600 text-xs font-bold mt-1">
                    ৳ {p.price}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(p)}
                    className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* UPDATE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-black uppercase tracking-tight">
                    Edit <span className="text-blue-600">Product</span>
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 bg-slate-100 text-slate-500 rounded-full hover:bg-red-600 hover:text-white transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <ProductFormFields
                    form={form}
                    setForm={setForm} // Danger!!!!!!!!!!
                    handleChange={handleChange}
                    categories={categories}
                  />
                </div>

                <div className="mt-8">
                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-3">
                    Update Media Gallery
                  </p>
                  <ImageUploader onUploadComplete={setImages} />
                </div>

                <div className="flex gap-4 mt-10">
                  <button
                    onClick={() => handleSubmit(true)}
                    disabled={isLoading}
                    className="flex-1 bg-green-600 text-white font-bold uppercase text-xs tracking-wider py-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-green-700 transition-all"
                  >
                    <Save size={18} />{" "}
                    {isLoading ? "UPDATING..." : "UPDATE PRODUCT"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductFormFields({ form, handleChange, categories, setForm }) {
  return (
    <div className="space-y-5 w-full contents">
      <div className="col-span-full">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">
          Product Title
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-bold focus:border-blue-600 outline-none transition-colors"
        />
      </div>
      <div>
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">
          Price (BDT ৳)
        </label>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-bold focus:border-blue-600 outline-none transition-colors"
        />
      </div>
      <div>
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">
          Category
        </label>
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-bold focus:border-blue-600 outline-none transition-colors appearance-none"
        >
          <option value="">SELECT</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* In Stock */}

      <div className="mb-3">
        <label className="text-xs font-bold">Stock Status</label>

        <div className="flex gap-4 mt-2 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={form.inStock === true}
              onChange={() => setForm((prev) => ({ ...prev, inStock: true }))}
            />
            In Stock
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={form.inStock === false}
              onChange={() => setForm((prev) => ({ ...prev, inStock: false }))}
            />
            Out of Stock
          </label>
        </div>
      </div>

      <div className="col-span-full">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">
          Available Sizes / Variants
        </label>
        <input
          name="sizes"
          value={form.sizes}
          onChange={handleChange}
          placeholder="e.g. Small, Medium, Large or 40, 42"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-bold focus:border-blue-600 outline-none transition-colors"
        />
      </div>
      <div className="col-span-full">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">
          Description
        </label>
        <textarea
          name="description"
          rows="3"
          value={form.description}
          onChange={handleChange}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-medium focus:border-blue-600 outline-none transition-colors"
        />
      </div>
    </div>
  );
}
