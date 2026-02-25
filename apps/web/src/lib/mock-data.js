export const MOCK_DATA = {
  providers: [
    // Education (Accredited)
    {
      id: "edu-1",
      name: "University of the Witwatersrand",
      category: "Education",
      type: "Public University",
      reg: "U-1922-GP-01",
      status: "Registered",
      body: "DHET Recognized",
      courses: ["Medicine", "Engineering", "Commerce", "Law"],
      validUntil: "2030-12-31",
      risk: "Low"
    },
    {
      id: "edu-2",
      name: "University of Johannesburg",
      category: "Education",
      type: "Public University",
      reg: "U-2005-GP-02",
      status: "Registered",
      body: "DHET Recognized",
      courses: ["Accounting", "Design", "Humanities"],
      validUntil: "2030-01-01",
      risk: "Low"
    },
    {
      id: "edu-3",
      name: "Boston City Campus",
      category: "Education",
      type: "Private HEI",
      reg: "2001/HE07/006",
      status: "Registered",
      body: "CHE Accredited",
      courses: ["Business", "IT", "Media"],
      validUntil: "2026-12-31",
      risk: "Low"
    },
    // Education (High Risk)
    {
      id: "edu-fake-1",
      name: "Pretoria Global Institute",
      category: "Education",
      type: "Private College",
      reg: "UNVERIFIED-2024",
      status: "Unverified",
      body: "DHET Warning List",
      courses: ["Nursing Assistant", "Policing"],
      validUntil: "N/A",
      risk: "Critical"
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
      status: "Active",
      body: "HPCSA Registered",
      specialization: "Internal Medicine",
      validUntil: "2025-12-31",
      risk: "Low"
    },
    // Legal (Accredited)
    {
      id: "leg-1",
      name: "Werksmans Attorneys",
      category: "Legal",
      type: "Law Firm",
      reg: "LPC-FIRM-990",
      status: "Good Standing",
      body: "Legal Practice Council",
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
      expertise: "Litigation & Dispute Resolution",
      validUntil: "2026-12-31",
      risk: "Low"
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
      { name: "South African Nursing Council (SANC)", url: "https://www.sanc.co.za/" },
      { name: "Board of Healthcare Funders (BHF)", url: "https://www.bhfglobal.com/" }
    ],
    Legal: [
      { name: "Legal Practice Council (LPC)", url: "https://lpc.org.za/" },
      { name: "Law Society of South Africa (LSSA)", url: "https://www.lssa.org.za/" }
    ]
  },
  registryNews: [
    { id: 1, title: "DHET unmasks 5 new bogus colleges in Mpumalanga", date: "23 Feb 2026", source: "DHET News" },
    { id: 2, title: "HPCSA warns against unregistered dental technicians", date: "21 Feb 2026", source: "Sentinel Alert" },
    { id: 3, title: "SAQA updates verification protocols for online degrees", date: "19 Feb 2026", source: "SAQA Media" }
  ],
  securityAlerts: [
    { id: 1, type: "Critical", text: "Identity theft spike: Beware of fake verification SMS from 'Registry Center'." },
    { id: 2, type: "Warning", text: "Scheduled database sync with Home Affairs: 23:00 - 01:00 CAT." }
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
    }
  ]
};
