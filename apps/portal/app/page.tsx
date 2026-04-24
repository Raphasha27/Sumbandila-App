import React from 'react';
import { Shield, Database, Lock, Globe, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="landing-content">
      <header className="hero section glass-card">
        <h1 className="gradient-text">🛡️ Sumbandila</h1>
        <h2>Sovereign Registry Sentinel</h2>
        <p className="subtitle">
          Building Africa's digital trust layer through AI-driven fraud detection and Blockchain integrity.
        </p>
        <div className="cta-group">
          <button className="btn-primary">
            Explore Registry <ArrowRight size={18} />
          </button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </header>

      <section className="features grid">
        <div className="feature-item glass-card">
          <Shield className="icon" color="#00aaff" />
          <h3>Identity Verification</h3>
          <p>Instant lookup of HPCSA, DHET, & SAQA data with cryptographic certainty.</p>
        </div>
        <div className="feature-item glass-card">
          <Database className="icon" color="#00aaff" />
          <h3>Fraud Detection</h3>
          <p>AI identification of risk patterns and ghost entities using Sentinel-AI logic.</p>
        </div>
        <div className="feature-item glass-card">
          <Lock className="icon" color="#00aaff" />
          <h3>Credential Hashing</h3>
          <p>Tamper-proof SHA-256 blockchain fingerprints for every verified record.</p>
        </div>
        <div className="feature-item glass-card">
          <Globe className="icon" color="#00aaff" />
          <h3>Pan-African Vision</h3>
          <p>Scaling digital trust across South Africa, Namibia, Botswana, and beyond.</p>
        </div>
      </section>

      <footer className="glass-card">
        <p>© 2026 Sumbandila Registry Sentinel · Powered by Kirov Dynamics</p>
      </footer>

      <style jsx>{`
        .landing-content {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          padding-top: 2rem;
        }
        .hero {
          text-align: center;
          padding: 5rem 2rem;
        }
        .hero h1 {
          font-size: 4rem;
          margin-bottom: 0.5rem;
        }
        .hero h2 {
          font-size: 2rem;
          opacity: 0.9;
        }
        .subtitle {
          font-size: 1.25rem;
          max-width: 700px;
          margin: 1.5rem auto 2.5rem;
          opacity: 0.8;
          line-height: 1.6;
        }
        .cta-group {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        .feature-item {
          text-align: left;
        }
        .feature-item .icon {
          margin-bottom: 1rem;
          width: 48px;
          height: 48px;
        }
        .btn-secondary {
          background: transparent;
          color: #ffffff;
          padding: 1rem 2rem;
          border-radius: 12px;
          border: 1px solid var(--glass-border);
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .btn-secondary:hover {
          background: var(--glass-bg);
        }
      `}</style>
    </main>
  );
}
