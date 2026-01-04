
// Real South African Institutions (Fallback Data)
// Real South African Institutions (Fallback Data)
const institutions = [
    { institution_id: 'UP001', name: 'University of Pretoria', status: true, address: 'Pretoria, Gauteng', details: 'Public research university established in 1908', accreditation: 'CHE Accredited', courses: ['Engineering', 'Law', 'Medicine'] },
    { institution_id: 'WITS001', name: 'University of the Witwatersrand', status: true, address: 'Johannesburg, Gauteng', details: 'Leading research-intensive university', accreditation: 'CHE Accredited', courses: ['Arts', 'Science', 'Commerce'] },
    { institution_id: 'UNISA001', name: 'University of South Africa (UNISA)', status: true, address: 'Pretoria, Gauteng', details: 'Largest open distance learning institution in Africa', accreditation: 'CHE Accredited', courses: ['IT', 'Business', 'Education'] },
    // Adding suspicious one for AI Fraud Detector testing
    { institution_id: 'FAKE001', name: 'Global Online Excellence Academy', status: false, address: 'Online Only', details: 'Flagged: Non-accredited institution issuing fake degrees', riskScore: 95 }
];

// South African Medical Professionals (MedCheck SA)
const doctors = [
    { professional_id: 'MP001234', name: 'Dr. Thabo Mthembu', type: 'doctor', status: true, specialty: 'General Practice', details: 'HPCSA Registered - Cape Town', licenseExpiry: '2026-03-31', malpracticeAlerts: 0 },
    { professional_id: 'MP002345', name: 'Dr. Naledi Khumalo', type: 'doctor', status: true, specialty: 'Pediatrics', details: 'HPCSA Registered - Johannesburg', licenseExpiry: '2027-01-15', malpracticeAlerts: 0 },
    { professional_id: 'FAKE_DOC', name: 'Dr. James Scam', type: 'doctor', status: false, specialty: 'None', details: 'Warning: Not found in HPCSA database', malpracticeAlerts: 5 }
];

// South African Legal Professionals (LegalVerify)
const lawyers = [
    { professional_id: 'LP101234', name: 'Adv. Themba Mahlangu', type: 'lawyer', status: true, specialty: 'Corporate Law', details: 'Law Society Registered - Johannesburg', yearsOfPractice: 15, disciplinaryStatus: 'Clear' },
    { professional_id: 'LP102345', name: 'Adv. Michelle du Plessis', type: 'lawyer', status: true, specialty: 'Criminal Law', details: 'Law Society Registered - Cape Town', yearsOfPractice: 8, disciplinaryStatus: 'Clear' }
];

// Construction & Engineering (BuildSafe Africa)
const contractors = [
    { professional_id: 'CIDB7788', name: 'Mokoka Constructions', type: 'contractor', status: true, details: 'CIDB Grade 7PE', specialty: 'Civil Engineering', safetyRating: 'A+', location: 'Pretoria' },
    { professional_id: 'ECSA1122', name: 'Tumi Nkosi', type: 'engineer', status: true, details: 'ECSA Registered Professional Engineer', specialty: 'Structural', location: 'Johannesburg' }
];

// Transport & Drivers (RideCheck)
const drivers = [
    { professional_id: 'TX4455', name: 'Jackson Zulu', type: 'driver', status: true, details: 'Verified PDP Holder', vehicleReg: 'GP 123 456', roadworthiness: 'Valid', criminalRecord: 'Clear' },
    { professional_id: 'TX8899', name: 'Sipho Khumalo', type: 'driver', status: true, details: 'Bolt/Uber Verified', vehicleReg: 'CA 998 776', roadworthiness: 'Valid', criminalRecord: 'Clear' }
];

// Government & Private Tenders (TenderShield)
const companies = [
    { professional_id: 'REG9988', name: 'AfroTech Solutions', type: 'company', status: true, details: 'Tax Compliant - CSD Verified', beeLevel: 1, directors: ['John Doe', 'Jane Smith'], taxStatus: 'Compliant' },
    { professional_id: 'REG1122', name: 'BuildSouth Ltd', type: 'company', status: true, details: 'BEE Level 2 - CSD Verified', beeLevel: 2, directors: ['Peter Parker'], taxStatus: 'Compliant' }
];

// Pan-African Data
const panAfrican = [
    { country: 'Kenya', entity: 'University of Nairobi', type: 'school', status: true },
    { country: 'Nigeria', entity: 'Lagos University Hospital', type: 'medical', status: true },
    { country: 'Botswana', entity: 'University of Botswana', type: 'school', status: true }
];

module.exports = { institutions, doctors, lawyers, contractors, drivers, companies, panAfrican };
