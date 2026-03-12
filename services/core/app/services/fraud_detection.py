"""
Fraud Detection Service — V2 AI Layer (rule-based engine, ML-ready)

Analyses signals to assign a fraud probability score to any search result.
Designed to be replaced/enhanced with an ML model (scikit-learn/FastText) later.
"""
from dataclasses import dataclass
from typing import Optional


@dataclass
class FraudSignals:
    entity_name: str
    status: Optional[str]
    website: Optional[str]
    physical_address: Optional[str]
    registration_number: Optional[str]
    is_flagged: bool = False
    complaint_count: int = 0
    registration_age_days: Optional[int] = None


SUSPICIOUS_KEYWORDS = [
    "global", "international certified", "accredited fast",
    "instant degree", "online only", "guaranteed pass",
    "two for one", "90 day certificate", "15 day",
    "gold", "inheritance", "upfront fee",
]

FAKE_DOMAIN_PATTERNS = [
    ".tk", ".ml", ".xyz", "free.nf", "wixsite", "weebly",
]


def compute_fraud_score(signals: FraudSignals) -> dict:
    """
    Returns a fraud probability score (0.0 – 1.0) and a list of triggered signals.
    0.0 = completely clean, 1.0 = almost certainly fraudulent.
    """
    score = 0.0
    triggered = []

    # Pre-flagged by admin
    if signals.is_flagged:
        score += 0.5
        triggered.append("Manually flagged by Sumbandila auditors")

    # No physical address
    if not signals.physical_address:
        score += 0.15
        triggered.append("No physical address provided")

    # No registration number
    if not signals.registration_number or "UNVERIFIED" in (signals.registration_number or ""):
        score += 0.2
        triggered.append("Missing or unverified registration number")

    # Suspicious name keywords
    name_lower = signals.entity_name.lower()
    for kw in SUSPICIOUS_KEYWORDS:
        if kw in name_lower:
            score += 0.1
            triggered.append(f"Suspicious keyword in name: '{kw}'")
            break

    # Deregistered / suspended status
    status_lower = (signals.status or "").lower()
    if "deregist" in status_lower or "struck off" in status_lower:
        score += 0.4
        triggered.append("Entity has been deregistered or struck off")
    elif "suspend" in status_lower:
        score += 0.25
        triggered.append("Entity registration is currently suspended")

    # Fake domain patterns
    website = signals.website or ""
    for pattern in FAKE_DOMAIN_PATTERNS:
        if pattern in website.lower():
            score += 0.15
            triggered.append(f"Website uses suspicious domain pattern: {pattern}")
            break

    # Citizen complaints
    if signals.complaint_count > 0:
        score += min(0.3, signals.complaint_count * 0.05)
        triggered.append(f"{signals.complaint_count} citizen complaint(s) on file")

    # Cap at 1.0
    score = min(score, 1.0)

    # Risk label
    if score >= 0.7:
        risk_label = "🚨 CRITICAL — Likely Fraudulent"
    elif score >= 0.4:
        risk_label = "⚠️ HIGH RISK — Proceed With Caution"
    elif score >= 0.2:
        risk_label = "🟡 MEDIUM — Verify Details Independently"
    else:
        risk_label = "✅ LOW — Appears Legitimate"

    return {
        "fraud_score": round(score, 2),
        "risk_label": risk_label,
        "signals_triggered": triggered,
        "review_recommended": score >= 0.4,
    }
