"use client";

import { useState } from "react";
import { User, Target } from "lucide-react";
import type { FormData } from "@/types";

interface FitnessFormProps {
  onSubmit: (data: FormData) => void;
  loading: boolean;
}

export default function FitnessForm({ onSubmit, loading }: FitnessFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    goal: "",
    level: "",
    location: "",
    diet: "",
    medical: "",
    stress: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.age) {
      alert("Please fill in required fields");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card-dark p-8 rounded-2xl shadow-2xl"
    >
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <User className="w-8 h-8 text-accent-purple" />
        Tell me about yourself
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Full Name (required)"
          required
          className="p-4 rounded-xl bg-primary border-2 border-gray-800 focus:border-accent-purple outline-none transition"
        />

        <input
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          placeholder="Age (required)"
          type="number"
          min={1}
          required
          className="p-4 rounded-xl bg-primary border-2 border-gray-800 focus:border-accent-purple outline-none transition"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          className="p-4 rounded-xl bg-primary border-2 border-gray-800 focus:border-accent-purple outline-none transition"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input
          name="height"
          value={formData.height}
          onChange={handleInputChange}
          placeholder="Height (cm)"
          type="number"
          min={1}
          className="p-4 rounded-xl bg-primary border-2 border-gray-800 focus:border-accent-purple outline-none transition"
        />

        <input
          name="weight"
          value={formData.weight}
          onChange={handleInputChange}
          placeholder="Weight (kg)"
          type="number"
          min={1}
          className="p-4 rounded-xl bg-primary border-2 border-gray-800 focus:border-accent-purple outline-none transition"
        />

        <select
          name="goal"
          value={formData.goal}
          onChange={handleInputChange}
          className="p-4 rounded-xl bg-primary border-2 border-gray-800 focus:border-accent-purple outline-none transition"
        >
          <option value="">Fitness Goal</option>
          <option value="weight-loss">Weight Loss</option>
          <option value="muscle-gain">Muscle Gain</option>
          <option value="endurance">Endurance</option>
          <option value="general-fitness">General Fitness</option>
        </select>

        <select
          name="level"
          value={formData.level}
          onChange={handleInputChange}
          className="p-4 rounded-xl bg-primary border-2 border-gray-800 focus:border-accent-purple outline-none transition"
        >
          <option value="">Fitness Level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <select
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="p-4 rounded-xl bg-primary border-2 border-gray-800 focus:border-accent-purple outline-none transition"
        >
          <option value="">Workout Location</option>
          <option value="home">Home</option>
          <option value="gym">Gym</option>
          <option value="outdoor">Outdoor</option>
        </select>

        <select
          name="diet"
          value={formData.diet}
          onChange={handleInputChange}
          className="p-4 rounded-xl bg-primary border-2 border-gray-800 focus:border-accent-purple outline-none transition"
        >
          <option value="">Dietary Preference</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="non-vegetarian">Non-Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="keto">Keto</option>
        </select>

        <input
          name="medical"
          value={formData.medical}
          onChange={handleInputChange}
          placeholder="Medical History (optional)"
          className="p-4 rounded-xl bg-primary border-2 border-gray-800 focus:border-accent-purple outline-none transition"
        />

        <select
          name="stress"
          value={formData.stress}
          onChange={handleInputChange}
          className="p-4 rounded-xl bg-primary border-2 border-gray-800 focus:border-accent-purple outline-none transition"
        >
          <option value="">Stress Level</option>
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full py-4 btn-primary text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-accent-purple/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {loading ? (
          <>
            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            Generating Your Personalized Plan...
          </>
        ) : (
          <>
            <Target className="w-6 h-6" />
            Generate My Fitness Plan
          </>
        )}
      </button>
    </form>
  );
}
