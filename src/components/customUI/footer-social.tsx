import { Footer } from "@/types/locale";
import { type Locale, getPathname } from "@/i18n-config";
export default function FooterSocial({ lang, dictionary, logoAlt }: { lang: Locale, dictionary: Footer, logoAlt: string }) {
    return (

        <footer className="py-12 bg-gray-900/90 xl:pt-8">
            <div className="mx-auto w-full max-w-screen-2xl px-4">
                <div className="grid gap-12 xl:grid-cols-5 xl:gap-24">
                    <div className="mb-6 md:mb-0 col-span-2">
                        <a href={`${getPathname(lang, '/')}`} className="flex items-center space-x-3">
                            {/* <img src='/assets/banana.jpg' className="h-8 dark:invert" alt={logoAlt} /> */}
                            <span className="self-center text-2xl font-semibold text-gray-200">Ai Generator Song</span>
                        </a>
                        
                        <div className="flex mt-6 mb-6 space-x-4">
                            <a href="mailto:support@aigeneratorsong.online" className="text-gray-400 hover:text-purple-400 transition-colors">
                                <svg className="w-5 h-5" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"></path>
                                </svg>
                            </a>
                        </div>
                        
                        <span className="text-sm text-gray-400">© 2025 <a href={`${getPathname(lang, '/')}`} className="hover:text-purple-400 transition-colors">Ai Generator Song™</a>. All Rights Reserved.</span>
                    </div>

                    {/* <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-200 uppercase">HELP AND SUPPORT</h2>
                        <ul className="text-gray-400">
                            <li className="mb-4">
                                <a href={`${getPathname(lang, '/contact')}`} className="hover:text-purple-400 transition-colors">Contact Us</a>
                            </li>
                        </ul>
                    </div> */}
                    
                    {/* 其他列保持相同的样式结构 */}
                </div>
            </div>
        </footer>

    )
}