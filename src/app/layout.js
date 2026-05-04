import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "আস্থা বাজার - Asta Bazar | Best online marketing shop in Bangladesh",
  description:
    "আস্থা বাজার - সেরা পণ্যের বিশ্বস্ত অনলাইন শপ। Shop the best deals on electronics, fashion, and daily essentials at Asta Bazar Bangladesh.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
