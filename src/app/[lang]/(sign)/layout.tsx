import { type Locale, localizations, getPathname } from "@/i18n-config";
import { LoadingFull } from "@/components/customUI/loading-skeleton";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs'
import Policy from "@/components/policy";
import { Suspense } from "react";
import NavbarSticky from "@/components/navbar-sticky";
import { getDictionary, i18nNamespaces } from '@/i18n'
import { Home, Navbar } from "@/types/locale";
import { host } from '@/config/config'
export async function generateMetadata({ params }: { params: { lang: Locale } }) {
  const i18nHome = await getDictionary<Home>(params.lang, i18nNamespaces.home);
  return {
    title: i18nHome.meta.title,
    description: i18nHome.meta.description,
    twitter: {
      card: "summary_large_image", title: i18nHome.title,
      description: i18nHome.meta.description,
      images: ["https://xxx/assets/og-explore.webp"]
    },
    openGraph: {
      type: "website",
      url: `${host}${getPathname(params.lang, '')}`,
      title: i18nHome.meta.title,
      description: i18nHome.meta.description,
      siteName: "xxx",
      images: [{
        url: "https://xxx/assets/og-explore.webp",
      }]
    }
  }
}

export default async function Layout({
  children, params
}: Readonly<{
  children: React.ReactNode,
  params: { lang: Locale }
}>) {
  const i18nNavbar = await getDictionary<Navbar>(params.lang, i18nNamespaces.navbar);
  return (
    <>
      <NavbarSticky lang={params.lang} dictionary={i18nNavbar} enableClerk={false} />
      <ClerkProvider localization={localizations[params.lang]}>
        <ClerkLoading>
          <LoadingFull />
        </ClerkLoading>
        <div className='min-h-[840px]'>
          <ClerkLoaded>
            {children}
            <Suspense>
              <Policy />
            </Suspense>
          </ClerkLoaded>
        </div>
      </ClerkProvider>
    </>
  );

}
