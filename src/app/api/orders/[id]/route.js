import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PATCH(req, context) {
  try {
    await connectDB();

    const { id } = await context.params; // ✅ SAFE FIX
    const { status } = await req.json();

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
