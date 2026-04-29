# Python Services Setup Guide

## ✅ Services/core - Successfully Set Up!

**Status:** Ready  
**Python Version:** 3.14.4  
**Virtual Environment:** `.venv` (created)  
**Tests:** 9/9 passed ✅

### Installed Dependencies:
- FastAPI 0.136.1
- Pydantic 2.13.3
- Uvicorn 0.46.0
- SQLAlchemy 2.0.49
- PostgreSQL (psycopg2-binary 2.9.12)
- Redis 7.4.0
- Python-Jose 3.5.0
- Passlib 1.7.4 (with argon2)
- Pytest 9.0.3 (with asyncio)

### How to Run:

```powershell
# Activate virtual environment
cd services/core
.\.venv\Scripts\Activate.ps1

# Run the service
uvicorn main:app --reload --port 8000

# Run tests
python -m pytest tests/ -v

# Deactivate when done
deactivate
```

---

## 🔧 Setup Other Python Services

### For services/auth:
```powershell
cd services/auth
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m pytest tests/ -v
```

### For services/ai:
```powershell
cd services/ai
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m pytest tests/ -v
```

### For services/audit:
```powershell
cd services/audit
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m pytest tests/ -v
```

---

## 🚀 Quick Start All Services

Run this PowerShell script to set up all services at once:

```powershell
# setup_all_services.ps1
$services = @("auth", "core", "ai", "audit")

foreach ($service in $services) {
    Write-Host "`n[$service] Setting up..." -ForegroundColor Cyan
    cd "services/$service"
    
    if (-not (Test-Path ".venv")) {
        python -m venv .venv
    }
    
    .\.venv\Scripts\Activate.ps1
    pip install -r requirements.txt
    
    Write-Host "[$service] ✅ Complete!" -ForegroundColor Green
    cd ../..
}
```

---

## 📝 Important Notes

### Virtual Environment Location
Each service has its own `.venv` directory:
```
services/
├── auth/.venv/
├── core/.venv/   ✅ Created
├── ai/.venv/
└── audit/.venv/
```

### Why Separate Venvs?
- ✅ Isolated dependencies per service
- ✅ Different versions can coexist
- ✅ No conflicts between services
- ✅ Production-like setup

### .gitignore
The `.venv` directories are already in `.gitignore`, so they won't be committed.

---

## 🧪 Testing

### Run All Tests:
```powershell
# In each service directory
.\.venv\Scripts\Activate.ps1
python -m pytest tests/ -v

# Or run all at once from services/
cd services
foreach ($s in @("auth", "core", "ai", "audit")) {
    Write-Host "`nTesting $s..." -ForegroundColor Yellow
    cd $s
    if (Test-Path ".venv\Scripts\python.exe") {
        .\.venv\Scripts\python.exe -m pytest tests/ -v
    }
    cd ..
}
```

---

## 🔍 Verification Checklist

After setup, verify:

- [x] Virtual environment created (`.venv/`)
- [x] Dependencies installed (pip install -r requirements.txt)
- [x] Imports work (`python -c "import fastapi"`)
- [x] Tests pass (`pytest tests/ -v`)
- [x] Service starts (`uvicorn main:app --reload`)

---

## ⚠️ Common Issues

### "venv not found"
**Solution:** Create it first:
```powershell
python -m venv .venv
```

### "Module not found"
**Solution:** Activate venv and reinstall:
```powershell
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### Tests fail
**Solution:** Check error output, ensure venv is activated:
```powershell
.\.venv\Scripts\Activate.ps1
python -m pytest tests/ -v --tb=short
```

---

## 📚 Service Ports

| Service | Port | Status |
|---------|------|--------|
| Core | 8000 | ✅ Ready |
| Auth | 8001 | ⏳ Setup needed |
| AI | 8002 | ⏳ Setup needed |
| Audit | 8003 | ⏳ Setup needed |

---

**Last Updated:** April 15, 2026  
**Python Version:** 3.14.4  
**Status:** Core service ready, others need setup
