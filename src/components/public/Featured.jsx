"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function FeaturedCollections() {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        if (data.success) {
          // Group products by category name
          const grouped = data.products.reduce((acc, product) => {
            const categoryName = product.categoryId?.name || "Other";
            if (!acc[categoryName]) {
              acc[categoryName] = {
                slug: product.categoryId?.slug || "",
                items: [],
              };
            }
            // Only push if we have less than 6 items for this category
            if (acc[categoryName].items.length < 6) {
              acc[categoryName].items.push(product);
            }
            return acc;
          }, {});

          setGroupedProducts(grouped);
        }
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="py-20 text-center font-bold uppercase tracking-widest text-slate-400">
        পণ্য লোড হচ্ছে...
      </div>
    );

  return (
    <section className="py-20 px-4 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto space-y-24">
        {Object.entries(groupedProducts).map(([categoryName, categoryData]) => (
          <div key={categoryName} className="group">
            {/* Category Header */}
            <div className="flex items-end justify-between mb-10 border-b border-slate-100 pb-6">
              <div>
                <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em] block mb-2">
                  Featured Collection
                </span>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900">
                  {categoryName}
                </h2>
              </div>
              <Link
                href={`/products`}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors"
              >
                সবগুলো দেখুন <ArrowRight size={14} />
              </Link>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categoryData.items.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group/card relative border border-gray-300 p-3 rounded-4xl"
                >
                  {/* Image Container */}
                  <Link
                    href={`/products/${product._id}`}
                    className="relative block aspect-[3/4] rounded-[1.5rem] overflow-hidden bg-slate-50 border border-slate-100 transition-all group-hover/card:shadow-xl group-hover/card:shadow-blue-600/5"
                  >
                    <Image
                      src={product.images[0] || "/placeholder.jpg"}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />

                    {/* Hover Action */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="bg-white text-black p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all transform translate-y-4 group-hover/card:translate-y-0 shadow-lg">
                        <ShoppingCart size={18} />
                      </button>
                    </div>

                    {/* Price Tag */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      <p className="text-[10px] font-black text-slate-900">
                        ৳{product.price}
                      </p>
                    </div>
                  </Link>

                  {/* Product Details */}
                  <div className="mt-4 px-1">
                    <h3 className="text-[11px] font-bold uppercase tracking-tight text-slate-800 line-clamp-1">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-1 text-amber-500">
                      <Star size={10} className="fill-current" />
                      <span className="text-[9px] font-black text-slate-400">
                        4.8 (120)
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
