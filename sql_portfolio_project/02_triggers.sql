-- =============================================
-- 4. BUSINESS LOGIC & AUTOMATION
-- =============================================

-- 4.1 Trigger Function: Uniqueness Generator (Optional - mock logic)
-- In a real app, this is often handled by UUIDs or App Logic. 
-- Here we trust the app to send the cert number or auto-generate it.

-- 4.2 Trigger Function: Completion Integrity Check
-- GOAL: Prevent Human Error. An admin should not be able to issue a certificate
-- for a student who has not marked the course as 'completed' or has no completion_date.

CREATE OR REPLACE FUNCTION check_completion_before_cert()
RETURNS TRIGGER AS $$
DECLARE
    enrollment_status VARCHAR;
    enrollment_finish_date DATE;
BEGIN
    -- Fetch the status and date for the enrollment associated with this new certificate
    SELECT status, completion_date 
    INTO enrollment_status, enrollment_finish_date
    FROM enrollments 
    WHERE enrollment_id = NEW.enrollment_id;

    -- Rule 1: Course must be marked 'completed'
    IF enrollment_status != 'completed' THEN
        RAISE EXCEPTION 'Business Rule Violation: Cannot issue certificate for incomplete enrollment (Status: %)', enrollment_status;
    END IF;

    -- Rule 2: Completion date must exist
    IF enrollment_finish_date IS NULL THEN
        RAISE EXCEPTION 'Business Rule Violation: Enrollment has no completion date record.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Bind Trigger to Table
CREATE TRIGGER trg_verify_completion
BEFORE INSERT ON certificates
FOR EACH ROW
EXECUTE FUNCTION check_completion_before_cert();


-- 4.3 Trigger Function: Audit Revocations
-- GOAL: Access Control / Audit Trail. Track specific changes.

CREATE TABLE IF NOT EXISTS cert_audit_log (
    log_id SERIAL PRIMARY KEY,
    certificate_id INT,
    old_status BOOLEAN,
    new_status BOOLEAN,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION log_revocation_change()
RETURNS TRIGGER AS $$
BEGIN
    -- Only log if the revocation status CHANGED
    IF OLD.is_revoked IS DISTINCT FROM NEW.is_revoked THEN
        INSERT INTO cert_audit_log (certificate_id, old_status, new_status)
        VALUES (NEW.certificate_id, OLD.is_revoked, NEW.is_revoked);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_audit_revocation
AFTER UPDATE ON certificates
FOR EACH ROW
EXECUTE FUNCTION log_revocation_change();
