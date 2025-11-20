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
        className="max-w-3xl w-full card-dark p-8 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {isLoading ? (
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-accent-purple border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-xl text-gray-300">Generating AI Image...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
          </div>
        ) : item ? (
          <>
            <h3 className="text-3xl font-bold mb-6 bg-linear-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent">
              {item.title}
            </h3>

            {item.imageUrl ? (
              <div className="mb-6">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full rounded-xl shadow-lg"
                />
              </div>
            ) : (
              <div className="mb-6 p-8 bg-gray-800 rounded-xl text-center">
                <p className="text-yellow-400 mb-2">⚠️ Image generation unavailable</p>
                <p className="text-sm text-gray-400">
                  {item.description.includes('unavailable') || item.description.includes('billing')
                    ? 'Please enable billing for Imagen API or check your API key'
                    : 'Image could not be generated at this time'}
                </p>
              </div>
            )}

            {!item.imageUrl && (
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed text-base whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            )}

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