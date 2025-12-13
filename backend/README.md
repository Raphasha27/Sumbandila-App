# Sumbandila Backend (Mock verification microservice)

A tiny Express server that serves as a mock verification microservice.

To run:
1. cd backend
2. npm install
3. npm start

Endpoints:
- GET /api/verify?type=school|doctor|lawyer&q=<query>
  Returns mock verification result. Replace with calls to real registries (e.g., DOE, HPCSA, Law Society) in production.

Notes on production:
- Use HTTPS, authentication (API keys / OAuth) when calling external registries.
- Implement rate limiting, logging, and persistent database (Postgres / MongoDB).
- Consider separate microservices per registry and a gateway for aggregation.
