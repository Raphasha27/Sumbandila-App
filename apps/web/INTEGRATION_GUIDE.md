# jspdf & DOMPurify Integration Guide

## Overview
This guide explains how `jspdf` and `dompurify` have been integrated into the Sumbandila web application.

## What Was Added

### 1. Dependencies (package.json)
- **jspdf v4.2.1**: PDF generation library
- **dompurify v3.4.0**: HTML sanitization library

### 2. Utility Files

#### `/apps/web/src/utils/certificateGenerator.ts`
TypeScript utility for generating professional PDF certificates:
- `generateCertificatePDF()`: Full A4 certificate with blockchain hash
- `generateVerificationReceipt()`: Compact receipt format (80x120mm)

#### `/apps/web/src/utils/inputSanitizer.ts`
TypeScript utility for input sanitization:
- `sanitizeInput()`: Basic XSS protection
- `sanitizeSearchQuery()`: Search-specific validation
- `sanitizeHTML()`: Safe HTML content rendering
- `sanitizeURL()`: URL validation and sanitization
- `escapeHTML()`: Simple HTML escaping

### 3. Web Dashboard Integration (`/apps/web/index.html`)

#### Security Features
✅ **Input Sanitization**: All user inputs are sanitized with DOMPurify
✅ **XSS Protection**: Malicious patterns detected and blocked
✅ **SQL Injection Prevention**: Special characters filtered
✅ **Length Validation**: Max 200 characters for search queries

#### PDF Generation Features
✅ **Certificate Download**: Full A4 PDF certificate with:
  - Sumbandila branding (sovereign blue)
  - Blockchain integrity hash
  - Sentinel signature
  - Verification URL
  - Professional layout with watermark

✅ **Receipt Download**: Compact verification receipt with:
  - Essential verification details
  - Blockchain fingerprint
  - Timestamp and registration info

## How to Use

### Installation
```bash
npm install
# or
yarn install
```

### Testing the Integration

1. **Open the web dashboard**:
   ```bash
   npm run dev:web
   ```

2. **Test Input Sanitization**:
   - Try entering malicious input: `<script>alert('xss')</script>`
   - The system will block it and show an error message

3. **Test PDF Generation**:
   - Search for "Jane Smith"
   - Click "📄 Download Certificate PDF" for full certificate
   - Click "🎫 Download Receipt" for compact receipt

### Using Utilities in React Components

```typescript
import { sanitizeSearchQuery } from './utils/inputSanitizer';
import { generateCertificatePDF } from './utils/certificateGenerator';

// Sanitize user input
const validation = sanitizeSearchQuery(userInput);
if (!validation.isValid) {
  showError(validation.error);
  return;
}

// Generate PDF certificate
generateCertificatePDF({
  certificate_id: 'CERT-123456',
  issued_to: 'Dr Jane Smith',
  registration: 'HPCSA-12345',
  timestamp: new Date().toISOString(),
  blockchain_fingerprint: '0x7f92...',
  sentinel_signature: '0x8a3b...',
  official_url: 'https://sumbandila.gov.za/verify/123456',
  profession: 'Medical Practitioner',
  authority: 'HPCSA'
});
```

## Security Benefits

### DOMPurify Protection
- ✅ Blocks XSS attacks
- ✅ Removes malicious scripts
- ✅ Sanitizes HTML content
- ✅ Validates URLs
- ✅ Prevents injection attacks

### Input Validation Layers
1. **DOMPurify sanitization**: Removes dangerous HTML/JS
2. **Pattern matching**: Detects SQL injection attempts
3. **Length limits**: Prevents buffer overflow attacks
4. **Type validation**: Ensures correct data formats

## PDF Certificate Features

### Design Elements
- Professional A4 layout
- Sumbandila sovereign blue branding
- SENTINEL watermark
- Dual border design
- Blockchain hash display
- Cryptographic signature
- Verification URL

### Certificate Data
- Certificate ID (unique)
- Issued to (professional name)
- Registration number
- Issue timestamp
- Blockchain fingerprint
- Sentinel signature
- Official verification URL

## Next Steps

1. **Install dependencies**: Run `npm install`
2. **Test locally**: Open `apps/web/index.html` in browser
3. **Integrate with backend**: Connect to actual API endpoints
4. **Add to React app**: Use TypeScript utilities in components
5. **Customize design**: Modify colors/layout in certificate generator

## Troubleshooting

### Dependencies not installing
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### PDF not downloading
- Check browser console for errors
- Verify jspdf is loaded from CDN
- Ensure certificate data is populated

### Sanitization blocking valid input
- Review DOMPurify configuration
- Adjust allowed tags/attributes
- Check malicious pattern regex

## API Reference

### CertificateGenerator

```typescript
interface CertificateData {
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

generateCertificatePDF(data: CertificateData): void
generateVerificationReceipt(data: ReceiptData): void
```

### InputSanitizer

```typescript
sanitizeInput(input: string): string
sanitizeSearchQuery(query: string): { sanitized: string; isValid: boolean; error?: string }
sanitizeHTML(html: string): string
sanitizeURL(url: string): { sanitized: string; isValid: boolean }
escapeHTML(text: string): string
```

## License
Part of Sumbandila Digital Trust Platform v4.0
