import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface OrderData {
  name: string;
  phone: string;
  address: string;
  comment?: string;
  items: OrderItem[];
  total: number;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const orderData: OrderData = await req.json();

    const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error("Telegram credentials not configured");
    }

    let message = `🍽 <b>Новый заказ!</b>\n\n`;
    message += `👤 <b>Имя:</b> ${orderData.name}\n`;
    message += `📞 <b>Телефон:</b> ${orderData.phone}\n`;
    message += `📍 <b>Адрес:</b> ${orderData.address}\n`;

    if (orderData.comment) {
      message += `💬 <b>Комментарий:</b> ${orderData.comment}\n`;
    }

    message += `\n📋 <b>Состав заказа:</b>\n`;

    orderData.items.forEach((item, index) => {
      message += `\n${index + 1}. ${item.name} x${item.quantity} — ${item.total} сом`;
    });

    message += `\n\n💰 <b>Итого: ${orderData.total} сом</b>`;

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error("Telegram API error:", errorData);
      throw new Error("Failed to send message to Telegram");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Order sent successfully" }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error processing order:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
