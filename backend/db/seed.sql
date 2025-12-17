-- Seed data for testing
-- Run this after schema.sql

-- Insert test institutions
INSERT INTO institutions (institution_id, name, status, details, address, contact) VALUES
('SCH-1001', 'University of Cape Town (UCT)', true, 'Registered: DHET (001). Accredited: CHE. Courses: All Degree Programs.', 'Rondebosch, Cape Town', '021 650 9111'),
('SCH-1002', 'University of the Witwatersrand (Wits)', true, 'Registered: DHET (002). Accredited: CHE. Courses: Sci, Eng, Hum.', '1 Jan Smuts Ave, Braamfontein', '011 717 1000'),
('SCH-1003', 'University of Johannesburg (UJ)', true, 'Registered: DHET (003). Accredited: CHE.', 'Kingsway Campus, Auckland Park', '011 559 4555'),
('SCH-1004', 'Stellenbosch University', true, 'Registered: DHET (004). Accredited: CHE.', 'Stellenbosch Central', '021 808 9111'),
('SCH-1005', 'University of Pretoria (UP)', true, 'Registered: DHET (005). Accredited: CHE.', 'Lynnwood Rd, Hatfield', '012 420 3111'),
('SCH-1006', 'Damelin (Randburg)', false, 'Registration Cancelled / Lapsed. Not currently accredited for degrees.', 'Randburg, Johannesburg', '011 796 2000'),
('SCH-1007', 'Rosebank College (Braamfontein)', true, 'Registered: DHET. Accredited: IIE.', 'Braamfontein, Johannesburg', '011 403 2437'),
('SCH-1008', 'Sumbandila High School', true, 'Registered: Dept. of Education. Quintile 5.', 'Ridgeway, Johannesburg', '011 123 4567');

-- Insert test doctors
INSERT INTO professionals (professional_id, name, type, status, specialty, details, address, contact) VALUES
('DOC-2001', 'Dr. Thabo Mokoena', 'doctor', true, 'General Practitioner', 'HPCSA Reg: MP 0123456. Specialty: General Practitioner.', 'Sandton Medi-Clinic, Bryanston', '011 709 2000'),
('DOC-2002', 'Dr. Sarah Pillay', 'doctor', true, 'Cardiologist', 'HPCSA Reg: MP 0765432. Specialty: Cardiologist.', 'Netcare Milpark, Parktown', '011 480 5600'),
('DOC-2003', 'Dr. James Smith', 'doctor', true, 'Pediatrician', 'HPCSA Reg: MP 0987654. Specialty: Pediatrician.', 'Life Fourways Hospital', '011 875 1000'),
('DOC-2004', 'Mr. Bogus Doctor', 'doctor', false, NULL, 'ALERT: Not found in HPCSA Registry. Do not consult.', 'Unknown Location', 'N/A');

-- Insert test lawyers
INSERT INTO professionals (professional_id, name, type, status, specialty, details, address, contact) VALUES
('LAW-3001', 'Adv. Lerato Kgosi', 'lawyer', true, 'High Court Advocate', 'LPC Reg: 12345. Admitted: High Court of SA.', 'Chambers, Sandton', '011 883 1234'),
('LAW-3002', 'Mkhize Attorneys', 'lawyer', true, 'Commercial Law', 'LPC Firm Reg: F12345. Good Standing.', 'Marshalltown, JHB', '011 333 4444'),
('LAW-3003', 'Fake Law Firm', 'lawyer', false, NULL, 'ALERT: Practice number not valid.', 'Online Only', '0800 FAKE');

-- Insert test resources
INSERT INTO resources (title, type, url) VALUES
('Maths Guide Grade 12', 'PDF', '#'),
('Career Paths in Tech', 'Article', '#'),
('Bursary Application Tips', 'Video', '#');

-- Insert test events
INSERT INTO events (title, date, time, location) VALUES
('Science Fair Registration', '2025-12-12', '09:00 AM', 'Main Hall'),
('Math Olympiad', '2025-12-15', '10:00 AM', 'Room 3B'),
('End of Year Hike', '2025-12-20', '07:00 AM', 'Mountain Trail');

-- Insert admin user (password: admin123)
-- Note: This hash is for 'admin123' - change in production!
INSERT INTO users (name, email, password_hash, role) VALUES
('System Admin', 'admin@sumbandila.com', '$2a$10$XqJ9qR7ZcN9L8vK6P8Q7.eKHYP9T7Z5W6X4Y8Q7R5N6M7L8K9P0Q1', 'admin');
