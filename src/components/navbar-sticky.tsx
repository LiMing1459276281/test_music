'use client'
import { useState, useContext, useEffect } from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { i18nConfig, type Locale, languages, localizationsKV, getPathname, localizations } from "@/i18n-config";
import { UserButton, SignedIn, SignedOut, ClerkProvider } from "@clerk/nextjs";
import AuthContext from "@/components/customUI/auth-context";
import ThemeContext, { Theme } from "@/components/theme-context";
import { ThemeDarkIcon, ThemeLightIcon } from '@/components/customUI/theme-icon';
import { dark, experimental__simple } from "@clerk/themes";
import RedirectOnSignOut from '@/components/customUI/signed-out';
import SignedOnAuth from '@/components/customUI/signed-auth';

type Props = {
    lang: Locale;
    dictionary: any;
    enableClerk: boolean;
}

type UserAgent = 'mobile' | 'desktop';


export default function NavbarSticky({ lang, dictionary, enableClerk }: Props) {

    const [collapseMobile, setCollapseMobile] = useState("hidden");

    const { theme, setTheme } = useContext(ThemeContext);

    const { auth, setAuth } = useContext(AuthContext);

    const [mounted, setMounted] = useState(false);


    const pathname = usePathname();


    useEffect(() => {
        setMounted(true);
    }, []);

    // 添加链接类型定义
    type NavLink = {
        name: string;
        href: string;
    }

    const links: NavLink[] = [
        { name: `${dictionary.home}`, href: `${getPathname(lang, '/')}` },
        { name: `${dictionary.pricing}`, href: `${getPathname(lang, '/stripe')}` },
        { name: `${dictionary.examples}`, href: `${getPathname(lang, '/examples')}` },
        { name: `${dictionary.faq}`, href: `${getPathname(lang, '/faq')}` },
        { name: `${dictionary.about}`, href: `${getPathname(lang, '/about')}` },
        // { name: `${dictionary.prompt}`, href: `${getPathname(lang, '/image-to-prompt')}` },
        // { name: `${dictionary.explore}`, href: `${getPathname(lang, '/explore')}` },
        // { name: `${dictionary.blog}`, href: `${getPathname(lang, '/blog')}` },
    ]

    function handleThemeChange(themeName: Theme) {

        setTheme(themeName);
        ThemeChange()
    }

    function handleClick(state: string) {
        setCollapseMobile(state);
    }

    function signUpOrInSwitcher() {
        if (!pathname || pathname.search("/sign-in") !== -1) {

            return true;
        }
        return false;
    }

    return (
        // 导航栏主体样式
        <nav className="flex flex-row bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-md sticky w-full z-20 top-0 start-0 border-b border-purple-500/20">
            <div className="max-w-screen-2xl w-full flex flex-wrap items-center justify-between mx-auto py-4 px-8">
                {/* Logo部分 */}
                <img src="/assets/logo.png" className='rounded-sm mr-4' width={44} height={44} alt="logo"  />
                <a href={`${getPathname(lang, '/')}`} className="flex items-center space-x-3">
                    <span className={`self-center text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 ${auth ? 'hidden md:inline-block' : ''}`}>
                        Ai Generator Song
                    </span>
                </a>
                
                {/* 导航链接居中显示 */}
                <div className="flex-1 flex justify-center space-x-4">
                    {links.map((link) => (
                        <Link key={link.href} href={link.href} className="text-gray-200 hover:text-white transition-colors">
                            {link.name}
                        </Link>
                    ))}
                </div>
                
                {/* 导航栏右侧 */}
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse md:gap-2">
                    {/* 积分显示 */}
                    {auth && (
                        <div className="hidden md:flex items-center gap-2">
                            <div className="bg-gray-800/50 backdrop-blur-sm text-gray-200 px-4 py-2 rounded-lg border border-gray-700/50">
                                <span className="text-purple-400 font-semibold">Credits: </span>
                                <span>{auth.creditBalance}</span>
                            </div>
                            {/* <Link href={`${getPathname(lang, '/stripe')}`} 
                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300">
                                Stripe
                            </Link> */}
                        </div>
                    )}
                    
          
                    
                    <div className=" md:flex items-center gap-2">
                        <LanguageSwitcher lang={lang} userAgent="desktop" dictionary={dictionary} />
                        <div className={`inline-flex ${auth ? 'min-w-7' : 'min-w-[70px]'} `}>
                        {!auth && (signUpOrInSwitcher() ?
                            <Link className='flex flex-row items-center justify-center content-center w-[70px] transition-colors duration-200 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:font-medium rounded-lg text-sm p-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' href={`${getPathname(lang, '/sign-up')}`}>Sign Up</Link>
                            : <Link className='flex flex-row items-center justify-center content-center w-[70px] transition-colors duration-200 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:font-medium rounded-lg text-sm p-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' href={`${getPathname(lang, '/sign-in')}`}>Sign In</Link>
                        ) }
                        {(enableClerk && mounted) &&(
                                <ClerkProvider localization={localizations[lang]} appearance={{ baseTheme: theme === 'dark' ? dark : experimental__simple }}>
                                    <SignedIn>
                                         <SignedOnAuth/>
                                        {auth && <UserButton appearance={{ baseTheme: theme === 'dark' ? dark : experimental__simple }} />}
                                    </SignedIn>
                                    <SignedOut>
                                        <RedirectOnSignOut />
                                    </SignedOut>
                                </ClerkProvider>
                            )}

                       
                    </div>
                    </div>
                    
                    <button onClick={() => handleClick(collapseMobile === 'hidden' ? 'show' : 'hidden')} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-200 rounded-lg md:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>


    );
}



function LanguageSwitcher({ lang, userAgent, dictionary }: { lang: Locale, userAgent: UserAgent, dictionary: any }) {

    const pathname = usePathname()

    const [showLanguageSwitcher, setShowLanguageSwitcher] = useState("hidden");
    const redirectedPathName = (locale: Locale) => {
        if (!pathname) return "/";


        const pathSegments = pathname.split("/").filter(Boolean);


        if (pathname === "/") {
            return locale === i18nConfig.defaultLocale ? "/" : `/${locale}`;
        }


        if (pathSegments.length === 1 && i18nConfig.locales.includes(pathSegments[0])) {
            return locale === i18nConfig.defaultLocale ? "/" : `/${locale}`;
        }


        const firstSegmentIsLocale = i18nConfig.locales.includes(pathSegments[0]);

        if (locale === i18nConfig.defaultLocale) {

            return firstSegmentIsLocale ? `/${pathSegments.slice(1).join('/')}` : pathname;
        } else {

            return firstSegmentIsLocale
                ? `/${locale}${pathname.substring(pathname.indexOf("/", 1))}`
                : `/${locale}${pathname}`;
        }
    };

    if (userAgent === 'desktop') {

        return (
            <div className="hidden md:block relative items-center justify-between ">
                <button type="button" 
                  onClick={() => setShowLanguageSwitcher(showLanguageSwitcher === 'hidden' ? 'show' : 'hidden')} 
                  className="flex w-full items-center font-medium justify-center px-2 py-3 text-sm text-gray-200 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
                >
                  <img src={`/assets/language/${lang}.svg`} className='h-3.5 w-3.5 rounded-full me-2' alt={localizationsKV[lang]} />
                  {languages[lang]}
                </button>
                
                <div className={`${showLanguageSwitcher} absolute min-w-[120px] z-50 my-4 text-base list-none bg-gray-800 divide-y divide-gray-700 rounded-lg shadow-lg`}>
                  <ul className="py-2 font-medium">
                    {Object.entries(languages).map(([locale, name]) => {
                      return (
                        <li key={locale}>
                          <a href={redirectedPathName(locale)} 
                             className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors" 
                             role="menuitem"
                          >
                            <div className="inline-flex items-center">
                                <img className='h-3.5 w-3.5 rounded-full me-2' src={`/assets/language/${locale}.svg`} alt={name} />
                                {name}
                            </div>
                        </a>
                    </li>
                    );
                    })}
                </ul>
                </div>
            </div>
        )
    } else {

        return (

            <div className='flex flex-col-2 py-2 px-3 border-b items-center justify-between md:hidden mb-6 dark:border-gray-600'>

                <div className='inline-flex'>
                    <span className='dark:text-white'>{dictionary.locale_label}</span>
                </div>

                <div className="relative">
                    <button type="button" onClick={() => setShowLanguageSwitcher(showLanguageSwitcher === 'hidden' ? 'show' : 'hidden')} className="flex w-full border px-3 py-2 items-center font-medium justify-center text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700">
                        <img src={`/assets/language/${lang}.svg`} className='h-3.5 w-3.5 rounded-full me-2' alt={localizationsKV[lang]} />
                        {languages[lang]}
                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>

                    <div className={`${showLanguageSwitcher} absolute min-w-[120px] z-50 my-4 text-base list-none bg-white dark:bg-gray-700 divide-y divide-gray-100 dark:divide-gray-600 rounded-lg shadow"`}>
                        <ul className="py-2 font-medium">
                            {Object.entries(languages).map(([locale, name]) => {
                                return (
                                    <li key={locale}>
                                        <a href={redirectedPathName(locale)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                            <div className="inline-flex items-center">
                                                <img className='h-3.5 w-3.5 rounded-full me-2' src={`/assets/language/${locale}.svg`} alt={name} />
                                                {name}
                                            </div>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

function ThemeSwitcher({ dictionary }: { dictionary: any }) {
    const [showThemeSwitcher, setShowThemeSwitcher] = useState("hidden");

    const { theme, setTheme } = useContext(ThemeContext);

    const themes = [
        { name: `light` },
        { name: `dark` },
    ]
    function handleThemeChange(themeName: Theme) {

        setTheme(themeName);
        setShowThemeSwitcher("hidden");
        ThemeChange()
    }
    return (
        <div className="flex flex-col-2 py-2 px-3 border-b items-center justify-between md:hidden dark:border-gray-600">
            <div className='inline-flex'>
                <span className='dark:text-white'>{dictionary.theme_label}</span>
            </div>
            <div className="relative">
                <button type="button" onClick={() => setShowThemeSwitcher(showThemeSwitcher === 'hidden' ? 'show' : 'hidden')} className="flex w-full border px-3 py-2 items-center font-medium justify-center text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700">
                    <div className='me-2'>{theme === 'light' ? <ThemeLightIcon /> : <ThemeDarkIcon />}</div>
                    {theme}
                    <svg className="w-2.5 h-2.5 ms-2.5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="m1 1 4 4 4-4"></path>
                    </svg>
                </button>
                {/* <div className={`${showThemeSwitcher} absolute min-w-[120px] z-50 my-4 text-base list-none bg-white dark:bg-gray-700 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"`}>
                    <ul className="py-2 font-medium">
                        {themes.map((theme, index) => {
                            return (
                                <li key={index}>
                                    <button onClick={() => handleThemeChange(theme.name as Theme)} className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                        <div className="inline-flex">
                                            <div className='me-2'>{theme.name === 'light' ? <ThemeLightIcon /> : <ThemeDarkIcon />}</div>
                                            {theme.name}
                                        </div>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div> */}
            </div>
        </div>

    )
}

function ThemeChange() {

    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('color-theme', 'light');
        document.cookie = `color-theme=light; path=/`;
    } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
        document.cookie = `color-theme=dark; path=/`;
    }
}