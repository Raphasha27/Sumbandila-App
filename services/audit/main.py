import asyncio
import uvicorn
from fastapi import FastAPI
from shared_events.event_bus import EventBus

app = FastAPI(title="Sumbandila Audit & Notification Worker")
event_bus = EventBus()

async def handle_event(data):
    """
    Process events from the stream.
    In a real system, this would write to an immutable audit DB 
    or send real-time SMS/Email notifications.
    """
    event_type = data.get("type")
    tenant_id = data.get("tenant_id")
    payload = data.get("payload")
    timestamp = data.get("timestamp")
    
    print(f"--------------------------------------------------")
    print(f"🚨 [AUDIT_WORKER] Received Event: {event_type}")
    print(f"🏢 Tenant: {tenant_id}")
    print(f"🕒 Time: {timestamp}")
    print(f"📦 Data: {payload}")
    print(f"--------------------------------------------------")

async def run_worker():
    print("🚀 Audit Worker is listening to the Redis Stream...")
    await event_bus.subscribe(
        group_name="audit_service_group", 
        consumer_name="worker_01", 
        callback=handle_event
    )

@app.on_event("startup")
async def startup_event():
    # Run the worker in the background
    asyncio.create_task(run_worker())

@app.get("/health")
async def health():
    return {"status": "worker_active", "engine": "redis_streams"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8002)
