"use client";

import { useState } from "react";
import { Dumbbell, Play } from "lucide-react";
import ImageModal from "./ImageModal";
import type { Workout, ImageModalItem } from "@/types";

interface WorkoutPlanProps {
  workout: Workout;
}

export default function WorkoutPlan({ workout }: WorkoutPlanProps) {
  const [selectedExercise, setSelectedExercise] =
    useState<ImageModalItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleExerciseClick = async (exerciseName: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: exerciseName, type: "exercise" }),
      });
      const data = await response.json();
      setSelectedExercise({
        title: exerciseName,
        description: data.description,
      });
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  const speakPlan = () => {
    let text = `Workout Plan. ${workout.overview}. `;
    workout.days.forEach((day) => {
      text += `${day.day}. Focus: ${day.focus}. `;
      day.exercises.forEach((ex) => {
        text += `${ex.name}. ${ex.sets} sets of ${ex.reps} reps. Rest ${ex.rest}. `;
      });
    });
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  return (
    <>
      <div className="card-dark p-8 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold flex items-center gap-3 text-accent-purple">
            <Dumbbell className="w-8 h-8" />
            Workout Plan
          </h2>
          <button
            onClick={speakPlan}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <Play className="w-5 h-5" />
            Listen
          </button>
        </div>

        <p className="mb-8 text-lg text-gray-300">{workout.overview}</p>

        <div className="space-y-6">
          {workout.days.map((day, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-[#1a1a1a] border border-gray-800"
            >
              <h3 className="text-2xl font-bold mb-2 text-accent-lavender">
                {day.day}
              </h3>
              <p className="text-sm text-accent-purple mb-4 font-semibold">
                Focus: {day.focus}
              </p>

              <div className="space-y-3">
                {day.exercises.map((ex, i) => (
                  <div
                    key={i}
                    onClick={() => handleExerciseClick(ex.name)}
                    className="p-4 rounded-lg bg-[#0f0f0f] border border-gray-800 hover:border-accent-purple cursor-pointer transition-all hover:shadow-lg hover:shadow-accent-purple/20"
                  >
                    <h4 className="font-semibold text-lg mb-1">{ex.name}</h4>
                    <p className="text-sm text-gray-400">
                      <span className="text-accent-pink">{ex.sets} sets</span> ×
                      <span className="text-accent-peach"> {ex.reps} reps</span>{" "}
                      | Rest: {ex.rest}
                    </p>
                    <p className="text-xs mt-2 text-gray-500">{ex.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {(selectedExercise || isLoading) && (
        <ImageModal
          item={selectedExercise}
          isLoading={isLoading}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </>
  );
}