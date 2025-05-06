import { Locale, getPathname, languages, localizationsKV } from "@/i18n-config";
import { host } from '@/config/config'
import { getDictionary, i18nNamespaces } from '@/i18n'
import PricingCard from "./PricingCard";
import { Pricing } from "@/types/locale";

export async function generateMetadata({ params }: { params: { lang: Locale } }) {
    const alternates = Object.keys(languages).reduce((acc, lang) => {
        acc[localizationsKV[lang]] = `${host}${getPathname(lang, '/stripe')}`;
        return acc;
    }, {} as { [key: string]: string });
    const i18nPricing = await getDictionary<Pricing>(params.lang, i18nNamespaces.pricing);
    return {
        title: i18nPricing.meta.title,
        description: i18nPricing.meta.description,
        twitter: {
            card: "summary_large_image", title: i18nPricing.meta.title,
            description: i18nPricing.meta.description
        },
        openGraph: {
            type: "website",
            url: `${host}${getPathname(params.lang, '/stripe')}`,
            title: i18nPricing.meta.title,
            description: i18nPricing.meta.description,
            siteName: "Ai Generator Song"
        },
        alternates: {
            canonical: `${host}${getPathname(params.lang, '/stripe')}`,
            languages: alternates
        }
    }
}

export default async function page({ params: { lang } }: { params: { lang: Locale } }) {
    const dictionary = await getDictionary<Pricing>(lang, i18nNamespaces.pricing);

    return (
        <div className="flex flex-col relative mx-auto max-w-screen-xl px-4 py-16 justify-center items-center bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen">
            <h3 className="text-md font-bold dark:text-white mb-6 sm:px-16 xl:px-48">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                    {dictionary.pricing_description}
                </span>
            </h3>
            <h3 className="inline-flex justify-between items-center py-2 px-2 pe-4 rounded-xl md:py-1 md:px-1 mb-7 text-sm text-blue-300 bg-blue-900 hover:bg-blue-800">
                <span className="text-sm font-medium"> {dictionary.payment_tips1}<a href={`mailto:support@aigeneratorsong.online`} className="font-semibold text-blue-300 underline dark:text-white dark:decoration-white decoration-blue-500">{dictionary.ko_fi_tips2}</a> )</span>
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 mt-12">
                {dictionary.prices.map((price, index) => (
                    <PricingCard key={index} price={price} lang={lang} index={index} />
                ))}
            </div>
        </div>
    )
}