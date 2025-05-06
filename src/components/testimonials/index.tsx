'use client'
import { getDictionary } from '@/i18n'

function Rating() {
  return (
    <div className="flex items-center mb-6 text-purple-500 justify-center group-hover:text-purple-400 transition-colors">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-5 h-5 me-1 transform group-hover:scale-110 transition-transform duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      ))}
    </div>
  )
}

export default async function Testimonials({ dictionary }: { dictionary: any }) {
  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-purple-900/20">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
            {dictionary.title}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {dictionary.subtitle}
          </p>
        </div>
    
        <div className="grid md:grid-cols-3 gap-8">
          {dictionary.testimonials.map((testimonial: any, index: number) => (
            <div key={index} className="group relative">
              {/* 卡片光晕效果 */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-300"></div>
              
              <div className="relative h-full flex flex-col bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-lg p-8 transition-all duration-300 group-hover:translate-y-[-5px] group-hover:bg-gray-800/70">
                <div className="absolute right-4 top-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg className="w-12 h-12 text-purple-500" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10 8c-3.3 0-6 2.7-6 6v10h6V14h-4c0-2.2 1.8-4 4-4zm12 0c-3.3 0-6 2.7-6 6v10h6V14h-4c0-2.2 1.8-4 4-4z"/>
                  </svg>
                </div>

                <Rating />
                
                <p className="text-gray-300 mb-8 flex-grow relative z-10">
                  {testimonial.text}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <p className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                    {testimonial.author}
                  </p>
                  <div className="h-px w-16 bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
