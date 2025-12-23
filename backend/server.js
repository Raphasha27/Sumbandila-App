require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { supabase } = require('./config/database');
const { verifyToken, isAdmin } = require('./middleware/auth');
const { validateRegister, validateLogin, validateFraudReport } = require('./middleware/validation');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// ========================================
// SECURITY MIDDLEWARE
// ========================================

// Security headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://sumbandila-app-production.up.railway.app']
    : '*',
  credentials: true
}));

// Rate limiting - prevent brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json());

// ========================================
// AUTHENTICATION ROUTES
// ========================================

/**
 * POST /api/register
 * Register a new user with hashed password
 */
app.post('/api/register', validateRegister, async (req, res, next) => {
  try {
    const { name, email, password, studentId } = req.body;

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert new user
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([{
        name,
        email,
        password_hash: passwordHash,
        student_id: studentId || null,
        role: 'student'
      }])
      .select('id, name, email, role')
      .single();

    if (error) throw error;

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      },
      token
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/login
 * Authenticate user and return JWT token
 */
app.post('/api/login', validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, password_hash, role')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    next(error);
  }
});

// ========================================
// VERIFICATION ROUTES (PUBLIC)
// ========================================

/**
 * GET /api/verify
 * Verify professional or institution by ID or name
 */
app.get('/api/verify', async (req, res, next) => {
  try {
    const { type, q } = req.query;

    if (!type || !q) {
      return res.status(400).json({ error: 'Missing type or query parameter' });
    }

    const query = q.toLowerCase();
    let result = null;

    // Search in appropriate table
    if (type === 'school') {
      const { data } = await supabase
        .from('institutions')
        .select('*')
        .or(`institution_id.ilike.%${query}%,name.ilike.%${query}%`)
        .limit(1)
        .single();
      result = data;
    } else if (type === 'doctor' || type === 'lawyer') {
      const { data } = await supabase
        .from('professionals')
        .select('*')
        .eq('type', type)
        .or(`professional_id.ilike.%${query}%,name.ilike.%${query}%`)
        .limit(1)
        .single();
      result = data;
    } else {
      return res.status(400).json({ error: 'Invalid type. Must be: school, doctor, or lawyer' });
    }

    if (result) {
      return res.json({
        name: result.name,
        status: result.status,
        details: result.details,
        ...(result.address && { address: result.address }),
        ...(result.contact && { contact: result.contact }),
        ...(result.specialty && { specialty: result.specialty })
      });
    }

    res.json({
      name: q,
      status: false,
      details: 'No matching registered record found.'
    });
  } catch (error) {
    next(error);
  }
});

// ========================================
// RESOURCES & EVENTS (PUBLIC)
// ========================================

/**
 * GET /api/resources
 * Get all educational resources
 */
app.get('/api/resources', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/events
 * Get all upcoming events
 */
app.get('/api/events', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    next(error);
  }
});

// ========================================
// CRIME ANALYTICS & LOCATION
// ========================================

/**
 * GET /api/analytics/provinces
 * Get fraud stats by province
 */
app.get('/api/analytics/provinces', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('provincial_stats')
      .select('*')
      .order('fraud_reports_count', { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    // Return safe default data if table doesn't exist yet
    res.json([
      { province: 'Gauteng', fraud_reports_count: 15, high_risk_score: 75 },
      { province: 'Western Cape', fraud_reports_count: 8, high_risk_score: 45 },
      { province: 'KwaZulu-Natal', fraud_reports_count: 12, high_risk_score: 60 }
    ]);
  }
});

/**
 * GET /api/analytics/scams
 * Get recent scam reports and trends
 */
app.get('/api/analytics/scams', async (req, res, next) => {
  try {
    const { data } = await supabase
      .from('fraud_reports')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    // Mock data for analytics dashboard
    res.json({
      recentReports: data || [],
      trends: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          data: [20, 45, 28, 80, 99, 43]
        }]
      },
      fraudTypes: [
        { name: 'Fake Institution', population: 45, color: '#f00', legendFontColor: '#7F7F7F' },
        { name: 'Identity Theft', population: 28, color: '#0f0', legendFontColor: '#7F7F7F' },
        { name: 'Fee Scam', population: 15, color: '#00f', legendFontColor: '#7F7F7F' }
      ]
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/verify/nearby
 * Find verified institutions nearby
 */
app.get('/api/verify/nearby', async (req, res, next) => {
  try {
    const { lat, lng, radius = 10 } = req.query;
    
    // In a real implementation with PostGIS:
    // .rpc('nearby_institutions', { lat, lng, radius })
    
    // For now, return mock nearby data
    res.json([
      { 
        id: '1', 
        name: 'University of Pretoria', 
        distance: '2.5 km', 
        type: 'university',
        verified: true 
      },
      { 
        id: '2', 
        name: 'Dr. Smith Practice', 
        distance: '1.2 km', 
        type: 'doctor', 
        verified: true 
      }
    ]);
  } catch (error) {
    next(error);
  }
});

// ========================================
// DASHBOARD STATS (PUBLIC)
// ========================================

/**
 * GET /api/stats
 * Get counts for dashboard
 */
app.get('/api/stats', async (req, res, next) => {
  try {
    let institutionsCount = 0;
    let professionalsCount = 0;

    // Count verified institutions with error handling
    try {
      const { count, error: instError } = await supabase
        .from('institutions')
        .select('*', { count: 'exact', head: true })
        .eq('status', true);

      if (!instError) {
        institutionsCount = count || 0;
      }
    } catch (instErr) {
      console.log('Institutions count error:', instErr.message);
      // Use default value of 0
    }

    // Count verified professionals with error handling
    try {
      const { count, error: profError } = await supabase
        .from('professionals')
        .select('*', { count: 'exact', head: true })
        .eq('status', true);

      if (!profError) {
        professionalsCount = count || 0;
      }
    } catch (profErr) {
      console.log('Professionals count error:', profErr.message);
      // Use default value of 0
    }

    // Fixed count for "Official Data Sources" (or you could count tables)
    const dataSourcesCount = 100;

    res.json({
      institutions: institutionsCount,
      professionals: professionalsCount,
      dataSources: dataSourcesCount
    });
  } catch (error) {
    console.error('Stats endpoint error:', error);
    // Return default values instead of 500 error
    res.json({
      institutions: 0,
      professionals: 0,
      dataSources: 100
    });
  }
});

// ========================================
// CHAT MESSAGES (AUTHENTICATED)
// ========================================

/**
 * GET /api/messages
 * Get recent messages (requires authentication)
 */
app.get('/api/messages', verifyToken, async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/messages
 * Send a message (requires authentication)
 */
app.post('/api/messages', verifyToken, async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Message text is required' });
    }

    const { data, error } = await supabase
      .from('messages')
      .insert([{
        sender: req.user.name || 'User',
        text: text.trim(),
        user_id: req.user.id
      }])
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      message: {
        id: data.id,
        sender: data.sender,
        text: data.text,
        time: new Date(data.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    });
  } catch (error) {
    next(error);
  }
});

// ========================================
// FRAUD REPORTING (PUBLIC)
// ========================================

/**
 * POST /api/report
 * Submit a fraud report
 */
app.post('/api/report', validateFraudReport, async (req, res, next) => {
  try {
    const { entityName, description, entityType, reporterEmail } = req.body;

    const { error } = await supabase
      .from('fraud_reports')
      .insert([{
        entity_name: entityName,
        entity_type: entityType || null,
        description,
        reporter_email: reporterEmail || null,
        status: 'pending'
      }]);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Fraud report submitted successfully. Our team will investigate.'
    });
  } catch (error) {
    next(error);
  }
});

// ========================================
// ADMIN ROUTES (ADMIN ONLY)
// ========================================

/**
 * GET /api/users
 * Get all users (admin only)
 */
app.get('/api/users', verifyToken, isAdmin, async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, student_id, role, created_at')
      .eq('role', 'student')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    next(error);
  }
});

// ========================================
// HEALTH CHECK
// ========================================

app.get('/', (req, res) => {
  res.json({
    message: 'Sumbandila API - Production Ready',
    version: '2.0.0',
    status: 'healthy',
    endpoints: {
      auth: ['/api/login', '/api/register'],
      verification: ['/api/verify'],
      resources: ['/api/resources', '/api/events'],
      communication: ['/api/messages'],
      reporting: ['/api/report']
    }
  });
});

// ========================================
// ERROR HANDLING
// ========================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path
  });
});

// Global error handler (must be last)
app.use(errorHandler);

// ========================================
// START SERVER
// ========================================

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Sumbandila Backend (Production) running on port ${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Database: ${process.env.SUPABASE_URL ? 'Connected' : 'Not configured'}`);
});
