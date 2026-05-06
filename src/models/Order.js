import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    location: {
      type: String,
      required: true,
    },

    // --- NEW: Optional Customer Note ---
    note: {
      type: String,
      default: "", // Keeps it optional
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        title: String,
        // --- NEW: Product Description inside items ---
        description: String,
        price: Number,
        quantity: Number,
        size: String,
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "declined", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
