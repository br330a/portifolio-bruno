import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { normalizeSiteUrl } from './site-url.mjs'

const siteUrl = normalizeSiteUrl(process.env.SITE_URL || '')
const dist = resolve('dist')
await mkdir(dist, { recursive: true })

let robots = 'User-agent: *\nAllow: /\n'
if (siteUrl) {
  robots += `\nSitemap: ${siteUrl}/sitemap.xml\n`
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc></url>\n</urlset>\n`
  await writeFile(resolve(dist, 'sitemap.xml'), sitemap)
  console.log(`SEO público configurado para ${siteUrl}`)
} else {
  console.log('SITE_URL ainda não configurada: canonical, og:url e sitemap serão adicionados após escolher o domínio no deploy.')
}
await writeFile(resolve(dist, 'robots.txt'), robots)
