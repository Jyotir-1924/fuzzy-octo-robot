"use client";

import { useState } from "react";
import { Utensils, Play } from "lucide-react";
import ImageModal from "./ImageModal";
import type { Diet, ImageModalItem } from "@/types";

interface DietPlanProps {
  diet: Diet;
}

export default function DietPlan({ diet }: DietPlanProps) {
  const [selectedMeal, setSelectedMeal] = useState<ImageModalItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleMealClick = async (mealName: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: mealName, type: "meal" }),
      });
      const data = await response.json();
      setSelectedMeal({
        title: mealName,
        description: data.description || "No description available",
        imageUrl: data.imageUrl || null,
      });
    } catch (error) {
      console.error("Error:", error);
      setSelectedMeal({
        title: mealName,
        description: "Failed to generate image",
        imageUrl: null,
      });
    }
    setIsLoading(false);
  };

  const speakPlan = () => {
    let text = `Diet Plan. ${diet.overview}. Daily target: ${diet.dailyCalories}. `;
    text += `Breakfast: ${diet.meals.breakfast.join(", ")}. `;
    text += `Lunch: ${diet.meals.lunch.join(", ")}. `;
    text += `Dinner: ${diet.meals.dinner.join(", ")}. `;
    text += `Snacks: ${diet.meals.snacks.join(", ")}.`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  return (
    <>
      <div className="card-dark p-8 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold flex items-center gap-3 text-accent-pink">
            <Utensils className="w-8 h-8" />
            Diet Plan
          </h2>
          <button
            onClick={speakPlan}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            <Play className="w-5 h-5" />
            Listen
          </button>
        </div>

        <p className="mb-4 text-lg text-gray-300">{diet.overview}</p>
        <p className="mb-8 font-bold text-2xl text-accent-peach">
          Daily Calories: {diet.dailyCalories}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(diet.meals).map(([meal, items]) => (
            <div
              key={meal}
              className="p-6 rounded-xl bg-[#1a1a1a] border border-gray-800"
            >
              <h3 className="text-xl font-bold mb-4 capitalize text-accent-lavender">
                {meal}
              </h3>
              <div className="space-y-2">
                {items.map((item: any, i: any) => (
                  <div
                    key={i}
                    onClick={() => handleMealClick(item)}
                    className="p-3 rounded-lg bg-primary border border-gray-800 hover:border-accent-pink cursor-pointer transition-all hover:shadow-lg hover:shadow-accent-pink/20"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {(selectedMeal || isLoading) && (
        <ImageModal
          item={selectedMeal}
          isLoading={isLoading}
          onClose={() => setSelectedMeal(null)}
        />
      )}
    </>
  );
}
