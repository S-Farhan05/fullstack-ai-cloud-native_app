<!--
Sync Impact Report:
- Version change: 1.0.0 → 1.1.0
- Modified principles: All principles updated to reflect Todo Full-Stack Web Application requirements
- Added sections: Specific technology stack and authentication requirements
- Removed sections: Template placeholders
- Templates requiring updates: ✅ Updated
- Follow-up TODOs: None
-->
# Todo Full-Stack Web Application Constitution

## Core Principles

### Spec-Driven Development
All development follows the spec-driven approach: spec → plan → tasks → implement. No manual coding outside of Claude Code implementation. Every feature and requirement must be clearly defined in specifications before implementation begins.

### Frontend-Backend Separation
Maintain clear separation between frontend (Next.js) and backend (FastAPI) services. The frontend consumes RESTful APIs exposed by the backend. Services run independently and communicate via HTTP/HTTPS protocols with proper authentication.

### Secure Stateless Authentication (NON-NEGOTIABLE)
Authentication must be implemented using Better Auth with JWT tokens. All protected API endpoints require valid JWT tokens in Authorization headers. Authentication flow follows: User login → JWT issuance → Token inclusion in requests → Backend verification → User identification.

### User Data Isolation
Each user can access only their own data. All API operations involving user data must be filtered by the authenticated user's ID. Backend must validate that the requesting user owns the resources they're accessing.

### Technology Stack Compliance
Must use the designated technology stack: Next.js 16+ (App Router) for frontend, Python FastAPI for backend, SQLModel as ORM, and Neon Serverless PostgreSQL for persistent storage. Any deviations require explicit approval and documentation.

### Minimal Feature Scope
Implementation restricted to Basic Level functionality only. No advanced features beyond the defined scope. Features must align with the 5 core todo operations: create, read, update, delete, and complete tasks.

## Technology Standards
RESTful API design using FastAPI with proper HTTP status codes and JSON responses. Database interactions must use SQLModel ORM with Neon Serverless PostgreSQL. Frontend built with Next.js 16+ App Router for responsive, accessible user interfaces. All authentication handled via Better Auth with JWT tokens.

## Development Workflow
Spec-first approach where all changes begin with specification updates. Implementation follows through Claude Code automation. All API endpoints must be secured with JWT authentication except public endpoints like login/signup. Database schemas must be designed for scalability and data integrity.

## Governance
Constitution supersedes all other practices. All development must comply with specified technology stack and architectural patterns. Changes to core principles require explicit documentation and approval. All PRs must verify compliance with authentication requirements, data isolation, and technology stack usage.

**Version**: 1.1.0 | **Ratified**: 2026-02-06 | **Last Amended**: 2026-02-06
