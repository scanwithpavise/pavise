import { deepseek } from "@ai-sdk/deepseek";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    return new Response("Missing OpenRouter API key", { status: 500 });
  }

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1-distill-llama-70b:free",
          messages,
        }),
      }
    );

    if (!response.ok) {
      console.error("OpenRouter API Error:", response.statusText);
      return new Response(`OpenRouter API Error: ${response.statusText}`, {
        status: response.status,
      });
    }

    const data = await response.json();
    console.log(
      "Full Response from OpenRouter:",
      JSON.stringify(data, null, 2)
    );

    // Ambil hanya isi pesan (content) dari AI
    const messageContent = data.choices?.[0]?.message?.content || "No response";
    return new Response(messageContent, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error in fetching OpenRouter API:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
