import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "All fields are required!" }, { status: 400 });
    }

    // 1. Save to MongoDB
    await connectToDatabase();
    await Contact.create({ name, email, message });

    // 2. Send Notification to Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const text = `🚀 *New Contact Request!*\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`;
      const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

      // Telegram API ko background mein hit karna
      await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "Markdown",
        }),
      }).catch((err) => console.error("Telegram API Error:", err));
    }

    // 3. Return Success
    return NextResponse.json({ ok: true, message: "Message sent successfully!" }, { status: 200 });

  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ ok: false, error: "Failed to send message." }, { status: 500 });
  }
}