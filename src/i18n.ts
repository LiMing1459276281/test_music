
import { i18nConfig, Locale } from '@/i18n-config'

export const i18nNamespaces = {
    about: 'about',
    home: 'home',
    contact: 'contact',
    navbar: 'navbar',
    footer: 'footer',
    blog: 'blog',
    policy: 'policy',
    pricing: 'pricing',
    explore: 'explore',
    prompt: 'prompt',
    examples: 'examples',
    cta: 'cta',
    faq: 'faq',
    Meta: 'meta',
    features:'features',
    steps:'steps',
    testimonials:'testimonials',
    exampleCarousel:'examples-carousel',
    hero:'hero',
};

export async function initTranslations(locale: string, namespaces: string[]) {
    const translationPromises = namespaces.map(async (ns) => {
        try {
            const translationModule = await import(`@/locales/${locale}/${ns}.json`).then(m => m.default);
            return translationModule;
        } catch (error) {
            console.error(`Failed to load locale "${locale}" for namespace "${ns}", falling back to default locale.`, error);
            const defaultTranslationModule = await import(`@/locales/${i18nConfig.defaultLocale}/${ns}.json`).then(m => m.default);
            return defaultTranslationModule;
        }
    });

    return translationPromises;
}

export async function getDictionary<T>(locale: string, namespace: string): Promise<T> {
    try {
        
        const i18nConfig = await import(`@/locales/${locale}/${namespace}.json`).then((module) => module.default);
        return i18nConfig;
    } catch (error) {
        console.error(`Failed to load locale "${locale}", falling back to default locale.`, error);
        const defaultConfig = await import(`@/locales/${i18nConfig.defaultLocale}/${namespace}.json`).then((module) => module.default);
        return defaultConfig;
    }
}