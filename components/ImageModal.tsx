'use client'

import type { ImageModalItem } from '@/types'

interface ImageModalProps {
  item: ImageModalItem | null
  isLoading: boolean
  onClose: () => void
}

export default function ImageModal({ item, isLoading, onClose }: ImageModalProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="max-w-3xl w-full card-dark p-8 rounded-2xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {isLoading ? (
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-accent-purple border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-xl text-gray-300">Generating description...</p>
          </div>
        ) : item ? (
          <>
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent">
              {item.title}
            </h3>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                {item.description}
              </p>
            </div>

            <button
              onClick={onClose}
              className="mt-8 w-full py-3 btn-primary text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-accent-purple/50 transition"
            >
              Close
            </button>
          </>
        ) : null}
      </div>
    </div>
  )
}