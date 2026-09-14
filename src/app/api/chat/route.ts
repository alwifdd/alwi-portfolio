import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { alwiKnowledge } from "@/data/alwiKnowledge";

const apiKey = process.env.GROQ_API_KEY;

type ChatHistoryItem = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is missing." },
        { status: 500 },
      );
    }

    const body = await request.json();

    const message = body?.message;
    const history: ChatHistoryItem[] = Array.isArray(body?.history)
      ? body.history.filter(
          (item: unknown): item is ChatHistoryItem =>
            typeof item === "object" &&
            item !== null &&
            "role" in item &&
            "content" in item &&
            (item.role === "user" || item.role === "assistant") &&
            typeof item.content === "string",
        )
      : [];

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 },
      );
    }

    const groq = new Groq({
      apiKey,
    });

    const messages = [
      {
        role: "system" as const,
        content: alwiKnowledge,
      },

      ...history,

      {
        role: "user" as const,
        content: message,
      },
    ];

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages,
    });
    const rawReply =
      completion.choices[0]?.message?.content ??
      "Maaf, saya belum bisa memberikan jawaban saat ini.";

    const reply = rawReply.replace(/\*\*/g, "").trim();

    return NextResponse.json({
      reply,
    });
  } catch (error) {
    console.error("Groq API error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown Groq API error.",
      },
      { status: 500 },
    );
  }
}
