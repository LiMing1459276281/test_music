import { type Locale } from "@/i18n-config";
import NavbarSticky from "@/components/navbar-sticky";
import { getDictionary, i18nNamespaces } from '@/i18n'
import { AuthProvider } from "@/components/customUI/auth-context";
import { Navbar } from "@/types/locale";
import SplashCursor from '@/components/reactrbits/SplashCursor'
export default async function Layout({
  children, params
}: Readonly<{
  children: React.ReactNode,
  params: { lang: Locale }
}>) {

  const i18nNavbar = await getDictionary<Navbar>(params.lang, i18nNamespaces.navbar);
  return (
    <>
      <AuthProvider>
        <NavbarSticky lang={params.lang} dictionary={i18nNavbar} enableClerk={true} />
      <div className="flex flex-col  bg-gradient-to-b from-gray-800 to-gray-900">
        <SplashCursor />
        {children}
      </div>
      </AuthProvider>
    </>
  );
}
