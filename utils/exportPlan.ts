import { jsPDF } from "jspdf";

export function exportPlanAsPDF() {
  const planData = localStorage.getItem("fitnessPlan");
  if (!planData) return alert("No plan available to export");

  try {
    const plan = JSON.parse(planData);

    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    let y = 40;

    const sectionHeader = (title: string) => {
      pdf.setFont("Helvetica", "bold");
      pdf.setFontSize(16);
      pdf.setTextColor("#7F55B1");
      pdf.text(title, 40, y);

      pdf.setDrawColor("#9B7EBD");
      pdf.setLineWidth(1.2);
      pdf.line(40, y + 4, 555, y + 4);

      y += 24;
      pdf.setTextColor("#000000");
    };

    const addText = (text: string, size = 12, bold = false) => {
      pdf.setFontSize(size);
      pdf.setFont("Helvetica", bold ? "bold" : "normal");
      pdf.setTextColor("#1A1A1A");

      const lines = pdf.splitTextToSize(text, 520);
      pdf.text(lines, 40, y);

      y += lines.length * 18;

      if (y > 780) {
        pdf.addPage();
        y = 40;
      }
    };

    pdf.setFillColor("#F49BAB");
    pdf.rect(0, 0, 595, 90, "F");

    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(28);
    pdf.setTextColor("#FFFFFF");
    pdf.text("Athletiq AI — Personalized Fitness Plan", 40, 55);

    y = 120;

    sectionHeader("WORKOUT PLAN");
    addText(plan.workout.overview, 12);

    plan.workout.days.forEach((day: any) => {
      addText(`${day.day} — ${day.focus}`, 14, true);

      day.exercises.forEach((ex: any) => {
        addText(
          `• ${ex.name} — ${ex.sets} sets × ${ex.reps} reps  |  Rest: ${ex.rest}`
        );
      });

      y += 10;
    });

    y += 10;

    sectionHeader("DIET PLAN");

    addText(plan.diet.overview);
    addText(`Daily Calories: ${plan.diet.dailyCalories}`, 12, true);

    const mealSection = (title: string, items: string[]) => {
      addText(title, 14, true);
      addText("• " + items.join("\n• "));
      y += 6;
    };

    mealSection("BREAKFAST", plan.diet.meals.breakfast);
    mealSection("LUNCH", plan.diet.meals.lunch);
    mealSection("DINNER", plan.diet.meals.dinner);
    mealSection("SNACKS", plan.diet.meals.snacks);

    y += 10;

    sectionHeader("TIPS & MOTIVATION");
    plan.tips.forEach((tip: string, i: number) => {
      addText(`${i + 1}. ${tip}`);
    });

    pdf.save("Athletiq-AI-Fitness-Plan.pdf");
  } catch (error) {
    console.error("PDF ERROR:", error);
    alert("Failed to export plan");
  }
}
