from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from opentelemetry.sdk.resources import RESOURCE_ATTRIBUTES, Resource

def setup_otel(app, service_name: str):
    # Setup Tracer Provider with Resource Metadata
    resource = Resource.create({
        RESOURCE_ATTRIBUTES: {
            "service.name": service_name,
            "platform": "sumbandila-sentinel"
        }
    })
    
    provider = TracerProvider(resource=resource)
    
    # Export to OTLP Collector (Jaeger/Honeycomb/etc)
    otlp_exporter = OTLPSpanExporter(endpoint="http://otel-collector:4317", insecure=True)
    processor = BatchSpanProcessor(otlp_exporter)
    provider.add_span_processor(processor)
    
    trace.set_tracer_provider(provider)
    
    # Instrument FastAPI App
    FastAPIInstrumentor.instrument_app(app)
    
    print(f"🔭 [OTEL] Instrumentation active for {service_name}")
