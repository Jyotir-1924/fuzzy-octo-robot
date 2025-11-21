"use client";

import { useRouter } from "next/navigation";
import { ArrowBigLeft } from "lucide-react";
import { useState } from "react";
import FitnessForm from "@/components/FitnessForm";
import type { FormData } from "@/types";

export default function FormPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const generatePlan = async (data: FormData) => {
    setLoading(true);

    const res = await fetch("/api/generate-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const plan = await res.json();
    localStorage.setItem("fitnessPlan", JSON.stringify(plan.plan));

    setLoading(false);
    router.push("/plan");
  };

  return (
    <main className="min-h-screen bg-primary text-white px-4 py-10">
      <div className="max-w-4xl mx-auto mb-6">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
            bg-primary border border-gray-700 text-gray-300
            hover:text-white hover:border-accent-purple hover:scale-105
            transition-all duration-300"
        >
          <ArrowBigLeft className="w-5 h-5" />
          Back to Home
        </button>
      </div>
      <div className="max-w-4xl mx-auto">
        <FitnessForm onSubmit={generatePlan} loading={loading} />
      </div>

    </main>
  );
}
