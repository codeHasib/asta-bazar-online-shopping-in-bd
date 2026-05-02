import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
// DELETE PRODUCT
export async function DELETE(req, context) {
  try {
    await connectDB();

    const { params } = context;
    const { id } = await params; // 🔥 FIX (IMPORTANT)

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// UPDATE PRODUCT
// export async function PUT(req, { params }) {
//   try {
//     await connectDB();

//     const { id } = params; // ✅ FIXED (no await)

//     const body = await req.json();

//     const updated = await Product.findByIdAndUpdate(
//       id,
//       {
//         ...body, // ✅ SAFE + SIMPLE (don’t overcomplicate)
//       },
//       { new: true }
//     );

//     return NextResponse.json({
//       success: true,
//       product: updated,
//     });
//   } catch (error) {
//     console.error("UPDATE ERROR:", error);

//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }

export async function PUT(req, context) {
  try {
    await connectDB();

    const { params } = context;
    const { id } = await params; // 🔥 FIX (IMPORTANT)

    const body = await req.json();

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }

    product.title = body.title;
    product.description = body.description;
    product.price = body.price;
    product.categoryId = body.categoryId;
    product.images = body.images;
    product.video = body.video;
    product.sizes = body.sizes;

    product.inStock = Boolean(body.inStock);

    await product.save();

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// GET BY ID
export async function GET(req, { params }) {
  try {
    await connectDB();

    const product = await Product.findById(params.id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("PRODUCT BY ID ERROR:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
