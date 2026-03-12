"""
AI Fraud Detection Model — V4
Uses RandomForestClassifier trained on synthetic fraud signals.
In production, replace training_data.csv with real audit records.
"""
import os

try:
    import pandas as pd
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.model_selection import train_test_split
    import joblib

    MODEL_PATH = os.path.join(os.path.dirname(__file__), "fraud_model.pkl")

    def train_model():
        """Train on synthetic data and persist the model."""
        # Synthetic training data — replace with real registry audit exports
        data = pd.DataFrame({
            "license_valid": [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            "domain_age_days": [1800, 12, 2200, 7, 900, 5, 3000, 30, 1500, 3],
            "complaints": [0, 5, 0, 12, 1, 8, 0, 15, 0, 20],
            "registry_match": [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            "has_physical_address": [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            "fraud": [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        })
        X = data.drop("fraud", axis=1)
        y = data["fraud"]
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X_train, y_train)
        joblib.dump(model, MODEL_PATH)
        print(f"✅ Fraud model trained. Accuracy on test set: {model.score(X_test, y_test):.2f}")
        return model

    def load_model():
        if os.path.exists(MODEL_PATH):
            return joblib.load(MODEL_PATH)
        return train_model()

    def predict_fraud(license_valid: int, domain_age_days: int, complaints: int,
                      registry_match: int, has_physical_address: int) -> dict:
        """
        Returns a fraud probability (0 = legitimate, 1 = fraudulent).
        """
        model = load_model()
        features = [[license_valid, domain_age_days, complaints, registry_match, has_physical_address]]
        prob = model.predict_proba(features)[0][1]  # Probability of being fraudulent
        return {
            "fraud_probability": round(prob, 3),
            "trust_score": round((1 - prob) * 100),
            "prediction": "FRAUDULENT" if prob > 0.5 else "LEGITIMATE",
        }

except ImportError:
    # Graceful fallback if scikit-learn is not installed
    def predict_fraud(**kwargs) -> dict:
        return {
            "fraud_probability": 0.0,
            "trust_score": 90,
            "prediction": "LEGITIMATE",
            "note": "scikit-learn not installed — install with: pip install scikit-learn pandas joblib",
        }
