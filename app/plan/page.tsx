"use client";

import { useEffect, useState } from "react";
import WorkoutPlan from "@/components/WorkoutPlan";
import DietPlan from "@/components/DietPlan";
import TipsSection from "@/components/TipsSection";
import { exportPlanAsPDF } from "@/utils/exportPlan";
import { Download, ArrowBigLeft, RefreshCcw } from "lucide-react";
import type { FitnessPlan } from "@/types";

export default function PlanPage() {
  const [plan, setPlan] = useState<FitnessPlan | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("fitnessPlan");
    if (saved) setPlan(JSON.parse(saved));
  }, []);

  if (!plan)
    return (
      <p className="text-center mt-20 text-gray-300 text-lg px-4">
        No plan found.
      </p>
    );

  return (
    <main className="min-h-screen bg-primary text-white px-4 py-6 md:py-10 max-w-5xl mx-auto space-y-8">
      <div
        className="sticky top-0 z-50 bg-primary/80 backdrop-blur-xl py-3 
        flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 
        border-b border-gray-800 shadow-lg px-2"
      >
        <a
          href="/"
          className="flex items-center gap-2 px-5 py-2 w-full sm:w-auto justify-center
            rounded-xl text-sm font-semibold
            bg-primary border border-gray-700 text-gray-300
            hover:text-white hover:border-accent-purple hover:shadow-accent-purple/30
            hover:scale-[1.05] active:scale-95 transition-all duration-200"
        >
          <ArrowBigLeft className="w-5 h-5" />
          Home
        </a>
        <a
          href="/form"
          className="flex items-center gap-2 px-5 py-2 w-full sm:w-auto justify-center
          rounded-xl text-sm font-semibold
          bg-linear-to-r from-accent-purple via-accent-lavender to-accent-pink text-black
          hover:shadow-lg hover:shadow-accent-lavender/40
          hover:scale-[1.05] active:scale-95 transition-all duration-200"
        >
          <RefreshCcw className="w-5 h-5" />
          New Plan
        </a>
      </div>
      <div className="space-y-10 md:space-y-12">
        <WorkoutPlan workout={plan.workout} />
        <DietPlan diet={plan.diet} />
        <TipsSection tips={plan.tips} />
      </div>
      <div className="flex justify-center mt-4 md:mt-8 pb-10">
        <button
          onClick={exportPlanAsPDF}
          className="flex items-center gap-2 px-6 py-3 rounded-xl
          bg-accent-purple text-white font-semibold
          hover:bg-accent-pink hover:text-black hover:scale-105
          transition-all duration-500 shadow-lg hover:shadow-accent-purple/40"
        >
          <Download className="w-5 h-5" />
          Export as PDF
        </button>
      </div>
    </main>
  );
}
