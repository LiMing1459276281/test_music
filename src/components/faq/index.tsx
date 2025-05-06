import React from 'react';
import Link from "next/link";

export default function FAQ({ dictionary }: { dictionary: any }) {
  return (
    <main className="relative py-24 overflow-hidden bg-[#0A0A0A]">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-40 w-[600px] h-[600px] bg-purple-600/10 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="  text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
            {dictionary.faq_title}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {dictionary.faq_description}
          </p>
        </div>
        
        <div className="space-y-6">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div 
              key={num}
              className="group bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white/90 group-hover:text-white transition-colors">
                  {dictionary[`question_${num}`]}
                </h3>
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <svg 
                    className="w-5 h-5 text-purple-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </div>
              </div>
              <div className="pl-0">
                <p className="text-gray-400 leading-relaxed">
                  {dictionary[`answer_${num}`]}
                </p>
              </div>
            </div>
          ))}

          <div className="mt-12 text-center bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
            <p className="text-white/90 mb-4 text-lg">{dictionary.more_questions}</p>
            <Link 
              href="https://support@aigeneratorsong.online" 
              className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors group"
            >
              <span>{dictionary.contact_support}</span>
              <svg 
                className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}