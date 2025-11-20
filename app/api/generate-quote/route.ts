import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  try {
    if (!process.env.GOOGLE_GENAI_API_KEY) {
      return NextResponse.json(
        { quote: "Your only limit is you. Push harder today!" },
        { status: 200 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const result = await model.generateContent(`
      Give me ONE short motivational fitness quote related to gym and weight loss.
      Only return the quote in atleast 10 words.
      No title, no labels, no new lines.
    `);

    const text = result.response.text().trim();

    return NextResponse.json({ quote: text });
  } catch (error) {
    console.error("Quote error:", error);
    return NextResponse.json(
      { quote: "No Pain, No Gain !" },
      { status: 200 }
    );
  }
}