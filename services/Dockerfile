"""
Backend Dockerfile — V2 production build.
"""
FROM python:3.12-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends gcc && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY services/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source
COPY services/ ./services/
COPY packages/ ./packages/

ENV PYTHONPATH=/app/packages

EXPOSE 8000

CMD ["uvicorn", "services.core.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
