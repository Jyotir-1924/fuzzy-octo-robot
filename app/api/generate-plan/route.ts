import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    const prompt = `
      You are an expert fitness coach. Generate a detailed, personalized fitness plan.
      Output must use these EXACT weekday names:
      ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

      For the workout.days array, ALWAYS use one of those 7 exact day names.

      Name: ${formData.name}
      Age: ${formData.age}, Gender: ${formData.gender}
      Height: ${formData.height}cm, Weight: ${formData.weight}kg
      Fitness Goal: ${formData.goal}
      Fitness Level: ${formData.level}
      Workout Location: ${formData.location}
      Dietary Preference: ${formData.diet}
      ${formData.medical ? `Medical History: ${formData.medical}` : ""}
      ${formData.stress ? `Stress Level: ${formData.stress}` : ""}

      Return ONLY valid JSON with this structure:

      {
        "workout": {
          "overview": "",
          "days": [
            {
              "day": "Monday",
              "focus": "",
              "exercises": [
                {
                  "name": "",
                  "sets": "",
                  "reps": "",
                  "rest": "",
                  "notes": ""
                }
              ]
            }
          ]
        },
        "diet": {
          "overview": "",
          "dailyCalories": "",
          "meals": {
            "breakfast": [],
            "lunch": [],
            "dinner": [],
            "snacks": []
          }
        },
        "tips":[]
      }

      STRICT RULES:
      - No markdown
      - No backticks
      - No explanation
      - Return *only* valid JSON
      `
    ;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);

    const raw = result.response.text();

    let cleaned = raw
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    cleaned = cleaned.substring(cleaned.indexOf("{"));
    cleaned = cleaned.substring(0, cleaned.lastIndexOf("}") + 1);

    const plan = JSON.parse(cleaned);

    return NextResponse.json({ plan });
  } catch (error) {
    console.error("PLAN ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to generate plan",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
