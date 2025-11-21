"use client";

import { Dumbbell, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const FEATURES = [
  {
    title: "Personalized Workout Plans",
    desc: "AI analyzes your goals, fitness level, and lifestyle to create daily workouts that actually work for you.",
    border: "hover:border-[#7F55B1] hover:shadow-[#7F55B1]/30",
    iconColor: "#9B7EBD",
  },
  {
    title: "Smart Nutrition Guidance",
    desc: "Get a tailored meal plan with balanced macros, calories, and food suggestions.",
    border: "hover:border-[#F49BAB] hover:shadow-[#F49BAB]/30",
    iconColor: "#F49BAB",
  },
  {
    title: "Daily Motivation",
    desc: "Receive personalized motivational messages to keep you moving every day.",
    border: "hover:border-[#FFE1E0] hover:shadow-[#FFE1E0]/30",
    iconColor: "#FFE1E0",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full bg-[#0A0A0A] text-white overflow-hidden">
      <section className="text-center py-24 md:py-32 px-4 md:px-6 relative">
        <div className="absolute inset-0 opacity-40 bg-linear-to-br from-[#7F55B1] via-[#9B7EBD] to-[#F49BAB] blur-[130px] animate-pulse-slow pointer-events-none"></div>
        <div className="relative z-10 fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#1A1A1A] border border-[#7F55B1]/40 flex items-center justify-center animate-soft-bounce">
              <Dumbbell className="w-7 h-7 md:w-9 md:h-9 text-[#F49BAB]" />
            </div>
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold leading-tight animated-gradient-text">
            Athletiq AI
          </h1>
          <p className="mt-4 md:mt-6 text-base md:text-xl text-gray-300 max-w-xl md:max-w-2xl mx-auto px-2">
            Your AI-powered personal trainer. Generate tailored workouts,
            nutrition plans, and daily fitness guidance — instantly.
          </p>
          <Link
            href="/form"
            className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 mt-8 text-base md:text-lg font-semibold rounded-xl
            bg-linear-to-r from-[#7F55B1] via-[#9B7EBD] to-[#F49BAB] text-black
            hover:scale-105 active:scale-95 transition-transform shadow-lg hover:shadow-[#7F55B1]/40"
          >
            Get Started <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </div>
      </section>
      <section className="py-16 md:py-20 px-4 md:px-6 fade-in-up delay-1">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-10 md:mb-14">
          How Athletiq AI Helps You
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 max-w-6xl mx-auto">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl bg-[#131313] border border-gray-800 transition 
              shadow-lg duration-300 hover:-translate-y-1 ${f.border}`}
            >
              <Sparkles
                className="w-8 h-8 md:w-10 md:h-10 mb-4"
                style={{ color: f.iconColor }}
              />
              <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">
                {f.title}
              </h3>
              <p className="text-gray-400 text-sm md:text-base">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="py-20 md:py-24 text-center fade-in-up delay-2 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to transform your fitness?
        </h2>
        <Link
          href="/form"
          className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl
          bg-linear-to-r from-[#7F55B1] via-[#F49BAB] to-[#FFE1E0] text-black
          hover:scale-110 active:scale-95 transition-transform shadow-lg"
        >
          Start Now <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
        </Link>
      </section>
    </main>
  );
}
