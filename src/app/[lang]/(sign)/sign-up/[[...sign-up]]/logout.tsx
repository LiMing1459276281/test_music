"use client"
import { SignUp } from "@clerk/nextjs"
import ThemeContext from "@/components/theme-context";
import { dark, experimental__simple } from "@clerk/themes";
import { useContext } from 'react';
import { Locale, getPathname } from "@/i18n-config";

export default function Logout({ lang }: {lang: Locale}) {
    const { theme } = useContext(ThemeContext);
  return (
    <SignUp signInUrl={`${getPathname(lang,'/sign-in')}`} appearance={{ baseTheme: theme === 'dark' ? dark : experimental__simple }}/>
  )
}