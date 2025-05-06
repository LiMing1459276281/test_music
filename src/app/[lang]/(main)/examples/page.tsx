import React from 'react';
import ExampleCarousel from "@/components/customUI/exampleCarousel";
import { getDictionary, i18nNamespaces } from '@/i18n'
import { Locale } from "@/i18n-config";
import { Music, Guitar, Headphones } from "lucide-react";

export default async function ExamplesPage({ params }: { params: { lang: Locale } }) {
  const examples = await getDictionary<any>(params.lang, i18nNamespaces.exampleCarousel);
  return (
    <main className="relative py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      {/* 背景图层 */}
      <div className="absolute inset-0 bg-[url('/assets/example-bg.jpg')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-blue-900/50 to-transparent" />

      <div className="relative max-w-8xl mx-auto px-4">
        <h2 className="text-6xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          {examples.title}
        </h2>

        {/* 添加文案点缀 */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-300">{examples.example_creativity}</p>
          <p className="text-lg text-gray-300">{examples.example_transformation}</p>
        </div>

        {/* 案例展示内容复制自首页 */}
        <ExampleCarousel dictionary={examples} />
      </div>
    </main>
  );
}