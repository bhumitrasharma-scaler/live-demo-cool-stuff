# Project Plan

**Status**: In Progress
**Created**: 2026-10-08
**Mode**: NEW

---

## 1. Project Overview

**Goal**: Build a small local Idea Analyser app for Gen-Z employees that lets users submit raw ideas, gets quick feedback from Gemini, and surfaces a few funny/corny startup concepts for inspiration. The project is designed so that every module is independently testable.

**App Type**: SPA + API

**API Login**: No

**Mode**: NEW

**Deployment Plan**: No deployment plan found

---

## 2. Idea Analyser API — Backend

| Component | Technology |
|-----------|-----------|
| **Language** | TypeScript |
| **Runtime** | Node |
| **Package Manager** | npm |
| **Test Runner** | Vitest |
| **Mocking Library** | vi.mock |
| **Test Command** | npm test |
| **Orchestration** | docker-compose |

> **Language vs Runtime**: `Language` is the source language the user picked in this service's `language` question. `Runtime` is the execution runtime — default `Node` for TypeScript/JavaScript, `CPython` for Python, `.NET` for C#. Only deviate from the default (e.g. `Bun`, `Deno`, `PyPy`) when the user explicitly asks. **Package Manager and Test Runner are language-dependent** — match them to this service's Language (e.g. C# → `dotnet (NuGet)` + `xUnit`/`NUnit`/`MSTest`). The `Orchestration` row is recorded for the scaffold step but hidden in the plan UI — always keep it set to `docker-compose`.

---

## 3. Idea Analyser Web UI — Frontend

| Component | Technology |
|-----------|-----------|
| **Language** | JavaScript |
| **Framework** | Plain HTML/CSS/JavaScript |
| **Package Manager** | npm |
| **Test Runner** | Vitest |
| **Mocking Library** | vi.mock |
| **Test Command** | npm test |

---

## 4. Services Required

| Azure Service | Role in App | Environment Variable | Default Value (Local) | Classification |
|---------------|------------|---------------------|----------------------|----------------|
| Azure App Service | Host the Express API and serve the static web UI | PORT | 3000 | Essential |
| Application Insights | Monitor request health and app telemetry | APPLICATIONINSIGHTS_CONNECTION_STRING | local disabled | Enhancement |

---

## 5. Prerequisites

### Run

| Tool | Service(s) | Installed | Version |
|------|------------|-----------|---------|
| Node.js | Idea Analyser API, Idea Analyser Web UI | ✅ | v26.10.0 |
| npm | Idea Analyser API, Idea Analyser Web UI | ✅ | 10.5.0 |

### Debug

| Tool | Service(s) | Installed | Version |
|------|------------|-----------|---------|
| Docker | Idea Analyser API, Idea Analyser Web UI | ✅ | 29.7.2 |
| Docker Compose | Idea Analyser API, Idea Analyser Web UI | ✅ | v5.5.1 |
| `ms-azuretools.vscode-azurefunctions` | Idea Analyser API | ❓ | Not detected in current VS Code extension scan |

> The local app does not require Azure Functions, so the Functions extension is marked as unknown rather than assumed — it is only relevant if the stack changes later. The runtime and container tools were detected directly in this environment.

---

## 6. Design System & UI

**Component Library**: Fluent UI v9
**Style Direction**: Modern, playful, and low-friction creative workspace for brainstorming. Use roomy cards, soft rounded corners, and a bright brand color so idea generation feels fast and fun without looking chaotic.
**Typography**: Inter, system-ui

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#6C63FF` | Brand color for primary actions and active idea cards |
| `accent` | `#FF7A59` | Highlighting clever findings, trend tags, and playful CTA chips |
| `surface` | `#F7F8FC` | Page and card backgrounds for a clean, airy workspace |
| `text` | `#111827` | Body text and form labels |
| `muted` | `#6B7280` | Supporting text, metadata, and helper captions |
| `border` | `#E5E7EB` | Dividers, input borders, and soft card outlines |

### Pages

| Page | Route | Purpose | Layout |
|------|-------|---------|--------|
| Home | `/` | Submit an idea and get a Gen-Z viability readout | `hero + form + actions` |
| Idea Bank | `/ideas` | Browse funny/corny preset startup concepts | `card-list + table` |

### Sample Content

```
Home — idea:
| Idea | Vibe | Score | Status |
| "Late-night ramen delivery for coding doomscrollers" | chaotic | 81 | promising |
| "Moodboard app for broke digital nomads" | trendy | 74 | interesting |
| "AI tutor for gym bros who hate spreadsheets" | funny | 68 | exploratory |

Idea Bank — preset concept: "Glow-up for your old Wi‑Fi router" · "category": "SaaS" · "risk": "medium"
```

---

## 7. Project Structure

```
idea-analyser/
├─ .azure/
│  ├─ requirements.json
│  ├─ project-plan.md
│  └─ .preview-temp/
├─ public/
│  ├─ index.html
│  ├─ styles.css
│  └─ app.js
├─ src/
│  ├─ server.js
│  ├─ app.js
│  ├─ routes.js
│  ├─ services/
│  │  └─ gemini.js
│  ├─ data/
│  │  └─ presetIdeas.js
│  └─ utils/
│     └─ ideaHelpers.js
├─ tests/
│  └─ api.test.js
├─ .env.example
├─ package.json
├─ README.md
└─ Dockerfile
```

---

## 8. Route Definitions

| # | Method | Path | Description | Request Body | Response Body | Status Codes |
|---|--------|------|-------------|-------------|--------------|-------------|
| 1 | GET | `/api/health` | Health check | — | `{ status, services }` | 200, 503 |
| 2 | GET | `/get` | Return one random preset Gen-Z business idea | — | `{ id, title, description }` | 200 |
| 3 | POST | `/post` | Submit a raw idea for Gemini evaluation | `{ idea: string }` | `{ feedback, feasibility, interest, tone }` | 200, 400, 500 |
| 4 | GET | `/` | Serve the static web UI | — | HTML page | 200 |

---

## 9. Next Steps

1. Run **azure-project-scaffold** to execute this plan
2. Run **azure-project-integrate** to wire the frontend to live data, smoke-test the backend, and create the migrations
3. Run **azure-debug-plan** → **azure-debug-generate** for Docker emulators and VS Code debugging
4. Run the **azure-deploy** agent when ready; it uses **azure-app-onboard** for architecture, cost estimation, IaC generation, provisioning, and health verification
