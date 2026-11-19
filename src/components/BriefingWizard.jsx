import { useEffect, useRef, useState } from 'react'
import {
  SITE_TYPES,
  FEATURE_OPTIONS,
  createInitialBriefing,
  createBriefingWhatsAppUrl,
  isBriefingValid,
} from '../utils/briefing'
import './BriefingWizard.css'

const stepNames = ['Seu projeto', 'O que precisa', 'Vamos conversar']

export default function BriefingWizard({ whatsappNumber }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState(createInitialBriefing)
  const [triedToFinish, setTriedToFinish] = useState(false)
  const headingRef = useRef(null)
  const wizardRef = useRef(null)
  const ready = isBriefingValid(data)
  const activeType = SITE_TYPES.find((option) => option.id === data.siteType)
  const selectedFeatures = FEATURE_OPTIONS.filter((option) => data.features.includes(option.id))

  useEffect(() => {
    if (step === 0) return
    headingRef.current?.focus({ preventScroll: true })
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    wizardRef.current?.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [step])

  const update = (field, value) => setData((current) => ({ ...current, [field]: value }))
  const toggleFeature = (id) => setData((current) => ({
    ...current,
    features: current.features.includes(id)
      ? current.features.filter((value) => value !== id)
      : [...current.features, id],
  }))

  const next = () => {
    if (step < 2) setStep((current) => current + 1)
    else if (!ready) setTriedToFinish(true)
  }

  const shareUrl = ready ? createBriefingWhatsAppUrl(whatsappNumber, data) : ''

  return (
    <section className="section briefing-section" id="orcamento" aria-labelledby="briefing-title">
      <div className="container briefing-layout">
        <div className="briefing-intro" data-reveal>
          <p className="eyebrow">05 / UM BOM PROJETO COMEÇA COM UMA CONVERSA</p>
          <h2 id="briefing-title">Me conta sua ideia. <em>Eu ajudo a dar forma.</em></h2>
          <p>Em poucos passos, você organiza o que precisa. No final, abrimos uma conversa no WhatsApp com um resumo — sem cadastro, compromisso ou orçamento automático.</p>
          <div className="briefing-aside-note"><span className="briefing-note-mark" aria-hidden="true">✳</span><span>Você fala diretamente comigo. Escopo, valores e prazos são definidos depois de entender a necessidade.</span></div>
        </div>

        <div className="briefing-card" ref={wizardRef}>
          <div className="briefing-card-top">
            <span className="briefing-card-kicker">BRIEFING RÁPIDO</span>
            <span className="briefing-step-count" aria-live="polite">0{step + 1} / 03</span>
          </div>
          <div className="briefing-progress" role="progressbar" aria-label="Progresso do briefing" aria-valuemin={1} aria-valuemax={3} aria-valuenow={step + 1}>
            <span style={{ width: `${((step + 1) / 3) * 100}%` }} />
          </div>
          <div className="briefing-step-nav" aria-label="Etapas do briefing">
            {stepNames.map((name, index) => (
              <span className={index === step ? 'is-active' : index < step ? 'is-done' : ''} key={name}>{name}</span>
            ))}
          </div>

          <div className="briefing-step-body">
            {step === 0 && (
              <div className="briefing-step-panel">
                <div className="briefing-step-heading"><span className="briefing-step-eyebrow">PRIMEIRO, O FORMATO</span><h3 ref={headingRef} tabIndex={-1}>Qual é a sua ideia?</h3><p>Não precisa ter tudo definido. Escolha a opção mais próxima.</p></div>
                <div className="briefing-type-grid" role="group" aria-label="Tipo de projeto">
                  {SITE_TYPES.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className={`briefing-choice ${data.siteType === option.id ? 'is-selected' : ''}`}
                      aria-pressed={data.siteType === option.id}
                      onClick={() => update('siteType', option.id)}
                    >
                      <span className="briefing-choice-symbol" aria-hidden="true">{option.icon}</span>
                      <span className="briefing-choice-copy"><strong>{option.label}</strong><small>{option.description}</small></span>
                      <span className="briefing-choice-indicator" aria-hidden="true">{data.siteType === option.id ? '✓' : '+'}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="briefing-step-panel">
                <div className="briefing-step-heading"><span className="briefing-step-eyebrow">AGORA, AS PRIORIDADES</span><h3 ref={headingRef} tabIndex={-1}>O que seu site precisa fazer?</h3><p>Selecione quantas opções quiser. Você também pode continuar sem marcar nada.</p></div>
                <div className="briefing-feature-grid" role="group" aria-label="Funcionalidades de interesse">
                  {FEATURE_OPTIONS.map((option) => {
                    const active = data.features.includes(option.id)
                    return (
                      <button key={option.id} type="button" className={`briefing-feature ${active ? 'is-selected' : ''}`} aria-pressed={active} onClick={() => toggleFeature(option.id)}>
                        <span className="briefing-feature-check" aria-hidden="true">{active ? '✓' : '+'}</span>
                        <span><strong>{option.label}</strong><small>{option.description}</small></span>
                      </button>
                    )
                  })}
                </div>
                <p className="briefing-helper">Essas opções indicam interesses, não funcionalidades ou integrações já contratadas.</p>
              </div>
            )}

            {step === 2 && (
              <div className="briefing-step-panel">
                <div className="briefing-step-heading"><span className="briefing-step-eyebrow">QUASE LÁ</span><h3 ref={headingRef} tabIndex={-1}>Vamos dar nome a essa ideia.</h3><p>Preencha o essencial para preparar sua mensagem.</p></div>
                <div className="briefing-form-grid">
                  <label className="briefing-field" htmlFor="briefing-name"><span>Seu nome <span aria-hidden="true">*</span></span><input id="briefing-name" type="text" autoComplete="name" maxLength={70} required value={data.contactName} onChange={(event) => update('contactName', event.target.value)} placeholder="Como posso te chamar?" aria-invalid={triedToFinish && data.contactName.trim().length < 2} /></label>
                  <label className="briefing-field" htmlFor="briefing-business"><span>Nome do negócio <span aria-hidden="true">*</span></span><input id="briefing-business" type="text" maxLength={90} required value={data.businessName} onChange={(event) => update('businessName', event.target.value)} placeholder="Sua marca ou empresa" aria-invalid={triedToFinish && data.businessName.trim().length < 2} /></label>
                  <label className="briefing-field" htmlFor="briefing-segment"><span>Área de atuação</span><input id="briefing-segment" type="text" maxLength={100} value={data.segment} onChange={(event) => update('segment', event.target.value)} placeholder="Ex.: estética, gastronomia..." /></label>
                  <label className="briefing-field" htmlFor="briefing-url"><span>Site atual <small>(se tiver)</small></span><input id="briefing-url" type="text" inputMode="url" maxLength={200} value={data.existingSite} onChange={(event) => update('existingSite', event.target.value)} placeholder="Ex.: seusite.com.br" /></label>
                  <label className="briefing-field briefing-field-full" htmlFor="briefing-details"><span>Conte mais sobre sua ideia <small>(opcional)</small></span><textarea id="briefing-details" rows={3} maxLength={600} value={data.details} onChange={(event) => update('details', event.target.value)} placeholder="O que você gostaria de melhorar ou criar?" /></label>
                </div>
                <div className="briefing-review">
                  <span>RESUMO DA CONVERSA</span>
                  <p><strong>{activeType?.label}</strong> · {selectedFeatures.length ? selectedFeatures.map((feature) => feature.label).join(', ') : 'Funcionalidades a definir'}</p>
                </div>
                {triedToFinish && !ready && <p className="briefing-error" role="alert">Preencha seu nome e o nome do negócio com pelo menos 2 caracteres para continuar.</p>}
              </div>
            )}
          </div>

          <div className="briefing-footer">
            {step > 0 ? <button type="button" className="briefing-back" onClick={() => setStep((current) => current - 1)}>← Voltar</button> : <span className="briefing-footer-note">Leva menos de 2 minutos</span>}
            {step < 2 ? (
              <button type="button" className="briefing-next" onClick={next}>Continuar <span aria-hidden="true">↗</span></button>
            ) : ready ? (
              <a className="briefing-next" href={shareUrl} target="_blank" rel="noopener noreferrer" onClick={() => setTriedToFinish(false)}>Abrir conversa no WhatsApp <span aria-hidden="true">↗</span></a>
            ) : (
              <button type="button" className="briefing-next" onClick={next}>Preparar mensagem <span aria-hidden="true">↗</span></button>
            )}
          </div>
          <p className="briefing-privacy">Seus dados ficam apenas nesta página até você optar por abrir o WhatsApp. Não salvo esse formulário nem envio informações a um servidor.</p>
        </div>
      </div>
    </section>
  )
}
