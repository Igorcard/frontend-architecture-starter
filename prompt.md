Você é um arquiteto sênior de frontend. Sua tarefa é criar uma nova single page application com uma arquitetura **praticamente idêntica** à arquitetura descrita abaixo, mas **sem copiar nenhuma regra de negócio**, nomenclatura de domínio, fluxos específicos do produto original ou qualquer texto/fonte do projeto de origem.

O objetivo é reproduzir somente o **blueprint técnico e organizacional**:

- stack
- estrutura de pastas
- camadas
- convenções
- limites de dependência
- bootstrap da aplicação
- estratégias de estado
- padrões de roteamento
- padrões de formulários
- padrões de UI e composição
- estratégia de testes

Use um domínio totalmente neutro. Se precisar de exemplos, use nomes genéricos como `entity`, `record`, `item`, `profile`, `dashboard`, `documents`, `settings`, `feature-a`, `feature-b`.

## Resultado esperado

Entregue um projeto SPA completo, pronto para desenvolvimento, com:

1. estrutura de diretórios
2. arquivos-base
3. configuração de tooling
4. componentes e módulos iniciais
5. exemplos mínimos de rotas e features usando nomes genéricos
6. regras arquiteturais documentadas

Não descreva apenas a arquitetura. **Implemente a arquitetura em código**.

## Stack obrigatória

- React 19
- TypeScript em modo estrito
- Vite
- `pnpm` como package manager
- TanStack Router com file-based routing
- TanStack Query para server state
- TanStack Form para formulários
- TanStack Table e TanStack Virtual para tabelas complexas
- Zustand para client state global pequeno e pontual
- Valibot para schemas e validação
- Tailwind CSS v4
- CVA para variantes de componentes
- `tailwind-merge` para composição de classes
- Base UI ou primitives equivalentes para componentes acessíveis
- `motion` para animações quando necessário
- `msw` para mocks de API em desenvolvimento e testes
- Vitest + Testing Library
- ESLint com `eslint-plugin-boundaries`
- `oxlint`
- i18n com carregamento de locale no bootstrap

## Filosofia arquitetural

Implemente a SPA com estas camadas, nesta ideia de responsabilidade:

- `core/`: fundação técnica. APIs, cliente HTTP, query keys, query options, stores globais, auth, i18n, utilidades, constantes, ids, schemas transversais.
- `ui/`: design system e primitives reutilizáveis. Nada de regra de negócio aqui.
- `pattern/`: componentes compostos e padrões compartilhados de médio nível, construídos sobre `ui/` e `core/`. Exemplos neutros: infraestrutura de formulário, data grid, boundaries de erro, upload genérico, widgets.
- `layouts/`: layout estrutural puro. Recebe `children` e organiza shell visual.
- `features/`: módulos autocontidos por feature. Cada feature agrupa seus componentes, hooks, schemas e utilidades.
- `routes/`: rotas finas. Fazem guarda, prefetch, composição de layout e ligação com feature components.
- `mocks/`: handlers e setup de MSW.

## Regras de dependência entre camadas

Siga rigidamente esta direção de dependências:

- `core` pode importar apenas de `core` e `mocks`
- `ui` pode importar apenas de `ui`
- `layouts` pode importar de `core`, `ui` e `layouts`
- `pattern` pode importar de `core`, `ui` e `pattern`
- `features` pode importar de `core`, `ui`, `pattern`, `features` e, se necessário, uma camada de componentes compartilhados
- `routes` pode importar de `core`, `ui`, `pattern`, `layouts`, `features` e componentes compartilhados
- `mocks` pode importar de `core`, `mocks` e `features`

Configure ESLint com `eslint-plugin-boundaries` para reforçar isso.

## Convenções essenciais

- Não use barrel exports
- Prefira `type` a `interface`
- Prefira funções puras a classes
- Use imports por path alias em vez de relativos entre módulos
- Evite casts de tipo; ajuste o tipo na origem
- Centralize query keys
- Centralize query options
- Routes devem ser finas e conter o mínimo possível de lógica de negócio
- `ui/` não pode conhecer domínio
- `pattern/` não pode conter feature específica
- toda regra de formulário deve nascer de schema validado

## Path aliases obrigatórios

Configure aliases como:

- `@/*` -> `src/*`
- `@core/*` -> `src/core/*`
- `@ui/*` -> `src/ui/*`
- `@pattern/*` -> `src/pattern/*`
- `@features/*` -> `src/features/*`
- `@layouts/*` -> `src/layouts/*`
- `@routes/*` -> `src/routes/*`
- `@mocks/*` -> `src/mocks/*`

## Estrutura de diretórios esperada

Crie algo nesta linha:

```text
src/
  core/
    api/
    analytics/
    cookies/
    locales/
    __specs__/
    app-store.ts
    auth-context.ts
    auth-provider.tsx
    constants.ts
    hooks.ts
    http-resource.ts
    i18n.ts
    ids.ts
    keys.ts
    queries.ts
    session-store.ts
    utils.ts
  ui/
    __specs__/
    variants.ts
    button.tsx
    button.variants.ts
    input.tsx
    input.variants.ts
    dialog.tsx
    popover.tsx
    form.tsx
    table.tsx
    badge.tsx
    tabs.tsx
    header.tsx
    loading.tsx
    toaster.tsx
    ...
  pattern/
    __specs__/
    form.tsx
    form.contexts.ts
    form.hooks.ts
    data-grid.tsx
    data-grid-header.tsx
    data-grid-table.tsx
    data-grid-footer.tsx
    data-grid.variants.tsx
    friendly-error-dialog.tsx
    widget-boundary.tsx
  layouts/
    auth-layout.tsx
    main-layout.tsx
    onboarding-layout.tsx
    pages/
      not-found-page.tsx
  features/
    feature-a/
      hooks.ts
      schemas.ts
      list.tsx
      empty-state.tsx
      __specs__/
    feature-b/
      hooks.ts
      schemas.ts
      dialog.tsx
      __specs__/
  routes/
    __root.tsx
    index.tsx
    _auth.tsx
    _main.tsx
    _main.dashboard.tsx
    _main.settings.tsx
    _auth.login.tsx
    _auth.register.tsx
    __specs__/
  mocks/
    browser.ts
    handlers.ts
    server.ts
    setup-specs.ts
  main.tsx
  query-client.ts
  routeTree.gen.ts
```

## Bootstrap da aplicação

Implemente o bootstrap com esta ordem:

1. se estiver em desenvolvimento e um modo de mock estiver habilitado, subir MSW antes do render
2. inicializar autenticação antes do React renderizar
3. carregar locale/i18n a partir de store persistida
4. inicializar tracking de rota fora da árvore React, se existir tracking
5. renderizar com:
   - `StrictMode`
   - provider de i18n
   - `QueryClientProvider`
   - `RouterProvider`

## Root route e providers

No `__root.tsx`, crie uma root route com contexto tipado do router. O componente raiz deve:

- envolver tudo em `AuthProvider`
- montar `HeadContent`
- montar provider de consentimento/cookies se existir
- montar `Toaster`
- renderizar `Outlet`
- exibir devtools somente em desenvolvimento
- definir `notFoundComponent`

## Roteamento

Use TanStack Router com file-based routing e code splitting automático.

As rotas devem seguir este padrão:

- rotas de grupo como `_auth`, `_main`, `_onboarding`
- wrappers de layout por grupo
- `beforeLoad` para guards
- `loader` para prefetch de queries
- `validateSearch` quando houver estado na URL
- rotas devem compor layouts e features, não concentrar regra

Crie exemplos neutros como:

- `/login`
- `/register`
- `/dashboard`
- `/settings`
- `/items`
- `/items/$itemId`

## Query architecture

Implemente duas camadas distintas:

1. `core/keys.ts`
   - use `@lukemorales/query-key-factory`
   - organize keys por domínio técnico
   - exporte um registry unificado

2. `core/queries.ts`
   - use `queryOptions`
   - concentre `queryFn`, `queryKey`, `select`, `enabled`, `staleTime`, `gcTime`, `placeholderData`
   - mantenha queries reutilizáveis fora das rotas e fora das features sempre que forem transversais

As rotas e features devem consumir `useQuery(someQueryOptions)` e `queryClient.prefetchQuery(someQueryOptions)`.

## Camada de API

Em `core/api/`, crie módulos por recurso técnico, não por tela.

Cada módulo de API deve seguir este padrão:

- tipos de request/response exportados
- definição de route constante ou factory com `defineApiRoute` e `defineApiRouteFn`
- funções simples como `fetchX`, `createX`, `updateX`, `deleteX`
- uso do cliente HTTP central `httpResource`

## Cliente HTTP central

Crie `core/http-resource.ts` com:

- `defineApiRoute`
- `defineApiRouteFn`
- `httpResource<T>()`
- `httpUpload<T>()`
- erro amigável tipado, por exemplo `FriendlyError`
- tratamento de `application/problem+json`
- headers padrão:
  - `Content-Type`
  - `Accept`
  - `Accept-Language`
  - `Authorization` se houver token
- leitura de locale da store
- refresh de token antes das requests protegidas
- normalização de erro de rede

Não espalhe `fetch` pelo projeto. Toda request deve passar por esse client.

## Estado

Siga esta estratégia:

- server state: TanStack Query
- local UI state: `useState` ou `useReducer`
- global client state pequeno: Zustand
- compound components: React Context
- URL state: TanStack Router search params

Regras:

- não use `useEffect` para data fetching
- não use `useEffect` para mutations
- não use `useEffect` para derived state
- shared state entre componentes deve preferir cache/query ou store pequena dedicada

Crie pelo menos:

- uma `session-store.ts`
- uma `app-store.ts` persistida com `persist` e `createJSONStorage`
- um exemplo de store simples para UI persistida

## Forms

Monte uma arquitetura de formulário em duas camadas:

1. `ui/form.tsx`
   - primitives visuais de campo, label, erro, control

2. `pattern/form.tsx` + `pattern/form.hooks.ts`
   - campos compostos
   - integração com TanStack Form
   - contexts de field e form
   - `createFormHook(...)`
   - `createFormSubmitHandler(...)`

Os formulários devem:

- usar Valibot como source of truth
- inferir tipos a partir do schema
- oferecer campos reutilizáveis
- isolar mensagens de erro e estrutura visual

## UI system

Construa `ui/` como design system interno:

- componentes reutilizáveis e acessíveis
- variantes via CVA
- `variants.ts` exportando `cva`, `cx`, `compose` e merge com `tailwind-merge`
- componentes com `data-slot`, `data-variant`, `data-size` quando fizer sentido
- arquivos `.variants.ts` separados quando ajudar organização

Inclua componentes base como:

- button
- input
- textarea
- select
- checkbox
- radio-group
- badge
- alert
- dialog
- popover
- dropdown-menu
- tabs
- tooltip
- table
- scroll-area
- header
- loading
- skeleton
- toast

## Pattern layer

A camada `pattern/` deve concentrar abstrações compartilhadas de nível acima do design system, por exemplo:

- infraestrutura de data grid
- infraestrutura de formulário
- error boundary visual reutilizável
- friendly error dialog
- wrappers de widgets
- helpers visuais de upload ou seleção complexa

Ela deve existir para evitar duplicação entre features, sem contaminar `ui/` com regras de fluxo.

## Layouts

Crie layouts puros e reutilizáveis, como:

- `AuthLayout`
- `MainLayout`
- `OnboardingLayout`

Características:

- aceitam `children`
- montam shell visual, navegação, header e áreas fixas
- não concentram regra de negócio
- podem receber pequenos dados transversais via props, como `appVersion`

## Features

Cada feature deve ser autocontida e seguir padrão previsível. Exemplos neutros:

- `features/profile`
- `features/items`
- `features/dashboard`
- `features/settings`

Dentro de cada feature, use somente o necessário:

- `hooks.ts`
- `schemas.ts`
- componentes específicos
- utilitários específicos
- `__specs__/`

As features podem consumir `core`, `ui`, `pattern` e outras features quando isso for uma escolha consciente, mas evite acoplamento excessivo.

## i18n

Implemente i18n com suporte real a múltiplos idiomas:

- locale persistido na app store
- carregamento de mensagens antes do render
- estrutura de locales em `core/locales/`
- provider global de i18n

Não precisa de conteúdo real, mas a infraestrutura deve estar pronta.

## Auth

Implemente infraestrutura de autenticação desacoplada do domínio:

- `auth-context.ts`
- `auth-provider.tsx`
- integração com provider externo ou mockável
- sessão refletida em `session-store.ts`
- route guards em `beforeLoad`

## Mocks e testes

Configure:

- `msw` para dev e testes
- `mocks/browser.ts`
- `mocks/server.ts`
- `mocks/handlers.ts`
- `mocks/setup-specs.ts`

Estratégia de testes:

- unit tests para `core`, hooks e utilitários
- browser tests para primitives de `ui`
- integration tests para fluxos de rota
- testes em `__specs__/`

Configure scripts separados para:

- `test:unit`
- `test:browser`
- `test:integration`
- `test`

## Tooling e config

Quero os arquivos de configuração necessários para essa arquitetura:

- `package.json`
- `tsconfig.json`
- `vite.config.ts`
- `eslint.config.js`
- configuração de Vitest

No `vite.config.ts`, inclua:

- plugin do TanStack Router
- plugin React
- Tailwind
- i18n/plugin equivalente
- code splitting
- possibilidade de devtools em desenvolvimento
- possibilidade de bundle stats

No `eslint.config.js`, inclua:

- `typescript-eslint`
- `eslint-plugin-boundaries`
- `eslint-plugin-oxlint`
- regras de boundaries coerentes com as camadas

## Qualidade de implementação

Gere código com estas decisões:

- sem comentários desnecessários
- sem classes
- sem arquivos genéricos inchados
- sem “god routes”
- sem “god hooks”
- sem regra de negócio escondida em `ui/`
- sem acoplamento circular
- sem barrel exports

## Entrega

Entregue:

1. árvore de arquivos
2. conteúdo dos arquivos principais
3. exemplos suficientes para provar que a arquitetura funciona
4. breve explicação final dizendo como a arquitetura está organizada

## Restrições finais

- Não copie termos do domínio original
- Não use nomes de entidades do projeto de origem
- Não replique textos de UX, labels, mensagens ou fluxos específicos
- Não inclua dados reais, endpoints reais ou contratos de negócio reais
- Use apenas nomes neutros e infraestrutura genérica
- Preserve a arquitetura, não o produto
