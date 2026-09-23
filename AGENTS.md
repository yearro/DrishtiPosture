# AGENTS.md

DrishtiPosture: a client-only React 19 + Vite + TypeScript app that analyzes yoga posture in real time from the webcam via MediaPipe Pose. No backend; state is ephemeral (only the theme persists, in localStorage). Docs, UI copy, rules, and test names are in **Spanish** — keep new user-facing text in Spanish.

## Commands

- Package manager: **pnpm** (`pnpm-lock.yaml`). `pnpm-workspace.yaml` is not a monorepo — it only whitelists the esbuild build.
- `pnpm dev` — dev server (port 5173)
- `pnpm test` — `vitest run`. Single file: `pnpm test src/utils/__tests__/geometry.utils.test.ts`
- `pnpm exec tsc -b` — typecheck (there is no `typecheck` script; `pnpm build` = `tsc -b && vite build`)
- Verify with: `pnpm exec tsc -b` → `pnpm test`. All 36 tests currently pass (~2s, no services, no network).
- **`pnpm lint` fails for two reasons:**
  1. Local git worktrees at `.kilo/worktrees/*` are full repo copies with their own tsconfigs, so typescript-eslint reports `No tsconfigRootDir ... multiple candidate TSConfigRootDirs` for every file (~159 parse errors). The ESLint config only ignores `dist`. Lint the main tree instead — `pnpm exec eslint src` parses fine and shows the real errors. Do not try to fix the parse errors via tsconfig changes.
  2. Real lint errors exist in `src` (e.g. `no-explicit-any` in `src/views/CatalogView.tsx`, `no-useless-assignment` in `src/services/angle-calculator.service.ts`).

## Architecture

- Entry: `index.html` → `src/main.tsx` → `src/App.tsx`. **No router** — the screen is `state.view` (`welcome | catalog | analysis`) in `src/context/AppContext.tsx` (useReducer); `CatalogView` and `AnalysisView` are lazy-loaded there.
- Layers: `src/views` (screens) → `src/components/{ui,camera,catalog,pose}` → `src/hooks` (`useCameraStream`, `usePoseDetector`, `useAngleCalculator`, `useAsanaCatalog`) → `src/services` → `src/workers`.
- Pose inference runs in a Web Worker: `src/workers/pose.worker.ts`, spawned with `new Worker(new URL(...))` from `src/services/pose-detector.service.ts` and driven by `usePoseDetector`. Keep heavy per-frame work in the worker.
- Component folder convention (`.agents/rules/`): `Component/Component.tsx`, `Component.types.ts`, `Component.module.css`, `index.ts`. Older `src/components/ui/*` files are flat with plain `.css` — don't mix the two styles for new code.
- **Two `IAsana` types and two catalogs coexist — easy to edit the wrong one:**
  - Canonical: `src/types/domain.types.ts` `IAsana` (`nameEs`/`nameEn`/`nameSanskrit`, required `jointRules`) + `src/data/poses-catalog.ts` `POSES_CATALOG` (frozen, 20+ asanas). Used by the catalog UI and asserted in `catalog.service.test.ts` (≥20 asanas, ≥3 jointRules each).
  - Legacy: `src/types/app.types.ts` `IAsana` (`spanishName`/`englishName`/`sanskritName`, optional `jointRules`) + `src/data/asanaData.ts` `ASANA_CATALOG`. Only feeds the default active asana in `AppContext` and a fallback in `AnalysisView`.
  - Domain model of record: `docs/DOMAIN.md`.
- Pose images: source of truth is `src/assets/poses/*.jpg`, resolved by `getAsanaImageUrl()` in `src/utils/image.utils.ts` (Vite glob import, fallback to `public/assets/poses/`). Catalog entries store bare filenames (`yoga_vrksasana.jpg`) in `referenceImageUrl` — never hardcode `/assets/...` paths.

## Testing

- Vitest + jsdom in `vite.config.ts`: `globals: true` (describe/it/expect need no imports), includes only `src/**/*.test.{ts,tsx}`, excludes `e2e/**`. Tests are colocated in `__tests__/` folders; names are in Spanish.
- `*.perf.test.ts` files run as part of the normal suite (~1.5s total) — they are not opt-in.
- `e2e/camera.spec.ts` cannot run: `@playwright/test` is not installed, there is no Playwright config, and it expects a dev server on `http://localhost:5173`. There is no CI (no `.github/workflows`).

## Runtime gotchas

- MediaPipe WASM + the pose model are fetched from CDNs at runtime (jsdelivr, storage.googleapis.com) — first use needs network; the GPU delegate falls back to CPU.
- Fonts and icons load from Google Fonts at runtime, including `material-symbols-outlined` ligature icons.
- The camera API requires a secure context (localhost or HTTPS).
- `.env` (gitignored) is only consumed by `llm_task.sh`, a standalone Ollama/NVIDIA NIM helper unrelated to the app. The Vite app reads no env vars.
- `dist/` is gitignored build output — never edit or commit it.

## Instruction sources

- `.agents/rules/*.md` — Spanish style canon: `any` forbidden, no `React.FC`, functional components only, plus component/a11y/state/error/styling rules. Treat as the target convention; some existing code predates it (e.g. `App.tsx` uses `React.FC`) — don't mass-rewrite unrelated files.
- `.ai/` — AIDD workflow (Architect → Builder → Craftsman): instructions/templates, GitHub issue state machine in `.ai/LIFECYCLE.md`; feature plans go to `docs/features/<slug>/plan.md`. `aidd_audit.md` lists known inconsistencies in that system — check before trusting `.ai/AIDD.md` paths.
- `docs/PRD.md` and `docs/DOMAIN.md` — requirements and domain model (Spanish).

## Ignore these

- `.kilo/worktrees/*` — local git worktrees containing duplicate copies of the whole repo (they pollute glob/search results and break `pnpm lint`). Never edit files there; plans live in the tracked `.kilo/plans/`.
- `.playwright-mcp/` — old browser-session screenshots.

Commits: conventional commits with a scope, e.g. `feat(catalog): ...`.
