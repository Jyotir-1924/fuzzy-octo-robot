"use client";

import { Sparkles, Download } from "lucide-react";
import { jsPDF } from "jspdf";

interface TipsSectionProps {
  tips: string[];
}

export default function TipsSection({ tips }: TipsSectionProps) {
  const exportToPDF = () => {
    const planData = localStorage.getItem("fitnessPlan");
    if (!planData) return;

    try {
      const plan = JSON.parse(planData);

      const pdf = new jsPDF({
        unit: "pt",
        format: "a4",
      });

      let y = 40;

      const addText = (text: string, size = 12, bold = false) => {
        pdf.setFontSize(size);
        pdf.setFont("Helvetica", bold ? "bold" : "normal");

        const lines = pdf.splitTextToSize(text, 530);
        pdf.text(lines, 40, y);
        y += lines.length * 16;
        if (y > 760) {
          pdf.addPage();
          y = 40;
        }
      };

      addText("AI FITNESS COACH - Personalized Fitness Plan", 20, true);
      y += 10;

      addText("WORKOUT PLAN", 16, true);
      addText(plan.workout.overview);

      plan.workout.days.forEach((day: any) => {
        addText(`\n${day.day} — ${day.focus}`, 14, true);

        day.exercises.forEach((ex: any) => {
          addText(
            `• ${ex.name}: ${ex.sets} sets × ${ex.reps} reps (Rest: ${ex.rest})`,
            12
          );
        });

        y += 6;
      });

      y += 10;
      addText("DIET PLAN", 16, true);
      addText(plan.diet.overview);
      addText(`Daily Calories: ${plan.diet.dailyCalories}`);

      addText("\nBREAKFAST:", 14, true);
      addText(plan.diet.meals.breakfast.join(", "));

      addText("\nLUNCH:", 14, true);
      addText(plan.diet.meals.lunch.join(", "));

      addText("\nDINNER:", 14, true);
      addText(plan.diet.meals.dinner.join(", "));

      addText("\nSNACKS:", 14, true);
      addText(plan.diet.meals.snacks.join(", "));

      y += 10;
      addText("TIPS & MOTIVATION", 16, true);

      plan.tips.forEach((tip: string, i: number) => {
        addText(`${i + 1}. ${tip}`);
      });

      pdf.save("Fitness-Coach-Plan.pdf");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Failed to export plan");
    }
  };

  return (
    <div className="card-dark p-8 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold flex items-center gap-3 text-accent-peach">
          <Sparkles className="w-8 h-8" />
          Tips & Motivation
        </h2>
        <button
          onClick={exportToPDF}
          className="flex items-center gap-2 px-4 py-2 btn-secondary rounded-lg font-semibold hover:shadow-lg transition"
        >
          <Download className="w-5 h-5" />
          Export Plan
        </button>
      </div>

      <ul className="space-y-4">
        {tips.map((tip, i) => (
          <li
            key={i}
            className="flex items-start gap-4 p-4 rounded-lg bg-[#1a1a1a] border border-gray-800"
          >
            <span className="text-accent-purple font-bold text-xl mt-1">
              {i + 1}.
            </span>
            <span className="text-gray-300 leading-relaxed">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
