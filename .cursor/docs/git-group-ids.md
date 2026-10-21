# Git group IDs

Subject prefix. Lookup: `git log --grep='^MAILSC'`

| ID | Kind | What |
| --- | --- | --- |
| MAILSC | feat | React Email HTTP sidecar; queued contact mail |
| DXAI | chore | lint-staged recursion, `@/*` → `src`, agent repo map |
| NLOGO | feat | NamedLogo SC mark, per-app colorways, header lockup |
| SVCOFF | fix | Codehouse services section heading stays put across locales |
| RTENV | feat | Runtime `window.__ENV` + localStorage HTML preferences |
| GITID | docs | This index + grouped commit-message skill |
| CHMOB | feat | Codehouse home mobile intro: animation-safe band redesigns |
| CHLIGHT | feat | Codehouse light mode: split accent fill/ink, softer surfaces; home chapter follow-ups |
| DOCKER | fix | Docker images for the Next.js apps (mise toolchain, standalone runner) |
| CHCSS | refactor | Codehouse animation CSS: Tailwind and tw-animate-css first, CSS Modules for coordinated effects |
| CHREPLAY | refactor | Codehouse header entrance replays on a locale switch instead of being suppressed |
| CHRAIL | feat | Codehouse home selling points: six per service in a columned rail at every width |
| APIENV | fix | Production API env aligned with Dokploy; credentials as runtime env |
| BAO | chore | OpenBao CLI via mise; secrets and Dokploy vault agent skills |
| HEALTH | feat | `/health` route handlers for main and codehouse, excluded from the codehouse proxy |
| CHMAIL | feat | Codehouse sends quote mail over SMTP with Redis rate limits; Laravel API hibernated |
| PHPCVE | docker | Pin serversideup/php v5.0.2 for PHP 8.5.12 CVE-2026-109618 / CVE-2026-109619 |

Mint 2–8 A–Z, unique, mnemonic. Add a row when first used. Reuse the ID on every commit in that workstream.
