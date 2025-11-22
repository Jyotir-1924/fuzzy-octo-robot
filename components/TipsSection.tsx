"use client";

import { Sparkles } from "lucide-react";

interface TipsSectionProps {
  tips: string[];
}

export default function TipsSection({ tips }: TipsSectionProps) {
  return (
    <div className="card-dark p-1 rounded-2xl shadow-xl">
      <div className="flex justify-center items-center mb-6 p-4">
        <h2 className="text-3xl font-bold flex items-center gap-3 text-accent-peach">
          <Sparkles className="w-8 h-8" />
          Tips & Motivation
        </h2>
      </div>

      <ul className="space-y-4 mb-4">
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
