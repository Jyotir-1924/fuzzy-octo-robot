'use client'

import { Sparkles, Download } from 'lucide-react'

interface TipsSectionProps {
  tips: string[]
}

export default function TipsSection({ tips }: TipsSectionProps) {
  const exportToPDF = () => {
    const planData = localStorage.getItem('fitnessPlan')
    if (!planData) return

    try {
      const plan = JSON.parse(planData)
      let content = `AI FITNESS COACH - PERSONALIZED PLAN\n\n`
      content += `WORKOUT PLAN\n${plan.workout.overview}\n\n`
      
      plan.workout.days.forEach((day: any) => {
        content += `${day.day} - ${day.focus}\n`
        day.exercises.forEach((ex: any) => {
          content += `  • ${ex.name}: ${ex.sets} sets × ${ex.reps} reps (Rest: ${ex.rest})\n`
        })
        content += '\n'
      })

      content += `\nDIET PLAN\n${plan.diet.overview}\n`
      content += `Daily Calories: ${plan.diet.dailyCalories}\n\n`
      content += `Breakfast: ${plan.diet.meals.breakfast.join(', ')}\n`
      content += `Lunch: ${plan.diet.meals.lunch.join(', ')}\n`
      content += `Dinner: ${plan.diet.meals.dinner.join(', ')}\n`
      content += `Snacks: ${plan.diet.meals.snacks.join(', ')}\n\n`
      
      content += `TIPS & MOTIVATION\n`
      plan.tips.forEach((tip: string, i: number) => {
        content += `${i + 1}. ${tip}\n`
      })

      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'fitness-plan.txt'
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error exporting plan:', error)
      alert('Failed to export plan')
    }
  }

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
          <li key={i} className="flex items-start gap-4 p-4 rounded-lg bg-[#1a1a1a] border border-gray-800">
            <span className="text-accent-purple font-bold text-xl mt-1">
              {i + 1}.
            </span>
            <span className="text-gray-300 leading-relaxed">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}