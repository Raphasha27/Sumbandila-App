"""
Core Verification Engine — the heart of the Sumbandila platform.

Search priority:
1. Exact registration number match
2. Fuzzy name match across institutions and professionals
3. Risk assessment based on status
4. Multilingual response labels
5. Audit log every query
"""
import hashlib
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from ..models.institution import Institution
from ..models.professional import Professional
from ..models.verification import VerificationLog
from .fraud_detection import compute_fraud_score, FraudSignals


def _credential_hash(name: str, reg_number: str, authority: str) -> str:
    """
    Generates a tamper-proof SHA-256 hash of the credential.
    V4 blockchain-ready: this hash can be stored on-chain for immutable proof.
    """
    payload = f"{name}:{reg_number}:{authority}".encode()
    return f"0x{hashlib.sha256(payload).hexdigest()[:40]}"



    "en": {
        "verified": "✅ Verified & Registered",
        "deregistered": "🚫 Deregistered - DO NOT TRUST",
        "suspended": "⚠️ Suspended - Verify Before Engaging",
        "not_found": "❓ Not Found in National Registry",
        "high_risk": "🚨 HIGH RISK - Possible Fraud",
    },
    "zu": {
        "verified": "✅ Igunyazwe futhi Yabhaliswa",
        "deregistered": "🚫 Ikhishiwe - UNGAKHOLWA",
        "suspended": "⚠️ Imisiwe - Hlola Ngaphambi Kokuqhubeka",
        "not_found": "❓ Akutholakali Kurejista Kazwelonke",
        "high_risk": "🚨 INGOZI EPHEZULU - Ukukhohlisa Okungenzeka",
    },
    "af": {
        "verified": "✅ Geverifieer en Geregistreer",
        "deregistered": "🚫 Gederegistreer - MOENIE VERTROU NIE",
        "suspended": "⚠️ Opgeskort - Verifieer Voor Betrokkenheid",
        "not_found": "❓ Nie Gevind in Nasionale Register",
        "high_risk": "🚨 HOËrisiko - Moontlike Bedrog",
    },
    "nso": {
        "verified": "✅ E Netefaditšwe le Go Ngwadiša",
        "not_found": "❓ Ga e Hwetšagale go Rejistara ya Naga",
        "high_risk": "🚨 KOTSI YA GODIMO - Go Bolela Boka",
    },
    "ts": {
        "verified": "✅ Ku Tivekisiwa no ku Nghenisiwa",
        "not_found": "❓ A Ku Kumiwi eka Rijista ra Rixaka",
        "high_risk": "🚨 XIPHIQO XA LE HENHLA - Ku Khohlisa Loku Nga Kumeka",
    },
}


def _get_label(status: str, lang: str = "en") -> str:
    lang_map = TRANSLATIONS.get(lang, TRANSLATIONS["en"])
    status_lower = (status or "").lower()
    if "active" in status_lower or "practising" in status_lower or "good standing" in status_lower:
        return lang_map.get("verified", TRANSLATIONS["en"]["verified"])
    if "deregist" in status_lower or "struck off" in status_lower:
        return lang_map.get("deregistered", TRANSLATIONS["en"]["deregistered"])
    if "suspend" in status_lower or "revoked" in status_lower:
        return lang_map.get("suspended", TRANSLATIONS["en"]["suspended"])
    return lang_map.get("not_found", TRANSLATIONS["en"]["not_found"])


def _hash_ip(ip: str) -> str:
    """Hash the IP address for privacy-preserving audit logs."""
    return hashlib.sha256(ip.encode()).hexdigest()


def verify_entity(
    query: str,
    db: Session,
    lang: str = "en",
    requester_ip: str = "unknown"
) -> dict:
    """
    Search institutions then professionals for the given query.
    Logs every search attempt for audit compliance.
    Returns a structured result dict with risk assessment.
    """
    result = {"status": "not_found", "query": query}
    result_type = "not_found"
    result_name = None
    result_status = None
    risk_level = None

    # 1. Exact registration number match (fastest path)
    inst = db.query(Institution).filter(
        Institution.registration_number.ilike(query)
    ).first()

    # 2. Fuzzy name match for institutions
    if not inst:
        inst = db.query(Institution).filter(
            Institution.name.ilike(f"%{query}%")
        ).first()

    if inst:
        status_label = _get_label(inst.status.value, lang)
        result = {
            "type": "institution",
            "category": inst.category,
            "name": inst.name,
            "institution_type": inst.institution_type,
            "registration_number": inst.registration_number,
            "authority": inst.authority,
            "status": inst.status.value,
            "status_label": status_label,
            "risk": inst.risk.value,
            "nqf_level": inst.nqf_level,
            "saqa_id": inst.saqa_id,
            "province": inst.province,
            "website": inst.website,
            "warning": inst.warning,
            "is_flagged": inst.is_flagged,
            "qr_code_url": inst.qr_code_url,
            "verified_at": inst.verified_at.isoformat() if inst.verified_at else None,
        }
        # Compute fraud score and trust score (V3/V4)
        fraud_result = compute_fraud_score(FraudSignals(
            entity_name=inst.name,
            status=inst.status.value,
            website=inst.website,
            physical_address=inst.physical_address,
            registration_number=inst.registration_number,
            is_flagged=inst.is_flagged,
        ))
        trust_score = round((1 - fraud_result["fraud_score"]) * 100)
        result.update({
            "trust_score": trust_score,
            "fraud_score": fraud_result["fraud_score"],
            "risk_label": fraud_result["risk_label"],
            "signals_triggered": fraud_result["signals_triggered"],
            "blockchain_hash": _credential_hash(inst.name, inst.registration_number or "", inst.authority or ""),
            "identity_verified": inst.status.value == "Active",
        })
    else:
        # 3. Search professionals — registration number first
        prof = db.query(Professional).filter(
            Professional.registration_number.ilike(query)
        ).first()

        if not prof:
            prof = db.query(Professional).filter(
                Professional.full_name.ilike(f"%{query}%")
            ).first()

        if prof:
            status_label = _get_label(prof.status or "", lang)
            result = {
                "type": prof.profession,
                "name": prof.full_name,
                "profession": prof.profession,
                "registration_number": prof.registration_number,
                "hpcsa_number": prof.hpcsa_number,
                "lpc_number": prof.lpc_number,
                "authority": prof.authority,
                "status": prof.status,
                "status_label": status_label,
                "standing": prof.standing,
                "fidelity_fund_status": prof.fidelity_fund_status,
                "specialisation": prof.specialisation,
                "hospital_affiliation": prof.hospital_affiliation,
                "province": prof.province,
                "risk": prof.risk,
                "warning": prof.warning,
                "is_flagged": prof.is_flagged,
                "qr_code_url": prof.qr_code_url,
            }
            # Compute fraud score and trust score (V3/V4)
            fraud_result = compute_fraud_score(FraudSignals(
                entity_name=prof.full_name,
                status=prof.status or "",
                website=None,
                physical_address=prof.practice_address,
                registration_number=prof.registration_number,
                is_flagged=prof.is_flagged,
            ))
            trust_score = round((1 - fraud_result["fraud_score"]) * 100)
            result.update({
                "trust_score": trust_score,
                "fraud_score": fraud_result["fraud_score"],
                "risk_label": fraud_result["risk_label"],
                "signals_triggered": fraud_result["signals_triggered"],
                "blockchain_hash": _credential_hash(prof.full_name, prof.registration_number or "", prof.authority or ""),
                "identity_verified": (prof.status or "").lower() in ("practising", "active", "good standing"),
            })
        else:
            result["status_label"] = _get_label("not_found", lang)
            risk_level = "Unknown"

    # 4. Audit log
    try:
        log = VerificationLog(
            query=query,
            result_type=result_type,
            result_name=result_name,
            result_status=result_status,
            risk_level=risk_level,
            ip_hash=_hash_ip(requester_ip),
            language=lang,
            searched_at=datetime.now(timezone.utc),
        )
        db.add(log)
        db.commit()
    except Exception:
        db.rollback()  # Never block search results due to logging failure

    return result
