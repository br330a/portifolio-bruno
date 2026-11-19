// Dados de apresentação e formatação do briefing: não há coleta ou envio por servidor.
export const SITE_TYPES = [
  { id: 'institucional', label: 'Site institucional', description: 'Apresentar minha empresa, diferenciais e serviços.', icon: '▣' },
  { id: 'landing', label: 'Landing page', description: 'Divulgar uma oferta, produto ou serviço específico.', icon: '↗' },
  { id: 'reformulacao', label: 'Reformulação', description: 'Melhorar a experiência de um site que já existe.', icon: '◈' },
  { id: 'orientacao', label: 'Quero orientação', description: 'Ainda não sei qual formato combina com meu negócio.', icon: '✳' },
]

export const FEATURE_OPTIONS = [
  { id: 'servicos', label: 'Apresentar serviços', description: 'Mostrar o que o negócio oferece.' },
  { id: 'portfolio', label: 'Galeria / portfólio', description: 'Exibir trabalhos e projetos.' },
  { id: 'catalogo', label: 'Catálogo de produtos', description: 'Organizar itens sem checkout obrigatório.' },
  { id: 'orcamento', label: 'Pedidos de orçamento', description: 'Facilitar o primeiro contato.' },
  { id: 'agendamento', label: 'Agendamento', description: 'Explorar opções de horários ou integração.' },
  { id: 'conteudo', label: 'Conteúdo e páginas extras', description: 'Organizar mais informações.' },
]

export const createInitialBriefing = () => ({
  siteType: 'institucional',
  features: [],
  contactName: '',
  businessName: '',
  segment: '',
  existingSite: '',
  details: '',
})

export const isBriefingValid = (data) => (
  SITE_TYPES.some((option) => option.id === data.siteType) &&
  typeof data.contactName === 'string' &&
  data.contactName.trim().length >= 2 &&
  typeof data.businessName === 'string' &&
  data.businessName.trim().length >= 2
)

const oneLine = (value, fallback = 'Não informado') => {
  const result = String(value ?? '').replace(/[\r\n]+/g, ' ').trim()
  return result || fallback
}

export function createBriefingMessage(data) {
  const type = SITE_TYPES.find((option) => option.id === data.siteType)
  const selectedFeatures = FEATURE_OPTIONS
    .filter((option) => (data.features || []).includes(option.id))
    .map((option) => option.label)

  return [
    'Olá, Bruno! Conheci seu portfólio e quero conversar sobre um site.',
    '',
    `*Nome:* ${oneLine(data.contactName)}`,
    `*Negócio:* ${oneLine(data.businessName)}`,
    `*Segmento:* ${oneLine(data.segment)}`,
    `*Tipo de projeto:* ${type?.label || 'Quero orientação'}`,
    `*Funcionalidades de interesse:* ${selectedFeatures.join(', ') || 'Gostaria de orientação'}`,
    `*Site atual:* ${oneLine(data.existingSite, 'Não tenho / não informado')}`,
    `*Sobre a ideia:* ${String(data.details ?? '').trim() || 'Podemos conversar sobre as possibilidades.'}`,
    '',
    'Gostaria de entender as opções de escopo e orçamento.',
  ].join('\n')
}

export function createBriefingWhatsAppUrl(number, data) {
  const digits = String(number ?? '').replace(/\D/g, '')
  if (!/^\d{10,15}$/.test(digits)) throw new Error('Número de WhatsApp inválido')
  return `https://wa.me/${digits}?text=${encodeURIComponent(createBriefingMessage(data))}`
}
