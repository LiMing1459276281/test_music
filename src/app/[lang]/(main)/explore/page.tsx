import { queryImageInfoList } from '@/actions/explore';
import { ImagesForm } from './images-form';
import { Locale, getPathname, languages, localizationsKV } from "@/i18n-config";
import { host } from '@/config/config'
import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import FooterSocial from "@/components/customUI/footer-social";
import { getDictionary, i18nNamespaces } from '@/i18n'
import { Explore } from "@/types/locale";

export async function generateMetadata({ params }: { params: { lang: Locale } }) {
  const alternates = Object.keys(languages).reduce((acc, lang) => {
    acc[localizationsKV[lang]] = `${host}${getPathname(lang, '/explore')}`;
    return acc;
  }, {} as { [key: string]: string });
  const i18nExplore = await getDictionary<Explore>(params.lang, i18nNamespaces.explore);
  return {
    title: i18nExplore.meta.title,
    description: i18nExplore.meta.description,
    twitter: {
      card: "summary_large_image", title: i18nExplore.meta.title,
      description: i18nExplore.meta.description
    },
    openGraph: {
      type: "website",
      url: `${host}${getPathname(params.lang, '/explore')}`,
      title: i18nExplore.meta.title,
      description: i18nExplore.meta.description,
      siteName: "xxx"
    },
    other: { next: `${getPathname(params.lang, '/explore?page=3')}`, prev: `${getPathname(params.lang, '/explore?page=1')}` },
    alternates: {
      canonical: `${host}${getPathname(params.lang, '/explore')}`,
      languages: alternates
    }
  }
}
export function generateStaticParams() {
  return [{ page: 1 }]
}
export default async function Page({ params, searchParams }: Readonly<{ params: { lang: Locale, }, searchParams: { page: number } }>) {

  const dictionary = await getDictionary<Explore>(params.lang, i18nNamespaces.explore);
  const page = searchParams.page ? searchParams.page : 1;

  const images: any = await queryImageInfoList(undefined, page);

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-12">
        <ImagesForm images={images} pageParam={page} dictionary={dictionary} />
      </section>
    </>
  )
}