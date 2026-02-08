# Portfólio e Lightbox — Refatoração e Testes

## Objetivo
Refatorar completamente o módulo de Portfólio, corrigindo erros, melhorando legibilidade/manutenibilidade, aplicando padrões consistentes, reforçando acessibilidade e adicionando testes.

## Alterações Principais
- Extrai `readPortfolio` para [lib.ts](file:///c:/Server/W4/adonai-v2/src/app/portfolio/lib.ts), removendo duplicação e adicionando tratamento de erros.
- Refatora o cliente em [portfolio-client.tsx](file:///c:/Server/W4/adonai-v2/src/app/portfolio/portfolio-client.tsx) com:
  - Lightbox acessível (role, aria, foco, ESC, overlay).
  - Navegação por teclado e toque (swipe).
  - Lazy loading com IntersectionObserver e preload de adjacentes.
  - Filtro por categoria no cliente sem reload.
- Atualiza página do Portfólio [page.tsx](file:///c:/Server/W4/adonai-v2/src/app/portfolio/page.tsx) para consumir a lib e preparar grupos.

## Erros Encontrados e Correções
- Duplicação da lógica de leitura de diretórios: movida para lib reutilizável.
- Falta de tratamento de exceção em leitura de `public/images`: `try/catch` retornando mapa vazio.
- Grid exibindo múltiplas categorias quando uma estava selecionada: estado de categoria no cliente filtra grupos renderizados.
- Lightbox sem transição de fechamento: adicionado estado `closing` com fade-out 200ms.
- Acessibilidade ausente: `role="dialog"`, `aria-modal`, `aria-labelledby`, gestão de foco e `aria-live`.
- Performance: carregamento sob demanda com `IntersectionObserver` e prefetch de adjacentes.
- Bug de layout dos cards: imagem limitada a 70% do container com efeito hover e transições suaves.

## Como Rodar
1. Instalar dependências de teste:
   - `npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom`
2. Rodar build:
   - `npm run build`
3. Rodar testes:
   - `npx vitest run`

## Critérios de Aceitação (estado atual)
- Filtro por categoria exibe apenas itens daquela categoria.
- Lightbox com 80vh/80vw, overlay semi-transparente, ESC/overlay/ícone para fechar.
- Animações suaves a 60fps; transições em transform/opacity.
- Imagens com `object-fit: contain` no modal; responsivas em 320–1440px.
- Lazy loading e prefetch adjacente implementados.

## Exemplos de Uso
- Acesse `/portfolio?cat=Empresas` para ver apenas “Empresas”.
- Use os botões no topo para alternar categorias sem recarregar a página.
