
import './App.css'

const projects = [
  {
    name: 'FORMA.',
    category: 'Barbearia',
    description:
      'Uma experiência digital para barbearias que valorizam identidade, apresentação e praticidade.',
    url: 'https://barbearia-demo.brunogoncalvesminitti.workers.dev/',
    theme: 'forma',
    number: '01',
  },
  {
    name: 'BRASA.',
    category: 'Hamburgueria',
    description:
      'Uma proposta digital para destacar a personalidade de uma marca gastronômica e seus produtos.',
    url: 'https://brasa-demo.brunogoncalvesminitti.workers.dev/',
    theme: 'brasa',
    number: '02',
  },
]

const services = [
  {
    number: '01',
    title: 'Sites institucionais',
    description:
      'Apresente seus serviços, diferenciais e informações em um espaço digital próprio.',
  },
  {
    number: '02',
    title: 'Landing pages',
    description:
      'Páginas objetivas para apresentar uma marca, divulgar serviços e facilitar o contato.',
  },
  {
    number: '03',
    title: 'Reformulação de sites',
    description:
      'Uma nova experiência para sites que precisam de mais clareza, organização e personalidade.',
  },
]

const steps = [
  ['01', 'Entender', 'Conversamos sobre o negócio e seus objetivos.'],
  ['02', 'Planejar', 'Definimos o escopo e a proposta do projeto.'],
  ['03', 'Desenvolver', 'Transformo a ideia em um site funcional.'],
  ['04', 'Publicar', 'Testamos, ajustamos e colocamos o site no ar.'],
]

function App() {
  return (
    <>
      <header className="header">
        <div className="container header-content">
          <a className="brand" href="#inicio" aria-label="Bruno Minitti, início">
            Bruno Minitti<span>.</span>
          </a>

          <nav className="navigation" aria-label="Navegação principal">
            <a href="#projetos">Projetos</a>
            <a href="#servicos">Serviços</a>
            <a href="#sobre">Sobre</a>
          </nav>

          <a className="header-contact" href="#contato">
            Vamos conversar <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <main id="inicio">
        <section className="hero container">
          <div className="hero-content">
            <p className="eyebrow">
              <span className="status-dot" />
              DESENVOLVEDOR WEB INDEPENDENTE
            </p>

            <h1>
              Sites que valorizam o que torna seu negócio <em>único.</em>
            </h1>

            <p className="hero-description">
              Desenvolvo experiências digitais modernas, personalizadas e
              funcionais para negócios que querem se destacar.
            </p>

            <div className="hero-actions">
              <a href="#projetos" className="button button-primary">
                Conhecer projetos <span aria-hidden="true">↗</span>
              </a>
              <a href="#contato" className="button button-secondary">
                Conversar sobre um projeto
              </a>
            </div>
          </div>

          <div className="hero-footer">
            <span>Jundiaí, São Paulo</span>
            <a href="#projetos">Explore meu trabalho ↓</a>
          </div>
        </section>

        <section className="section projects-section" id="projetos">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">PORTFÓLIO / 2026</p>
                <h2>Projetos selecionados<span>.</span></h2>
              </div>
              <p>
                Diferentes identidades, a mesma atenção aos detalhes.
              </p>
            </div>

            <div className="projects-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.name}>
                  <a
                    href={project.url}
                    className={`project-preview ${project.theme}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visitar demonstração ${project.name}`}
                  >
                    <span className="preview-label">
                      PROJETO DEMONSTRATIVO
                    </span>
                    <span className="preview-title">
                      {project.name}
                    </span>
                    <span className="preview-arrow" aria-hidden="true">↗</span>
                  </a>

                  <div className="project-details">
                    <div className="project-meta">
                      <span>{project.number} / {project.category}</span>
                      <span>Conceito digital</span>
                    </div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      Explorar projeto <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <p className="projects-note">
              FORMA. e BRASA. são projetos conceituais de demonstração,
              não trabalhos contratados por estabelecimentos reais.
            </p>
          </div>
        </section>

        <section className="section" id="servicos">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">O QUE EU FAÇO</p>
                <h2>Soluções com propósito<span>.</span></h2>
              </div>
              <p>
                Cada projeto começa com uma necessidade real, não com um
                modelo pronto.
              </p>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service.number}>
                  <span className="service-number">{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section process-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">MEU PROCESSO</p>
                <h2>Simples do início ao fim<span>.</span></h2>
              </div>
            </div>

            <div className="steps-grid">
              {steps.map(([number, title, description]) => (
                <div className="step" key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section about-section" id="sobre">
          <div className="container about-grid">
            <div>
              <p className="eyebrow">QUEM ESTÁ POR TRÁS</p>
              <h2>Muito prazer, sou Bruno<span>.</span></h2>
            </div>

            <div className="about-description">
              <p>
                Sou desenvolvedor web de Jundiaí, São Paulo, e estudante de
                Engenharia de Software na FIAP.
              </p>
              <p>
                Gosto de transformar ideias em experiências digitais
                funcionais, bem construídas e com atenção aos detalhes.
              </p>
              <p>
                Acredito que cada negócio tem sua identidade, e que seu
                site deve refletir isso.
              </p>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contato">
          <div className="container contact-content">
            <p className="eyebrow">VAMOS CONVERSAR?</p>
            <h2>Seu próximo projeto pode começar aqui<span>.</span></h2>
            <p>
              Tem uma ideia ou quer melhorar a presença digital do seu negócio?
              Vamos conversar sobre a melhor solução.
            </p>

            <div className="contact-pending">
              Contato comercial pelo WhatsApp em configuração.
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <a className="brand" href="#inicio">Bruno Minitti<span>.</span></a>
          <span>Desenvolvimento Web · Jundiaí, SP</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </>
  )
}

export default App
