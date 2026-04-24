import { jsPDF } from 'jspdf';

export interface CertificateData {
  certificate_id: string;
  issued_to: string;
  registration: string;
  timestamp: string;
  blockchain_fingerprint: string;
  sentinel_signature: string;
  official_url: string;
  profession?: string;
  authority?: string;
  status?: string;
}

/**
 * Generates a professional PDF certificate using jsPDF
 * Matches the Sumbandila design system with sovereign blue branding
 */
export const generateCertificatePDF = (data: CertificateData): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);

  // Background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Border
  doc.setDrawColor(0, 45, 98); // Sovereign Blue
  doc.setLineWidth(2);
  doc.rect(margin, margin, contentWidth, pageHeight - (margin * 2));

  // Inner border
  doc.setLineWidth(0.5);
  doc.rect(margin + 3, margin + 3, contentWidth - 6, pageHeight - (margin * 2) - 6);

  // Watermark
  doc.setTextColor(88, 166, 255, 0.05);
  doc.setFontSize(80);
  doc.setFont('helvetica', 'bold');
  doc.text('SENTINEL', pageWidth / 2, pageHeight / 2, {
    align: 'center',
    angle: 45
  });

  // Header Section
  doc.setTextColor(0, 45, 98);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('SUMBANDILA', pageWidth / 2, margin + 25, { align: 'center' });

  doc.setTextColor(139, 148, 158);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Sovereign Registry Certificate', pageWidth / 2, margin + 35, { align: 'center' });

  // Status Badge
  const statusY = margin + 50;
  doc.setFillColor(63, 185, 80, 0.1);
  doc.roundedRect(pageWidth / 2 - 40, statusY - 5, 80, 12, 3, 3, 'F');
  doc.setTextColor(63, 185, 80);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('✓ VERIFIED & REGISTERED', pageWidth / 2, statusY + 2, { align: 'center' });

  // Certificate Content
  let currentY = margin + 75;

  // Name
  doc.setTextColor(36, 41, 46);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(data.issued_to, pageWidth / 2, currentY, { align: 'center' });
  currentY += 10;

  // Profession/Authority
  if (data.profession) {
    doc.setTextColor(88, 166, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(data.profession, pageWidth / 2, currentY, { align: 'center' });
    currentY += 8;
  }

  if (data.authority) {
    doc.setTextColor(139, 148, 158);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(data.authority, pageWidth / 2, currentY, { align: 'center' });
    currentY += 15;
  }

  // Description
  doc.setTextColor(36, 41, 46);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const description = 'This certificate serves as digital proof that the individual listed above is currently in good standing with the National Sovereignty Registry of South Africa.';
  const descLines = doc.splitTextToSize(description, contentWidth - 20);
  doc.text(descLines, pageWidth / 2, currentY, { align: 'center' });
  currentY += descLines.length * 6 + 10;

  // Blockchain Hash Section
  doc.setFillColor(246, 248, 250);
  doc.roundedRect(margin + 10, currentY, contentWidth - 20, 25, 3, 3, 'F');
  
  doc.setTextColor(139, 148, 158);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('BLOCKCHAIN INTEGRITY HASH', margin + 15, currentY + 7);
  
  doc.setTextColor(36, 41, 46);
  doc.setFontSize(9);
  doc.setFont('courier', 'normal');
  const hashText = data.blockchain_fingerprint;
  const hashLines = doc.splitTextToSize(hashText, contentWidth - 30);
  doc.text(hashLines, margin + 15, currentY + 14);
  currentY += 35;

  // Certificate Details Grid
  doc.setTextColor(139, 148, 158);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Certificate ID:', margin + 15, currentY);
  doc.text('Issued:', margin + 15 + (contentWidth / 2), currentY);

  doc.setTextColor(36, 41, 46);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(data.certificate_id, margin + 15, currentY + 6);
  doc.text(new Date(data.timestamp).toLocaleDateString('en-ZA', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }), margin + 15 + (contentWidth / 2), currentY + 6);

  currentY += 20;

  // Sentinel Signature
  doc.setFillColor(246, 248, 250);
  doc.roundedRect(margin + 10, currentY, contentWidth - 20, 20, 3, 3, 'F');
  
  doc.setTextColor(139, 148, 158);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('SENTINEL SIGNATURE', margin + 15, currentY + 7);
  
  doc.setTextColor(36, 41, 46);
  doc.setFontSize(8);
  doc.setFont('courier', 'normal');
  doc.text(data.sentinel_signature, margin + 15, currentY + 14);

  // Footer
  const footerY = pageHeight - margin - 20;
  doc.setDrawColor(225, 228, 232);
  doc.setLineWidth(0.5);
  doc.line(margin + 10, footerY, pageWidth - margin - 10, footerY);

  doc.setTextColor(139, 148, 158);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Verification URL: ${data.official_url}`, pageWidth / 2, footerY + 8, { align: 'center' });
  doc.text('© 2026 Sumbandila Registry Sentinel | Sovereign Digital Trust Platform', pageWidth / 2, footerY + 14, { align: 'center' });

  // Save the PDF
  const fileName = `Sumbandila_Certificate_${data.certificate_id}.pdf`;
  doc.save(fileName);
};

/**
 * Generates a simplified verification receipt (smaller format)
 */
export const generateVerificationReceipt = (data: {
  name: string;
  registration: string;
  trust_score: number;
  blockchain_hash: string;
  verified_at: string;
}): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [80, 120] // Receipt size
  });

  const width = doc.internal.pageSize.getWidth();
  let y = 10;

  // Header
  doc.setFillColor(0, 45, 98);
  doc.rect(0, 0, width, 20, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('SUMBANDILA', width / 2, y + 5, { align: 'center' });
  
  doc.setFontSize(8);
  doc.text('Verification Receipt', width / 2, y + 11, { align: 'center' });

  y = 30;

  // Content
  doc.setTextColor(36, 41, 46);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Verified Entity:', 5, y);
  y += 6;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text(data.name, 5, y);
  y += 8;

  doc.setFontSize(9);
  doc.setTextColor(139, 148, 158);
  doc.text(`Registration: ${data.registration}`, 5, y);
  y += 6;
  doc.text(`Trust Score: ${data.trust_score}%`, 5, y);
  y += 6;
  doc.text(`Verified: ${new Date(data.verified_at).toLocaleString()}`, 5, y);
  y += 10;

  // Hash
  doc.setFillColor(246, 248, 250);
  doc.rect(5, y, width - 10, 15, 'F');
  doc.setFontSize(7);
  doc.setFont('courier', 'normal');
  doc.setTextColor(36, 41, 46);
  const hashLines = doc.splitTextToSize(data.blockchain_hash, width - 15);
  doc.text(hashLines, 7, y + 4);

  y += 20;
  doc.setFontSize(8);
  doc.setTextColor(139, 148, 158);
  doc.text('Scan QR to verify online', width / 2, y, { align: 'center' });

  doc.save(`Verification_Receipt_${data.name.replace(/\s+/g, '_')}.pdf`);
};
