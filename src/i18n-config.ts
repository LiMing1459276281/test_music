
export const languages: Record<string, string> = {
  en: "English",
  zh: "中文",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  ja: "日本語",
  ko: "한국어",
};

export const i18nConfig = {
  defaultLocale: "en",
  locales: Object.keys(languages),
  localeDetector: false,
  prefixDefault : true
} as const;

export type Locale = (typeof i18nConfig)["locales"][number];



import { enUS, frFR, deDE, zhCN, esES, jaJP, koKR } from "@clerk/localizations";

export const localizations: Record<string, any> = {
  en: enUS,
  zh: zhCN,
  fr: frFR,
  de: deDE,
  es: esES,
  ja: jaJP,
  ko: koKR
}


export const localizationsKV: Record<string, string> = {
  en: 'en-US',
  zh: 'zh-CN',
  fr: 'fr-FR',
  de: 'de-DE',
  es: 'es-ES',
  ja: 'ja-JP',
  ko: 'ko-KR'
}


export function getPathname(lang: Locale, pathname: string) {
  if (lang === i18nConfig.defaultLocale) {
    return pathname;
  }else{
    return `/${lang}${pathname}`;
  }
  
}