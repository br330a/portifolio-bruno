export function normalizeSiteUrl(value) {
  if (!value || !value.trim()) return null
  let url
  try {
    url = new URL(value.trim())
  } catch {
    throw new Error('SITE_URL deve ser uma URL HTTPS válida (ex.: https://seu-dominio.com.br).')
  }
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/' || !url.hostname.includes('.')) {
    throw new Error('SITE_URL deve conter somente a origem HTTPS pública, sem caminho, consulta ou fragmento.')
  }
  return url.origin
}
