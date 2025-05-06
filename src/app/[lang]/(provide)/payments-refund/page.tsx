import { type Locale } from "@/i18n-config";
import { host } from '@/config/config'
import Refund from "./refund.mdx";


export async function generateMetadata({ params }: { params: { lang: Locale } }) {
    return {
        alternates: {
            canonical: `${host}/payments-refund`,
            languages: { "en-US": `${host}/payments-refund` }
        }
    }
}

export default async function page({ params: { lang } }: { params: { lang: Locale } }) {
    return <Refund />
}