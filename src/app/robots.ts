import { MetadataRoute } from 'next'
import {host} from '@/config/config'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/_next/',
        '/api/',
        "/clerk/",
        "/cdn-cgi/"
      ]
    },
    sitemap: `${host}/sitemap.xml`,
  }
}