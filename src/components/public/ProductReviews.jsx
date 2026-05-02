"use client";

import { useState, useEffect } from "react";

export default function Reviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    fetch(`/api/reviews?productId=${productId}`)
      .then((res) => res.json())
      .then((data) => setReviews(data.reviews || []));
  }, [productId]);

  const submitReview = async () => {
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        ...form,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Review submitted for approval");
      setForm({ name: "", rating: 5, comment: "" });
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-lg font-bold mb-4">Reviews</h2>

      {/* Review Form */}
      <div className="border p-4 rounded mb-6">
        <input
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full mb-2"
        />

        <select
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
          className="border p-2 w-full mb-2"
        >
          {[5,4,3,2,1].map((n) => (
            <option key={n} value={n}>
              {n} Stars
            </option>
          ))}
        </select>

        <textarea
          placeholder="Write review..."
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          className="border p-2 w-full mb-2"
        />

        <button
          onClick={submitReview}
          className="bg-black text-white px-4 py-2 w-full"
        >
          Submit Review
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r._id} className="border p-3 rounded">
            <p className="font-bold">{r.name}</p>
            <p>{"⭐".repeat(r.rating)}</p>
            <p className="text-sm">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}