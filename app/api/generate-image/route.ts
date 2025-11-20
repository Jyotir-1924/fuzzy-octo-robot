import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { item, type } = await request.json();

    const prompt =
      type === "meal"
        ? `Describe what a dish of ${item} typically looks like in 4 to 5 lines. 
           Include presentation, colors, textures, and overall appearance.`
        : `Describe in 4 to 5 lines what a person performing ${item} exercise looks like. 
           Include body position, environment, and how the movement looks visually.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;

    if (!text) throw new Error("Empty description");

    return NextResponse.json({ description: text });
  } catch (error) {
    console.error("Description generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate description" },
      { status: 500 }
    );
  }
}