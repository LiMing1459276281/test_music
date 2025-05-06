
import Link from "next/link";
import * as React from "react";
import { getDictionary, i18nNamespaces } from '@/i18n';
import { Locale } from "@/i18n-config";
import { Home } from "@/types/locale";

export default async function AboutPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary<any>(lang, i18nNamespaces.about);

  return (
    <main className=" bg-gray-900">
      <section className="relative px-4 pt-20 pb-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/about-bg.jpg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-blue-900/50 to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg"> 
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient">
            {dictionary.about_us_title}
          </h1>
          <h2 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-8"> 
            {dictionary.about_us_subtitle}
          </h2>
          <p className="text-lg text-gray-400 mb-8"> 
            {dictionary.about_us_description}
          </p>
          <h3 className="text-2xl font-semibold text-gray-200 mb-4">{dictionary.how_it_works_title}</h3> 
          <ol className="list-decimal list-inside text-lg text-gray-400 mb-8"> 
            <li>{dictionary.how_it_works_step_1}</li>
            <li>{dictionary.how_it_works_step_2}</li>
            <li>{dictionary.how_it_works_step_3}</li>
            <li>{dictionary.how_it_works_step_4}</li>
          </ol>
          <p className="text-lg text-gray-400 mb-8"> 
            {dictionary.about_us_team_description}
          </p>
        </div>
      </section>

      {/* 联系方式区域 */}
      <section className="py-20 bg-gray-900/80">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            {dictionary.contact_us_title}
          </h2>
          <p className="text-xl mb-8 text-gray-300">{dictionary.contact_us_description}</p>
          <Link href="mailto:support@aigeneratorsong.online" className="flex items-center justify-center text-purple-400 hover:text-purple-300 transition-colors">
            <svg className="w-5 h-5 mr-2 mt-1" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                <path d="m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"></path>
            </svg>
            support@aigeneratorsong.online
          </Link>
        </div>
      </section>
    </main>
  );
}
