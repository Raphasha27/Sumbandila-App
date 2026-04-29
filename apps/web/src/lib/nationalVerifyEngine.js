/**
 * Sumbandila National Verification Engine (Demo V5)
 * 
 * This engine simulates a central trust registry system for South Africa,
 * verifying Education institutions, Healthcare professionals, and Legal practitioners.
 */

export function nationalVerify(query) {
  const db = [
    {
      id: "edu-001",
      name: "ABC College",
      type: "Education",
      status: "VERIFIED",
      standing: "Active",
      source: "Department of Higher Education & Training (DHET)",
      regNumber: "2021/HE07/001",
      accredited: true
    },
    {
      id: "edu-002",
      name: "Future Skills Institute",
      type: "Education",
      status: "UNVERIFIED",
      standing: "Pending",
      source: "Registry Audit Required",
      regNumber: "PENDING",
      accredited: false
    },
    {
      id: "edu-003",
      name: "Metro Tech Academy",
      type: "Education",
      status: "FLAGGED",
      standing: "Suspended",
      source: "Flagged Fraud / Quality Alert",
      regNumber: "EXPIRED-2023",
      accredited: false
    },
    {
      id: "health-001",
      name: "Dr. N. Mokoena",
      type: "Healthcare",
      status: "VERIFIED",
      standing: "Practising",
      source: "Health Professions Council of SA (HPCSA)",
      regNumber: "MP 0123456",
      specialization: "General Practitioner"
    },
    {
      id: "health-002",
      name: "Dr. Fakewell",
      type: "Healthcare",
      status: "BLOCKED",
      standing: "De-registered",
      source: "HPCSA Disciplinary Action",
      regNumber: "SUSPENDED",
      specialization: "Unknown"
    },
    {
      id: "health-003",
      name: "City Clinic",
      type: "Healthcare",
      status: "VERIFIED",
      standing: "Active License",
      source: "Department of Health",
      regNumber: "DOH-CL-778"
    },
    {
      id: "legal-001",
      name: "Mthembu Attorneys",
      type: "Legal",
      status: "VERIFIED",
      standing: "Good Standing",
      source: "Legal Practice Council (LPC)",
      regNumber: "LPC-GAU-9921",
      fidelityFund: "Current"
    },
    {
      id: "legal-002",
      name: "Legal Express SA",
      type: "Legal",
      status: "UNVERIFIED",
      standing: "Under Investigation",
      source: "LPC Public Complaint",
      regNumber: "UNKNOWN",
      fidelityFund: "Expired"
    },
    {
      id: "legal-003",
      name: "Fake Law Consultants",
      type: "Legal",
      status: "BLOCKED",
      standing: "Criminal Action",
      source: "Flagged Fraud / SAPS",
      regNumber: "NONE",
      fidelityFund: "None"
    }
  ];

  if (!query) return null;

  const match = db.find((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    (item.regNumber && item.regNumber.toLowerCase() === query.toLowerCase())
  );

  if (!match) {
    return {
      name: query,
      status: "NOT FOUND",
      risk: "HIGH",
      message: "No record found in the national registry. Proceed with extreme caution.",
      source: "National Registry Database"
    };
  }

  return {
    ...match,
    risk:
      match.status === "VERIFIED"
        ? "LOW"
        : match.status === "BLOCKED"
        ? "CRITICAL"
        : "MEDIUM",
  };
}
