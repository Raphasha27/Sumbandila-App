-- =============================================
-- 6. ANALYTICAL QUERIES (INTERVIEW SHOWCASE)
-- =============================================

-- Query 1: The "Public Verification" Lookup
-- Scenario: A QR Code scans 'CERT-2023-KOK-001'. Is it valid?
-- Technique: Simple SELECT on Indexed Column
SELECT * 
FROM certificate_verification_view
WHERE certificate_number = 'CERT-2023-KOK-001';

-- Query 2: Institution Performance Report
-- Scenario: Ministry of Education wants to know how many grads each school produces.
-- Technique: Aggregation with Multiple Joins (Inner Join)
SELECT 
    i.name AS Institution, 
    COUNT(c.certificate_id) AS Total_Graduates,
    COUNT(CASE WHEN c.is_revoked = TRUE THEN 1 END) AS Revoked_Certs
FROM institutions i
JOIN courses co ON i.institution_id = co.institution_id
JOIN enrollments e ON co.course_id = e.course_id
LEFT JOIN certificates c ON e.enrollment_id = c.enrollment_id
GROUP BY i.name
ORDER BY Total_Graduates DESC;

-- Query 3: "Ghost Student" Detection
-- Scenario: Find active students who have been enrolled for longer than the course duration allows (potential dropouts).
-- Technique: Date Arithmetic and Subquery
SELECT 
    s.first_name, 
    s.last_name, 
    co.course_name, 
    e.enrollment_date,
    co.duration_months
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses co ON e.course_id = co.course_id
WHERE e.status = 'active'
AND e.enrollment_date < (CURRENT_DATE - (co.duration_months || ' months')::INTERVAL);

-- Query 4: Audit Trail Inspection
-- Scenario: Who revoked certificates recently?
SELECT 
    cal.changed_at,
    c.certificate_number,
    cal.old_status,
    cal.new_status
FROM cert_audit_log cal
JOIN certificates c ON cal.certificate_id = c.certificate_id
ORDER BY cal.changed_at DESC;
