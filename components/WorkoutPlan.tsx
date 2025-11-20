"use client";

import { useState } from "react";
import { Dumbbell, Play } from "lucide-react";
import ImageModal from "./ImageModal";
import type { Workout, ImageModalItem } from "@/types";

interface WorkoutPlanProps {
  workout: Workout;
}

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function WorkoutPlan({ workout }: WorkoutPlanProps) {
  const [selectedExercise, setSelectedExercise] =
    useState<ImageModalItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Monday");

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
        description: data.description || "No description available",
        imageUrl: data.imageUrl || null,
      });
    } catch {
      setSelectedExercise({
        title: exerciseName,
        description: "Failed to generate image",
        imageUrl: null,
      });
    }
    setIsLoading(false);
  };

  const todaysWorkout = workout.days.find(
    (day) => day.day.toLowerCase() === selectedDay.toLowerCase()
  );

  const speakPlan = () => {
    const text = `Workout plan for ${selectedDay}. ${todaysWorkout?.focus}.`;
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
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
        <div className="flex flex-wrap gap-2 mb-6">
          {WEEK_DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={[
                "px-4 py-1 rounded-full border text-sm transition-all duration-300 animate-day-button",
                selectedDay === day
                  ? "bg-gradient-to-r from-[#7F55B1] to-[#F49BAB] text-white border-transparent shadow-md scale-105 animate-glow"
                  : "bg-[#0f0f0f] border-gray-700 text-gray-300 hover:border-accent-purple hover:scale-105 hover:text-white",
              ].join(" ")}
            >
              {day}
            </button>
          ))}
        </div>
        {!todaysWorkout ? (
          <p className="text-gray-400 text-sm">
            No workout scheduled for {selectedDay}.
          </p>
        ) : (
          <div className="p-6 rounded-xl bg-[#1a1a1a] border border-gray-800">
            <h3 className="text-2xl font-bold mb-2 text-accent-lavender">
              {todaysWorkout.day}
            </h3>
            <p className="text-sm text-accent-purple mb-4 font-semibold">
              Focus: {todaysWorkout.focus}
            </p>

            <div className="space-y-3">
              {todaysWorkout.exercises.map((ex, i) => (
                <div
                  key={i}
                  onClick={() => handleExerciseClick(ex.name)}
                  className="p-4 rounded-lg bg-primary border border-gray-800 hover:border-accent-purple cursor-pointer transition-all hover:shadow-lg hover:shadow-accent-purple/20"
                >
                  <h4 className="font-semibold text-lg mb-1">{ex.name}</h4>
                  <p className="text-sm text-gray-400">
                    {ex.sets} sets × {ex.reps} reps | Rest: {ex.rest}
                  </p>
                  <p className="text-xs mt-2 text-gray-500">{ex.notes}</p>
                </div>
              ))}
            </div>
          </div>
        )}
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
