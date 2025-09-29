# Deployment Guide

## Vercel Deployment

This application is configured for deployment on Vercel. Follow these steps:

### 1. Environment Variables

Set the following environment variables in your Vercel dashboard:

```
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production
PORT=5000
SESSION_SECRET=your-session-secret-here
```

### 2. Database Setup

The application uses PostgreSQL with Drizzle ORM. You can use:
- Vercel Postgres
- Neon Database
- Supabase
- Any PostgreSQL provider

### 3. Build Configuration

The application is configured with:
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

### 4. Deploy

1. Connect your GitHub repository to Vercel
2. Set the environment variables
3. Deploy

The application will be available at your Vercel domain.

## Local Development

1. Install dependencies: `npm install`
2. Set up environment variables in `.env`
3. Run development server: `npm run dev`

## Features

- Multi-language support (Arabic, English, Turkish)
- Responsive design
- WhatsApp integration
- Contact information display
- Exchange rate display
- Modern UI with Tailwind CSS
