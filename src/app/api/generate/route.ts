import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

const SWIFTUI_SYSTEM_PROMPT = `You are an expert SwiftUI developer. Generate clean, production-ready SwiftUI code based on the user's description.

Rules:
- Use SwiftUI only (no UIKit)
- Target iOS 17+ (use modern APIs: @Observable, SwiftData if needed)
- Follow TCA architecture if state management is needed
- Include struct ContentView_Previews
- Use SF Symbols for icons
- Return ONLY the Swift code, no explanation, no markdown fences
- The code must compile without errors
- Use sensible colors, spacing, and typography`;

export async function POST(request: NextRequest) {
  try {
    const { prompt, context } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const userMessage = context
      ? `Context: ${context}\n\nGenerate SwiftUI code for: ${prompt}`
      : `Generate SwiftUI code for: ${prompt}`;

    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 4096,
        system: SWIFTUI_SYSTEM_PROMPT,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Anthropic API error:", error);
      return NextResponse.json(
        { error: "AI generation failed" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const code = data.content?.[0]?.text ?? "";

    return NextResponse.json({ code });
  } catch (err) {
    console.error("Generate route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
