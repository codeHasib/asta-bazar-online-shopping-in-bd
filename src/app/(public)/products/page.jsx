"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { redirect, useRouter } from "next/navigation";
import { ShoppingBag, Search, SlidersHorizontal, X } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(10000); // Default high range
  const [loading, setLoading] = useState(true);

  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        const data = await res.json();
        setProducts(data.products || []);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // --- FILTER LOGIC ---
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" ||
        product.categoryId.name === selectedCategory;
      const matchesPrice = product.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchQuery, selectedCategory, maxPrice]);

  // Get unique categories for the filter buttons
  const categories = [
    "All",
    ...new Set(products.map((p) => p.categoryId.name)),
  ];

  // Grouping the filtered results
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const category = product.categoryId.name || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-bold tracking-widest uppercase text-slate-400">
        Loading Store...
      </div>
    );

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-16">
        {/* --- HEADER & SEARCH --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-900 leading-none">
              Explore <span className="text-blue-600">Store</span>
            </h1>
            <p className="text-slate-400 font-bold mt-4 uppercase tracking-widest text-[10px]">
              {filteredProducts.length} Products Found
            </p>
          </div>

          <div className="relative w-full md:w-80 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:bg-white focus:border-blue-600 focus:shadow-xl focus:shadow-blue-600/5 transition-all"
            />
          </div>
        </div>

        {/* --- FILTER BAR --- */}
        <div className="flex flex-wrap items-center gap-6 mb-16 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
          {/* Category Pills */}
          <div className="flex items-center gap-2 flex-wrap flex-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "bg-white text-slate-500 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Price Range Filter */}
          <div className="flex items-center gap-4 min-w-[200px]">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Max Price: ৳{maxPrice}
            </span>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-blue-600 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer flex-1"
            />
          </div>
        </div>

        {/* --- PRODUCT DISPLAY --- */}
        {Object.keys(groupedProducts).length > 0 ? (
          Object.entries(groupedProducts).map(([category, items]) => (
            <div key={category} className="mb-20">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xl font-black uppercase tracking-[0.2em] text-slate-800">
                  {category}
                </h2>
                <div className="h-[1px] bg-slate-100 flex-1"></div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {items.map((product) => (
                  <div
                    key={product._id}
                    className="group border p-3 border-gray-300 rounded-4xl
                  "
                  >
                    <div
                      onClick={() => router.push(`/products/${product._id}`)}
                      className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-slate-100 cursor-pointer border border-slate-50"
                    >
                      <Image
                        src={product.images?.[0] || "/placeholder.png"}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-[10px] font-black uppercase tracking-widest bg-white px-4 py-2 rounded-full shadow-xl">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 px-2">
                      <div className="flex md:flex-row flex-col justify-between items-start mb-1">
                        <h3
                          className="font-bold text-slate-900 uppercase tracking-tight text-sm leading-tight hover:text-blue-600 cursor-pointer"
                          onClick={() =>
                            router.push(`/products/${product._id}`)
                          }
                        >
                          {product.title}
                        </h3>
                        <p className="text-blue-600 font-black text-sm">
                          ৳{product.price}
                        </p>
                      </div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                        {product.category}
                      </p>

                      <div className="flex md:gap-5 flex-col md:flex-row justify-center">
                        <button
                          disabled={!product.inStock}
                          onClick={() => {
                            addToCart(
                              product,
                              1,
                              product.sizes?.[0] || "default",
                            );
                            redirect("/cart");
                          }}
                          className={`flex-1 mt-2 py-4 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 
                          ${
                            product.inStock
                              ? "bg-slate-900 text-white hover:bg-blue-600 shadow-xl shadow-slate-200"
                              : "bg-slate-100 text-slate-400 cursor-not-allowed"
                          }`}
                        >
                          <ShoppingBag size={14} />
                          Order Now
                        </button>
                        <button
                          disabled={!product.inStock}
                          onClick={() => {
                            addToCart(
                              product,
                              1,
                              product.sizes?.[0] || "default",
                            );
                          }}
                          className={`flex-1 mt-2 py-4 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 
                          ${
                            product.inStock
                              ? "bg-blue-500 text-white hover:bg-blue-600 shadow-xl shadow-slate-200"
                              : "bg-slate-100 text-slate-400 cursor-not-allowed"
                          }`}
                        >
                          <ShoppingBag size={14} />
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-32 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
            <X className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
              No products match your filters
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setMaxPrice(10000);
              }}
              className="mt-6 text-blue-600 text-[10px] font-black uppercase tracking-widest underline underline-offset-4"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
