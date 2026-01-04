-- =============================================
-- 5. SEED DATA (POPULATION)
-- =============================================
-- Purpose: Populate with realistic test data for portfolio demonstration.

-- 5.1 Add Institutions
INSERT INTO institutions (name, registration_number, country) VALUES 
('Sumbandila Technical College', 'HE-2024-001', 'South Africa'),
('Cape Town School of Code', 'TC-9982-DEV', 'South Africa'),
('Global AI University', 'INT-AI-554', 'USA');

-- 5.2 Add Courses
INSERT INTO courses (institution_id, course_name, duration_months) VALUES
(1, 'Diploma in System Engineering', 24),
(1, 'Civil Engineering Basics', 12),
(2, 'Full Stack Web Development', 6),
(2, 'Data Science Bootcamp', 9);

-- 5.3 Add Students
INSERT INTO students (institution_id, first_name, last_name, date_of_birth, email) VALUES
(1, 'Koketso', 'Raphasha', '1998-05-27', 'koketso@example.com'),
(1, 'Thabo', 'Molefe', '2000-01-15', 'thabo.m@example.com'),
(2, 'Sarah', 'Connor', '1995-08-12', 'sarah.c@skynet.com');

-- 5.4 Enrollments (Successful)
INSERT INTO enrollments (student_id, course_id, enrollment_date, completion_date, status) VALUES
(1, 1, '2022-01-10', '2023-12-15', 'completed'), -- Koketso (Diploma)
(2, 2, '2023-01-15', '2023-12-01', 'completed'), -- Thabo (Basics)
(3, 3, '2024-01-01', NULL, 'active');           -- Sarah (Still Studying)

-- 5.5 Enrollments (Failed/Incomplete)
INSERT INTO enrollments (student_id, course_id, enrollment_date, completion_date, status) VALUES
(1, 4, '2023-06-01', NULL, 'dropout'); -- Koketso dropped out of Data Science

-- 5.6 Certificates
-- Valid Certs
INSERT INTO certificates (enrollment_id, certificate_number, issue_date) VALUES
(1, 'CERT-2023-KOK-001', '2024-01-05'),
(2, 'CERT-2023-THA-002', '2024-01-10');

-- Revoked Cert (Simulating a mistake or fraud discovery)
INSERT INTO certificates (enrollment_id, certificate_number, issue_date, is_revoked, revocation_reason) VALUES
(1, 'CERT-OLD-REPLACED', '2023-11-01', TRUE, 'Printed with incorrect name spelling');
