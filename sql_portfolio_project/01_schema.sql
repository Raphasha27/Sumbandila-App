-- =============================================
-- 1. DATABASE SCHEMA DESIGN
-- =============================================
-- Purpose: Defines the core structure of the Certification System.
-- Design Principle: 3rd Normal Form (3NF) to reduce redundancy.

-- 1.1 Institutions Table
-- Stores the authoritative bodies (Schools, Universities)
CREATE TABLE institutions (
    institution_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    registration_number VARCHAR(50) UNIQUE NOT NULL, -- Logical Key
    country VARCHAR(100) DEFAULT 'South Africa',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 1.2 Courses Table
-- Programs offered by institutions
CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    institution_id INT NOT NULL REFERENCES institutions(institution_id) ON DELETE CASCADE,
    course_name VARCHAR(150) NOT NULL,
    duration_months INT CHECK (duration_months > 0)
);

-- 1.3 Students Table
-- Individuals receiving education
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    institution_id INT NOT NULL REFERENCES institutions(institution_id), -- Primary affiliation
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 1.4 Enrollments Table
-- The many-to-many link between Students and Courses (with time context)
CREATE TABLE enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
    course_id INT NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    enrollment_date DATE DEFAULT CURRENT_DATE,
    completion_date DATE, -- NULL means currently studying
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropout')),
    
    -- Constraint: A student can't enroll in the same course twice at the same time
    UNIQUE(student_id, course_id, enrollment_date)
);

-- 1.5 Certificates Table
-- The final immutable record of achievement
CREATE TABLE certificates (
    certificate_id SERIAL PRIMARY KEY,
    enrollment_id INT NOT NULL REFERENCES enrollments(enrollment_id),
    certificate_number VARCHAR(100) UNIQUE NOT NULL, -- The Public Verification Key
    issue_date DATE DEFAULT CURRENT_DATE,
    is_revoked BOOLEAN DEFAULT FALSE,
    revocation_reason TEXT
);

-- =============================================
-- 2. PERFORMANCE OPTIMIZATION (INDEXES)
-- =============================================

-- High-traffic lookup field for public verification
CREATE INDEX idx_certificates_number ON certificates(certificate_number);

-- High-traffic lookup for login/search
CREATE INDEX idx_students_email ON students(email);

-- Join optimization for institution reporting
CREATE INDEX idx_enrollments_course ON enrollments(course_id);

-- =============================================
-- 3. REPORTING & ANALYTICS (VIEWS)
-- =============================================

-- 3.1 Public Verification View
-- Abstraction layer to hide internal IDs (PKs) from public API calls
CREATE OR REPLACE VIEW certificate_verification_view AS
SELECT 
    c.certificate_number,
    s.first_name,
    s.last_name,
    co.course_name,
    i.name AS institution_name,
    c.issue_date,
    CASE 
        WHEN c.is_revoked THEN 'REVOKED'
        ELSE 'VALID'
    END AS status
FROM certificates c
JOIN enrollments e ON c.enrollment_id = e.enrollment_id
JOIN students s ON e.student_id = s.student_id
JOIN courses co ON e.course_id = co.course_id
JOIN institutions i ON co.institution_id = i.institution_id;
