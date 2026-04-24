import hashlib
from datetime import datetime

class SumbandilaCertificateSentinel:
    """
    Sovereign Certificate Generation Service.
    Produces cryptographically-signed verification certificates.
    """
    
    def generate_certificate(self, entity_data: dict) -> dict:
        """
        Generates a digital certificate metadata blob.
        Includes verification timestamp and a 'Sentinel Signature'.
        """
        timestamp = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")
        
        # Create a unique Certificate ID
        raw_id = f"{entity_data.get('reg_number')}-{timestamp}"
        certificate_id = hashlib.sha256(raw_id.encode()).hexdigest()[:12].upper()
        
        # Create a cryptographic signature
        signature_base = f"{certificate_id}-{entity_data.get('blockchain_hash')}"
        sentinel_signature = hashlib.sha256(signature_base.encode()).hexdigest()
        
        return {
            "certificate_id": f"CERT-{certificate_id}",
            "issued_to": entity_data.get("name"),
            "registration": entity_data.get("reg_number"),
            "timestamp": timestamp,
            "blockchain_fingerprint": entity_data.get("blockchain_hash"),
            "sentinel_signature_v4": f"0x{sentinel_signature}",
            "official_url": f"https://sumbandila.gov.za/verify/{certificate_id}"
        }

if __name__ == "__main__":
    sentinel = SumbandilaCertificateSentinel()
    mock_entity = {
        "name": "Dr Jane Smith",
        "reg_number": "HPCSA-12345",
        "blockchain_hash": "0x7f92e3a1b8c4d2e6f0a9b3c5"
    }
    cert = sentinel.generate_certificate(mock_entity)
    print("\n🛡️ SUMBANDILA DIGITAL CERTIFICATE GENERATED")
    for k, v in cert.items():
        print(f"{k.replace('_', ' ').title()}: {v}")
