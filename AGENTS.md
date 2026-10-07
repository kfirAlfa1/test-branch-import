# AGENTS.md

## Project overview
Vite + React + TypeScript + Tailwind frontend-only app. No backend, no database, no external services, no secrets required.

## Running in the sandbox
- `docker compose -f docker-compose.base44.yml up -d` brings up the app.
- Uses `node:22` base image with the repo bind-mounted at `/app`. Dependencies install on container startup (`npm install` — there is no lockfile).
- Vite dev server runs on port 8080 inside the container, mapped to host port 3000.
- Healthcheck probes `http://localhost:8080/` from inside the container.
- Vite 5.4.x has a backported host-validation security patch (CVE-2025-31125). The sandbox host (`3000-<id>.e2b.app`) is rejected with 403 unless allowed. `vite.config.ts` conditionally adds `.${BASE44_SANDBOX_HOST_DOMAIN}` to `server.allowedHosts` when `BASE44_PREVIEW_MODE === "1"`; with the flag unset, no host restriction is added. The `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` env var is NOT read by Vite 5.x (it's a Vite 6.1+ feature), so the config edit is required.

## Verifying
- `curl -s http://localhost:3000/` should return the HTML with `/@vite/client` and `/src/main.tsx` (dev server, not prebuilt).
- The app renders a counter component with increment/decrement buttons.
