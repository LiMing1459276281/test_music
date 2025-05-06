
import { Locale, getPathname, languages, localizationsKV } from "@/i18n-config";
import { host } from '@/config/config'
import Login from "./login";

export async function generateMetadata({ params }: { params: { lang: Locale } }) {
  const alternates = Object.keys(languages).reduce((acc, lang) => {
    acc[localizationsKV[lang]] = `${host}${getPathname(lang, '/sign-in')}`;
    return acc;
  }, {} as { [key: string]: string });
  return {
    alternates: {
      canonical: `${host}${getPathname(params.lang, '/sign-in')}`,
      languages: alternates
    }
  }
}


export default function Page({ params: { lang } }: { params: { lang: Locale } }) {

  return (
    <div className="flex flex-col items-center justify-center  bg-white dark:bg-gray-900 mt-16 min-h-[500px]">
      <Login lang={lang} />
    </div>
  )
}