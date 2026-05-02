"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCartStore();

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    location: "",
    email: "",
  });

  const handleOrder = async () => {
    const orderPayload = {
      customerName: form.customerName,
      phone: form.phone,
      location: form.location,
      email: form.email,

      items: cart.map((item) => ({
        productId: item._id,
        title: item.title,
        price: item.price,
        size: item.size,
        quantity: item.quantity,
        image: item.images?.[0],
      })),

      totalPrice: getTotalPrice(),
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });

    const data = await res.json();

    if (data.success) {
      alert("Order placed successfully!");
      clearCart();
    } else {
      alert(data.error || "Order failed");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>

      <input
        placeholder="Name"
        className="border p-2 w-full mb-2"
        onChange={(e) =>
          setForm({ ...form, customerName: e.target.value })
        }
      />

      <input
        placeholder="Phone"
        className="border p-2 w-full mb-2"
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
      />

      <textarea
        placeholder="Address"
        className="border p-2 w-full mb-2"
        onChange={(e) =>
          setForm({ ...form, location: e.target.value })
        }
      />

      <input
        placeholder="Email (optional)"
        className="border p-2 w-full mb-2"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <div className="font-bold mb-4">
        Total: ৳{getTotalPrice()}
      </div>

      <button
        onClick={handleOrder}
        className="bg-black text-white px-4 py-2 w-full"
      >
        Place Order
      </button>
    </div>
  );
}