'use client'

import { Locale } from '@/i18n-config'
export default async function Steps({ dictionary }: { dictionary: any }) {
  return (
    <section id="steps-section" className="relative px-4 pt-20 pb-4 text-center bg-gray-900/80">
      <div className="absolute inset-0 bg-grid-white/5" />
      <div className="max-w-5xl mx-auto mb-12 relative z-10">
        <h3 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          {dictionary.title}
        </h3>
        <p className="text-gray-400 mb-8">{dictionary.subtitle}</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <StepCard
            icon={<UploadIcon />}
            title={dictionary.steps.upload.title}
            description={dictionary.steps.upload.description}
            bgColor="bg-purple-900/30"
            textColor="text-purple-400"
          />
          
          <StepCard
            icon={<StyleIcon />}
            title={dictionary.steps.style.title}
            description={dictionary.steps.style.description}
            bgColor="bg-blue-900/30"
            textColor="text-blue-400"
          />
          
          <StepCard
            icon={<GenerateIcon />}
            title={dictionary.steps.generate.title}
            description={dictionary.steps.generate.description}
            bgColor="bg-green-900/30"
            textColor="text-green-400"
          />
        </div>
      </div>
    </section>
  )
}

interface StepCardProps {
  icon: React.ReactNode
  title: string
  description: string
  bgColor: string
  textColor: string
}

function StepCard({ icon, title, description, bgColor, textColor }: StepCardProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6 hover:border-purple-500 transition-all duration-300">
      <div className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
        <div className={`w-8 h-8 ${textColor}`}>{icon}</div>
      </div>
      <h4 className="text-lg font-semibold mb-2 text-gray-100">{title}</h4>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

function UploadIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  )
}

function StyleIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  )
}

function GenerateIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  )
}