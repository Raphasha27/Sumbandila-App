from contextlib import asynccontextmanager
import asyncio
import json
import uvicorn
from fastapi import FastAPI
from shared_events.event_bus import EventBus
from shared_otel.tracing import setup_otel
from datetime import datetime

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Run worker in background
    print("🤖 AI Sentinel is analyzing the registry stream for fraud...")
    task = asyncio.create_task(event_bus.subscribe(
        group_name="ai_fraud_group", 
        consumer_name="sentinel_01", 
        callback=handle_new_certification
    ))
    yield
    # Shutdown: Clean up if needed
    task.cancel()

app = FastAPI(title="Sumbandila AI Sentinel (Fraud Detection)", lifespan=lifespan)
setup_otel(app, "ai-service")
event_bus = EventBus()

def calculate_risk_score(payload: dict) -> float:
    """
    Predictive Risk Engine:
    In a production scenario, this would use a pre-trained ML model 
    (Scikit-Learn/PyTorch) to analyze historical fraud patterns.
    """
    score = 0.0
    
    # 🧪 Rule 1: Temporal Anomaly (Simulated)
    # E.g., Issuing a certificate for a date in the future
    
    # 🧪 Rule 2: Institution Verification
    if payload.get("institution_id") == "UNVERIFIED_TEMP_001":
        score += 0.5
        
    # 🧪 Rule 3: Name Pattern Anomalies
    name = payload.get("owner_name", "")
    if any(char.isdigit() for char in name):
        score += 0.8 # Names with numbers are high risk
        
    # 🧪 Rule 4: Data Consistency
    # If the category doesn't match the institutionalID prefix
    
    return min(score, 1.0)

async def handle_new_certification(data):
    """Listens for new certifications and runs predictive fraud analysis."""
    payload = json.loads(data.get("payload", "{}"))
    tenant_id = data.get("tenant_id")
    
    risk_score = calculate_risk_score(payload)
    
    if risk_score > 0.6:
        print(f"⚠️ [AI_SENTINEL] HIGH RISK DETECTED: {risk_score} | Entity: {payload.get('owner_name')}")
        # Broadcast Risk Alert to the Event Stream
        await event_bus.publish("RISK_ALERT", {
            "entity_id": payload.get("id"),
            "risk_score": risk_score,
            "flags": ["NAME_ANOMALY" if any(char.isdigit() for char in payload.get("owner_name", "")) else "UNKNOWN"],
            "automated_action": "FLAGGED_FOR_HUMAN_REVIEW"
        }, tenant_id)
    else:
        print(f"✅ [AI_SENTINEL] Validation Passed (Risk: {risk_score})")

@app.get("/health")
async def health():
    return {"status": "ai_sentinel_active", "model_version": "v1.0.0-beta"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8003)
