# Sumbandila - Full MVP Application

A comprehensive platform for professional verification and accreditation management.

## Project Structure

- **expo/** - Expo SDK 54 frontend mobile app
- **backend/** - FastAPI microservices (auth-service, verification-service)
- **admin-dashboard/** - Admin UI starter
- **docker/** - Docker Compose configuration with Postgres
- **branding/** - Logo SVG and brand color tokens
- **.github/** - CI/CD workflow configuration

## How to Run

### Prerequisites
- **Node.js**: Latest LTS version from [nodejs.org](https://nodejs.org)
- **Python 3.9+**: For backend services
- **Docker** (Optional): For containerized deployment
- **VS Code**: Recommended editor [code.visualstudio.com](https://code.visualstudio.com)
- **Git**: [git-scm.com](https://git-scm.com)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Raphasha27/sumbandila-app.git
   cd sumbandila-app
   ```

2. **Install dependencies**
   ```bash
   # Expo app
   cd expo && npm install
   
   # Backend services
   cd ../backend
   pip install -r requirements.txt
   ```

3. **Run the application**
   
   **Mobile App (Expo):**
   ```bash
   cd expo
   npm start
   # Or for tunnel access: npx expo start --tunnel
   ```
   
   **Backend Services:**
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

### Connect with Your Phone
- Install **Expo Go** from Play Store / App Store
- Scan the **QR Code** in the terminal
- **Troubleshooting**: If loading forever, use `npx expo start --tunnel`

### Docker Deployment
```bash
cd docker
docker-compose up
```

## Configuration

- Backend API configuration: `backend/.env`
- Frontend config: `expo/config.js`
- For remote access, use Expo tunnel mode or ngrok for backend

## Production Deployment

This is a developer skeleton. Before production:
- Replace placeholder secrets with secure credentials
- Implement proper database models and migrations
- Secure all authentication endpoints
- Integrate with real accreditation APIs (DOE, HPCSA, Law Society, etc.)
- Enable HTTPS and implement API gateway
- Add proper authentication, authorization, and auditing
- Set up administrative dashboards for source management

## Architecture Recommendations

- Separate microservices per registry behind an API gateway
- Secure all tokens/keys and enforce HTTPS
- Replace mock data with real registry integrations
- Implement comprehensive logging and monitoring

---

**IMPORTANT**: This is a starter template. Ensure all security best practices are followed before deploying to production.
