export const MOCK_REGISTRY = [
  {
    id: "phei-01",
    name: "Boston City Campus & Business College",
    category: "Education",
    type: "Private HEI",
    reg: "1996/HE07/003",
    status: "Registered",
    standing: "Active",
  },
  {
    id: "phei-02",
    name: "Damelin (Pty) Ltd",
    category: "Education",
    type: "Private HEI",
    reg: "1991/HE07/005",
    status: "Suspended",
    standing: "Under Review",
  },
  {
    id: "doc-01",
    name: "Dr. Koketso Mabunda",
    category: "Healthcare",
    type: "Medical Practitioner",
    reg: "MP0721456",
    status: "Verified",
    standing: "Active",
  },
  {
    id: "law-01",
    name: "Adv. Sipho Zulu",
    category: "Legal",
    type: "Legal Practitioner",
    reg: "LPC-88214",
    status: "Verified",
    standing: "Active",
  }
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase();

  if (!query) return new Response(JSON.stringify({ error: "Query required" }), { status: 400 });

  const result = MOCK_REGISTRY.find(p => 
    p.name.toLowerCase().includes(query) || 
    p.reg.toLowerCase().includes(query)
  );

  if (!result) {
    return new Response(JSON.stringify({ 
      name: query, 
      status: "Not Found", 
      error: "No record found in the 2026 Registry." 
    }), { status: 200 });
  }

  return new Response(JSON.stringify(result), { status: 200 });
}
