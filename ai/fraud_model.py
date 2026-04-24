import numpy as np # type: ignore
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import joblib # type: ignore
import os

class SumbandilaFraudEngine:
    """
    Sumbandila AI Fraud Detection Engine (v4.0.0)
    Uses a RandomForestClassifier to score the legitimacy of institutions/professionals.
    """
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.le = LabelEncoder()
        self.is_trained = False

    def preprocess_data(self, df):
        """
        Features used:
        - age_of_institution: Years since registration
        - has_physical_address: 1 if yes, 0 if no
        - authority_verified: 1 if linked to DHET/HPCSA, 0 otherwise
        - complaint_count: Number of reports in the vault
        - domain_match: 1 if email domain matches institution name
        """
        # Example preprocessing logic
        df['authority_verified'] = df['authority_verified'].astype(int)
        df['has_physical_address'] = df['has_physical_address'].astype(int)
        return df

    def train(self, data_path):
        if not os.path.exists(data_path):
            print(f"Error: Training data not found at {data_path}")
            return

        df = pd.read_csv(data_path)
        X = self.preprocess_data(df[['age_of_institution', 'has_physical_address', 'authority_verified', 'complaint_count']])
        y = df['is_fraudulent']

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        print("Training Sumbandila Fraud Sentinel...")
        self.model.fit(X_train, y_train)
        self.is_trained = True
        
        accuracy = self.model.score(X_test, y_test)
        print(f"Model trained with {accuracy*100:.2f}% accuracy.")
        
        # Save model
        joblib.dump(self.model, 'ai/fraud_model.pkl')

    def predict_trust_score(self, features):
        """
        Returns a trust score from 0-100.
        """
        if not self.is_trained:
            # Load model if available
            if os.path.exists('ai/fraud_model.pkl'):
                self.model = joblib.load('ai/fraud_model.pkl')
                self.is_trained = True
            else:
                return 50.0 # Default neutral score

        # predict_proba returns [prob_legit, prob_fraud]
        # Trust score = prob_legit * 100
        prob = self.model.predict_proba([features])[0]
        trust_score = prob[0] * 100
        return round(trust_score, 2)

if __name__ == "__main__":
    # Self-test logic
    engine = SumbandilaFraudEngine()
    print("Sumbandila AI Engine Initialized.")
    # In a real scenario, we would call engine.train('data/verified_registry_v4.csv')
