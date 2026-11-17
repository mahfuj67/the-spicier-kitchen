// src/app/api/order/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    // Honeypot check (blocks simple spam bots)
    if (body.website) {
      return NextResponse.json({ success: true, message: "Order received" });
    }

    const { name, phone, address, packageName, deliveryZone, totalAmount } = body;

    if (!name || !phone || !address || !packageName) {
      return NextResponse.json(
        { success: false, error: "দয়া করে আপনার নাম, মোবাইল নম্বর এবং সম্পূর্ণ ঠিকানা দিন।" },
        { status: 400 }
      );
    }

    // Check BD phone format (01XXXXXXXXX or +8801XXXXXXXXX)
    const cleanPhone = phone.replace(/[\s-]/g, "");
    const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, error: "সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)।" },
        { status: 400 }
      );
    }

    const scriptUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (!scriptUrl) {
      console.error("Missing GOOGLE_SHEET_WEBHOOK_URL in .env.local");
      return NextResponse.json(
        { success: false, error: "সার্ভার কনফিগারেশন পাওয়া যায়নি।" },
        { status: 500 }
      );
    }

    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);

    const sheetResponse = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      body: JSON.stringify({
        orderId,
        timestamp: new Date().toLocaleString("en-BD", { timeZone: "Asia/Dhaka" }),
        name: name.trim(),
        phone: cleanPhone,
        address: address.trim(),
        packageName,
        deliveryZone,
        totalAmount,
        status: "Pending",
      }),
    });

    if (!sheetResponse.ok) {
      throw new Error("Google Sheet webhook responded with error");
    }

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error("Order API error:", error);
    return NextResponse.json(
      { success: false, error: "অর্ডার সাবমিট করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}