# Overview

This is a full-stack web application built with a React frontend and Express backend. The project supports multilingual content (Arabic/English with RTL/LTR support) and uses modern tooling including Vite for frontend bundling, Drizzle ORM for database operations, and shadcn/ui for the component library. The application follows a monorepo structure with shared schema definitions between frontend and backend.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library based on Radix UI primitives
- **Language Support**: Built-in RTL/LTR support with Arabic and English localization
- **Forms**: React Hook Form with Zod validation

## Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API endpoints
- **Database Layer**: Drizzle ORM with PostgreSQL dialect
- **Build**: esbuild for production bundling
- **Development**: tsx for TypeScript execution in development
- **Session Storage**: PostgreSQL-based session storage with connect-pg-simple

## Data Storage
- **Primary Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with type-safe database operations
- **Migrations**: Drizzle Kit for schema migrations
- **Schema**: Shared TypeScript schema definitions between frontend and backend
- **Current Schema**: Users table with username/password authentication

## Development Setup
- **Monorepo Structure**: Client, server, and shared code in separate directories
- **Hot Reload**: Vite HMR for frontend, tsx watch mode for backend
- **Type Safety**: Strict TypeScript configuration across all packages
- **Code Organization**: Path aliases for clean imports (@/, @shared/, @assets/)

## Authentication & Session Management
- **Storage**: In-memory storage implementation (MemStorage class) with interface for future database integration
- **Session Handling**: Express sessions with PostgreSQL backing store
- **User Model**: Basic username/password structure with UUID primary keys

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon database
- **drizzle-orm**: Type-safe ORM for database operations
- **drizzle-kit**: CLI tools for schema migrations and management
- **express**: Web framework for REST API endpoints
- **vite**: Frontend build tool and development server

## UI and Styling
- **@radix-ui/***: Comprehensive suite of accessible UI primitives (accordion, dialog, dropdown, etc.)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for creating component variants
- **clsx**: Conditional className utility
- **lucide-react**: Icon library

## Frontend State and Routing
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight client-side routing
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Form validation resolvers
- **zod**: Schema validation library

## Development Tools
- **@replit/vite-plugin-***: Replit-specific development plugins
- **tsx**: TypeScript execution for Node.js
- **esbuild**: JavaScript bundler for production builds

## Database and Session
- **connect-pg-simple**: PostgreSQL session store for Express
- **drizzle-zod**: Integration between Drizzle schema and Zod validation

## Additional Utilities
- **date-fns**: Date manipulation library
- **embla-carousel-react**: Carousel component
- **cmdk**: Command palette component
- **nanoid**: URL-safe unique ID generator