// src/app/layout.js
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "The Spicier Kitchen | ১০০% খাঁটি ও প্রাকৃতিক মশলা",
  description:
    "বাছাইকৃত সেরা মানের মশলা থেকে তৈরি। কোনো প্রিজারভেটিভ বা কৃত্রিম রং নেই। সারা বাংলাদেশে ক্যাশ অন ডেলিভারি।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={`${hindSiliguri.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}