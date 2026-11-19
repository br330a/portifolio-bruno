import test from 'node:test'
import assert from 'node:assert/strict'
import {
  SITE_TYPES,
  FEATURE_OPTIONS,
  createInitialBriefing,
  isBriefingValid,
  createBriefingMessage,
  createBriefingWhatsAppUrl,
} from '../src/utils/briefing.js'

test('formulário começa sem dados pessoais e com tipo válido', () => {
  const data = createInitialBriefing()
  assert.ok(SITE_TYPES.some((option) => option.id === data.siteType))
  assert.equal(data.contactName, '')
  assert.equal(data.businessName, '')
  assert.equal(data.features.length, 0)
})

test('validação rejeita campos vazios ou só com espaços', () => {
  const data = createInitialBriefing()
  assert.equal(isBriefingValid({ ...data, contactName: '  ', businessName: 'Loja' }), false)
  assert.equal(isBriefingValid({ ...data, contactName: 'Ana', businessName: '  ' }), false)
  assert.equal(isBriefingValid({ ...data, contactName: 'Ana', businessName: 'Loja' }), true)
})

test('mensagem respeita os nomes legíveis, categoria e funcionalidades selecionadas', () => {
  const data = { ...createInitialBriefing(), contactName: '  Ana  ', businessName: '  Meu Pet  ', siteType: 'landing', features: ['servicos', 'catalogo'], segment: 'Pet shop', details: 'Página para clientes novos' }
  const message = createBriefingMessage(data)
  assert.match(message, /\*Nome:\* Ana/)
  assert.match(message, /\*Negócio:\* Meu Pet/)
  assert.match(message, /Landing page/)
  assert.match(message, /Apresentar serviços, Catálogo de produtos/)
})

test('funcionalidades desconhecidas não entram na mensagem', () => {
  const data = { ...createInitialBriefing(), features: ['inventado', FEATURE_OPTIONS[0].id] }
  assert.doesNotMatch(createBriefingMessage(data), /inventado/)
  assert.match(createBriefingMessage(data), /Apresentar serviços/)
})

test('URL do WhatsApp contém mensagem codificada e número válido', () => {
  const url = createBriefingWhatsAppUrl('55 (11) 99999-9999', createInitialBriefing())
  const parsed = new URL(url)
  assert.equal(parsed.hostname, 'wa.me')
  assert.equal(parsed.pathname, '/5511999999999')
  assert.match(parsed.searchParams.get('text'), /Olá, Bruno!/)
  assert.throws(() => createBriefingWhatsAppUrl('xyz', createInitialBriefing()))
})
