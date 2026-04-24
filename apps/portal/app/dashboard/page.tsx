'use client';

import React, { useState } from 'react';
import { Search, Download, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { jsPDF } from 'jspdf';
import DOMPurify from 'dompurify';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = DOMPurify.sanitize(searchQuery);
    
    if (!cleanQuery) return;

    setIsVerifying(true);
    // Simulate API call
    setTimeout(() => {
      setResult({
        id: 'SENTINEL-X92-2026',
        name: 'Dr. Koketso Raphasha',
        profession: 'Digital Infrastructure Architect',
        status: 'VERIFIED',
        timestamp: new Date().toISOString(),
        blockchain_hash: '0x7f2b...9a1e'
      });
      setIsVerifying(false);
    }, 1500);
  };

  const downloadCertificate = () => {
    if (!result) return;
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(0, 51, 102); // Sovereign Blue
    doc.text('SUMBANDILA REGISTRY SENTINEL', 20, 20);
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Digital Integrity Certificate', 20, 40);
    
    doc.setFontSize(12);
    doc.text(`Certificate ID: ${result.id}`, 20, 60);
    doc.text(`Issued To: ${result.name}`, 20, 70);
    doc.text(`Profession: ${result.profession}`, 20, 80);
    doc.text(`Status: ${result.status}`, 20, 90);
    doc.text(`Blockchain Hash: ${result.blockchain_hash}`, 20, 100);
    doc.text(`Verification Date: ${result.timestamp}`, 20, 110);
    
    doc.save(`Sumbandila_Cert_${result.id}.pdf`);
  };

  return (
    <div className="dashboard-container">
      <header className="dash-header">
        <h1>Sentinel Dashboard</h1>
        <p>Access the global trust layer and verify institutional credentials.</p>
      </header>

      <section className="search-section glass-card">
        <form onSubmit={handleSearch} className="search-form">
          <div className="input-wrapper">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search by name, ID, or registration number..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={isVerifying}>
            {isVerifying ? 'Verifying...' : 'Search Sentinel'}
          </button>
        </form>
      </section>

      {result && (
        <section className="result-section glass-card animate-fade-in">
          <div className="result-header">
            <div className="status-badge verified">
              <CheckCircle size={18} /> {result.status}
            </div>
            <h3>Verification Found</h3>
          </div>
          
          <div className="result-details">
            <div className="detail-row">
              <span className="label">Name:</span>
              <span className="value">{result.name}</span>
            </div>
            <div className="detail-row">
              <span className="label">Profession:</span>
              <span className="value">{result.profession}</span>
            </div>
            <div className="detail-row">
              <span className="label">Blockchain Fingerprint:</span>
              <span className="value code">{result.blockchain_hash}</span>
            </div>
          </div>

          <div className="action-group">
            <button onClick={downloadCertificate} className="btn-primary outline">
              <Download size={18} /> Download Certificate
            </button>
            <button className="btn-secondary">
              <FileText size={18} /> View Audit Log
            </button>
          </div>
        </section>
      )}

      <style jsx>{`
        .dashboard-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .dash-header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        .dash-header p {
          opacity: 0.8;
        }
        .search-form {
          display: flex;
          gap: 1rem;
        }
        .input-wrapper {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-icon {
          position: absolute;
          left: 1rem;
          color: #ffffff;
          opacity: 0.5;
        }
        input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          padding: 1rem 1rem 1rem 3rem;
          border-radius: 12px;
          color: #ffffff;
          font-size: 1rem;
        }
        input:focus {
          outline: none;
          border-color: var(--sovereign-accent);
          background: rgba(255, 255, 255, 0.1);
        }
        .result-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: row-reverse;
        }
        .status-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.85rem;
        }
        .status-badge.verified {
          background: rgba(0, 255, 170, 0.1);
          color: #00ffaa;
          border: 1px solid rgba(0, 255, 170, 0.2);
        }
        .result-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--glass-border);
        }
        .detail-row .label {
          opacity: 0.7;
        }
        .detail-row .value {
          font-weight: 600;
        }
        .value.code {
          font-family: monospace;
          color: var(--sovereign-accent);
        }
        .action-group {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        .btn-primary.outline {
          background: transparent;
          border: 1px solid var(--sovereign-accent);
          color: var(--sovereign-accent);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-primary.outline:hover {
          background: rgba(0, 170, 255, 0.1);
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
