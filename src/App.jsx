import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

// Altere somente este número caso use outro WhatsApp no futuro.
const WHATSAPP_NUMBER = '5511995038969'
const WHATSAPP_MESSAGE = 'Olá, Bruno! Conheci seu portfólio e gostaria de conversar sobre um site para meu negócio.'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

const projects = [
  {
    id: 'forma',
    number: '01',
    name: 'FORMA.',
    category: 'Barbearia',
    type: 'Projeto demonstrativo',
    image: '/projects/forma-preview.webp',
    url: 'https://barbearia-demo.brunogoncalvesminitti.workers.dev/',
    description:
      'Uma proposta de presença digital com identidade marcante, pensada para apresentar uma barbearia com clareza e personalidade.',
    highlights: ['Identidade visual', 'Experiência responsiva', 'Apresentação de serviços'],
    focus: 'Apresentar uma barbearia com personalidade e facilitar a descoberta dos serviços.',
  },
  {
    id: 'brasa',
    number: '02',
    name: 'BRASA.',
    category: 'Hamburgueria',
    type: 'Projeto demonstrativo',
    image: '/projects/brasa-preview.webp',
    url: 'https://brasa-demo.brunogoncalvesminitti.workers.dev/',
    description:
      'Um conceito para o segmento gastronômico que une apresentação de produtos, comunicação visual e uma experiência digital envolvente.',
    highlights: ['Direção visual', 'Destaque para produtos', 'Navegação mobile'],
    focus: 'Destacar a identidade gastronômica e deixar os produtos no centro da experiência.',
  },
  {
    id: 'mimo',
    number: '03',
    name: 'MIMO.',
    category: 'Pet Care & Shop',
    type: 'Projeto demonstrativo',
    image: '/projects/mimo-preview.webp',
    url: 'https://mimo-pet-demo.brunogoncalvesminitti.workers.dev/',
    description:
      'Um espaço digital para cuidar e comprar: serviços pet, escolha de horários e uma loja interativa em uma experiência acolhedora e moderna.',
    highlights: ['Agendamento demonstrativo', 'Loja e carrinho interativos', 'Experiência responsiva'],
    focus: 'Reunir cuidados e produtos para diferentes pets em uma jornada simples, clara e agradável.',
  },
]

const services = [
  {
    number: '01',
    title: 'Sites institucionais',
    description:
      'Um espaço próprio para apresentar seu negócio, seus diferenciais e facilitar o contato com clientes.',
    icon: '◇',
  },
  {
    number: '02',
    title: 'Landing pages',
    description:
      'Páginas focadas em uma mensagem clara, com navegação objetiva e uma ação principal.',
    icon: '↗',
  },
  {
    number: '03',
    title: 'Reformulação de sites',
    description:
      'Uma nova experiência para uma presença digital que precisa evoluir em organização, visual e usabilidade.',
    icon: '✳',
  },
]

const steps = [
  ['01', 'Entender', 'Conheço seu negócio e o que precisa funcionar melhor.'],
  ['02', 'Planejar', 'Definimos o escopo, as prioridades e a proposta.'],
  ['03', 'Desenvolver', 'Crio, apresento e ajusto a experiência digital.'],
  ['04', 'Publicar', 'Testamos e colocamos o site no ar.'],
]

function ThemeIcon({ theme }) {
  return theme === 'dark' ? (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.25 15.1A8.2 8.2 0 0 1 8.9 3.75 8.5 8.5 0 1 0 20.25 15.1Z" />
    </svg>
  )
}

function ProjectCard({ project, onPreview }) {
  function handlePointerMove(event) {
    if (event.pointerType === 'touch') return
    const box = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - box.left) / box.width) * 100
    const y = ((event.clientY - box.top) / box.height) * 100
    event.currentTarget.style.setProperty('--pointer-x', `${x}%`)
    event.currentTarget.style.setProperty('--pointer-y', `${y}%`)
  }

  return (
    <article
      className={`case-card case-${project.id}`}
      data-reveal
      onPointerMove={handlePointerMove}
    >
      <div className="case-preview">
        <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir o site de demonstração ${project.name}`} className="case-preview-link">
          <img src={project.image} alt={`Captura da página do projeto ${project.name}`} loading="lazy" decoding="async" onError={(event) => { event.currentTarget.style.display = 'none' }} />
          <span className="case-preview-fallback" aria-hidden="true">{project.name}</span>
          <span className="case-preview-action">Abrir demonstração <span aria-hidden="true">↗</span></span>
        </a>
        <span className="case-preview-label">DEMONSTRAÇÃO FUNCIONAL</span>
      </div>

      <div className="case-content">
        <div className="case-topline">
          <span>{project.number} / {project.category}</span>
          <span className="case-chip">Conceitual</span>
        </div>
        <h3>{project.name}</h3>
        <p className="case-description">{project.description}</p>
        <div className="case-highlights" aria-label="Características do projeto">
          {project.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}
        </div>
        <div className="case-focus">
          <span className="case-focus-label">A IDEIA POR TRÁS DO PROJETO</span>
          <p>{project.focus}</p>
        </div>
        <div className="case-actions">
          <button
            type="button"
            className="case-preview-button"
            onClick={() => onPreview(project)}
            aria-label={`Visualizar ${project.name} em desktop e celular`}
          >
            Prévia interativa <span aria-hidden="true">↗</span>
          </button>
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="case-link">
            Abrir site <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  )
}

function LiveProjectFrame({ project, device }) {
  const stageRef = useRef(null)
  const [size, setSize] = useState({ width: 900, height: 570 })

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const measure = () => {
      const bounds = stage.getBoundingClientRect()
      setSize({ width: bounds.width, height: bounds.height })
    }

    const initialFrame = window.requestAnimationFrame(measure)
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure)
      return () => {
        window.cancelAnimationFrame(initialFrame)
        window.removeEventListener('resize', measure)
      }
    }

    const observer = new ResizeObserver(measure)
    observer.observe(stage)
    return () => {
      window.cancelAnimationFrame(initialFrame)
      observer.disconnect()
    }
  }, [])

  // Larguras reais de viewport: o browser interno adapta o layout do projeto.
  const baseWidth = device === 'mobile' ? 390 : 1200
  const baseHeight = device === 'mobile' ? 800 : 730
  const scale = Math.min(
    1,
    Math.max(0.06, (size.width - 16) / baseWidth),
    Math.max(0.06, (size.height - 16) / baseHeight),
  )

  return (
    <div className="preview-stage" ref={stageRef}>
      <div
        className={`preview-device preview-device-${device}`}
        style={{ width: baseWidth * scale, height: baseHeight * scale }}
      >
        <div
          className="preview-device-canvas"
          style={{ width: baseWidth, height: baseHeight, transform: `scale(${scale})` }}
        >
          <div className="preview-device-toolbar" aria-hidden="true">
            <span className="preview-device-dots"><i /><i /><i /></span>
            <span className="preview-device-address">{project.name} · demonstração</span>
          </div>
          <iframe
            key={`${project.id}-${device}`}
            className="preview-site-frame"
            tabIndex={-1}
            src={project.url}
            title={`Prévia ao vivo do ${project.name} na versão ${device === 'mobile' ? 'celular' : 'desktop'}`}
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ height: baseHeight - 38 }}
          />
        </div>
      </div>
    </div>
  )
}

function ProjectPreviewDialog({ project, device, onDeviceChange, onClose }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
      if (event.key !== 'Tab') return

      const focusables = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables?.length) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const keepFocusInside = (event) => {
      if (!dialogRef.current?.contains(event.target)) closeButtonRef.current?.focus()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusin', keepFocusInside)
    return () => {
      document.removeEventListener('focusin', keepFocusInside)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [onClose])

  return (
    <div
      className="preview-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        ref={dialogRef}
        className="preview-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-dialog-title"
        aria-describedby="preview-dialog-description"
      >
        <div className="preview-dialog-header">
          <div>
            <span className="preview-dialog-kicker">DEMONSTRAÇÃO INTERATIVA</span>
            <h3 id="preview-dialog-title">{project.name} <span>/ {project.category}</span></h3>
          </div>
          <button ref={closeButtonRef} type="button" className="preview-close" onClick={onClose} aria-label="Fechar prévia">×</button>
        </div>
        <div className="preview-dialog-controls">
          <p id="preview-dialog-description">Explore o próprio site em diferentes tamanhos de tela.</p>
          <div className="preview-device-selector" role="group" aria-label="Escolher visualização">
            <button type="button" aria-pressed={device === 'desktop'} className={device === 'desktop' ? 'is-selected' : ''} onClick={() => onDeviceChange('desktop')}>
              <span aria-hidden="true">▣</span> Desktop
            </button>
            <button type="button" aria-pressed={device === 'mobile'} className={device === 'mobile' ? 'is-selected' : ''} onClick={() => onDeviceChange('mobile')}>
              <span aria-hidden="true">▯</span> Celular
            </button>
          </div>
        </div>
        <LiveProjectFrame project={project} device={device} />
        <div className="preview-dialog-footer">
          <span>Se o navegador bloquear a incorporação, abra a demonstração em outra aba.</span>
          <a href={project.url} target="_blank" rel="noopener noreferrer">Abrir site completo ↗</a>
        </div>
      </section>
    </div>
  )
}

function AboutVisual() {
  function handlePointerMove(event) {
    // Sem movimentos em telas de toque ou quando a pessoa prefere menos animação.
    if (
      event.pointerType !== 'mouse' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) return

    const element = event.currentTarget
    const { left, top, width, height } = element.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (event.clientX - left) / width))
    const y = Math.max(0, Math.min(1, (event.clientY - top) / height))

    element.style.setProperty('--spot-x', `${(x * 100).toFixed(1)}%`)
    element.style.setProperty('--spot-y', `${(y * 100).toFixed(1)}%`)
    element.style.setProperty('--tilt-x', `${((0.5 - y) * 5).toFixed(2)}deg`)
    element.style.setProperty('--tilt-y', `${((x - 0.5) * 5).toFixed(2)}deg`)
  }

  function handlePointerLeave(event) {
    const element = event.currentTarget
    element.style.setProperty('--tilt-x', '0deg')
    element.style.setProperty('--tilt-y', '0deg')
    element.style.setProperty('--spot-x', '50%')
    element.style.setProperty('--spot-y', '50%')
  }

  return (
    <div
      className="about-visual"
      data-reveal
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="about-portrait-wrap">
        <div className="about-portrait-ring" aria-hidden="true" />
        <img
          className="about-portrait"
          src="/about/bruno-profile.jpg"
          alt="Retrato de Bruno Minitti"
          loading="lazy"
          decoding="async"
        />
      </div>
      <span className="about-visual-caption">
        BOAS IDEIAS MERECEM BOAS EXPERIÊNCIAS.
      </span>
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return window.localStorage.getItem('bm-theme') === 'dark' ? 'dark' : 'light'
    } catch {
      return 'light'
    }
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeProject, setActiveProject] = useState(null)
  const [previewDevice, setPreviewDevice] = useState('desktop')
  const closePreview = useCallback(() => setActiveProject(null), [])
  const openPreview = useCallback((project) => {
    setPreviewDevice('desktop')
    setActiveProject(project)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      window.localStorage.setItem('bm-theme', theme)
    } catch {
      // O site continua funcional se o navegador bloquear armazenamento.
    }
  }, [theme])

  useEffect(() => {
    let frame = 0
    const updateProgress = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        const available = document.documentElement.scrollHeight - window.innerHeight
        setScrollProgress(available > 0 ? Math.min(100, (window.scrollY / available) * 100) : 0)
        frame = 0
      })
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const items = [...document.querySelectorAll('[data-reveal]')]
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' })
    items.forEach((item) => {
      item.classList.add('reveal-ready')
      observer.observe(item)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} aria-hidden="true" />

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#inicio" onClick={closeMenu} aria-label="Bruno Minitti, voltar ao início">Bruno Minitti<span>.</span></a>
          <nav id="main-navigation" className={`header-nav ${menuOpen ? 'header-nav-open' : ''}`} aria-label="Navegação principal">
            <a href="#projetos" onClick={closeMenu}>Projetos</a>
            <a href="#servicos" onClick={closeMenu}>Serviços</a>
            <a href="#processo" onClick={closeMenu}>Processo</a>
            <a href="#sobre" onClick={closeMenu}>Sobre</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={closeMenu} className="mobile-contact-link">Falar no WhatsApp ↗</a>
          </nav>
          <div className="header-actions">
            <button type="button" className="theme-toggle" onClick={() => setTheme((current) => current === 'light' ? 'dark' : 'light')} aria-label={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'} aria-pressed={theme === 'dark'} title={theme === 'light' ? 'Tema escuro' : 'Tema claro'}>
              <ThemeIcon theme={theme} />
            </button>
            <a className="header-cta" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Vamos conversar <span aria-hidden="true">↗</span></a>
            <button type="button" className={`menu-toggle ${menuOpen ? 'menu-toggle-open' : ''}`} onClick={() => setMenuOpen((current) => !current)} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}>
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      <main id="inicio">
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-content" data-reveal>
              <div className="eyebrow hero-eyebrow"><span className="status-dot" /> DESENVOLVEDOR WEB · JUNDIAÍ, SP</div>
              <h1>O seu negócio tem uma história. <em>Vamos mostrar isso ao mundo.</em></h1>
              <p className="hero-description">Crio sites com identidade, clareza e atenção aos detalhes — experiências digitais pensadas para valorizar o que torna cada negócio único.</p>
              <div className="hero-buttons">
                <a className="button button-primary" href="#projetos">Explorar projetos <span aria-hidden="true">↗</span></a>
                <a className="button button-outline" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Falar sobre uma ideia <span aria-hidden="true">↗</span></a>
              </div>
              <div className="hero-caption"><span className="caption-line" /> DESIGN, DESENVOLVIMENTO E PROPÓSITO.</div>
            </div>

            <div className="hero-showcase" data-reveal aria-label="Prévia dos projetos FORMA. e BRASA.">
              <div className="showcase-orbit showcase-orbit-one" aria-hidden="true" />
              <div className="showcase-orbit showcase-orbit-two" aria-hidden="true" />
              <a className="showcase-window showcase-window-main" href={projects[0].url} target="_blank" rel="noopener noreferrer" aria-label="Visitar demonstração do FORMA.">
                <span className="window-bar" aria-hidden="true"><i /><i /><i /><small>FORMA.</small></span>
                <img src={projects[0].image} alt="Prévia do site FORMA." fetchPriority="high" decoding="async" onError={(event) => { event.currentTarget.style.display = 'none' }} />

              </a>
              <a className="showcase-window showcase-window-secondary" href={projects[1].url} target="_blank" rel="noopener noreferrer" aria-label="Visitar demonstração do BRASA.">
                <span className="window-bar" aria-hidden="true"><i /><i /><i /><small>BRASA.</small></span>
                <img src={projects[1].image} alt="Prévia do site BRASA." decoding="async" onError={(event) => { event.currentTarget.style.display = 'none' }} />

              </a>
              <div className="showcase-stamp"><span>03</span> projetos<br />para explorar <span aria-hidden="true">↗</span></div>
            </div>
          </div>
          <div className="container hero-bottom"><span>FEITO COM INTENÇÃO, NÃO COM TEMPLATE.</span><a href="#projetos">DESLIZE PARA EXPLORAR ↓</a></div>
        </section>

        <section className="section projects-section" id="projetos">
          <div className="container">
            <div className="section-header" data-reveal>
              <div><p className="eyebrow">01 / TRABALHOS SELECIONADOS</p><h2>Projetos que <em>falam por si.</em></h2></div>
              <p>Experiências desenvolvidas para explorar como uma presença digital pode refletir a identidade de um negócio.</p>
            </div>
            <div className="projects-stack">{projects.map((project) => <ProjectCard key={project.id} project={project} onPreview={openPreview} />)}</div>
            <p className="projects-disclaimer">FORMA., BRASA. e MIMO. são projetos conceituais de demonstração, não trabalhos contratados por estabelecimentos reais.</p>
          </div>
        </section>

        <section className="section services-section" id="servicos">
          <div className="container">
            <div className="section-header" data-reveal>
              <div><p className="eyebrow">02 / COMO POSSO AJUDAR</p><h2>Uma solução para <em>cada necessidade.</em></h2></div>
              <p>O melhor site não é o que tem mais recursos. É o que resolve melhor o problema certo.</p>
            </div>
            <div className="services-grid">
              {services.map((service) => <article className="service-card" key={service.number} data-reveal>
                <div className="service-top"><span>{service.number}</span><span className="service-symbol" aria-hidden="true">{service.icon}</span></div>
                <h3>{service.title}</h3><p>{service.description}</p>
              </article>)}
            </div>
          </div>
        </section>

        <section className="section process-section" id="processo">
          <div className="container">
            <div className="section-header" data-reveal>
              <div><p className="eyebrow">03 / DO PRIMEIRO CONTATO À ENTREGA</p><h2>Sem complicar <em>o processo.</em></h2></div>
              <p>Clareza do início ao fim, com espaço para conversar, ajustar e construir algo que faça sentido.</p>
            </div>
            <div className="process-grid">{steps.map(([number, title, description]) => <div className="process-step" key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{description}</p></div>)}</div>
          </div>
        </section>

        <section className="section about-section" id="sobre">
          <div className="container about-grid">
            <AboutVisual />
            <div className="about-copy" data-reveal><p className="eyebrow">04 / QUEM FAZ</p><h2>Prazer, <em>sou Bruno.</em></h2><p>Sou desenvolvedor web de Jundiaí, São Paulo, e estudante de Engenharia de Software na FIAP.</p><p>Gosto de unir tecnologia, estética e usabilidade para transformar ideias em experiências digitais funcionais e bem construídas.</p><p>Trabalho com atenção aos detalhes, comunicação clara e respeito à identidade de cada negócio.</p><a className="inline-link" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Vamos conversar <span aria-hidden="true">↗</span></a></div>
          </div>
        </section>

        <section className="contact-section" id="contato"><div className="container contact-inner" data-reveal><div className="contact-orb" aria-hidden="true" /><p className="eyebrow">05 / SEU PRÓXIMO PROJETO</p><h2>Tem uma ideia? <em>Vamos dar forma a ela.</em></h2><p>Quer criar um site ou melhorar sua presença digital? Conte um pouco sobre o seu negócio e vamos encontrar uma solução adequada.</p><a className="contact-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><span>Conversar pelo WhatsApp</span><span aria-hidden="true">↗</span></a></div></section>
      </main>

      <a className="whatsapp-float" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Conversar com Bruno pelo WhatsApp" title="Conversar pelo WhatsApp">
        <svg viewBox="0 0 24 24" width="23" height="23" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.058-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.496.099-.198.05-.372-.025-.52-.074-.149-.669-1.612-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.695.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.85 9.85 0 0 1-5.031-1.378l-.361-.214-3.741.98.998-3.648-.235-.374a9.855 9.855 0 0 1-1.51-5.256c.002-5.446 4.435-9.878 9.884-9.878a9.81 9.81 0 0 1 6.985 2.9 9.825 9.825 0 0 1 2.893 6.99c-.003 5.447-4.436 9.88-9.878 9.88m8.406-18.29A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.334.157 11.893a11.86 11.86 0 0 0 1.587 5.936L.057 24l6.3-1.654a11.85 11.85 0 0 0 5.687 1.448h.005c6.557 0 11.893-5.334 11.896-11.893a11.81 11.81 0 0 0-3.49-8.406Z" />
        </svg>
      </a>
      {activeProject && (
        <ProjectPreviewDialog
          project={activeProject}
          device={previewDevice}
          onDeviceChange={setPreviewDevice}
          onClose={closePreview}
        />
      )}

      <footer className="site-footer"><div className="container footer-inner"><a className="brand" href="#inicio">Bruno Minitti<span>.</span></a><span>Desenvolvimento Web · Jundiaí, SP</span><a href="#inicio" className="back-to-top">Voltar ao topo ↑</a><span>© {new Date().getFullYear()}</span></div></footer>
    </>
  )
}

export default App
