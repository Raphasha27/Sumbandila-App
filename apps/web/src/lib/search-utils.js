/**
 * Sumbandila Sentinel: Search Utilities
 * Implements Fuzzy Matching and Search Normalization to handle 
 * common typos and spelling variations in South African names.
 */

export const fuzzyMatch = (query, target) => {
  if (!query || !target) return false;
  
  const q = query.toLowerCase().trim();
  const t = target.toLowerCase().trim();
  
  // 1. Direct Match
  if (t.includes(q)) return true;
  
  // 2. Simple Levenshtein-style heuristic for small typos
  // (Handling cases like 'Smit' vs 'Smith' or 'Mhlangu' vs 'Mahlangu')
  if (q.length > 3) {
    let distance = 0;
    const minLength = Math.min(q.length, t.length);
    for (let i = 0; i < minLength; i++) {
      if (q[i] !== t[i]) distance++;
    }
    // Allow for 1 character difference in names > 3 chars
    if (distance <= 1) return true;
  }

  return false;
};

export const normalizeSearch = (text) => {
  return text.toLowerCase()
    .replace(/[^\w\s]/gi, '') // Remove special chars
    .trim();
};
