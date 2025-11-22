"use client";

import { useState } from "react";
import { Utensils, Play, Pause } from "lucide-react";
import ImageModal from "./ImageModal";
import type { Diet, ImageModalItem } from "@/types";

interface DietPlanProps {
  diet: Diet;
}

export default function DietPlan({ diet }: DietPlanProps) {
  const [selectedMeal, setSelectedMeal] = useState<ImageModalItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const toggleSpeak = () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    let text = `Diet plan. ${diet.overview}. Total daily calories: ${
      diet.dailyCalories
    }. 
    Breakfast: ${diet.meals.breakfast.join(", ")}. 
    Lunch: ${diet.meals.lunch.join(", ")}. 
    Dinner: ${diet.meals.dinner.join(", ")}. 
    Snacks: ${diet.meals.snacks.join(", ")}.`;

    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1.1;

    speechSynthesis.speak(utter);
    setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
  };

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
    } catch {
      setSelectedMeal({
        title: mealName,
        description: "Failed to generate image",
        imageUrl: null,
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="card-dark p-1 md:p-8 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center my-4 md:mb-6 px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-accent-pink">
            <Utensils className="w-6 h-6 md:w-8 md:h-8" />
            Diet Plan
          </h2>
          <button
            onClick={toggleSpeak}
            className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg
            text-sm md:text-base font-semibold transition 
            ${
              isSpeaking
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-orange-600 hover:bg-orange-700 text-white"
            }`}
          >
            {isSpeaking ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            {isSpeaking ? "Stop" : "Listen"}
          </button>
        </div>
        <p className="text-sm md:text-lg text-gray-300 mb-2 px-4">
          {diet.overview}
        </p>
        <p className="font-bold text-xl md:text-2xl text-accent-peach mb-2 px-4">
          Daily Calories: {diet.dailyCalories}
        </p>
        <p className="text-xs md:text-sm mb-4 text-gray-300 px-4">
          Tap any item to view an{" "}
          <span className="font-bold bg-linear-to-r from-[#7F55B1] via-[#F49BAB] to-[#FFE1E0] text-transparent animated-gradient-text">
            AI-generated
          </span>{" "}
          sample image
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {Object.entries(diet.meals).map(([meal, items]) => (
            <div
              key={meal}
              className="p-4 md:p-6 rounded-xl bg-[#1a1a1a] border border-gray-800"
            >
              <h3 className="text-lg md:text-xl font-bold mb-3 capitalize text-accent-lavender">
                {meal}
              </h3>
              <div className="space-y-2">
                {items.map((item: any, i: any) => (
                  <div
                    key={i}
                    onClick={() => handleMealClick(item)}
                    className="p-2.5 md:p-3 rounded-lg bg-primary border border-gray-800 
                    hover:border-accent-pink cursor-pointer transition-all 
                    text-sm md:text-base hover:shadow-lg hover:shadow-accent-pink/20"
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
