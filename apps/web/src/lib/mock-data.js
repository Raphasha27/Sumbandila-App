export const MOCK_DATA = {
  providers: [
    // Education (Accredited / Vetted)
    {
      id: "edu-1",
      name: "University of the Witwatersrand",
      category: "Education",
      type: "Public University",
      reg: "U-1922-GP-01",
      emisNumber: "700400001",
      status: "Registered",
      standing: "Good Standing",
      body: "DHET Recognized",
      saqaId: "98212",
      nqfLevel: "Level 7-10",
      council: "CHE",
      courses: ["Medicine", "Engineering", "Commerce", "Law"],
      validUntil: "2030-12-31",
      risk: "Low"
    },
    {
      id: "edu-3",
      name: "Boston City Campus",
      category: "Education",
      type: "Private HEI",
      reg: "2001/HE07/006 (DHET)",
      emisNumber: "P-882201",
      status: "Registered",
      standing: "Accredited",
      body: "CHE & QCTO Accredited",
      saqaId: "91754",
      nqfLevel: "Level 5-8",
      council: "CHE",
      courses: ["Business", "IT", "Media"],
      validUntil: "2026-12-31",
      risk: "Low"
    },
    // Education (High Risk / Recently Deregistered)
    {
      id: "edu-risk-101",
      name: "Damelin (various campuses)",
      category: "Education",
      type: "Private HEI/College",
      reg: "Deregistered 2024",
      status: "Deregistered",
      standing: "Administrative Cancellation",
      body: "DHET Official Alert",
      risk: "Critical",
      warning: "Recently deregistered by DHET. Confirm current status before payment."
    },
    {
      id: "edu-risk-102",
      name: "City Varsity",
      category: "Education",
      type: "Private HEI",
      reg: "Deregistered 2024",
      status: "Deregistered",
      standing: "Academic Audit Failure",
      body: "DHET Official Alert",
      risk: "Critical",
      warning: "Deregistration notice issued by Department of Higher Education."
    },
    {
      id: "edu-risk-103",
      name: "Lyceum College",
      category: "Education",
      type: "Private HEI",
      reg: "Deregistered 2024",
      status: "Deregistered",
      standing: "Compliance Failure",
      body: "DHET Official Alert",
      risk: "Critical"
    },
    {
      id: "edu-fake-1",
      name: "Pretoria Global Institute",
      category: "Education",
      type: "Private College",
      reg: "UNVERIFIED-2024",
      status: "Unverified",
      standing: "Suspended",
      body: "DHET Warning List",
      risk: "Critical",
      redFlags: ["Short duration degrees", "No physical address"],
      warning: "Reported for promising degrees in 3 months."
    },
    // Healthcare (Accredited)
    {
      id: "med-1",
      name: "Chris Hani Baragwanath Academic Hospital",
      category: "Healthcare",
      type: "Public Hospital",
      reg: "GAU-HOSP-001",
      status: "Vetted",
      body: "NDOH Verified",
      specialization: "Multi-disciplinary",
      validUntil: "2028-12-31",
      risk: "Low"
    },
    {
      id: "med-2",
      name: "Netcare Rosebank Hospital",
      category: "Healthcare",
      type: "Private Hospital",
      reg: "NET-HOSP-992",
      status: "Vetted",
      body: "BHF Certified",
      specialization: "Surgical Specialists",
      validUntil: "2027-06-30",
      risk: "Low"
    },
    {
      id: "med-3",
      name: "Dr. Sibongile Khumalo",
      category: "Healthcare",
      type: "Specialist Physician",
      reg: "MP 0488271",
      hpcsaNumber: "MP0488271-X",
      status: "Active",
      standing: "In Good Standing",
      body: "HPCSA Registered",
      specialization: "Internal Medicine",
      validUntil: "2025-12-31",
      risk: "Low"
    },
    // Legal (Accredited / Vetted)
    {
      id: "leg-1",
      name: "Werksmans Attorneys",
      category: "Legal",
      type: "Law Firm",
      reg: "LPC-FIRM-990",
      lpcNumber: "L-990-ZA",
      status: "Active",
      standing: "Audited & Verified",
      body: "Legal Practice Council",
      ffcStatus: "Valid (2024 Certificate)",
      expertise: "Corporate & Commercial",
      validUntil: "2026-12-31",
      risk: "Low"
    },
    {
      id: "leg-2",
      name: "Bowmans (Johannesburg)",
      category: "Legal",
      type: "Law Firm",
      reg: "LPC-FIRM-882",
      status: "Good Standing",
      body: "Legal Practice Council",
      ffcStatus: "Valid",
      expertise: "Litigation & Dispute Resolution",
      validUntil: "2026-12-31",
      risk: "Low"
    },
    {
      id: "leg-pta-1",
      name: "Adv. Sipho Zulu",
      category: "Legal",
      type: "Advocate",
      reg: "ADV-GP-0021",
      status: "Practising",
      standing: "Member of GCB",
      body: "LPC Provincial Council",
      ffcStatus: "N/A (Trust Account)",
      expertise: "Criminal Defense",
      location: "Pretoria, GP",
      risk: "Low"
    },
    // Legal (High Risk / Unverified)
    {
      id: "leg-risk-1",
      name: "Rosselli Legal Consultants",
      category: "Legal",
      type: "Consultant",
      reg: "UNVERIFIED",
      status: "Not Found",
      standing: "No LPC Record",
      body: "LPC Warning List",
      risk: "High",
      warning: "Suspected impersonation and unauthorized practice of law.",
      redFlags: ["Direct payments to personal bank account", "No physical office"]
    },
    {
      id: "leg-risk-2",
      name: "Sovereign Gold & Estate Attorneys",
      category: "Legal",
      type: "Law Firm",
      reg: "PENDING",
      status: "Suspended",
      standing: "FFC Revoked",
      body: "LPC Enforcement",
      risk: "Critical",
      warning: "FFC revoked due to trust account mismanagement. Do not deposit funds."
    },
    // RAF Accredited Specialists
    {
      id: "raf-med-1",
      name: "Dr. Thabo Mokoena",
      category: "Healthcare",
      type: "Orthopaedic Surgeon",
      reg: "MP 0599212",
      status: "RAF Accredited",
      body: "HPCSA & RAF Vetted",
      specialization: "Trauma & Spinal Surgery",
      location: "Pretoria, GP",
      validUntil: "2027-12-31",
      risk: "Low"
    },
    {
      id: "raf-med-2",
      name: "Dr. Sarah Jenkins",
      category: "Healthcare",
      type: "Neurologist",
      reg: "MP 0411832",
      status: "RAF Accredited",
      body: "HPCSA & RAF Vetted",
      specialization: "Traumatic Brain Injury",
      location: "Cape Town, WC",
      validUntil: "2026-06-30",
      risk: "Low"
    },
    {
      id: "raf-med-3",
      name: "Dr. Amina Pillay",
      category: "Healthcare",
      type: "Occupational Therapist",
      reg: "OT 0088214",
      status: "RAF Accredited",
      body: "HPCSA & RAF Vetted",
      specialization: "Functional Assessment",
      location: "Durban, KZN",
      validUntil: "2025-12-31",
      risk: "Low"
    },
    {
      id: "raf-med-4",
      name: "Dr. Gerhard Venter",
      category: "Healthcare",
      type: "Plastic & Reconstructive Surgeon",
      reg: "MP 0332190",
      status: "RAF Accredited",
      body: "HPCSA & RAF Vetted",
      specialization: "Scarring & Disfigurement",
      location: "Bloemfontein, FS",
      validUntil: "2028-01-01",
      risk: "Low"
    },
    // --- GAUTENG DOCTOR REGISTRY (INTEGRATED) ---
    // Pretoria GPs
    {
      id: "med-gp-pta-1",
      name: "Dr. Bolukaoto",
      category: "Healthcare",
      type: "General Practitioner",
      reg: "MP 0688221",
      status: "Active",
      standing: "Excellent (4.9 Rating)",
      body: "HPCSA Verified",
      location: "330 WF Nkomo St, Pretoria West",
      specialization: "General Practice",
      risk: "Low"
    },
    {
      id: "med-gp-pta-2",
      name: "Dr. MS Manthatha",
      category: "Healthcare",
      type: "General Practitioner",
      reg: "MP 0722103",
      status: "Active",
      standing: "High (4.6 Rating)",
      body: "HPCSA Verified",
      location: "65A Maboea St, Atteridgeville",
      specialization: "General Practice",
      risk: "Low"
    },
    {
      id: "med-gp-pta-3",
      name: "Dr. Bandlakazi Sukwana",
      category: "Healthcare",
      type: "General Practitioner",
      reg: "MP 0811290",
      status: "Active",
      standing: "Good Standing",
      body: "Intercare Network",
      location: "Intercare Tramshed, Pretoria Central",
      specialization: "General Practice",
      risk: "Low"
    },
    {
      id: "med-gp-pta-4",
      name: "Dr. Sithembile Makina",
      category: "Healthcare",
      type: "General Practitioner",
      reg: "MP 0855214",
      status: "Active",
      standing: "Good Standing",
      body: "HPCSA Verified",
      location: "Sunnyside, Pretoria",
      specialization: "General Practice",
      risk: "Low"
    },
    // Johannesburg GPs
    {
      id: "med-gp-jhb-1",
      name: "Dr. Quraisha Motala",
      category: "Healthcare",
      type: "General Practitioner",
      reg: "MP 0922188",
      status: "Active",
      standing: "Good Standing",
      body: "Discovery Health Network",
      location: "The Zone Medical Centre, Rosebank",
      specialization: "Cosmetic Medicine & GP",
      risk: "Low"
    },
    {
      id: "med-gp-jhb-2",
      name: "Dr. Zipho Mngomezulu",
      category: "Healthcare",
      type: "General Practitioner",
      reg: "MP 1022931",
      status: "Active",
      standing: "Good Standing",
      body: "HPCSA Verified",
      location: "Witpoortjie, Roodepoort",
      specialization: "General Practice",
      risk: "Low"
    },
    // Mediclinic Sandton Specialists
    {
      id: "med-spec-san-1",
      name: "Dr. David Adler",
      category: "Healthcare",
      type: "Physician - Internal Medicine",
      reg: "MP 0388112",
      status: "Active",
      standing: "Senior Specialist",
      body: "Mediclinic Sandton Vetted",
      location: "Sandton, JHB",
      specialization: "Internal Medicine",
      risk: "Low"
    },
    {
      id: "med-spec-san-2",
      name: "Dr. Heather Allan",
      category: "Healthcare",
      type: "Obstetrician & Gynaecologist",
      reg: "MP 0411223",
      status: "Active",
      standing: "Specialist",
      body: "Mediclinic Sandton Vetted",
      location: "Sandton, JHB",
      specialization: "OBGYN",
      risk: "Low"
    },
    {
      id: "med-spec-san-3",
      name: "Dr. Ivy Anafi",
      category: "Healthcare",
      type: "Rheumatologist",
      reg: "MP 0599211",
      status: "Active",
      standing: "Specialist",
      body: "Mediclinic Sandton Vetted",
      location: "Sandton, JHB",
      specialization: "Rheumatology",
      risk: "Low"
    },
    // High Risk / Unverified / Degistered Entities
    {
      id: "med-risk-1",
      name: "Gauteng Mobile Wellness Clinic",
      category: "Healthcare",
      type: "Mobile Clinic",
      reg: "NO_RECORD_FOUND",
      status: "De-registered",
      standing: "Fraudulent Operation Suspected",
      body: "HPCSA Enforcement List",
      location: "Mobile - Various Locations",
      specialization: "Unverified Health Checks",
      risk: "Critical"
    },
    {
      id: "med-risk-2",
      name: "Dr. X (Pseudo-practitioner)",
      category: "Healthcare",
      type: "General Practitioner",
      reg: "FAKE_STAMP_771",
      status: "Unverified",
      standing: "Impersonation Alert",
      body: "Discovery Fraud Unit Flag",
      location: "Hillbrow, JHB",
      specialization: "Pharmacy Over-the-counter",
      risk: "High"
    }
  ],
  trustedRecommendations: {
    Education: [
      { name: "University of the Witwatersrand", type: "Public University", body: "DHET Recognized" },
      { name: "University of Pretoria", type: "Public University", body: "DHET Recognized" },
      { name: "Stellenbosch University", type: "Public University", body: "DHET Recognized" }
    ],
    Healthcare: [
      { name: "Netcare Group", type: "Hospital Network", body: "DOH Verified" },
      { name: "Life Healthcare", type: "Hospital Network", body: "DOH Verified" },
      { name: "Mediclinic Southern Africa", type: "Hospital Network", body: "DOH Verified" }
    ],
    Legal: [
      { name: "ENSafrica", type: "Global Law Firm", body: "LPC Good Standing" },
      { name: "Cliffe Dekker Hofmeyr", type: "Top Tier Firm", body: "LPC Good Standing" },
      { name: "Norton Rose Fulbright", type: "Global Excellence", body: "LPC Good Standing" }
    ]
  },
  officialResources: {
    Education: [
      { name: "Department of Higher Education & Training (DHET)", url: "https://www.dhet.gov.za/" },
      { name: "South African Qualifications Authority (SAQA)", url: "https://www.saqa.org.za/" },
      { name: "Council on Higher Education (CHE)", url: "https://www.che.ac.za/" }
    ],
    Healthcare: [
      { name: "Health Professions Council of South Africa (HPCSA)", url: "https://www.hpcsa.co.za/" },
      { name: "Psytech South Africa (Psychological Assessment)", url: "https://www.psytech.co.za/" },
      { name: "Mediclinic Southern Africa", url: "https://www.mediclinic.co.za/" },
      { name: "Netcare Private Health", url: "https://www.netcare.co.za/" },
      { name: "Discovery Health Provider Search", url: "https://www.discovery.co.za/" }
    ],
    Legal: [
      { name: "Legal Practice Council (LPC) Search", url: "https://lpc.org.za" },
      { name: "LPC FIDELITY FUND (FFC) Verification", url: "https://lpc.org.za/ffc-verification" },
      { name: "Law Society of South Africa (LSSA)", url: "https://www.lssa.org.za/" }
    ],
    Reporting: [
      { name: "DHET Helpline (Toll-Free)", phone: "0800 872 222", email: "callcentre@dhet.gov.za" },
      { name: "LPC GP/NW/MP/LP Office", phone: "012 338 5800", email: "info@lpc.org.za" },
      { name: "LPC WC/EC/NC Office", phone: "021 443 6700", email: "infowc@lpc.org.za" },
      { name: "LPC KZN Office", phone: "033 345 1304", email: "infokzn@lpc.org.za" },
      { name: "LPC Free State Office", phone: "051 447 3237", email: "infofs@lpc.org.za" },
      { name: "SAPS Crime Stop", phone: "08600 10111", email: "report.fake@saps.gov.za" },
      { name: "SAQA Verification", url: "https://www.saqa.org.za/verification" }
    ]
  },
  registryNews: [
    { id: 1, title: "DHET unmasks 5 new bogus colleges in Mpumalanga", date: "23 Feb 2026", source: "DHET News" },
    { id: 2, title: "HPCSA warns against unregistered dental technicians", date: "21 Feb 2026", source: "Sentinel Alert" },
    { id: 3, title: "SAQA updates verification protocols for online degrees", date: "19 Feb 2026", source: "SAQA Media" }
  ],
  securityAlerts: [
    { id: 1, type: "Critical", text: "Identity theft spike: Beware of fake verification SMS from 'Registry Center'." },
    { id: 2, type: "Warning", text: "Scheduled database sync with Home Affairs: 23:00 - 01:00 CAT." },
    { id: 3, type: "Critical", text: "CYBER ALERT: Distributed Denial-of-Service (DDoS) attempts detected on DHET portal. Expect latency." },
    { id: 4, type: "Warning", text: "FRAUD ALERT: Unofficial 'Sentinel Pro' WhatsApp groups are requesting bank details. Report immediately." }
  ],
  auth: {
    admin: {
      email: "admin@sumbandila.com",
      password: "admin123",
      name: "Dakalo Mashau",
      avatar: "DM",
      mobile: "+27 83 123 4567"
    }
  },
  testimonials: [
    {
      id: 1,
      name: "Thandiwe Nkosi",
      location: "Soweto, GP",
      image: "https://ui-avatars.com/api/?name=Thandiwe+Nkosi&background=0056b3&color=fff",
      text: "I was about to pay R5000 deposit for a nursing college in Joburg. Checked Sumbandila first and it was flagged as UNVERIFIED. This app saved my life savings!",
      impact: "Financial Loss Avoided"
    },
    {
      id: 2,
      name: "Johannes van der Merwe",
      location: "Bellville, WC",
      image: "https://i.pravatar.cc/150?img=12",
      text: "Used the legal registry to verify a 'consultant' liquidating my business. Found out they weren't on the LPC list. Reported them immediately.",
      impact: "Fraud Exposure"
    },
    {
      id: 3,
      name: "Naledi Madiba",
      location: "Polokwane, LP",
      image: "https://ui-avatars.com/api/?name=Naledi+Madiba&background=0056b3&color=fff",
      text: "As a student, I'm always worried about my degree being valid. Verifying my institution here gave me total peace of mind for my future.",
      impact: "Career Security"
    },
    {
      id: 4,
      name: "Michael Chen",
      location: "Durban, KZN",
      image: "https://i.pravatar.cc/150?img=68",
      text: "The scanner feature is incredible. I scanned a medical practice's registration seal and got an instant 'Vetted' confirmation. South Africa needs this!",
      impact: "Instant Trust"
    },
    {
      id: 5,
      name: "Fatima Patel",
      location: "Fordsburg, GP",
      image: "https://ui-avatars.com/api/?name=Fatima+Patel&background=0056b3&color=fff",
      text: "I was suspicious of a specialist claiming to be HPCSA registered for my mother's surgery. Sumbandila confirmed my suspicions—they were de-registered!",
      impact: "Medical Safety"
    },
    {
      id: 6,
      name: "Rajesh Gupta",
      location: "Umhlanga, KZN",
      image: "https://i.pravatar.cc/150?img=57",
      text: "Checking the legal standing of my property conveyancer took seconds. The app's integration with the LPC database is a game changer for property buyers.",
      impact: "Property Protection"
    },
    {
      id: 7,
      name: "Elena Petrova",
      location: "Cape Town, WC",
      image: "https://ui-avatars.com/api/?name=Elena+Petrova&background=0056b3&color=fff",
      text: "As an expat moving to SA, I needed to verify my local degree equivalent. The DHET resources linked here made the process transparent and simple.",
      impact: "Seamless Integration"
    }
  ],
  scamTracker: [
    {
      id: "scam-1",
      title: "Bogus Nursing Colleges",
      department: "Education",
      description: "Unregistered colleges in GP and KZN offering 'Nursing' diplomas without SANC accreditation. They often use 'Global' or 'International' in their names.",
      status: "Active",
      riskLevel: "Critical",
      source: "Department of Higher Education (DHET)",
      sourceUrl: "https://www.dhet.gov.za/SitePages/Docregisters.aspx"
    },
    {
      id: "scam-2",
      title: "Fake HPCSA Inspectors",
      department: "Healthcare",
      description: "Scammers posing as HPCSA inspectors visiting private practices and demanding 'spot fines' for minor compliance issues.",
      status: "New",
      riskLevel: "High",
      source: "HPCSA Official Notice",
      sourceUrl: "https://www.hpcsa.co.za/Media/Notices"
    },
    {
      id: "scam-3",
      title: "SARS 'Overdue Refund' Phishing",
      department: "Finance",
      description: "SMS and emails claiming you have a R12,500 refund from SARS. Links to a landing page that steals banking credentials.",
      status: "Persistent",
      riskLevel: "Critical",
      source: "SARS Scam Warning",
      sourceUrl: "https://www.sars.gov.za/targeting-tax-crime/scams-and-phishing/"
    },
    {
      id: "scam-4",
      title: "Ghost Conveyancers",
      department: "Legal",
      description: "Individuals claiming to be attorneys handling property transfers for low fees. They disappear once the 'transfer fee' is paid.",
      status: "Active",
      riskLevel: "High",
      source: "Legal Practice Council (LPC)",
      sourceUrl: "https://lpc.org.za/public-alerts/"
    },
    {
      id: "scam-5",
      title: "SASSA Social Relief Grant Hack",
      department: "Social Development",
      description: "Third-party agents offering to 'expedite' R370 grant applications in exchange for a fee. SASSA never charges for applications.",
      status: "Active",
      riskLevel: "Medium",
      source: "SASSA Official",
      sourceUrl: "https://www.sassa.gov.za/"
    },
    {
      id: "scam-6",
      title: "Ransomware & Cyber Extortion",
      department: "Cyber Security",
      description: "Business owners receiving emails claiming their registry data has been hacked. They demand Bitcoin to 'stop the leak'. These are typically empty threats using leaked passwords from other breaches.",
      status: "Active",
      riskLevel: "High",
      source: "Cyber-Sentinel Hub",
      sourceUrl: "https://cyber-sentinel.gov.za"
    }
  ]
};
