/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-04-15 22:20:10
 * @LastEditors: rendc
 * @LastEditTime: 2025-05-01 09:04:21
 */
import Link from "next/link";
import * as React from "react"
import UploadForm from "@/app/[lang]/(main)/upload-form";
import { getDictionary, i18nNamespaces } from '@/i18n'
import { Locale, getPathname, languages, localizationsKV } from "@/i18n-config";
import { host } from '@/config/config'
import ExampleCarousel from "@/components/customUI/exampleCarousel";
import { Home } from "@/types/locale";

import FAQ from '@/components/faq';
import Features from '@/components/Features';
import Hero from '@/components/hero'
import CTASection from "@/components/cta";
import Testimonials from "@/components/testimonials";
import Steps from "@/components/steps";
import { features } from "process";
export async function generateMetadata({ params }: { params: { lang: Locale } }) {
  const alternates = Object.keys(languages).reduce((acc, lang) => {
    acc[localizationsKV[lang]] = `${host}${getPathname(lang, '')}`;
    return acc;
  }, {} as { [key: string]: string });
  const i18nHome = await getDictionary<Home>(params.lang, i18nNamespaces.home);
  return {
    title: i18nHome.meta.title,
    description: i18nHome.meta.description,
    twitter: {
      card: "summary_large_image", title: i18nHome.meta.title,
      description: i18nHome.meta.description,
      images: ["https://aigeneratorsong.online/assets/share.png"]
    },
    alternates: {
      canonical: `${host}${getPathname(params.lang, '')}`,
      languages: alternates
    }
  }
}


export default async function page({ params: { lang } }: { params: { lang: Locale } }) {
  const faq = await getDictionary<any>(lang, i18nNamespaces.faq);
  const home = await getDictionary<Home>(lang, i18nNamespaces.home);
  const cta = await getDictionary<any>(lang, i18nNamespaces.cta);
  const features = await getDictionary<any>(lang, i18nNamespaces.features);
  const steps = await getDictionary<any>(lang, i18nNamespaces.steps);
  const testimonials = await getDictionary<any>(lang, i18nNamespaces.testimonials);
  const hero = await getDictionary<any>(lang, i18nNamespaces.hero);
  const exampleCarousel = await getDictionary<any>(lang, i18nNamespaces.exampleCarousel);
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <main className="min-h-screen bg-gray-900 pt-40 mb-30">
              {/* 背景图层保持不变 */}
              <div className="absolute inset-0 bg-[url('/assets/action-figure-bg.png')] bg-cover bg-center opacity-50 h-full" />
      <Hero dictionary={hero} />
      {/* 表单区域 */}
      <section 
        id="create-form" 
        className=" pt-4 px-4 mx-auto max-w-8xl pb-8  contaniner  backdrop-blur rounded-xl border border-gray-700/50 shadow-lg"
        {...fadeInUp}
      >
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="relative contaniner z-10">
          <UploadForm dictionary={home}  lang={lang} />
        </div>
      </section>
      <Steps dictionary={steps}/>
      <Features dictionary={features}/>
      <ExampleCarousel dictionary={exampleCarousel}/>
      <Testimonials dictionary={testimonials}/>
      <FAQ dictionary={faq}/>
      <CTASection dictionary={cta}/>
    </main>
  );}
