'use client'
import { usePathname } from 'next/navigation'
import { Locale } from "@/i18n-config";
export function useRedirectedPathName(locale: Locale){
    
    const pathname = usePathname()
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
}