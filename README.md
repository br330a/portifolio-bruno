# Portfólio — Bruno Minitti

Portfólio comercial de desenvolvimento web, com projetos demonstrativos **FORMA.**, **BRASA.** e **MIMO.**, contato pelo WhatsApp e prévias interativas.

## Tecnologias

- React 19 + Vite 8
- CSS separado, sem biblioteca de componentes
- Site estático, sem backend ou banco de dados
- Hospedagem recomendada: **Cloudflare Pages**

## Começar

Requer Node.js compatível com a versão do Vite no `package.json`.

```bash
npm ci
npm run dev
```

Antes de publicar:

```bash
npm run lint
npm run build
npm run preview
```

## Conteúdo e arquivos

- `src/App.jsx`: seções, informações sobre os projetos e destino do WhatsApp
- `src/App.css`: visual, responsividade, animações e modo escuro
- `src/index.css`: base CSS
- `public/projects/*.webp`: capturas otimizadas do FORMA., BRASA. e MIMO.
- `public/about/bruno-profile.jpg`: retrato usado na seção Sobre
- `public/social-preview.png`: capa de compartilhamento 1200×630
- `public/favicon.svg`: identidade BM.
- `public/_headers`: cabeçalhos HTTP para Cloudflare Pages
- `public/theme-init.js`: aplica preferência de tema antes da inicialização do React

O WhatsApp está público no código, pois o número será o contato comercial. Para alterá-lo, edite apenas `WHATSAPP_NUMBER` em `src/App.jsx`.

O portfólio diferencia **projetos demonstrativos** de trabalhos para clientes reais. Não utilize depoimentos ou resultados não verificados.

## Publicação no Cloudflare Pages

1. Conecte o repositório do GitHub ao **Cloudflare Pages**.
2. Configure o build como `npm run build`, com diretório de saída `dist` e diretório raiz do projeto.
3. Faça o primeiro deploy e obtenha a URL pública (domínio `pages.dev` ou seu domínio próprio).
4. No painel do Pages, adicione uma variável de ambiente de **produção** chamada `SITE_URL`, contendo **somente** sua URL HTTPS pública, sem barra final (exemplo: `https://seu-dominio.com.br`).
5. Refaça o deploy para gerar as URLs absolutas de Open Graph, o link canônico e `sitemap.xml`.
6. Verifique o card da URL ao compartilhá-la no WhatsApp. Plataformas podem manter prévias antigas em cache.

> **Por que deixar `SITE_URL` para o deploy?** Ainda não sabemos a URL definitiva. O site funciona sem essa variável, mas a URL canônica, `og:url`, a imagem absoluta de compartilhamento e o sitemap só ficam completos quando ela estiver configurada.

### Segurança e serviços externos

O arquivo `_headers` é aplicado pelo Cloudflare **Pages** aos recursos estáticos. A política CSP permite fontes do Google e a incorporação dos três endereços de demonstração. Atualize `frame-src` se os endereços dos projetos mudarem.

Alguns serviços podem bloquear `iframe` por políticas próprias (`frame-ancestors` ou `X-Frame-Options`). O botão **Abrir site completo** continua disponível independentemente da prévia incorporada.

### Manutenção

- Mudanças de texto e de projetos: `src/App.jsx`.
- Capturas e foto: `public/`.
- Teste sempre em smartphone e desktop após alterações.
- Não comite `.env` ou credenciais. A variável `SITE_URL` é pública, mas os demais segredos devem ficar no painel de hospedagem.
