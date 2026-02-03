export const MOCK_DATA = {
  providers: [
    // Education (Accredited)
    {
      id: "edu-1",
      name: "Boston City Campus",
      category: "Education",
      type: "Higher Education Institution",
      reg: "2001/HE07/006",
      status: "Registered",
      body: "CHE Accredited",
      courses: ["Business Management", "IT", "Marketing"],
      validUntil: "2026-12-31",
      risk: "Low"
    },
    {
      id: "edu-2",
      name: "University of Johannesburg",
      category: "Education",
      type: "Public University",
      reg: "U-1904-GP-01",
      status: "Registered",
      body: "DHET Recognized",
      courses: ["Engineering", "Humanities", "Health Sciences"],
      validUntil: "2030-01-01",
      risk: "Low"
    },
    // Education (Unverified/High Risk)
    {
      id: "edu-fake-1",
      name: "Global Elite Academy",
      category: "Education",
      type: "Private College",
      reg: "PENDING_CHECK",
      status: "Unverified",
      body: "Unknown Authority",
      courses: ["Quick Certification", "Business Fast-track"],
      validUntil: "N/A",
      risk: "High"
    },
    {
      id: "edu-fake-2",
      name: "South Star Technical",
      category: "Education",
      type: "Technical School",
      reg: "EXP-2022-ZA",
      status: "Expired",
      body: "QCTO (Past Accreditation)",
      courses: ["Mechanical Drafting"],
      validUntil: "2022-01-01",
      risk: "High"
    },
    // Healthcare (Accredited)
    {
      id: "med-1",
      name: "Dr. Thabo Mokoena",
      category: "Healthcare",
      type: "General Practitioner",
      reg: "MP 0567891",
      status: "Registered",
      body: "HPCSA Verified",
      specialization: "General Medicine",
      validUntil: "2025-12-31",
      risk: "Low"
    },
    // Healthcare (Suspended)
    {
      id: "med-bad-1",
      name: "Dr. Kevin Smith",
      category: "Healthcare",
      type: "Cosmetic Surgeon",
      reg: "MP 0112233",
      status: "Suspended",
      body: "HPCSA Inquiry",
      specialization: "Plastic Surgery",
      validUntil: "2023-05-10",
      risk: "Critical"
    },
    // Legal (Accredited)
    {
      id: "leg-1",
      name: "Adv. Sarah Jenkins",
      category: "Legal",
      type: "Legal Practitioner",
      reg: "LPC-889012",
      status: "Good Standing",
      body: "Legal Practice Council",
      expertise: "Commercial Law",
      validUntil: "2026-03-15",
      risk: "Low"
    },
    // Legal (High Risk)
    {
      id: "leg-bad-1",
      name: "Sol. Peter Moodley",
      category: "Legal",
      type: "Attorney",
      reg: "LPC-ERR-404",
      status: "De-registered",
      body: "Legal Practice Council",
      expertise: "Conveyancing",
      validUntil: "2021-12-31",
      risk: "High"
    }
  ],
  auth: {
    admin: {
      email: "admin@sumbandila.com",
      password: "admin123",
      name: "Dakalo Mashau",
      avatar: "DM",
      mobile: "+27 83 123 4567"
    }
  }
};
