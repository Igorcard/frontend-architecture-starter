# frontend-architecture-starter

Aplicação de exemplo em React com roteamento tipado, dados remotos e UI consistente — base para workshops e projetos que seguem uma arquitetura por camadas (`core`, `features`, `ui`, `routes`).

## Stack

- **React 19**, **TypeScript**, **Vite 7**
- **TanStack Router** (rotas em arquivo + `routeTree.gen.ts`)
- **TanStack Query** (dados e cache)
- **TanStack Table** (grade de itens)
- **Tailwind CSS 4**, **Valibot**, **Zustand**
- **MSW** (API mock em desenvolvimento)

## Pré-requisitos

- Node.js compatível com a versão indicada pelo projeto (recomendado: LTS atual)

## Como rodar

```bash
npm install
```

Copie variáveis de ambiente de exemplo (opcional em dev; o padrão costuma ser MSW ligado):

```bash
copy .env.example .env.development
```

No macOS/Linux use `cp` em vez de `copy`.

```bash
npm run dev
```

Abra o endereço que o Vite exibir (geralmente `http://localhost:5173`). Em desenvolvimento, as chamadas a `/api/*` são interceptadas pelo **Mock Service Worker** quando `VITE_MSW` não está como `false`.

Para desligar o MSW e apontar para um backend real (que exponha as mesmas rotas sob `/api`), defina no `.env.development`:

```env
VITE_MSW=false
```

Garanta que o servidor sirva a API no mesmo origin ou configure proxy no Vite conforme seu ambiente.

## Scripts

| Comando | Descrição |
|--------|------------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Typecheck + build de produção |
| `npm run preview` | Preview do build |
| `npm run lint` | ESLint |
| `npm run test` | Vitest (todos os projetos de teste) |
| `npm run test:unit` | Apenas testes unitários (Node) |
| `npm run test:browser` | Testes no browser (Playwright) |
| `npm run test:integration` | Testes de integração |

## Estrutura (resumo)

| Pasta | Papel |
|-------|--------|
| `src/core` | API HTTP, queries, sessão, constantes |
| `src/features` | Páginas e lógica por domínio (ex.: `items`, `session`) |
| `src/ui` | Componentes de interface reutilizáveis |
| `src/routes` | Definição de rotas TanStack Router |
| `src/layouts` | Layouts (área autenticada, auth, etc.) |
| `src/mocks` | Handlers MSW para desenvolvimento |

## Licença

Uso interno / conforme o repositório — ajuste se publicar com licença explícita.
