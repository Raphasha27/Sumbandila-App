const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Mock dataset -- replace with real database or API calls in production
// Mock dataset -- Realistic SA Data
const schools = [
  { id: 'SCH-1001', name: 'University of Cape Town (UCT)', status: true, details: 'Registered: DHET (001). Accredited: CHE. Courses: All Degree Programs.', address: 'Rondebosch, Cape Town', contact: '021 650 9111' },
  { id: 'SCH-1002', name: 'University of the Witwatersrand (Wits)', status: true, details: 'Registered: DHET (002). Accredited: CHE. Courses: Sci, Eng, Hum.', address: '1 Jan Smuts Ave, Braamfontein', contact: '011 717 1000' },
  { id: 'SCH-1003', name: 'University of Johannesburg (UJ)', status: true, details: 'Registered: DHET (003). Accredited: CHE.', address: 'Kingsway Campus, Auckland Park', contact: '011 559 4555' },
  { id: 'SCH-1004', name: 'Stellenbosch University', status: true, details: 'Registered: DHET (004). Accredited: CHE.', address: 'Stellenbosch Central', contact: '021 808 9111' },
  { id: 'SCH-1005', name: 'University of Pretoria (UP)', status: true, details: 'Registered: DHET (005). Accredited: CHE.', address: 'Lynnwood Rd, Hatfield', contact: '012 420 3111' },
  { id: 'SCH-1006', name: 'Damelin (Randburg)', status: false, details: 'Registration Cancelled / Lapsed. Not currently accredited for degrees.', address: 'Randburg, Johannesburg', contact: '011 796 2000' },
  { id: 'SCH-1007', name: 'Rosebank College (Braamfontein)', status: true, details: 'Registered: DHET. Accredited: IIE.', address: 'Braamfontein, Johannesburg', contact: '011 403 2437' },
  { id: 'SCH-1008', name: 'Sumbandila High School', status: true, details: 'Registered: Dept. of Education. Quintile 5.', address: 'Ridgeway, Johannesburg', contact: '011 123 4567' }
];

const doctors = [
  { id: 'DOC-2001', name: 'Dr. Thabo Mokoena', status: true, details: 'HPCSA Reg: MP 0123456. Specialty: General Practitioner.', address: 'Sandton Medi-Clinic, Bryanston', contact: '011 709 2000' },
  { id: 'DOC-2002', name: 'Dr. Sarah Pillay', status: true, details: 'HPCSA Reg: MP 0765432. Specialty: Cardiologist.', address: 'Netcare Milpark, Parktown', contact: '011 480 5600' },
  { id: 'DOC-2003', name: 'Dr. James Smith', status: true, details: 'HPCSA Reg: MP 0987654. Specialty: Pediatrician.', address: 'Life Fourways Hospital', contact: '011 875 1000' },
  { id: 'DOC-2004', name: 'Mr. Bogus Doctor', status: false, details: 'ALERT: Not found in HPCSA Registry. Do not consult.', address: 'Unknown Location', contact: 'N/A' }
];

const lawyers = [
  { id: 'LAW-3001', name: 'Adv. Lerato Kgosi', status: true, details: 'LPC Reg: 12345. Admitted: High Court of SA.', address: 'Chambers, Sandton', contact: '011 883 1234' },
  { id: 'LAW-3002', name: 'Mkhize Attorneys', status: true, details: 'LPC Firm Reg: F12345. Good Standing.', address: 'Marshalltown, JHB', contact: '011 333 4444' },
  { id: 'LAW-3003', name: 'Fake Law Firm', status: false, details: 'ALERT: Practice number not valid.', address: 'Online Only', contact: '0800 FAKE' }
];
// Mock User Store
const users = [
  { id: 999, name: 'System Admin', email: 'admin@sumbandila.com', password: 'admin123', role: 'admin' }
];

// Mock Resources
const resources = [
  { id: 1, title: 'Maths Guide Grade 12', type: 'PDF', url: '#' },
  { id: 2, title: 'Career Paths in Tech', type: 'Article', url: '#' },
  { id: 3, title: 'Bursary Application Tips', type: 'Video', url: '#' }
];

app.post('/api/register', (req, res) => {
  const { name, email, password, studentId } = req.body;
  if (!email || !password) return res.json({ error: 'Missing fields' });
  const exists = users.find(u => u.email === email);
  if (exists) return res.json({ error: 'User already exists' });

  const newUser = { id: Date.now(), name, email, password, studentId, role: 'student' };
  users.push(newUser);
  res.json({ success: true, user: { name, email, role: 'student' } });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true, user: { name: user.name, email: user.email, role: user.role } });
  } else {
    res.json({ error: 'Invalid credentials' });
  }
});

app.get('/api/resources', (req, res) => res.json(resources));

app.get('/api/users', (req, res) => {
  res.json(users.filter(u => u.role === 'student'));
});
// Mock Events
const events = [
  { id: 1, title: 'Science Fair Registration', date: '2025-12-12', time: '09:00 AM', location: 'Main Hall' },
  { id: 2, title: 'Math Olympiad', date: '2025-12-15', time: '10:00 AM', location: 'Room 3B' },
  { id: 3, title: 'End of Year Hike', date: '2025-12-20', time: '07:00 AM', location: 'Mountain Trail' }
];

// Mock Chat Messages
const messages = [
  { id: 1, sender: 'Mr. Smith', text: 'Don\'t forget your assignment due tomorrow!', time: '10:30 AM' },
  { id: 2, sender: 'Thabo', text: 'Are we meeting for study group?', time: '11:00 AM' }
];

app.get('/api/events', (req, res) => res.json(events));
app.get('/api/messages', (req, res) => res.json(messages));

app.post('/api/messages', (req, res) => {
  const { text, user } = req.body;
  if (!text) return res.json({ error: 'No text' });
  const newMsg = { id: Date.now(), sender: user || 'Me', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
  messages.push(newMsg);
  res.json({ success: true, message: newMsg });
});

app.get('/api/verify', (req, res) => {
  const { type, q } = req.query;
  if (!type || !q) return res.json({ error: 'Missing type or q parameter' });
  const dataset = type === 'doctor' ? doctors : type === 'lawyer' ? lawyers : schools;
  const qlower = q.toLowerCase();
  // find by id or name contains
  const found = dataset.find(x => x.id.toLowerCase() === qlower || x.name.toLowerCase().includes(qlower));
  if (found) return res.json(found);
  return res.json({ name: q, status: false, details: 'No matching registered record found.' });
});

app.post('/api/report', (req, res) => {
  const { entityName, description } = req.body;
  console.log(`[REPORT] Fraud reported for ${entityName}: ${description}`);
  res.json({ success: true });
});

app.get('/', (req, res) => res.send('Sumbandila verification microservice'));

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  // Open browser automatically (Windows)
  const { exec } = require('child_process');
  exec(`start http://localhost:${PORT}`);
});
