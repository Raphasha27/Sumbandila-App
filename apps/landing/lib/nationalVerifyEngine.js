import { supabase } from "./supabase";

/**
 * Live National Verification Engine (Supabase Powered)
 * 
 * Dynamically queries institutions and professionals from the central 
 * national registry database.
 */

export async function nationalVerify(query) {
  if (!query) return null;

  try {
    // 🏫 SEARCH INSTITUTIONS
    const { data: institution, error: instError } = await supabase
      .from("institutions")
      .select("*")
      .or(`name.ilike.%${query}%,registration_number.eq.${query}`)
      .maybeSingle();

    if (institution) {
      return {
        id: institution.id,
        name: institution.name,
        category: "Education",
        type: institution.type || "Educational Institution",
        status: institution.verified ? "VERIFIED" : "UNVERIFIED",
        standing: institution.verified ? "Active" : "Pending Audit",
        source: "Department of Higher Education & Training (DHET)",
        regNumber: institution.registration_number,
        accredited: institution.accredited
      };
    }

    // 🏥 SEARCH PROFESSIONALS
    const { data: professional, error: profError } = await supabase
      .from("professionals")
      .select("*")
      .or(`name.ilike.%${query}%,registration_number.eq.${query}`)
      .maybeSingle();

    if (professional) {
      return {
        id: professional.id,
        name: professional.name,
        category: professional.profession === 'Lawyer' ? "Legal" : "Healthcare",
        type: professional.profession || "Registered Professional",
        status: professional.verified ? "VERIFIED" : "BLOCKED",
        standing: professional.verified ? "Good Standing" : "Suspended",
        source: professional.authority || "National Council",
        regNumber: professional.registration_number
      };
    }
  } catch (err) {
    console.error("Registry Query Failure:", err);
  }

  // ❌ NOT FOUND FALLBACK (Demo Safe)
  return {
    name: query,
    status: "NOT FOUND",
    risk: "HIGH",
    message: "No record found in the national registry database. Proceed with caution.",
    source: "National Registry Service"
  };
}
