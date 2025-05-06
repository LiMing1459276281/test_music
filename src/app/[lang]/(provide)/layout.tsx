import { type Locale, getPathname } from "@/i18n-config";
import NavbarSticky from "@/components/navbar-sticky";
import { getDictionary, i18nNamespaces } from '@/i18n'
import { AuthProvider } from "@/components/customUI/auth-context";
import { Navbar, Policy, Home } from "@/types/locale";
import { host } from '@/config/config'

export async function generateMetadata({ params }: { params: { lang: Locale } }) {
  const i18nHome = await getDictionary<Home>(params.lang, i18nNamespaces.home);
  return {
    title: i18nHome.meta.title,
    description: i18nHome.meta.description,
    twitter: {
      card: "summary_large_image", title: i18nHome.title,
      description: i18nHome.meta.description,
      images: ["https://xxxx/assets/og-explore.webp"]
    },
    openGraph: {
      type: "website",
      url: `${host}${getPathname(params.lang, '')}`,
      title: i18nHome.meta.title,
      description: i18nHome.meta.description,
      siteName: "Ai Generator Song",
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
  const dictionary = await getDictionary<Policy>(params.lang, i18nNamespaces.policy);
  const i18nNavbar = await getDictionary<Navbar>(params.lang, i18nNamespaces.navbar);
  return (

    <AuthProvider>
      <NavbarSticky lang={params.lang} dictionary={i18nNavbar} enableClerk={true} />
      <div className="flex flex-row mx-5 mt-8">
        <a href={getPathname(params.lang, '/')} className="btn btn-ghost flex flex-row items-center justify-center text-center gap-2 font-bold text-base text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
          <svg className="text-current w-4 h-4" fill="currentColor" height="24" shape-rendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="3" viewBox="0 0 24 24" width="24">
            <path d="M19 12H5"></path>
            <path d="M12 19l-7-7 7-7"></path>
          </svg>
          {dictionary.back_button_lable}
        </a>
      </div>
      <div className={`prose max-w-none m-5 mb-20 dark:prose-h1:text-gray-200 dark:prose-h2:text-gray-200 dark:prose-a:text-gray-200
       dark:prose-h3:text-gray-200 dark:prose-strong:text-gray-200 dark:prose-p:text-gray-400 dark:prose-li:text-gray-400`}>
        {children}
      </div>
    </AuthProvider>
  );
}