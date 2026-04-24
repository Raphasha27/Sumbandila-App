# Sumbandila Core Service - Docker Stack
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY services/core/ ./services/core/
COPY ai/ ./ai/
COPY data/ ./data/

# Expose port
EXPOSE 8000

# Set environment variables
ENV PYTHONPATH=/app

# Launch the Sentinel
CMD ["uvicorn", "services.core.main:app", "--host", "0.0.0.0", "--port", "8000"]
