# Portfólio — Bruno Minitti

Portfólio comercial de desenvolvimento web, com projetos demonstrativos **FORMA.**, **BRASA.** e **MIMO.**, contato pelo WhatsApp e prévias interativas.

## Evolução comercial — etapa 05

- Hero com proposta de valor e chamadas para orçamento e projetos.
- Diferenciais, serviços com entregáveis, processo em cinco etapas e FAQ comercial.
- Briefing em três etapas: tipo de site, funcionalidades e informações do negócio.
- O botão final **abre o WhatsApp com mensagem pré-preenchida**. Não há banco, backend, preços automáticos nem armazenamento das respostas.
- Projetos FORMA., BRASA. e MIMO. continuam claramente identificados como demonstrações.

Para validar as regras do briefing:

```bash
npm run test
```

## Tecnologias

- React 19 + Vite 8
- CSS separado, sem biblioteca de componentes
- Site estático, sem backend ou banco de dados
- Hospedagem atual: **Cloudflare Workers (Static Assets)**

## Começar

Requer Node.js compatível com a versão do Vite no `package.json`.

```bash
npm ci
npm run dev
```

Antes de publicar:

```bash
npm run test
npm run lint
npm run build
npm run preview
```

## Conteúdo e arquivos

- `src/App.jsx`: seções, serviços, projetos demonstrativos e destino do WhatsApp
- `src/components/BriefingWizard.jsx`: briefing comercial e sua navegação
- `src/components/BriefingWizard.css`: estilos responsivos do briefing
- `src/utils/briefing.js`: tipos, validação e mensagem para o WhatsApp
- `tests/briefing.test.js`: testes das regras sem dependências externas
- `src/App.css`: visual, responsividade, animações e modo escuro
- `src/index.css`: base CSS
- `public/projects/*.webp`: capturas otimizadas do FORMA., BRASA. e MIMO.
- `public/about/bruno-profile.jpg`: retrato usado na seção Sobre
- `public/social-preview.png`: capa de compartilhamento 1200×630
- `public/favicon.svg`: identidade BM.
- `public/_headers`: regras declaradas para a hospedagem de recursos estáticos
- `public/theme-init.js`: aplica preferência de tema antes da inicialização do React

O WhatsApp está público no código, pois o número será o contato comercial. Para alterá-lo, edite apenas `WHATSAPP_NUMBER` em `src/App.jsx`.

O portfólio diferencia **projetos demonstrativos** de trabalhos para clientes reais. Não utilize depoimentos ou resultados não verificados.

## Publicação no Cloudflare Workers

O portfólio já está publicado em `https://portifolio-bruno.brunogoncalvesminitti.workers.dev/`.

Na raiz do projeto, após `npm run test` e `npm run lint`, execute:

```bash
SITE_URL="https://portifolio-bruno.brunogoncalvesminitti.workers.dev" npm run build && npx wrangler deploy --assets ./dist --name portifolio-bruno
```

Esse comando mantém o mesmo Worker e configura as URLs absolutas para Open Graph, canonical e `sitemap.xml`. A variável `SITE_URL` é pública e usada somente durante o build. No final, verifique a página, o formulário de briefing, `/sitemap.xml` e `/social-preview.png`.

### Segurança e serviços externos

O arquivo `_headers` declara políticas para recursos estáticos; confirme sua aplicação efetiva no Cloudflare Workers. A política CSP inclui fontes do Google e os três endereços das demonstrações. Atualize `frame-src` se os endereços dos projetos mudarem.

Alguns serviços podem bloquear `iframe` por políticas próprias (`frame-ancestors` ou `X-Frame-Options`). O botão **Abrir site completo** continua disponível independentemente da prévia incorporada.

### Manutenção

- Mudanças de texto e de projetos: `src/App.jsx`.
- Capturas e foto: `public/`.
- Teste sempre em smartphone e desktop após alterações.
- Não comite `.env` ou credenciais. A variável `SITE_URL` é pública, mas os demais segredos devem ficar no painel de hospedagem.
