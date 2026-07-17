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
      institutionRegistration: "Registered & Active",
      courseAccreditation: "Fully Accredited (CHE)",
      standing: "Good Standing",
      body: "DHET Recognized (April 2026)",
      saqaId: "98212",
      nqfLevel: "Level 7-10",
      council: "CHE",
      courses: ["Medicine", "Engineering", "Commerce", "Law"],
      validUntil: "2030-12-31",
      risk: "Low",
      externalLink: "https://www.dhet.gov.za/SitePages/Docregisters.aspx",
      isVerified: true
    },
    {
      id: "edu-3",
      name: "Boston City Campus",
      category: "Education",
      type: "Private HEI",
      reg: "2001/HE07/006 (DHET)",
      emisNumber: "P-882201",
      status: "Registered",
      institutionRegistration: "Registered & Active",
      courseAccreditation: "Accredited (QCTO/CHE)",
      standing: "Accredited",
      body: "CHE & QCTO Accredited",
      saqaId: "91754",
      nqfLevel: "Level 5-8",
      council: "CHE",
      courses: ["Business", "IT", "Media"],
      validUntil: "2026-12-31",
      risk: "Low"
    },
    // Example of fly-by-night: Registered Institution but Unaccredited Course
    {
      id: "edu-fly-1",
      name: "Sunnyside Academy of Excellence",
      category: "Education",
      type: "Private College",
      reg: "2023/FE07/999",
      status: "Partial",
      institutionRegistration: "Registered",
      courseAccreditation: "NOT ACCREDITED",
      standing: "Compliance Warning",
      body: "DHET (Provincial)",
      risk: "High",
      warning: "This institution is registered with DHET, but the 'Nursing' and 'Engineering' courses offered are NOT accredited by SANC or ECSA.",
      courses: ["Nursing (Unaccredited)", "Engineering (Unaccredited)"]
    },
    // Education (High Risk / Recently Deregistered)
    {
      id: "edu-risk-101",
      name: "Damelin (various campuses)",
      category: "Education",
      type: "Private HEI/College",
      reg: "2001/HE07/009",
      status: "Registered",
      standing: "Registered (Dec 2025)",
      body: "DHET Official Register",
      risk: "Low",
      location: "Randburg, Braamfontein, Overport, Durban",
      courses: ["HC in Business Management", "Diploma in IT", "BCom in Accounting"],
      warning: "Status updated: Re-registered as of December 2025."
    },
    {
      id: "edu-risk-102",
      name: "City Varsity",
      category: "Education",
      type: "Private HEI",
      reg: "2001/HE07/004",
      status: "Registered",
      standing: "Registered (Dec 2025)",
      body: "DHET Official Register",
      risk: "Low",
      location: "Cape Town",
      courses: ["BA in Film and Television", "Diploma in Animation", "HC in Acting for Camera"],
      warning: "Status updated: Re-registered as of December 2025."
    },
    {
      id: "edu-risk-103",
      name: "Lyceum College",
      category: "Education",
      type: "Private HEI",
      reg: "2001/HE07/011",
      status: "Registered",
      standing: "Registered (Dec 2025)",
      body: "DHET Official Register",
      risk: "Low",
      location: "Woodmead/Sandton",
      courses: ["Diploma in Criminal Justice", "BCom in Management", "HC in Paralegal Studies"],
      warning: "Status updated: Re-registered as of December 2025."
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
    // Fly-by-night: Registered but offering phased-out N1-N3 courses
    {
      id: "edu-bogus-2",
      name: "Tshwane Technical Institute",
      category: "Education",
      type: "Private College",
      reg: "2024/FE07/002",
      emisNumber: "700999881",
      status: "Registered",
      institutionRegistration: "Registered",
      courseAccreditation: "PHASED OUT",
      standing: "Compliance Violation",
      body: "DHET (Phased Out)",
      risk: "High",
      warning: "This institution is offering N1-N3 programmes which were officially phased out in April 2026. These qualifications are no longer valid.",
      courses: ["N1 Mechanical", "N2 Electrical", "N3 Civil"]
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
      risk: "Low",
      externalLink: "https://www.hpcsa.co.za/i_register",
      isVerified: true
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
      risk: "Low",
      externalLink: "https://lpc.org.za/ffc-verification/",
      isVerified: true
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
    // --- PRIVATE COLLEGES REGISTRY (UPDATED 15 APRIL 2026) ---
    // SECTION A: Cancelled / Failure to maintain registration
    {
      id: "edu-cancelled-1",
      name: "Abakholwe Community Developers",
      category: "Education",
      type: "Private College",
      reg: "2010/FE07/117",
      status: "De-registered",
      standing: "Cancelled",
      body: "DHET (Section A List)",
      location: "Zebediela, Limpopo",
      risk: "Critical",
      warning: "Registration cancelled due to failure to maintain standards. Enrollment is illegal."
    },
    {
      id: "edu-cancelled-2",
      name: "Africa Institute of Management and Technology",
      category: "Education",
      type: "Private College",
      reg: "2011/FE07/025",
      status: "De-registered",
      standing: "Cancelled",
      body: "DHET (Section A List)",
      location: "Johannesburg, Gauteng",
      risk: "Critical",
      warning: "Registration officially cancelled. This institution is no longer permitted to offer NC(V) or AET programmes."
    },
    {
      id: "edu-cancelled-3",
      name: "Anchor Lite College SA (Pty) Ltd",
      category: "Education",
      type: "Private College",
      reg: "2009/FE07/095",
      status: "De-registered",
      standing: "Cancelled",
      body: "DHET (Section A List)",
      location: "Durban, KwaZulu-Natal",
      risk: "Critical",
      warning: "Registration has been cancelled for failure to maintain registration requirements."
    },
    // SECTION B: Registered Private Colleges
    {
      id: "edu-registered-1",
      name: "Academy of Business & Computer Studies",
      category: "Education",
      type: "Private College",
      reg: "2008/SFE07/108",
      status: "Registered",
      standing: "In Good Standing",
      body: "DHET Official Register",
      location: "Pretoria / Johannesburg / Durban",
      courses: ["Finance", "Economics", "Accounting", "Marketing", "Office Administration"],
      validUntil: "2028-12-31",
      risk: "Low"
    },
    {
      id: "edu-registered-2",
      name: "Afric Training Centre & Security Studies",
      category: "Education",
      type: "Private College",
      reg: "2025/FE07/001",
      status: "Registered",
      standing: "Active (New)",
      body: "DHET Official Register",
      location: "Maboneng, Johannesburg",
      courses: ["Civil Engineering", "Safety in Society", "Engineering & Related Design"],
      validUntil: "2030-04-15",
      risk: "Low"
    },
    {
      id: "edu-registered-3",
      name: "Bolton Business College and Computer Studies",
      category: "Education",
      type: "Private College",
      reg: "2019/FE07/030",
      status: "Registered",
      standing: "Active",
      body: "DHET Official Register",
      location: "Bloemfontein, Free State",
      courses: ["Information Technology", "Computer Science", "Safety in Society"],
      validUntil: "2027-12-31",
      risk: "Low"
    },
    {
      id: "edu-registered-4",
      name: "Brooklyn City College",
      category: "Education",
      type: "Private College",
      reg: "2009/FE07/018",
      status: "Registered",
      standing: "In Good Standing",
      body: "DHET Official Register",
      location: "Pretoria, Johannesburg, Durban, Polokwane, Nelspruit, Rustenburg",
      courses: ["Management", "Electrical Infrastructure", "IT Computer Science", "Tourism", "Safety in Society"],
      validUntil: "2029-06-30",
      risk: "Low"
    },
    {
      id: "edu-registered-5",
      name: "Curro Holdings (Pty) Ltd",
      category: "Education",
      type: "Private College / HEI",
      reg: "2018/FE07/054",
      status: "Registered",
      standing: "Active",
      body: "DHET Official Register",
      location: "Rivonia & Midrand, Gauteng",
      courses: ["Information Technology", "Computer Science", "Finance", "Accounting"],
      validUntil: "2030-12-31",
      risk: "Low"
    },
    // More Section A (Illegal / Cancelled) for robust verification testing
    {
      id: "edu-cancelled-4",
      name: "Aldabri 106 (Pty) Ltd",
      category: "Education",
      type: "Private College",
      reg: "2007/FE07/010",
      status: "De-registered",
      standing: "Cancelled",
      body: "DHET (Section A List)",
      location: "Durban, KwaZulu-Natal",
      risk: "Critical",
      warning: "Registration cancelled. Offering qualifications here is illegal."
    },
    {
      id: "edu-cancelled-5",
      name: "Aranda Learnership College",
      category: "Education",
      type: "Private College",
      reg: "2009/FE07/105",
      status: "De-registered",
      standing: "Cancelled",
      body: "DHET (Section A List)",
      location: "Randfontein, Gauteng",
      risk: "Critical",
      warning: "Registration officially cancelled by DHET."
    },
    {
      id: "edu-registered-6",
      name: "Rostec Technical FET College",
      category: "Education",
      type: "Private College",
      reg: "2010/FE07/027",
      status: "Registered",
      standing: "Active",
      body: "DHET Official Register",
      location: "Johannesburg / Pretoria / Vereeniging / Bloemfontein / Rustenburg / Polokwane",
      courses: ["Marketing", "IT & Computer Science", "Office Administration", "Safety in Society", "Electrical Infrastructure"],
      validUntil: "2031-12-31",
      risk: "Low"
    },
    {
      id: "edu-registered-7",
      name: "College of Africa",
      category: "Education",
      type: "Private College",
      reg: "2023/FE07/003",
      status: "Registered",
      standing: "Active",
      body: "DHET Official Register",
      location: "Mankweng, Polokwane",
      courses: ["Primary Health Care", "Public Health", "Safety in Society", "Transport and Logistics"],
      validUntil: "2028-03-23",
      risk: "Low"
    },
    // SECTION: Private Higher Education Institutions (PHEIs) - February 2026 Update
    {
      id: "phei-1",
      name: "AAA School of Advertising (Pty) Ltd",
      category: "Education",
      type: "Private HEI",
      reg: "2000/HE07/015",
      status: "Registered",
      standing: "In Good Standing",
      body: "DHET Official Register (PHEI)",
      location: "Bryanston (Gauteng), Cape Town (Western Cape)",
      courses: ["BA in Marketing Communication (NQF 7)", "Diploma in Visual Communication (NQF 6)", "HC in Digital Marketing (NQF 5)"],
      validUntil: "2030-12-31",
      risk: "Low",
      accreditation: "HEQSF Aligned"
    },
    {
      id: "phei-2",
      name: "Akademia NPC",
      category: "Education",
      type: "Private HEI",
      reg: "2011/HE08/005",
      status: "Registered",
      standing: "In Good Standing",
      body: "DHET Official Register (PHEI)",
      location: "Centurion (Gauteng), Pretoria, Paarl",
      courses: ["LLB (NQF 8)", "BCom in Accounting (NQF 7)", "BEd in Foundation Phase (NQF 7)", "MA in Laws (NQF 9)"],
      validUntil: "2032-04-15",
      risk: "Low",
      accreditation: "HEQSF Aligned"
    },
    {
      id: "phei-3",
      name: "Belgium Campus ITversity NPC",
      category: "Education",
      type: "Private HEI",
      reg: "2003/HE08/001",
      status: "Registered",
      standing: "In Good Standing",
      body: "DHET Official Register (PHEI)",
      location: "Pretoria, Kempton Park",
      courses: ["Bachelor of Computing (NQF 8)", "BSc in IT (NQF 7)", "Diploma in IT (NQF 6)"],
      validUntil: "2030-10-10",
      risk: "Low",
      accreditation: "HEQSF Aligned"
    },
    {
      id: "phei-4",
      name: "Boston City Campus (Pty) Ltd",
      category: "Education",
      type: "Private HEI",
      reg: "2003/HE07/002",
      status: "Registered",
      standing: "Active",
      body: "DHET Official Register (PHEI)",
      location: "National (Headquarters in Orange Grove, GP)",
      courses: ["Bachelor of Accounting (NQF 7)", "LLB (NQF 8)", "MBA (NQF 9)", "HC in Software Development (NQF 5)"],
      validUntil: "2031-12-31",
      risk: "Low",
      accreditation: "HEQSF Aligned"
    },
    {
      id: "phei-5",
      name: "Eduvos (Pty) Ltd",
      category: "Education",
      type: "Private HEI",
      reg: "2001/HE07/008",
      status: "Registered",
      standing: "Active",
      body: "DHET Official Register (PHEI)",
      location: "Midrand, Gqeberha, East London, Bedfordview, Bloemfontein, Cape Town, Pretoria, Durbanville, Nelspruit, Vanderbijlpark, Potchefstroom, Durban",
      courses: ["BSc in Computer Science (NQF 7)", "BCom in Law (NQF 7)", "BSc in Biomedicine (NQF 7)", "Higher Certificate in Computing (NQF 5)"],
      validUntil: "2033-05-20",
      risk: "Low",
      accreditation: "HEQSF Aligned"
    },
    {
      id: "phei-6",
      name: "The Independent Institute of Education (Pty) Ltd (IIE)",
      category: "Education",
      type: "Private HEI",
      reg: "2007/HE07/002",
      status: "Registered",
      standing: "Active",
      body: "DHET Official Register (PHEI)",
      location: "Sandton, Randburg, Rosebank, Gqeberha, Pretoria, Durban, Cape Town",
      courses: ["Bachelor of Laws (LLB) (NQF 8)", "BCom (NQF 7)", "Bachelor of Computer and Information Sciences (NQF 7)", "MBA (NQF 9)"],
      validUntil: "2035-01-01",
      risk: "Low",
      accreditation: "HEQSF Aligned",
      subBrands: ["Varsity College", "Rosebank College", "Vega School"]
    },
    {
      id: "phei-7",
      name: "MANCOSA (Pty) Ltd",
      category: "Education",
      type: "Private HEI",
      reg: "2000/HE07/003",
      status: "Registered",
      standing: "Active",
      body: "DHET Official Register (PHEI)",
      location: "Durban (Head Office), Cape Town, Johannesburg, Pretoria, Polokwane",
      courses: ["MBA (NQF 9)", "BCom (NQF 7)", "PGCE (NQF 7)", "Doctor of Business Administration (NQF 10)"],
      validUntil: "2034-08-30",
      risk: "Low",
      accreditation: "HEQSF Aligned"
    },
    {
      id: "phei-8",
      name: "Lyceum College (Pty) Ltd",
      category: "Education",
      type: "Private HEI",
      reg: "2001/HE07/011",
      status: "Registered",
      standing: "Active",
      body: "DHET Official Register (PHEI)",
      location: "Woodmead, Sandton (Note: Verification of new site pending)",
      courses: ["Diploma in Criminal Justice (NQF 6)", "BCom in Management (NQF 7)", "HC in Paralegal Studies (NQF 5)"],
      validUntil: "2027-11-15",
      risk: "Low",
      accreditation: "HEQSF Aligned"
    },
    {
      id: "phei-9",
      name: "Milpark Education (Pty) Ltd",
      category: "Education",
      type: "Private HEI",
      reg: "2007/HE07/003",
      status: "Registered",
      standing: "Active",
      body: "DHET Official Register (PHEI)",
      location: "Cape Town, Johannesburg",
      courses: ["MBA (NQF 9)", "BCom (NQF 7)", "PG Diploma in Financial Planning (NQF 8)", "HC in Banking (NQF 5)"],
      validUntil: "2032-06-30",
      risk: "Low",
      accreditation: "HEQSF Aligned"
    },
    {
      id: "phei-11",
      name: "Academy of Sound Engineering (Pty) Ltd",
      category: "Education",
      type: "Private HEI",
      reg: "2009/HE07/011",
      status: "Registered",
      standing: "Active",
      body: "DHET Official Register (PHEI)",
      location: "Auckland Park (JHB), Zonneblom (CT)",
      courses: ["Diploma in Audio Technology (NQF 6)", "HC in Television and Screen Media (NQF 5)"],
      validUntil: "2029-05-30",
      risk: "Low",
      accreditation: "HEQSF Aligned"
    },
    {
      id: "phei-12",
      name: "Inscape Education Group (Pty) Ltd",
      category: "Education",
      type: "Private HEI",
      reg: "2000/HE07/002",
      status: "Registered",
      standing: "Active",
      body: "DHET Official Register (PHEI)",
      location: "Pretoria, Midrand, Cape Town, Umhlanga, Stellenbosch",
      courses: ["Bachelor of Design (NQF 7)", "Diploma in Graphic Design (NQF 6)", "HC in Architectural Technology (NQF 5)"],
      validUntil: "2031-03-31",
      risk: "Low",
      accreditation: "HEQSF Aligned"
    },
    {
      id: "phei-13",
      name: "The Animation School (Pty) Ltd",
      category: "Education",
      type: "Private HEI",
      reg: "2009/HE07/013",
      status: "Registered",
      standing: "Active",
      body: "DHET Official Register (PHEI)",
      location: "Woodstock (CT), Craighall Park (Randburg)",
      courses: ["Diploma in Digital Animation (NQF 6)", "HC in 2D Animation (NQF 5)"],
      validUntil: "2028-12-31",
      risk: "Low",
      accreditation: "HEQSF Aligned"
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
  ],
  securityAlerts: [
    { id: 1, type: "Critical", text: "Identity theft spike: Beware of fake verification SMS from 'Registry Center'." },
    { id: 2, type: "Warning", text: "Scheduled database sync with Home Affairs: 23:00 - 01:00 CAT." },
    { id: 3, type: "Critical", text: "CYBER ALERT: Distributed Denial-of-Service (DDoS) attempts detected on DHET portal. Expect latency." },
    { id: 4, type: "Warning", text: "FRAUD ALERT: Unofficial 'Sentinel Pro' WhatsApp groups are requesting bank details. Report immediately." }
  ],
  auth: {
    admin: {
      email: "admin@example.com",
      password: "change-me-in-production",
      name: "Admin User",
      avatar: "AD",
      mobile: "+27 00 000 0000"
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
    }
  ],
  // 🚨 Sentinel Scam Tracker Alerts
  alerts: [
    {
      id: 'alert-1',
      category: 'Education',
      title: 'Bogus Nursing Colleges',
      risk: 'Critical',
      description: "Unregistered colleges in GP and KZN offering 'Nursing' diplomas without SANC accreditation. They often use 'Global' or 'International' in their names.",
      source: 'Department of Higher Education (DHET)',
      date: '2024-04-20'
    },
    {
      id: 'alert-2',
      category: 'Healthcare',
      title: 'Fake HPCSA Inspectors',
      risk: 'High',
      description: "Scammers posing as HPCSA inspectors visiting private practices and demanding 'spot fines' for minor compliance issues.",
      source: 'HPCSA Official Notice',
      date: '2024-04-18'
    },
    {
      id: 'alert-3',
      category: 'Finance',
      title: "SARS 'Overdue Refund' Phishing",
      risk: 'Critical',
      description: "SMS and emails claiming you have a R12,500 refund from SARS. Links to a landing page that steals banking credentials.",
      source: 'SARS Scam Warning',
      date: '2024-04-15'
    },
    {
      id: 'alert-4',
      category: 'Legal',
      title: 'Ghost Conveyancers',
      risk: 'High',
      description: "Individuals claiming to be attorneys handling property transfers for low fees. They disappear once the 'transfer fee' is paid.",
      source: 'Legal Practice Council (LPC)',
      date: '2024-04-10'
    }
  ],
  // 🏛️ Official Resources & Authorities
  resources: {
    education: [
      { name: 'DHET Helpline', detail: 'Toll-Free Verification', link: 'https://www.dhet.gov.za/' },
      { name: 'SAQA Verification', detail: 'Qualification Checks', link: 'https://www.saqa.org.za/' },
      { name: 'CHE Council', detail: 'Higher Ed Accreditation', link: 'https://www.che.ac.za/' }
    ],
    medical: [
      { name: 'HPCSA Search', detail: 'Practitioner Registry', link: 'https://www.hpcsa.co.za/' },
      { name: 'Mediclinic Search', detail: 'Provider Verification', link: 'https://www.mediclinic.co.za/' },
      { name: 'Discovery Health', detail: 'Verified Provider Search', link: 'https://www.discovery.co.za/' }
    ],
    legal: [
      { name: 'LPC Registry', detail: 'Legal Practice Council', link: 'https://lpc.org.za/' },
      { name: 'LSSA Search', detail: 'Law Society of SA', link: 'https://www.lssa.org.za/' },
      { name: 'Fidelity Fund', detail: 'FFC Verification', link: 'https://www.fidfund.co.za/' }
    ]
  },
  // 🗣️ Citizens' Voices (Testimonials)
  testimonials: [
    {
      name: 'Thandiwe Nkosi',
      location: 'Soweto, GP',
      content: '"I was about to pay R5000 deposit for a nursing college in Joburg. Checked Sumbandila first and it was flagged as UNVERIFIED. This app saved my life savings!"',
      category: 'Financial Loss Avoided'
    },
    {
      name: 'Johannes van der Merwe',
      location: 'Bellville, WC',
      content: '"Used the legal registry to verify a \'consultant\' liquidating my business. Found out they weren\'t on the LPC list. Reported them immediately."',
      category: 'Fraud Exposure'
    },
    {
      name: 'Naledi Madiba',
      location: 'Polokwane, LP',
      content: '"As a student, I\'m always worried about my degree being valid. Verifying my institution here gave me total peace of mind for my future."',
      category: 'Career Security'
    }
  ]
};
