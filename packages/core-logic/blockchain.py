import hashlib
import json
from datetime import datetime

class SumbandilaBlockchainSentinel:
    """
    Sovereign Blockchain Integrity Service.
    Generates and verifies tamper-proof credential hashes for institutions and professionals.
    """
    
    @staticmethod
    def generate_credential_hash(entity_data: dict) -> str:
        """
        Generates a SHA-256 hash 'fingerprint' for a verified entity.
        Includes timestamp and entity-specific fields to ensure uniqueness.
        """
        # Canonicalize the data
        payload = {
            "name": entity_data.get("name"),
            "reg_number": entity_data.get("reg_number"),
            "authority": entity_data.get("authority"),
            "verification_date": datetime.utcnow().strftime("%Y-%m-%d")
        }
        
        encoded_data = json.dumps(payload, sort_keys=True).encode('utf-8')
        blockchain_hash = hashlib.sha256(encoded_data).hexdigest()
        
        return f"0x{blockchain_hash}"

    @staticmethod
    def verify_integrity(entity_data: dict, provided_hash: str) -> bool:
        """
        Verifies if the provided hash matches the current entity state.
        Ensures credentials haven't been tampered with.
        """
        calculated_hash = SumbandilaBlockchainSentinel.generate_credential_hash(entity_data)
        return calculated_hash == provided_hash

if __name__ == "__main__":
    # Demo logic
    sentinel = SumbandilaBlockchainSentinel()
    entity = {
        "name": "University of Johannesburg",
        "reg_number": "UJ-2026-X",
        "authority": "DHET"
    }
    h = sentinel.generate_credential_hash(entity)
    print(f"Generated Blockchain Fingerprint: {h}")
