const crypto = require('crypto');
// In a real implementation, you would require 'pdfkit' or similar
// const PDFDocument = require('pdfkit');

class CertificateService {
    
    /**
     * Generates a deterministic SHA-256 hash for a certificate record.
     * This hash acts as the unique "fingerprint" of the document.
     * Changing even one character in the data will result in a completely different hash.
     * 
     * @param {Object} data - The certificate data (student name, course, dates, institution)
     * @returns {String} - Hex string of the hash
     */
    static generateHash(data) {
        // Sort keys to ensure deterministic output regardless of object property order
        const sortedData = Object.keys(data).sort().reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {});

        const dataString = JSON.stringify(sortedData);
        return crypto.createHash('sha256').update(dataString).digest('hex');
    }

    /**
     * Signs the certificate hash with a private key (RSA-SHA256).
     * This proves WHO issued the certificate (Authentication) and that it hasn't changed (Integrity).
     * 
     * @param {String} certificateHash - The SHA-256 hash of the certificate
     * @param {String} privateKeyPEM - The issuer's private key
     * @returns {String} - Base64 encoded signature
     */
    static signCertificate(certificateHash, privateKeyPEM) {
        if (!privateKeyPEM) {
            throw new Error('Issuer private key is required for signing');
        }
        
        const sign = crypto.createSign('SHA256');
        sign.update(certificateHash);
        sign.end();
        
        return sign.sign(privateKeyPEM, 'base64');
    }

    /**
     * Verifies a digital signature against a certificate hash and public key.
     * 
     * @param {String} certificateHash 
     * @param {String} signature 
     * @param {String} publicKeyPEM 
     * @returns {Boolean}
     */
    static verifySignature(certificateHash, signature, publicKeyPEM) {
        const verify = crypto.createVerify('SHA256');
        verify.update(certificateHash);
        verify.end();
        return verify.verify(publicKeyPEM, signature, 'base64');
    }

    /**
     * (Placeholder) Generates a PDF buffer for the certificate.
     * In a full env, this would use PDFKit to draw the text, borders, and QR code.
     */
    static async generatePDF(data, qrCodeDataURL) {
        // Mocking PDF generation delay
        return new Promise(resolve => {
            setTimeout(() => {
                // Return a dummy buffer
                resolve(Buffer.from(`%PDF-1.4 ... Content: Verified Certificate for ${data.studentName} ...`));
            }, 100);
        });
    }
}

module.exports = CertificateService;
