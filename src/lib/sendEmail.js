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
      return `${item.title || "Unknown"} (Size: ${item.size || "-"} ) x${item.quantity || 1} - ৳${item.price || 0}`;
    })
    .join("\n");

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "New Order Received - Asta-Bazar",
    text: `
New Order Received

Customer: ${order.customerName}
Phone: ${order.phone}
Email: ${order.email}
Location: ${order.location}

Items:
${itemsText}

Total: ৳${order.totalPrice}
Status: ${order.status}
    `,
  });
};
