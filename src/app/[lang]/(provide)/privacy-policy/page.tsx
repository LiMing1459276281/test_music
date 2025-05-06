import { type Locale } from "@/i18n-config";
import Policy from "./policy.mdx";
import { host } from '@/config/config'

export async function generateMetadata({ params }: { params: { lang: Locale } }) {
    return {
        alternates: {
            canonical: `${host}/privacy-policy`,
            languages: { "en-US": `${host}/privacy-policy` }
        }
    }
}

export default async function page({ params: { lang } }: { params: { lang: Locale } }) {
    return <Policy />
}