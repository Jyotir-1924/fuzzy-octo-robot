import { jsPDF } from "jspdf";

export function exportPlanAsPDF() {
  const planData = localStorage.getItem("fitnessPlan");
  if (!planData) return alert("No plan available to export");
  try {
    const plan = JSON.parse(planData);

    const pdf = new jsPDF({ unit: "pt", format: "a4" });
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
          `• ${ex.name}: ${ex.sets} sets × ${ex.reps} reps (Rest: ${ex.rest})`
        );
      });
      y += 6;
    });
    y += 10;

    addText("DIET PLAN", 16, true);
    addText(plan.diet.overview);
    addText(`Daily Calories: ${plan.diet.dailyCalories}`);

    addText("\nBREAKFAST", 14, true);
    addText(plan.diet.meals.breakfast.join(", "));

    addText("\nLUNCH", 14, true);
    addText(plan.diet.meals.lunch.join(", "));

    addText("\nDINNER", 14, true);
    addText(plan.diet.meals.dinner.join(", "));

    addText("\nSNACKS", 14, true);
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
}
