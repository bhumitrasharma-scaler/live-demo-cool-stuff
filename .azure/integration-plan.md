# Integration Plan

## Backend
- Project folder: .
- Run command: npm run dev
- Build command: npm run build
- Port: 3000
- Health endpoint: GET /api/health

## Frontend
- Project folder: ./public
- Dev command: npm run dev
- Build command: npm run build
- API seam: server routes in src/routes.ts and app-level wiring in src/app.ts; swap any mock analyzer to live data via service module in src/services/gemini.ts
- Mock files to delete: none for this static HTML frontend

## API Routes
- GET /api/health
- GET /get
- POST /post
- GET /

## Database
- Type: none
- Migration tool: not applicable
- Connection env vars: none
- Requirement: no seed data

## Shared Types
- Shared package: none
- Type contract: API responses are described inline in route handlers and frontend JS consumers

## Services
- Essential: Express app, idea analysis service, static frontend hosting
- Enhancement: Application Insights integration via APPLICATIONINSIGHTS_CONNECTION_STRING
