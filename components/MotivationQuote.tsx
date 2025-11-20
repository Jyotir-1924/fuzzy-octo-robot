'use client'

import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

export default function MotivationQuote() {
  const [quote, setQuote] = useState<string>('Loading motivation...')

  useEffect(() => {
    fetchQuote()
  }, [])

  const fetchQuote = async () => {
    try {
      const response = await fetch('/api/generate-quote')
      const data = await response.json()
      setQuote(data.quote)
    } catch (error) {
      setQuote('Your only limit is you. Push harder today!')
    }
  }

  return (
    <div className="mb-12 p-8 rounded-2xl gradient-purple shadow-xl">
      <div className="flex items-center gap-3 mb-3">
        <Sparkles className="w-6 h-6 text-white" />
        <h2 className="text-xl font-bold text-white">Daily Motivation</h2>
      </div>
      <p className="text-lg md:text-xl italic text-white/90">{quote}</p>
    </div>
  )
}