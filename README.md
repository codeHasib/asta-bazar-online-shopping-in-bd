# 🛒 AstaBazar — E-Commerce Platform

🔗 **Live:** https://astabazar.com

A production-ready e-commerce application built to handle real product workflows, customer orders, and automated business operations. Designed with performance, usability, and practical commerce needs in mind.

---

## 🚀 Overview

AstaBazar is a full-stack online shopping platform where users can browse products, manage carts, and place orders seamlessly.

The system focuses on real-world functionality — including order tracking, delivery logic, and admin-side automation — making it more than just a UI demo.

---

## ⚡ Key Features

* 🛍️ **Product Browsing & Filtering** — Explore items with responsive UI updates
* 🛒 **Persistent Cart System** — Real-time cart updates with state synchronization
* 📦 **Order Management System** — Structured order creation with detailed item tracking
* 📩 **Automated Email Notifications** — Orders are instantly sent to admin via email
* 🚚 **Dynamic Delivery Logic** — Shipping cost calculated based on location (Inside/Outside Dhaka)
* ⚡ **Fast & Responsive UI** — Optimized for smooth performance across devices

---

## 🧠 Technical Highlights

* Built with **Next.js App Router** for structured routing and rendering
* Zustand used for fast and scalable client-side state management
* MongoDB + Mongoose for flexible and reliable data storage
* Order system designed to **preserve product data at purchase time**
* Integrated Nodemailer for automated order handling

---

## 🛠️ Tech Stack

**Frontend:** Next.js, React, Tailwind CSS
**State Management:** Zustand
**Backend:** Node.js (API routes)
**Database:** MongoDB (Mongoose)
**Other Tools:** Nodemailer

---

## 📂 Project Structure (Simplified)

```id="ab12cd"
src/
 ├── app/            # Routes & layouts
 ├── components/     # UI components
 ├── store/          # State management (Zustand)
 └── api/            # Backend logic
```

---

## ⚙️ Local Setup

```bash id="xy98lm"
git clone https://github.com/codeHasib/asta-bazar.git
cd asta-bazar
npm install
```

Create `.env.local`:

```id="env45a"
MONGODB_URI=your_mongodb_uri
EMAIL_USER=your_email
EMAIL_PASS=your_password
ADMIN_EMAIL=admin_receiver_email
```

Run locally:

```bash id="run77q"
npm run dev
```

---

## 🌍 Production Notes

* Deployed on **Vercel** with optimized performance
* Designed for real-world usage with dynamic order handling
* Focused on usability, reliability, and business logic

---

## 📌 Note

This is a real-world project built to simulate and handle actual e-commerce workflows, including order processing and operational automation.
