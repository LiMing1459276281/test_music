'use client'
import React from 'react';
import { getDictionary, i18nNamespaces } from '@/i18n';

export default function Features({ dictionary }: { dictionary: any }) {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
            {dictionary.title}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {dictionary.description}
          </p>
        </div>
    
        <div className="grid lg:grid-cols-3 gap-10">
          {dictionary.features.map((feature: any, index: number) => {
            const icons = [
              <svg key="1" className="w-12 h-12 text-purple-500 group-hover:text-purple-400 transition-colors" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>,
              <svg key="2" className="w-12 h-12 text-purple-500 group-hover:text-purple-400 transition-colors" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12.88v-1.76c0-1.04.85-1.9 1.9-1.9 1.81 0 2.55-1.28 1.64-2.85-.52-.9-.21-2.07.7-2.59l1.73-.99c.79-.47 1.81-.19 2.28.6l.11.19c.9 1.57 2.38 1.57 3.29 0l.11-.19c.47-.79 1.49-1.07 2.28-.6l1.73.99c.91.52 1.22 1.69.7 2.59-.91 1.57-.17 2.85 1.64 2.85 1.04 0 1.9.85 1.9 1.9v1.76c0 1.04-.85 1.9-1.9 1.9-1.81 0-2.55 1.28-1.64 2.85.52.91.21 2.07-.7 2.59l-1.73.99c-.79.47-1.81.19-2.28-.6l-.11-.19c-.9-1.57-2.38-1.57-3.29 0l-.11.19c-.47.79-1.49 1.07-2.28.6l-1.73-.99a1.899 1.899 0 0 1-.7-2.59c.91-1.57.17-2.85-1.64-2.85-1.05 0-1.9-.86-1.9-1.9Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>,
              <svg key="3" className="w-12 h-12 text-purple-500 group-hover:text-purple-400 transition-colors" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.39 20.87a.696.696 0 0 1-.78 0C9.764 19.637 2 14.15 2 8.973c0-6.68 7.33-7.643 10-3.2 2.67-4.443 10-3.48 10 3.2 0 5.177-7.764 10.664-9.61 11.897Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>,
              <svg key="4" className="w-12 h-12 text-purple-500 group-hover:text-purple-400 transition-colors" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM2.67 18.95l4.93-3.31c.79-.53 1.93-.47 2.64.14l.33.29c.78.67 2.04.67 2.82 0l4.16-3.57c.78-.67 2.04-.67 2.82 0L22 13.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>,
              <svg key="5" className="w-12 h-12 text-purple-500 group-hover:text-purple-400 transition-colors" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="m21.17 8-2.58-2.59c-.78-.78-2.05-.78-2.83 0l-2.42 2.42c-.78.78-.78 2.05 0 2.83l2.58 2.59c.78.78 2.05.78 2.83 0l2.42-2.42c.78-.78.78-2.05 0-2.83Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="m11 9-2.58-2.59c-.78-.78-2.05-.78-2.83 0L3.17 8.83c-.78.78-.78 2.05 0 2.83L8.42 17c.78.78 2.05.78 2.83 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>,
              <svg key="6" className="w-12 h-12 text-purple-500 group-hover:text-purple-400 transition-colors" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 17v-4M12 17v-2M15 17V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M22 10v5c0 5-2 7-7 7H9c-5 0-7-2-7-7V9c0-5 2-7 7-7h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 10h-4c-3 0-4-1-4-4V2l8 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ];

            return (
              <div 
                key={index} 
                className="relative group h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-500 blur"></div>
                <div className="relative h-full flex flex-col p-8 rounded-2xl bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 transform transition-all duration-500 group-hover:translate-y-[-5px]">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-purple-500/20 rounded-full filter blur-md transform group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="relative">
                      {icons[index]}
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-purple-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}