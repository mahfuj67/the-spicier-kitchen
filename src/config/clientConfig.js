// src/config/clientConfig.js
export const clientConfig = {
  brand: {
    name: "The Spicier Kitchen",
    tagline: "100% Stone-Ground Export Quality মশলা",
    phoneDisplay: "+880 1931-888591",
    whatsappNumber: "8801931888591",
    announcement: "🔥 অফার! আজ অর্ডার করলেই সারা বাংলাদেশে ডেলিভারি চার্জ অর্ধেক!",
    primaryBg: "bg-amber-600 hover:bg-amber-700",
    primaryText: "text-amber-600",
    accentBorder: "border-amber-600",
    lightBg: "bg-amber-50",
  },
  hero: {
    badge: "কেমিক্যাল ও কৃত্রিম রং মুক্ত",
    headline: "ঘরের রান্নায় আনুন অথেনটিক রেস্তোরাঁর স্বাদ ও ঘ্রাণ",
    subheadline:
      "বাছাইকৃত সেরা মানের মশলা থেকে তৈরি। কোনো প্রিজারভেটিভ নেই, ১০০% বিশুদ্ধ ও স্বাস্থ্যসম্মত প্যাক।",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    ctaText: "অর্ডার করতে ক্লিক করুন",
  },
  benefits: [
    {
      title: "১০০% প্রাকৃতিক উপাদান",
      desc: "কোনো ক্ষতিকর কেমিক্যাল, কৃত্রিম রং বা ভেজাল মেশানো হয় না।",
    },
    {
      title: "এয়ার-টাইট প্রিমিয়াম প্যাকেজিং",
      desc: "দীর্ঘদিন স্বাদ ও ঘ্রাণ অটুট রাখতে ফুড-গ্রেড জিপার পাউচ ব্যবহার করা হয়েছে।",
    },
    {
      title: "ক্যাশ অন ডেলিভারি সুবিধা",
      desc: "পণ্য হাতে পেয়ে মান যাচাই করে ডেলিভারি ম্যানকে পেমেন্ট করার সুবিধা।",
    },
  ],
  packages: [
    {
      id: "pack-1",
      name: "ট্রায়াল কম্বো প্যাক (৩টি মশলা - ৬০০ গ্রাম)",
      price: 650,
      compareAtPrice: 850,
      badge: "জনপ্রিয়",
      freeDelivery: false,
      image: "/images/pack-1.jpg",
      features: ["হলুদ গুঁড়া ২০০ গ্রাম", "মরিচ গুঁড়া ২০০ গ্রাম", "ধনিয়া গুঁড়া ২০০ গ্রাম"],
    },
    {
      id: "pack-2",
      name: "ফ্যামিলি মেগা প্যাক (৫টি মশলা - ১.৫ কেজি)",
      price: 1450,
      compareAtPrice: 1850,
      badge: "সেরা অফার + ফ্রি ডেলিভারি",
      freeDelivery: true,
      image: "/images/pack-2.jpg",
      features: [
        "হলুদ, মরিচ, ধনিয়া ও জিরা গুঁড়া",
        "স্পেশাল শাহী গরম মশলা ফ্রি",
        "সারা বাংলাদেশে ডেলিভারি চার্জ ফ্রি",
      ],
    },
  ],
  delivery: {
    insideDhakaLabel: "ঢাকার ভেতরে (২৪-৪৮ ঘণ্টায় ডেলিভারি)",
    insideDhakaFee: 70,
    outsideDhakaLabel: "ঢাকার বাইরে (সারা বাংলাদেশ ২-৩ দিন)",
    outsideDhakaFee: 120,
  },
};

