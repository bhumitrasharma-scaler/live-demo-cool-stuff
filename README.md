# Idea Analyser

A compact local idea review app built for Gen-Z brainstorms. It includes an Express API plus a lightweight browser UI that lets users submit a raw idea and get a quick viability readout.

## Run locally

1. Create a local `.env` file from `.env.example` and add your Gemini API key:

```bash
cp .env.example .env
```

2. Start the app:

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Use a real Gemini key in `GEMINI_API_KEY` and keep `GEMINI_MODEL=gemini-2.0-flash-lite` to target the 3.5 Flash Lite endpoint.

## Build

```bash
npm run build
```

## Test

```bash
npm test
```
