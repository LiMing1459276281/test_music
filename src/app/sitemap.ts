import { MetadataRoute } from 'next';
import { host } from '@/config/config';
import { i18nConfig } from '@/i18n-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/examples',
    '/faq'
  ];

  const sitemapEntries = [];
  
  // 为每种语言生成URL
  for (const locale of i18nConfig.locales) {
    for (const route of routes) {
      const url = `${host}/${locale}${route}`;
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : route === '/about' || route === '/examples' ? 0.8 : 0.7,
      });
    }
  }

  // 添加根URL
  sitemapEntries.push({
    url: host,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  return sitemapEntries.map(entry => ({
    ...entry,
    changeFrequency: entry.changeFrequency as "weekly" | "always" | "hourly" | "daily" | "monthly" | "yearly" | "never"
  }));
}