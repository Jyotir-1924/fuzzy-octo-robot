import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const { item, type } = await request.json();

    const prompt =
      type === "meal"
        ? `Generate a high-quality, professional food photography image of ${item}. Show the meal beautifully plated with garnishes and natural lighting. Restaurant quality presentation.`
        : `Generate a high-quality, professional fitness photography image of a person performing ${item} exercise. Show proper form and technique in a gym environment.`;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateImages({
      model: "imagen-4.0-generate-001",
      prompt: prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: "1:1",
      },
    });

    if (
      !response ||
      !response.generatedImages ||
      response.generatedImages.length === 0
    ) {
      throw new Error("No image generated");
    }

    const image = response.generatedImages[0].image;
    if (!image || !image.imageBytes) {
      throw new Error("Image data not available");
    }
    const imageBytes = image.imageBytes;
    const imageUrl = `data:image/png;base64,${imageBytes}`;

    return NextResponse.json({
      imageUrl,
      description: prompt,
    });
  } catch (error) {
    console.error("Image generation error:", error);

    return NextResponse.json({
      imageUrl: null,
      description: "Image generation currently unavailable",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}