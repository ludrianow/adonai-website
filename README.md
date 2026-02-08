# Adonai v2 — Estamparia e Confecção

Projeto web para apresentação, orçamento e portfólio de uma estamparia/confecção. Focado em responsividade, acessibilidade, performance e uma experiência moderna usando React/Next.js.

## Visão Geral
- Site institucional com foco em conversão: hero 100vh, chamadas claras e navegação fluida.
- Formulário de pedido guiado por etapas (8 passos) com resumo final.
- Portfólio dinâmico por categorias (lidas do sistema de arquivos) com busca e lightbox.
- Design consistente com componentes reutilizáveis e transições suaves, mantendo critérios WCAG AA.

## Principais Recursos
- Hero responsivo com imagem única e overlay para legibilidade [page.tsx](./src/app/page.tsx).
- Header animado que muda de transparente para sólido ao rolar [layout.tsx](./src/app/layout.tsx).
- Animações de entrada otimizadas com IntersectionObserver [layout.tsx](./src/app/layout.tsx).
- Fluxo de pedido em 8 etapas com validações e resumo [order-form.tsx](./src/components/order-form.tsx).
- Portfólio dinâmico informado por diretórios em `public/images`:
  - Leitura de categorias e itens no servidor [lib.ts](./src/app/portfolio/lib.ts).
  - Renderização com filtros e lightbox no cliente [portfolio-client.tsx](./src/app/portfolio/portfolio-client.tsx).
  - Página que compõe dados e entrega os grupos [page.tsx](./src/app/portfolio/page.tsx).

## Tecnologias e Padrões
- Next.js (App Router), React, TypeScript.
- CSS utilitário com Tailwind e componentes UI leves (Button, Card, Input).
- Imagens com lazy loading, pré-carregamento adjacente no lightbox e transições baseadas em transform/opacity.
- Arquitetura simples: Server Components para leitura de arquivos; Client Components para interações ricas.

## Estrutura Essencial
- Aplicação
  - [layout.tsx](./src/app/layout.tsx): tema, header, animações globais e container.
  - [page.tsx](./src/app/page.tsx): hero 100vh, conteúdo de destaque e chamadas.
  - [como-pedir/page.tsx](./src/app/como-pedir/page.tsx): explicações alinhadas às etapas do pedido.
  - [informacoes/page.tsx](./src/app/informacoes/page.tsx): conteúdos complementares.
- Portfólio
  - [lib.ts](./src/app/portfolio/lib.ts): leitura de `public/images` e preparação de dados.
  - [page.tsx](./src/app/portfolio/page.tsx): montagem de grupos e entrega ao cliente.
  - [portfolio-client.tsx](./src/app/portfolio/portfolio-client.tsx): filtros, grid, lightbox, acessibilidade.
- Pedido
  - [order-form.tsx](./src/components/order-form.tsx): orquestração das etapas.
  - Etapas: [product-step.tsx](./src/components/steps/product-step.tsx), [fabric-step.tsx](./src/components/steps/fabric-step.tsx), [artwork-step.tsx](./src/components/steps/artwork-step.tsx), [sizes-step.tsx](./src/components/steps/sizes-step.tsx), [quantity-step.tsx](./src/components/steps/quantity-step.tsx), [additionals-step.tsx](./src/components/steps/additionals-step.tsx), [customer-info-step.tsx](./src/components/steps/customer-info-step.tsx), [review-step.tsx](./src/components/steps/review-step.tsx).
- Base estática
  - [init.html](./src/init.html): página estática com informações e tabelas.

## Fluxo do Pedido (8 etapas)
- Seleção de produto: camisetas, polos, raglan etc.
- Escolha da malha/tecido: gramatura e composição.
- Arte/estampa: envio, posicionamento e técnicas (DTF, silk).
- Medidas/tamanhos: seleção de tamanhos e guias de medidas.
- Quantidade: total por variação.
- Opcionais/adicionais: acabamentos e extras.
- Dados do cliente: informações para contato e entrega.
- Revisão e envio: resumo final com tudo consolidado.

## Portfólio por Pastas
- Local dos arquivos: `public/images/<categoria>/<arquivo>`.
- Categorias são os nomes das pastas (ex.: empresas, igreja, evangelhismo).
- Suporta extensões: `jpg`, `jpeg`, `png`, `webp`.
- Filtros:
  - `cat`: filtra por categoria (ex.: `/portfolio?cat=Empresas`).
  - `q`: busca por nome (ex.: `/portfolio?q=logo`).
- Lightbox:
  - Navegação por teclado (← →, ESC) e toque (swipe).
  - Pré-carregamento de imagens adjacentes para transições suaves.

## Design, Acessibilidade e Performance
- WCAG AA: contraste, textos alternativos, foco visível, aria para modais.
- Animações com IntersectionObserver e transições em `transform/opacity` para 60fps.
- Header com transição ao scroll e hero com `h-dvh` para altura correta em dispositivos móveis.
- Lazy loading em cards; no modal, uso de `object-contain` com limites de viewport.

## Como Executar
- Requisitos: Node.js LTS.
- Instalação: `npm install`
- Desenvolvimento: `npm run dev`
- Build: `npm run build`
- Produção: `npm run start`

## Como Adicionar Imagens ao Portfólio
- Crie uma pasta em `public/images` com o nome da categoria.
- Adicione suas imagens dentro dessa pasta.
- A página de portfólio detecta automaticamente as novas categorias e itens.

## Personalizações Comuns
- Normalização de nomes de categorias: pode-se mapear “ebd” → “EBD”, “evangelhismo” → “Evangelismo” no nível de apresentação.
- Estilos de UI: ajuste classes utilitárias nas páginas e componentes para cores, espaçamentos e transições.
- Texto do hero e CTAs: edite [page.tsx](./src/app/page.tsx) para adaptar mensagens.

## Status do Projeto
- Build atual funciona (`npm run build`).
- Portfólio e lightbox revisados com acessibilidade e desempenho.
- Fluxo de pedido completo com 8 etapas e resumo.

## Roadmap Sugerido
- Adicionar ESLint e regras de formatação.
- Normalização oficial de nomes de categorias.
- Integração de orçamento com backend/API.
- Auditorias automatizadas de performance/acessibilidade.
