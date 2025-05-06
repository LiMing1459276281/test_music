'use client'
import { useState, useCallback, memo } from 'react'
import Link from 'next/link'
import { Locale, getPathname } from "@/i18n-config";

interface Step {
  number: number;
  title: string;
  description: string;
  color: string;
  hoverColor: string;
  textColor: string;
  bgColor: string;
  image: string;
  link?: {
    text: string;
    url: string;
  };
}

const steps: Step[] = [
  {
    number: 1,
    title: "Choose Your Photo",
    description: "Select the photo you'd like to use from your computer or phone to upload it.",
    color: "bg-blue-100/50",
    hoverColor: "hover:bg-blue-50/60 dark:hover:bg-blue-50/20",
    textColor: "text-blue-500",
    bgColor: "bg-blue-200",
    image: "/assets/step1-preview.webp"
  },
  {
    number: 2,
    title: "Add Prompts",
    description: "Describe the scene and actions you want to see (e.g., \"A girl hugging her mother\") to animate your photo.",
    color: "bg-purple-100/50",
    hoverColor: "hover:bg-purple-50/60 dark:hover:bg-purple-50/20",
    textColor: "text-purple-500",
    bgColor: "bg-purple-200",
    image: "/assets/step2-preview.jpg",
    link: {
      text: "Tips for Writing Effective Prompts",
      url: "/guide/effective-prompts"
    }
  },
  {
    number: 3,
    title: "Download and Share",
    description: "Download your animated video and spread the love with friends and family!",
    color: "bg-yellow-100/50",
    hoverColor: "hover:bg-yellow-50/60 dark:hover:bg-yellow-50/20",
    textColor: "text-yellow-500",
    bgColor: "bg-yellow-200",
    image: "/assets/step3-preview.webp"
  }
]

interface StepProps {
  step: Step;
  isSelected: boolean;
  onClick: () => void;
}

const Step = memo(({ step, isSelected, onClick }: StepProps) => (
  <div
    className={`p-6 cursor-pointer transition-all duration-300 rounded-lg group ${isSelected ? step.color : 'bg-gray-50 dark:bg-gray-800'
      } ${!isSelected ? step.hoverColor : ''}`}
    onClick={onClick}
  >
    <div className="flex items-start">
      <span className={`flex-shrink-0 w-8 h-8 font-bold rounded-full flex items-center justify-center mr-4 ${isSelected ? `${step.bgColor} ${step.textColor}` : `${step.textColor}`
        }`}>
        {step.number}
      </span>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
        <p className={`text-gray-600 ${isSelected ? 'dark:text-gray-800' : 'dark:text-gray-400 '}`}>{step.description}
          {step.link && (

            <Link
              className={`cursor-pointer font-semibold text-transparent bg-clip-text bg-gradient-to-r hover:bg-gradient-to-l from-purple-500 to-pink-500
                    ${isSelected && 'dark:from-purple-800 dark:to-pink-800'}`}
              href={`${getPathname("en", '/blog/article/prose-v2')}`}>{step.link.text}</Link>
          )}
        </p>
      </div>
    </div>
  </div>
))

Step.displayName = 'Step'

export default function HigWorksSteps() {
  const [selectedStep, setSelectedStep] = useState<number>(1)

  const handleStepClick = useCallback((stepNumber: number) => {
    setSelectedStep(stepNumber)
  }, [])

  return (
    <div className="px-4 mx-auto max-w-7xl md:mt-20 md:mb-20 mt-8 mb-12">
      <h2 className="mb-6 md:text-center md:mb-12 text-2xl md:text-4xl font-bold tracking-tight text-gray-900 md:font-extrabold lg:leading-none dark:text-white">
        Animate Your Old Photos in 3 Steps
      </h2>
      <div className="flex flex-col gap-8 md:flex-row-reverse pt-0 md:pt-8">
        <div className="md:w-3/5 w-full">
          <img
            src={steps[selectedStep - 1].image}
            alt={`Step ${selectedStep} Preview`}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-2/5 space-y-4">
          {steps.map((step) => (
            <Step
              key={step.number}
              step={step}
              isSelected={selectedStep === step.number}
              onClick={() => handleStepClick(step.number)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}