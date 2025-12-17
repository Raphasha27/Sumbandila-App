# Sumbandila Backend - Production Setup Guide

## Prerequisites
- Supabase account (free): https://supabase.com
- Node.js installed

## Setup Steps

### 1. Configure Supabase Database

1. **Log in to Supabase**: https://supabase.com/dashboard
2. **Click your `sumbandila_app` project** (or create a new one)
3. **Go to SQL Editor** (left sidebar)
4. **Run schema.sql**:
   - Copy contents of `backend/db/schema.sql`
   - Paste into SQL Editor
   - Click "Run"
   - Wait for success message
5. **Run seed.sql**:
   - Copy contents of `backend/db/seed.sql`
   - Paste into SQL Editor
   - Click "Run"
   - You should now have test data

### 2. Get Supabase Credentials

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy two values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: Long string starting with `eyJ...`

### 3. Create Environment File

1. In `backend/` folder, create a file named `.env` (no extension)
2. Add the following (replace with your values):

```env
SUPABASE_URL=https://uwhhgmrejwyqmcuf.supabase.co
SUPABASE_KEY=your_anon_key_from_supabase_here
JWT_SECRET=change-this-to-random-string-in-production-like-sdjf8923jdks
PORT=5000
NODE_ENV=development
```

**IMPORTANT**: 
- For `JWT_SECRET`, use a random string in production (e.g., generate with: `openssl rand -base64 32`)
- Never commit `.env` to Git (already in `.gitignore`)

### 4. Install Dependencies

```bash
cd backend
npm install
```

### 5. Start Backend

```bash
npm start
```

You should see:
```
✅ Sumbandila Backend (Production) running on port 5000
   Environment: development
   Database: Connected
```

### 6. Test API

Visit: http://localhost:5000

You should see healthy endpoint list.

**Test login**:
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sumbandila.com","password":"admin123"}'
```

Should return a JWT token.

## Common Issues

### "Missing Supabase environment variables"
- Make sure `.env` file exists in `backend/` folder
- Check that `SUPABASE_URL` and `SUPABASE_KEY` are set

### "Cannot connect to database"
- Verify Supabase project is **not paused** (go to dashboard and click "Restore")
- Check credentials are correct

### "Module not found errors"
- Run `npm install` in backend folder

## API Endpoints

### Public (No Auth Required)
- `GET /` - Health check
- `POST /api/register` - Create account
- `POST /api/login` - Get JWT token
- `GET /api/verify?type=doctor&q=Thabo` - Verify professional
- `GET /api/resources` - Get resources
- `GET /api/events` - Get events
- `POST /api/report` - Report fraud

### Protected (Requires JWT Token)
- `GET /api/messages` - Get chat messages
- `POST /api/messages` - Send message
- `GET /api/users` - Get users (admin only)

## Next Steps

1. Update Railway deployment with new environment variables
2. Test all endpoints
3. Update frontend to use JWT tokens
