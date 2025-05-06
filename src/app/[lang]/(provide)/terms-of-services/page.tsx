import { Locale } from "@/i18n-config";
import { host } from '@/config/config'
import Terms from './terms.mdx'

export async function generateMetadata({ params }: { params: { lang: Locale } }) {
    return {
        alternates: {
            canonical: `${host}/terms-of-services`,
            languages: { "en-US": `${host}/terms-of-services` }
        }
    }
}

export default function page({ params: { lang } }: { params: { lang: Locale } }) {

    return <Terms />
}