# 🏗️ Sumbandila Architecture Guide

> **Vision**: A scalable, secure, and maintainable microservices architecture for Africa's digital trust platform.

---

## 📋 Table of Contents

- [System Overview](#system-overview)
- [Architecture Principles](#architecture-principles)
- [Service Architecture](#service-architecture)
- [Data Architecture](#data-architecture)
- [Security Architecture](#security-architecture)
- [Deployment Architecture](#deployment-architecture)
- [Observability Architecture](#observability-architecture)

---

## 🌐 System Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  Mobile App (Expo)  │  Web App (Vite/React)  │  Landing Page    │
└──────────────┬──────────────────┬────────────────────┬──────────┘
               │                  │                    │
               └──────────────────┼────────────────────┘
                                  │
                         ┌────────▼────────┐
                         │   API Gateway   │
                         │  (Future: Kong) │
                         └────────┬────────┘
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        │                         │                         │
┌───────▼────────┐    ┌──────────▼──────────┐    ┌────────▼────────┐
│  Auth Service  │    │   Core Service      │    │   AI Service    │
│  Port: 8001    │    │   Port: 8000        │    │   Port: 8003    │
│  JWT + OAuth   │    │   Verification      │    │   Fraud ML      │
└───────┬────────┘    └──────────┬──────────┘    └────────┬────────┘
        │                        │                         │
        │             ┌──────────▼──────────┐             │
        │             │   Audit Service     │             │
        │             │   Port: 8002        │             │
        │             │   Event Logging     │             │
        │             └──────────┬──────────┘             │
        │                        │                         │
        └────────────────────────┼─────────────────────────┘
                                 │
        ┌────────────────────────┼─────────────────────────┐
        │                        │                         │
┌───────▼────────┐    ┌──────────▼──────────┐    ┌────────▼────────┐
│   PostgreSQL   │    │      Redis          │    │   S3 Storage    │
│   Primary DB   │    │   Cache + Queue     │    │   Backups       │
└────────────────┘    └─────────────────────┘    └─────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │  Observability Stack    │
                    │  Jaeger + Prometheus    │
                    │  Grafana + OTEL         │
                    └─────────────────────────┘
```

---

## 🎯 Architecture Principles

### 1. **Microservices Architecture**

**Why**: Scalability, independent deployment, technology flexibility

**Services**:
- **Auth Service**: Authentication, authorization, user management
- **Core Service**: Verification logic, registry queries, trust scoring
- **AI Service**: Fraud detection, ML models, risk analysis
- **Audit Service**: Event logging, compliance, audit trails
- **Backup Service**: Data backup, disaster recovery

### 2. **API-First Design**

- All services expose RESTful APIs
- OpenAPI/Swagger documentation
- Versioned endpoints (`/api/v1/`)
- Consistent response formats

### 3. **Event-Driven Communication**

```python
# Service publishes event
await event_bus.publish(
    "verification.completed",
    {
        "verification_id": "123",
        "entity_type": "doctor",
        "trust_score": 96,
        "timestamp": "2026-05-22T10:30:00Z"
    }
)

# Other services subscribe
@event_bus.subscribe("verification.completed")
async def log_verification(event):
    await audit_service.log(event)
```

### 4. **Database Per Service**

Each service owns its data:
- **Auth DB**: Users, roles, permissions
- **Core DB**: Institutions, professionals, verifications
- **Audit DB**: Event logs, audit trails

### 5. **Caching Strategy**

```python
# Cache hot data in Redis
@cache(ttl=3600)  # 1 hour
async def get_institution(institution_id: str):
    return await db.query(Institution).filter_by(id=institution_id).first()
```

---

## 🔧 Service Architecture

### Core Service (Port 8000)

**Responsibilities**:
- Entity verification
- Registry queries
- Trust score calculation
- Blockchain hash generation

**Tech Stack**:
- FastAPI
- SQLAlchemy
- PostgreSQL
- Redis

**API Endpoints**:
```
GET  /api/v1/verify/?q=...&lang=en
POST /api/v1/institutions/
GET  /api/v1/institutions/{id}
POST /api/v1/professionals/
GET  /api/v1/professionals/{id}
GET  /health
```

**Architecture**:
```
┌─────────────────────────────────────────┐
│           Core Service                   │
├─────────────────────────────────────────┤
│  API Layer (FastAPI Routes)             │
│    ↓                                     │
│  Business Logic Layer                    │
│    - VerificationService                 │
│    - TrustScoreCalculator                │
│    - BlockchainHashGenerator             │
│    ↓                                     │
│  Data Access Layer (SQLAlchemy)          │
│    ↓                                     │
│  Database (PostgreSQL)                   │
└─────────────────────────────────────────┘
```

### Auth Service (Port 8001)

**Responsibilities**:
- User registration/login
- JWT token generation
- OAuth integration
- Role-based access control

**Tech Stack**:
- FastAPI
- python-jose (JWT)
- passlib (Argon2)
- PostgreSQL

**Flow**:
```
User Login → Validate Credentials → Generate JWT → Return Token
                                         ↓
                              Store in Redis (blacklist support)
```

### AI Service (Port 8003)

**Responsibilities**:
- Fraud detection
- ML model inference
- Risk scoring
- Anomaly detection

**Tech Stack**:
- FastAPI
- scikit-learn
- pandas
- Redis (model cache)

**ML Pipeline**:
```
Input Features → Preprocessing → Model Inference → Risk Score
                                        ↓
                              Cache predictions (Redis)
```

### Audit Service (Port 8002)

**Responsibilities**:
- Event logging
- Audit trails
- Compliance reporting
- Analytics

**Tech Stack**:
- FastAPI
- PostgreSQL (time-series optimized)
- Redis (event queue)

---

## 💾 Data Architecture

### Database Schema (Core Service)

```sql
-- Institutions Table
CREATE TABLE institutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,  -- 'university', 'college', 'hospital'
    authority VARCHAR(50) NOT NULL,  -- 'DHET', 'CHE', 'HPCSA'
    registration_number VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(20) NOT NULL,  -- 'active', 'deregistered', 'suspended'
    saqa_id VARCHAR(50),
    nqf_level INTEGER,
    accreditation_date DATE,
    blockchain_hash VARCHAR(64) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    INDEX idx_registration_number (registration_number),
    INDEX idx_status (status),
    INDEX idx_authority (authority)
);

-- Professionals Table
CREATE TABLE professionals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    profession VARCHAR(100) NOT NULL,  -- 'doctor', 'lawyer', 'psychologist'
    authority VARCHAR(50) NOT NULL,  -- 'HPCSA', 'LPC', 'Psytech'
    registration_number VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(20) NOT NULL,  -- 'practising', 'deregistered', 'suspended'
    specialisation VARCHAR(100),
    institution_id UUID REFERENCES institutions(id),
    blockchain_hash VARCHAR(64) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    INDEX idx_registration_number (registration_number),
    INDEX idx_status (status),
    INDEX idx_profession (profession)
);

-- Verification Logs Table
CREATE TABLE verification_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query VARCHAR(500) NOT NULL,
    entity_type VARCHAR(50),  -- 'institution', 'professional'
    entity_id UUID,
    trust_score INTEGER,
    fraud_score DECIMAL(5,4),
    ip_address_hash VARCHAR(64),  -- SHA-256 hashed for privacy
    user_agent TEXT,
    language VARCHAR(5),
    created_at TIMESTAMP DEFAULT NOW(),
    INDEX idx_created_at (created_at),
    INDEX idx_entity_id (entity_id)
);
```

### Caching Strategy

```python
# Redis Cache Keys
CACHE_KEYS = {
    "institution": "inst:{id}",  # TTL: 1 hour
    "professional": "prof:{id}",  # TTL: 1 hour
    "search_results": "search:{query_hash}",  # TTL: 15 minutes
    "trust_score": "trust:{entity_id}",  # TTL: 30 minutes
}
```

---

## 🔒 Security Architecture

### Authentication Flow

```
┌──────────┐                ┌──────────────┐                ┌──────────┐
│  Client  │                │ Auth Service │                │   Core   │
└────┬─────┘                └──────┬───────┘                └────┬─────┘
     │                             │                             │
     │  1. POST /auth/login        │                             │
     ├────────────────────────────>│                             │
     │                             │                             │
     │  2. Validate credentials    │                             │
     │                             │                             │
     │  3. Return JWT token        │                             │
     │<────────────────────────────┤                             │
     │                             │                             │
     │  4. GET /api/v1/verify (with JWT)                         │
     ├───────────────────────────────────────────────────────────>│
     │                             │                             │
     │                             │  5. Validate JWT            │
     │                             │<────────────────────────────┤
     │                             │                             │
     │                             │  6. Return user info        │
     │                             ├────────────────────────────>│
     │                             │                             │
     │  7. Return verification result                            │
     │<───────────────────────────────────────────────────────────┤
```

### Security Layers

1. **Transport Security**: HTTPS/TLS 1.3
2. **Authentication**: JWT with RS256
3. **Authorization**: Role-based access control (RBAC)
4. **Input Validation**: Pydantic schemas
5. **Rate Limiting**: Redis-based rate limiter
6. **SQL Injection Prevention**: Parameterized queries
7. **XSS Prevention**: Content Security Policy
8. **CSRF Protection**: SameSite cookies

---

## 🚀 Deployment Architecture

### Kubernetes Deployment

```yaml
# Core Service Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: core-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: core-service
  template:
    metadata:
      labels:
        app: core-service
    spec:
      containers:
      - name: core
        image: sumbandila/core:latest
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 5
```

### Environment Strategy

```
Development → Staging → Production
    ↓            ↓          ↓
  Local      Railway    Kubernetes
```

---

## 📊 Observability Architecture

### OpenTelemetry Integration

```python
from opentelemetry import trace
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

# Initialize tracer
tracer = trace.get_tracer(__name__)

# Instrument FastAPI
FastAPIInstrumentor.instrument_app(app)

# Custom spans
@app.get("/api/v1/verify/")
async def verify_entity(query: str):
    with tracer.start_as_current_span("verify_entity") as span:
        span.set_attribute("query", query)
        
        with tracer.start_as_current_span("database_query"):
            result = await db.query(...)
        
        with tracer.start_as_current_span("trust_score_calculation"):
            trust_score = calculate_trust_score(result)
        
        return result
```

### Monitoring Stack

- **Traces**: Jaeger
- **Metrics**: Prometheus
- **Logs**: Structured JSON logs
- **Dashboards**: Grafana
- **Alerts**: Prometheus Alertmanager

---

## 🔄 Data Flow Examples

### Verification Flow

```
1. User enters "Dr Jane Smith" in mobile app
2. Mobile app sends GET /api/v1/verify/?q=Dr+Jane+Smith&lang=en
3. Core service:
   a. Checks Redis cache
   b. If miss, queries PostgreSQL
   c. Calculates trust score
   d. Calls AI service for fraud detection
   e. Generates blockchain hash
   f. Caches result in Redis
   g. Publishes "verification.completed" event
4. Audit service logs the verification
5. Core service returns result to client
6. Mobile app displays trust score and verification status
```

---

**Last Updated**: 2026-05-22  
**Version**: 1.0.0  
**Maintained By**: Sumbandila Engineering Team
