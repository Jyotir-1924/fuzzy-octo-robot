"use client";

import { useState } from "react";
import { Dumbbell, Play, Pause } from "lucide-react";
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
  const [isSpeaking, setIsSpeaking] = useState(false);

  const todaysWorkout = workout.days.find(
    (day) => day.day.toLowerCase() === selectedDay.toLowerCase()
  );

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

  const toggleSpeak = () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    let text = todaysWorkout
      ? `Workout plan for ${selectedDay}. Focus: ${todaysWorkout.focus}. ` +
        todaysWorkout.exercises
          .map(
            (ex) =>
              `${ex.name}. ${ex.sets} sets of ${ex.reps} reps. Rest: ${ex.rest}.`
          )
          .join(" ")
      : `There is no workout scheduled for ${selectedDay}.`;

    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.95;
    speechSynthesis.speak(utter);
    setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
  };

  return (
    <>
      <div className="card-dark p-6 md:p-8 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-accent-purple">
            <Dumbbell className="w-6 h-6 md:w-8 md:h-8" />
            Workout Plan
          </h2>
          <button
            onClick={toggleSpeak}
            className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2
            rounded-lg transition font-semibold text-sm md:text-base
            ${
              isSpeaking
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
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
        <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
          {WEEK_DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1 rounded-full text-xs md:text-sm border transition-all duration-300
              ${
                selectedDay === day
                  ? "bg-linear-to-r from-accent-purple to-accent-pink text-white border-transparent"
                  : "bg-primary border-gray-700 text-gray-300 hover:text-white hover:scale-105"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
        {!todaysWorkout ? (
          <p className="text-gray-400 text-sm md:text-base">
            No workout scheduled for {selectedDay}.
          </p>
        ) : (
          <div className="p-2 md:p-6 rounded-xl bg-[#1a1a1a] border border-gray-800">
            <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 text-accent-lavender px-2">
              {todaysWorkout.day}
            </h3>
            <p className="text-xs md:text-sm text-accent-purple mb-3 md:mb-4 font-semibold px-2">
              Focus: {todaysWorkout.focus}
            </p>

            <p className="text-xs md:text-sm mb-3 text-gray-300 px-2">
              Tap on any exercise to see an{" "}
              <span className="font-bold bg-linear-to-r from-accent-purple via-accent-pink to-accent-peach text-transparent animated-gradient-text">
                AI-generated
              </span>{" "}
              sample image
            </p>
            <div className="space-y-2 md:space-y-3">
              {todaysWorkout.exercises.map((ex, i) => (
                <div
                  key={i}
                  onClick={() => handleExerciseClick(ex.name)}
                  className="p-3 md:p-4 rounded-lg bg-primary border border-gray-800 hover:border-accent-purple cursor-pointer transition-all hover:shadow-lg hover:shadow-accent-purple/20"
                >
                  <h4 className="font-semibold text-base md:text-lg mb-1">
                    {ex.name}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-400">
                    {ex.sets} sets × {ex.reps} reps | Rest: {ex.rest}
                  </p>
                  <p className="text-[10px] md:text-xs mt-1 text-gray-500">
                    {ex.notes}
                  </p>
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
