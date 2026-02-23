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
      image: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?q=80&w=200&auto=format&fit=crop",
      text: "I was about to pay R5000 deposit for a nursing college in Joburg. Checked Sumbandila first and it was flagged as UNVERIFIED. This app saved my life savings!",
      impact: "Financial Loss Avoided"
    },
    {
      id: 2,
      name: "Johannes van der Merwe",
      location: "Bellville, WC",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      text: "Used the legal registry to verify a 'consultant' liquidating my business. Found out they weren't on the LPC list. Reported them immediately.",
      impact: "Fraud Exposure"
    },
    {
      id: 3,
      name: "Naledi Madiba",
      location: "Polokwane, LP",
      image: "https://images.unsplash.com/photo-1567532939604-b6c5b0ad2ea0?q=80&w=200&auto=format&fit=crop",
      text: "As a student, I'm always worried about my degree being valid. Verifying my institution here gave me total peace of mind for my future.",
      impact: "Career Security"
    },
    {
      id: 4,
      name: "Michael Chen",
      location: "Durban, KZN",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
      text: "The scanner feature is incredible. I scanned a medical practice's registration seal and got an instant 'Vetted' confirmation. South Africa needs this!",
      impact: "Instant Trust"
    },
    {
      id: 5,
      name: "Fatima Patel",
      location: "Fordsburg, GP",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
      text: "I was suspicious of a specialist claiming to be HPCSA registered for my mother's surgery. Sumbandila confirmed my suspicions—they were de-registered!",
      impact: "Medical Safety"
    },
    {
      id: 6,
      name: "Rajesh Gupta",
      location: "Umhlanga, KZN",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
      text: "Checking the legal standing of my property conveyancer took seconds. The app's integration with the LPC database is a game changer for property buyers.",
      impact: "Property Protection"
    },
    {
      id: 7,
      name: "Elena Petrova",
      location: "Cape Town, WC",
      image: "https://images.unsplash.com/photo-1544717305-27a734ef1904?q=80&w=200&auto=format&fit=crop",
      text: "As an expat moving to SA, I needed to verify my local degree equivalent. The DHET resources linked here made the process transparent and simple.",
      impact: "Seamless Integration"
    }
  ]
};
