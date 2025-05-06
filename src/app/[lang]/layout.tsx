/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-04-29 21:26:48
 * @LastEditors: rendc
 * @LastEditTime: 2025-05-01 18:45:22
 */
import { i18nConfig, type Locale } from "@/i18n-config";
import { Inter } from "next/font/google";
import { getDictionary, i18nNamespaces } from '@/i18n'
import { Footer, Navbar, } from "@/types/locale";
import { ThemeProvider } from "@/components/theme-context";
import FooterSocial from "@/components/customUI/footer-social";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
    width: 'device-width',
    initialScale: 1.0,
};


export async function generateStaticParams() {
    return i18nConfig.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: { lang: Locale } }) {
    const i18nNavbar = await getDictionary<Navbar>(params.lang, i18nNamespaces.navbar);
    return {
        title: {
            default: `Ai Generator Song `,
            template: `%s | Ai Generator Song`
        },
        description: "Utilize our advanced AI technology powered by Suno to generate unique music compositions. Transform your ideas into musical masterpieces.",
        robots: { index: true, follow: true },
        openGraph: {
            title: "Ai Generator Song",
            description: "Utilize our advanced AI technology powered by Suno to generate unique music compositions.",
            url: `https://aigeneratorsong.online/${params.lang}`,
            siteName: "Ai Generator Song",
            images: [
                {
                    url: "https://aigeneratorsong.online/assets/share.png",
                    width: 1200,
                    height: 630,
                    alt: "Ai Generator Song"
                }
            ],
            locale: params.lang,
            type: "website"
        },
        other: { "shortcut icon": "favicon.ico", "google-adsense-account": "ca-pub-3038332292685786" }
    }
}

export default async function RootLayout({
    children, params
}: Readonly<{
    children: React.ReactNode,
    params: { lang: Locale }
}>) {
    const theme = "light";
    const i18nNavbar = await getDictionary<Navbar>(params.lang, i18nNamespaces.navbar);
    const i18nFooter = await getDictionary<Footer>(params.lang, i18nNamespaces.footer);

    return (

        <html lang={params.lang} className={theme}>
            <head>
                <script id="theme-script" dangerouslySetInnerHTML={{
                    __html: `
                const storedTheme = localStorage.getItem('color-theme') || 'light'; 
                if(storedTheme === 'light'){
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                }else{
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                }`}} />
            </head>
            <body className={`${inter.className} dark:bg-gray-900`}>
                <ThemeProvider storedTheme={theme}>
                    {children}
                </ThemeProvider>
                <FooterSocial dictionary={i18nFooter} lang={params.lang} logoAlt={i18nNavbar.logo_alt} />
            </body>
            <GoogleAnalytics gaId="G-XXXXXXXXXX"/>
        </html>

    )
}