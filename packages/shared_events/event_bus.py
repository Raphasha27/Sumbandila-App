import redis.asyncio as redis
import json
import uuid
from datetime import datetime

class EventBus:
    def __init__(self, redis_url="redis://redis:6379"):
        self.redis = redis.from_url(redis_url, decode_responses=True)
        self.stream_name = "sumbandila_events"

    async def publish(self, event_type: str, payload: dict, tenant_id: str):
        event_id = str(uuid.uuid4())
        event = {
            "id": event_id,
            "type": event_type,
            "tenant_id": tenant_id,
            "payload": json.dumps(payload),
            "timestamp": datetime.now().isoformat()
        }
        await self.redis.xadd(self.stream_name, event)
        print(f"[EVENT_BUS] Published {event_type} for Tenant {tenant_id}")

    async def subscribe(self, group_name: str, consumer_name: str, callback):
        # Create consumer group if not exists
        try:
            await self.redis.xgroup_create(self.stream_name, group_name, id="0", mkstream=True)
        except redis.exceptions.ResponseError:
            pass # Group already exists

        while True:
            # Read new messages
            messages = await self.redis.xreadgroup(group_name, consumer_name, {self.stream_name: ">"}, count=1, block=5000)
            for stream, msg_list in messages:
                for msg_id, data in msg_list:
                    print(f"[EVENT_BUS] Consuming {data['type']}...")
                    await callback(data)
                    # Acknowledge message
                    await self.redis.xack(self.stream_name, group_name, msg_id)
