import nodemailer from "nodemailer";

export const sendOrderEmail = async (order) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const itemsText = order.items
    .map((item) => {
      // Added product description to the item breakdown
      return `Product: ${item.title || "Unknown"}
Size: ${item.size || "-"}
Quantity: x${item.quantity || 1}
Price: ৳${item.price || 0}
Description: ${item.description || "N/A"}`;
    })
    .join("\n\n---\n\n");

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Order from ${order.customerName} - Asta-Bazar`,
    text: `
NEW ORDER RECEIVED

CUSTOMER DETAILS:
Name: ${order.customerName}
Phone: ${order.phone}
Email: ${order.email || "N/A"}
Location: ${order.location}

CUSTOMER NOTE:
${order.note || "No specific instructions provided."}

ORDERED ITEMS:
--------------------------
${itemsText}
--------------------------

TOTAL BILL: ৳${order.totalPrice}
ORDER STATUS: ${order.status}
    `,
  });
};
