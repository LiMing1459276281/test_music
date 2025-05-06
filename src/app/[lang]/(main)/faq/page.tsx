import React from 'react';
import { getDictionary, i18nNamespaces } from '@/i18n';
import { Locale } from "@/i18n-config";
import FAQ from '@/components/faq';

export default async function FAQPage({ params }: { params: { lang: Locale } }) {
  const faq = await getDictionary<any>(params.lang, i18nNamespaces.faq);
  return <FAQ dictionary={faq} />;
}