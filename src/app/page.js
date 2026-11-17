// src/app/page.js
"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  PhoneCall,
  ShoppingBag,
  Flame,
  Leaf,
  Loader2,
} from "lucide-react";
import { clientConfig } from "@/config/clientConfig";

export default function FunnelLandingPage() {
  const { brand, hero, benefits, packages, delivery } = clientConfig;

  const [selectedPackId, setSelectedPackId] = useState(packages[0].id);
  const [deliveryZone, setDeliveryZone] = useState("inside");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    website: "", // Honeypot spam prevention
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const selectedPackage = packages.find((p) => p.id === selectedPackId) || packages[0];
  const deliveryCharge = selectedPackage.freeDelivery
    ? 0
    : deliveryZone === "inside"
    ? delivery.insideDhakaFee
    : delivery.outsideDhakaFee;
  const totalAmount = selectedPackage.price + deliveryCharge;

  const scrollToOrder = () => {
    document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          packageName: selectedPackage.name,
          deliveryZone:
            deliveryZone === "inside" ? "ঢাকার ভেতরে" : "ঢাকার বাইরে",
          totalAmount,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "অর্ডার সম্পন্ন হয়নি। আবার চেষ্টা করুন।");
      } else {
        setConfirmedOrder({
          orderId: data.orderId,
          packageName: selectedPackage.name,
          totalAmount,
          name: formData.name,
        });
      }
    } catch {
      setErrorMsg("নেটওয়ার্ক সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 md:pb-0 animate-fade-in">
      {/* Top Announcement Bar */}
      <div className={`${brand.primaryBg} text-white text-center text-xs sm:text-sm py-2 px-4 font-medium`}>
        {brand.announcement}
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`${brand.primaryBg} text-white p-2 rounded-xl shadow-sm`}>
              <Flame className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="font-bold text-lg sm:text-xl text-slate-900">{brand.name}</h1>
              <p className="text-xs text-slate-500">{brand.tagline}</p>
            </div>
          </div>
          <a
            href={`tel:${brand.phoneDisplay.replace(/\s+/g, "")}`}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition"
          >
            <PhoneCall className="w-4 h-4 text-emerald-600 animate-bounce" />
            <span>{brand.phoneDisplay}</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 pt-8 pb-10 text-center">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${brand.lightBg} ${brand.primaryText} mb-4`}
        >
          <Leaf className="w-3.5 h-3.5" />
          {hero.badge}
        </span>

        <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight text-slate-900 mb-3">
          {hero.headline}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-6">
          {hero.subheadline}
        </p>

        {/* Video Player */}
        <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl bg-black border border-slate-200 mb-6 relative group">
          <video
            src={hero.videoUrl}
            controls
            playsInline
            preload="metadata"
            className="w-full max-h-[420px] object-cover"
          />
        </div>

        <button
          onClick={scrollToOrder}
          className={`${brand.primaryBg} text-white font-bold text-base sm:text-lg px-8 py-4 rounded-xl shadow-lg transition transform active:scale-95 inline-flex items-center gap-2 cursor-pointer`}
        >
          <ShoppingBag className="w-5 h-5" />
          {hero.ctaText}
        </button>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-10 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6">
            কেন আমাদের পণ্য সেরা?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {benefits.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2"
              >
                <ShieldCheck className={`w-6 h-6 ${brand.primaryText}`} />
                <h4 className="font-bold text-slate-900">{item.title}</h4>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order-section" className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-2">
            অর্ডার করতে নিচের ফর্মটি পূরণ করুন
          </h3>
          <p className="text-sm text-slate-500 text-center mb-6">
            অগ্রিম কোনো টাকা দিতে হবে না — পণ্য হাতে পেয়ে টাকা পরিশোধ করুন।
          </p>

          {confirmedOrder ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
              <h4 className="text-xl font-bold text-emerald-900">
                ধন্যবাদ {confirmedOrder.name}! আপনার অর্ডারটি কনফার্ম হয়েছে।
              </h4>
              <p className="text-sm text-emerald-800">
                অর্ডার আইডি: <span className="font-bold">{confirmedOrder.orderId}</span>
              </p>
              <p className="text-sm text-slate-700">
                প্যাকেজ: {confirmedOrder.packageName} — মোট:{" "}
                <span className="font-bold">৳{confirmedOrder.totalAmount}</span>
              </p>
              <p className="text-xs text-slate-500">
                আমাদের প্রতিনিধি শীঘ্রই আপনাকে কল করে ডেলিভারি নিশ্চিত করবেন।
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Step 1: Select Package */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-3">
                  ১. প্যাকেজ সিলেক্ট করুন:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {packages.map((pack) => {
                    const isSelected = pack.id === selectedPackId;
                    return (
                      <div
                        key={pack.id}
                        onClick={() => setSelectedPackId(pack.id)}
                        className={`overflow-hidden rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                          isSelected
                            ? `${brand.accentBorder} ${brand.lightBg}`
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        {/* Package Image */}
                        {pack.image && (
                          <div className="relative w-full h-44 sm:h-48 bg-slate-100 overflow-hidden">
                            <img
                              src={pack.image}
                              alt={pack.name}
                              className="w-full h-full object-cover transition transform hover:scale-105 duration-300"
                            />
                            {pack.badge && (
                              <span className="absolute top-3 right-3 text-[11px] font-bold bg-emerald-600 text-white px-2.5 py-1 rounded-full shadow-md z-10 animate-pulse">
                                {pack.badge}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Package Details */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="font-bold text-sm text-slate-900 block mb-1">
                              {pack.name}
                            </span>
                            <div className="flex items-baseline gap-2 mb-3">
                              <span className="text-lg font-extrabold text-slate-900">
                                ৳{pack.price}
                              </span>
                              {pack.compareAtPrice && (
                                <span className="text-xs line-through text-slate-400">
                                  ৳{pack.compareAtPrice}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <ul className="text-xs text-slate-600 space-y-1.5 border-t border-slate-100 pt-3">
                            {pack.features.map((f, i) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <span className="text-emerald-600 font-bold">✓</span>
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Customer Info */}
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-800">
                  ২. আপনার তথ্য দিন:
                </label>

                {/* Honeypot anti-spam field */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <input
                    type="text"
                    required
                    placeholder="আপনার সম্পূর্ণ নাম *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    placeholder="আপনার মোবাইল নম্বর (যেমন: 017XXXXXXXX) *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div>
                  <textarea
                    rows={2}
                    required
                    placeholder="সম্পূর্ণ ডেলিভারি ঠিকানা (বাসা/রোড, এলাকা, থানা, জেলা) *"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>
              </div>

              {/* Step 3: Delivery Zone */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  ৩. ডেলিভারি এলাকা সিলেক্ট করুন:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <label
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                      deliveryZone === "inside"
                        ? `${brand.accentBorder} ${brand.lightBg}`
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="deliveryZone"
                        checked={deliveryZone === "inside"}
                        onChange={() => setDeliveryZone("inside")}
                      />
                      <span>{delivery.insideDhakaLabel}</span>
                    </div>
                    <span className="font-bold">
                      {selectedPackage.freeDelivery ? "ফ্রি" : `৳${delivery.insideDhakaFee}`}
                    </span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                      deliveryZone === "outside"
                        ? `${brand.accentBorder} ${brand.lightBg}`
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="deliveryZone"
                        checked={deliveryZone === "outside"}
                        onChange={() => setDeliveryZone("outside")}
                      />
                      <span>{delivery.outsideDhakaLabel}</span>
                    </div>
                    <span className="font-bold">
                      {selectedPackage.freeDelivery ? "ফ্রি" : `৳${delivery.outsideDhakaFee}`}
                    </span>
                  </label>
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>{selectedPackage.name}</span>
                  <span>৳{selectedPackage.price}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    <Truck className="w-4 h-4" /> ডেলিভারি চার্জ
                  </span>
                  <span>{deliveryCharge === 0 ? "ফ্রি" : `৳${deliveryCharge}`}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between font-extrabold text-base text-slate-900">
                  <span>সর্বমোট পেমেন্ট (ক্যাশ অন ডেলিভারি)</span>
                  <span>৳{totalAmount}</span>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${brand.primaryBg} text-white font-bold text-base py-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    অর্ডার সাবমিট হচ্ছে...
                  </>
                ) : (
                  <>অর্ডার কনফার্ম করুন — ৳{totalAmount}</>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Sticky Mobile Bottom CTA */}
      {!confirmedOrder && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 z-40 shadow-lg flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-slate-500">সর্বমোট বিল</p>
            <p className="font-extrabold text-slate-900">৳{totalAmount}</p>
          </div>
          <button
            onClick={scrollToOrder}
            className={`${brand.primaryBg} text-white font-bold text-sm px-6 py-3 rounded-xl flex-1`}
          >
            এখনই অর্ডার করুন
          </button>
        </div>
      )}
    </div>
  );
}