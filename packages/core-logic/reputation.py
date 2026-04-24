class SumbandilaReputationEngine:
    """
    Sovereign Reputation & Trust Scoring Engine.
    Combines AI fraud scores with administrative verification signals.
    """
    
    def calculate_score(self, analytics_data: dict) -> dict:
        """
        Calculates a final trust score (0-100).
        Inputs: 
            - ai_fraud_score (0.0 - 1.0)
            - years_active (int)
            - is_authorized (bool)
            - complaint_count (int)
        """
        ai_fraud_score = analytics_data.get("ai_fraud_score", 0.5)
        years_active = analytics_data.get("years_active", 0)
        is_authorized = analytics_data.get("is_authorized", False)
        complaint_count = analytics_data.get("complaint_count", 0)

        # Baseline: Start with AI legitimacy probability
        # (1 - fraud_score) * 60 (base weight)
        base_score = (1 - ai_fraud_score) * 60
        
        # Authority Bonus
        auth_bonus = 30 if is_authorized else 0
        
        # Tenure Bonus (Max 10 points)
        tenure_bonus = min(years_active, 10)
        
        # Complaint Penalty (Each complaint -5 points)
        penalty = complaint_count * 5
        
        final_score = base_score + auth_bonus + tenure_bonus - penalty
        
        # Clamp between 0 and 100
        final_score = max(0, min(100, final_score))
        
        return {
            "trust_score": round(final_score, 2),
            "risk_label": self.get_risk_label(final_score),
            "signals": {
                "ai_legitimacy": f"{round((1-ai_fraud_score)*100, 1)}%",
                "authority_verified": is_authorized,
                "tenure_years": years_active,
                "active_complaints": complaint_count
            }
        }

    def get_risk_label(self, score: float) -> str:
        if score >= 85: return "LOW — Appears Legitimate"
        if score >= 60: return "MEDIUM — Exercise Caution"
        if score >= 40: return "HIGH — Potential Fraud"
        return "EXTREME — Verified Risk"

if __name__ == "__main__":
    engine = SumbandilaReputationEngine()
    result = engine.calculate_score({
        "ai_fraud_score": 0.05,
        "years_active": 12,
        "is_authorized": True,
        "complaint_count": 0
    })
    print(f"Final Trust Profile: {result}")
