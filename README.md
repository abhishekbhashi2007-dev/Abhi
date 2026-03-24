# All in 1

All in 1 is an AI-powered generation platform that helps users generate starter code and project structure for mobile apps, web apps, games, and websites.

## 1) Implementation Plan

1. **Architecture design**: split into frontend (React + Tailwind) and backend (Express + MongoDB).
2. **Data model design**: users, generation history, daily usage tracker.
3. **Authentication**: JWT + bcrypt-based signup/login.
4. **AI generation API**: prompt validation, project-type detection, LLM call with structured JSON output.
5. **Daily request limit**: enforce 10/day per user with UTC date-keyed usage records.
6. **Frontend dashboard**: dark premium UI with prompt box, output/code viewer, history, and usage sidebar.
7. **Edge-case handling**: empty prompt, invalid input, API failures, limit exceeded.
8. **Documentation/setup**: include env examples and run instructions.

## 2) System Architecture

- **Frontend (Vite + React + Tailwind)**
  - Auth page (signup/login)
  - Dashboard with Sidebar, PromptPanel, OutputPanel, HistoryPanel
  - Token-based API client
- **Backend (Node + Express + MongoDB)**
  - `/api/auth` for signup/login
  - `/api/generate` for AI generation and history
  - JWT middleware + centralized error handling
- **AI Service**
  - Prompt classification + clarification detection
  - OpenAI structured JSON response parsing
  - Fallback scaffold if no API key

## 3) Database Schema

### User
- `name`, `email` (unique), `passwordHash`, `role`, timestamps

### Generation
- `userId`, `prompt`, `projectType`, `needsClarification`, `clarificationQuestion`, `explanation`, `files[]`, timestamps

### DailyUsage
- `userId`, `dateKey (YYYY-MM-DD UTC)`, `count`
- Unique compound index: `(userId, dateKey)`

## 4) Request-Limit Logic

- On each generation request:
  - Increment `DailyUsage.count` for current UTC `dateKey`
  - If `count > DAILY_REQUEST_LIMIT`, revert increment and return `429`
- Daily reset is automatic via new `dateKey` every UTC day.

## 5) API Endpoints

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`

### Generation
- `POST /api/generate` (auth required)
- `GET /api/generate/history` (auth required)

### Health
- `GET /api/health`

## 6) Setup Instructions

## Prerequisites
- Node.js 18+
- MongoDB running locally or remote cluster

### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## 7) Environment Variables

Backend `.env`
- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `DAILY_REQUEST_LIMIT`

Frontend `.env`
- `VITE_API_BASE_URL`

## 8) Notes on Scalability

- Modular backend layering: routes/controllers/services/models
- Indexed MongoDB access patterns for user history and daily usage
- Configuration through environment variables
- Response schema for AI output ensures structured data contract
