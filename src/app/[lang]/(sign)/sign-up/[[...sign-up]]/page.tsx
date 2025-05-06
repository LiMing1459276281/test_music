import { Locale, getPathname, languages, localizationsKV } from "@/i18n-config";
import { host } from '@/config/config'
import Logout from "./logout";


export async function generateMetadata({ params }: { params: { lang: Locale } }) {
  const alternates = Object.keys(languages).reduce((acc, lang) => {
    acc[localizationsKV[lang]] = `${host}${getPathname(lang, '/sign-up')}`;
    return acc;
  }, {} as { [key: string]: string });
  return {
    alternates: {
      canonical: `${host}${getPathname(params.lang, '/sign-up')}`,
      languages: alternates
    }
  }
}

export default function Page({ params: { lang } }: { params: { lang: Locale } }) {

  return (
    <div className="flex flex-col items-center justify-center  bg-white dark:bg-gray-900 mt-16 min-h-[600px]">
      <Logout lang={lang} />
    </div>
  )
}