# 🔧 Sumbandila Core Service

![Python](https://img.shields.io/badge/python-3.12-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.111+-green)

> Core verification service - the heart of the Sumbandila platform.

---

## 📋 Overview

The Core Service handles all verification logic, registry queries, trust score calculation, and blockchain hash generation. It's the primary API that mobile and web clients interact with.

## 🚀 Features

- 🔍 Entity verification (institutions & professionals)
- 📊 Trust score calculation (0-100)
- 🔗 Blockchain hash generation (SHA-256)
- 🌍 Multi-language support (5 languages)
- 🚨 Fraud signal detection
- 📝 Verification logging
- ⚡ Redis caching
- 📊 OpenTelemetry tracing

## 🛠️ Tech Stack

- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM
- **PostgreSQL** - Primary database
- **Redis** - Caching layer
- **Pydantic** - Data validation
- **OpenTelemetry** - Observability

## 📦 Dependencies

- fastapi
- uvicorn
- pydantic==2.13.0
- pydantic-settings
- python-dotenv
- python-jose[cryptography]
- passlib[argon2]
- python-multipart
- sqlalchemy
- psycopg2-binary
- redis
- httpx

## 🏃 Getting Started

### Prerequisites

- Python 3.12+
- PostgreSQL 15+
- Redis 7+

### Installation

```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows
.venv\Scripts\activate
# Unix/Mac
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Start server
uvicorn main:app --reload --port 8000
```

### Environment Variables

Create a `.env` file in the `services/core` directory:

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/sumbandila
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
ENVIRONMENT=development
```

## 📁 Project Structure

```
services/core/
├── app/
│   ├── api/
│   │   └── routes/         # API endpoints
│   │       ├── verify.py
│   │       ├── institutions.py
│   │       └── professionals.py
│   ├── models/             # SQLAlchemy models
│   │   ├── institution.py
│   │   ├── professional.py
│   │   └── verification_log.py
│   ├── schemas/            # Pydantic schemas
│   │   ├── verify.py
│   │   └── responses.py
│   ├── services/           # Business logic
│   │   ├── verification_service.py
│   │   ├── trust_score_calculator.py
│   │   └── blockchain_hasher.py
│   └── core/               # Core utilities
│       ├── config.py
│       ├── database.py
│       └── security.py
├── main.py                 # Application entry point
├── requirements.txt        # Python dependencies
└── Dockerfile              # Docker configuration
```

## 🔌 API Endpoints

### Public Endpoints

```
GET  /api/v1/verify/?q=...&lang=en
GET  /health
GET  /api/docs
```

### Protected Endpoints (JWT Required)

```
POST /api/v1/institutions/
GET  /api/v1/institutions/{id}
PUT  /api/v1/institutions/{id}
DELETE /api/v1/institutions/{id}

POST /api/v1/professionals/
GET  /api/v1/professionals/{id}
PUT  /api/v1/professionals/{id}
DELETE /api/v1/professionals/{id}
```

## 📊 Example Response

```json
{
  "name": "Dr Jane Smith",
  "profession": "Doctor",
  "authority": "HPCSA",
  "status": "Practising",
  "status_label": "✅ Verified & Registered",
  "trust_score": 96,
  "fraud_score": 0.04,
  "risk_label": "🟢 LOW — Appears Legitimate",
  "blockchain_hash": "0x7f92e3a1b8c4d2e6f0a9b3c5",
  "identity_verified": true,
  "signals_triggered": []
}
```

## 🧪 Testing

```bash
# Run tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run linter
flake8 .

# Run formatter
black .
```

## 🚀 Deployment

### Docker

```bash
# Build image
docker build -t sumbandila-core .

# Run container
docker run -p 8000:8000 --env-file .env sumbandila-core
```

### Kubernetes

```bash
# Apply deployment
kubectl apply -f ../../infrastructure/kubernetes/core-deployment.yaml

# Check status
kubectl get pods -l app=core-service
```

## 📊 Performance

- **Response Time**: < 200ms (p95)
- **Throughput**: 1000+ req/s
- **Error Rate**: < 0.1%
- **Cache Hit Rate**: > 80%

## 🤝 Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for contribution guidelines.

## 📄 License

MIT License - see [LICENSE](../../LICENSE) for details.

---

**Last Updated**: 2026-05-22  
**Branch**: main  
**Commit**: 15dd6f7
