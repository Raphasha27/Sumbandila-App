/**
 * AI Trust Scoring Layer (Demo V5)
 * 
 * Provides automated risk assessment and trust scoring for registry entities.
 */

export function calculateTrustScore(entity) {
  let score = 50; // Neutral base

  if (!entity || entity.status === "NOT FOUND") {
    return {
      score: 15,
      level: "HIGH RISK",
      color: "#EF4444",
      analysis: "Entity not found in official databases. High probability of fraudulent representation."
    };
  }

  // Positive Factors
  if (entity.status === "VERIFIED") score += 35;
  if (entity.standing === "Active" || entity.standing === "Practising" || entity.standing === "Good Standing") score += 10;
  if (entity.accredited) score += 5;
  if (entity.fidelityFund === "Current") score += 5;

  // Negative Factors
  if (entity.status === "BLOCKED") score = 0;
  if (entity.status === "UNVERIFIED") score -= 20;
  if (entity.standing === "Under Investigation") score -= 15;
  if (entity.standing === "Suspended") score -= 30;

  // Clamp score
  score = Math.max(0, Math.min(100, score));

  return {
    score,
    level:
      score >= 80
        ? "TRUSTED"
        : score >= 40
        ? "CAUTION"
        : "CRITICAL RISK",
    color:
      score >= 80
        ? "#10B981"
        : score >= 40
        ? "#F59E0B"
        : "#EF4444",
    analysis: getAIAnalysis(score, entity)
  };
}

function getAIAnalysis(score, entity) {
  if (score >= 80) return `Entity "${entity.name}" is fully authenticated by the ${entity.source}. All records indicate good standing and active accreditation.`;
  if (score >= 40) return `Manual verification recommended. "${entity.name}" exists in the system but has pending updates or minor registry inconsistencies.`;
  return `ALERT: ${entity.name} is currently ${entity.status.toLowerCase()} by national authorities. Do not engage or submit payment to this entity.`;
}
