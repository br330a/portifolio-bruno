import process from 'node:process'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { normalizeSiteUrl } from './scripts/site-url.mjs'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = normalizeSiteUrl(env.SITE_URL || process.env.SITE_URL || '')

  return {
    plugins: [
      react(),
      {
        name: 'portfolio-public-seo',
        transformIndexHtml(html) {
          if (!siteUrl) return html.replace('<!-- seo:public-url -->', '')
          return html
            .replace('<!-- seo:public-url -->', `
    <link rel="canonical" href="${siteUrl}/" />
    <meta property="og:url" content="${siteUrl}/" />`)
            .replaceAll('content="/social-preview.png"', `content="${siteUrl}/social-preview.png"`)
        },
      },
    ],
  }
})
