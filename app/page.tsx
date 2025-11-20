"use client";

import { useState, useEffect } from "react";
import { Dumbbell, RefreshCw, Download } from "lucide-react";
import FitnessForm from "@/components/FitnessForm";
import WorkoutPlan from "@/components/WorkoutPlan";
import DietPlan from "@/components/DietPlan";
import TipsSection from "@/components/TipsSection";
import MotivationQuote from "@/components/MotivationQuote";
import type { FormData, FitnessPlan } from "@/types";
import { exportPlanAsPDF } from "@/utils/exportPlan";

export default function Home() {
  const [step, setStep] = useState<"form" | "plan">("form");
  const [plan, setPlan] = useState<FitnessPlan | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitnessPlan");
    if (savedPlan) {
      try {
        setPlan(JSON.parse(savedPlan));
        setStep("plan");
      } catch (error) {
        console.error("Error parsing saved plan:", error);
      }
    }
  }, []);

  const generatePlan = async (formData: FormData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setPlan(data.plan);
      localStorage.setItem("fitnessPlan", JSON.stringify(data.plan));
      setStep("plan");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate plan. Please try again.");
    }
    setLoading(false);
  };

  const resetForm = () => {
    setStep("form");
    setPlan(null);
    localStorage.removeItem("fitnessPlan");
  };

  return (
    <main className="min-h-screen bg-primary text-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full gradient-purple flex items-center justify-center">
              <Dumbbell className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-linear-to-r from-accent-purple to-accent-lavender bg-clip-text text-transparent">
                AI Fitness Coach
              </span>
            </h1>
          </div>
        </header>
        <MotivationQuote />
        {step === "form" ? (
          <FitnessForm onSubmit={generatePlan} loading={loading} />
        ) : (
          <div className="space-y-8">
            {}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={resetForm}
                className="flex items-center gap-2 px-6 py-3 btn-primary text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-accent-purple/50 transition-all"
              >
                <RefreshCw className="w-5 h-5" />
                Generate New Plan
              </button>
            </div>
            {plan && (
              <>
                <WorkoutPlan workout={plan.workout} />
                <DietPlan diet={plan.diet} />
                <TipsSection tips={plan.tips} />
                <div className="flex justify-center mt-6">
                  <button
                    onClick={exportPlanAsPDF}
                    className="flex items-center gap-2 px-6 py-3 bg-accent-purple text-white rounded-xl 
        hover:bg-accent-pink hover:scale-105 hover:text-black transition-all duration-700 shadow-lg hover:shadow-accent-purple/40"
                  >
                    <Download className="w-5 h-5" />
                    Export as PDF
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
