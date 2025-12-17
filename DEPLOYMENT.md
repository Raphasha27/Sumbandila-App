# Deployment Guide - Sumbandila App

This guide provides comprehensive deployment instructions for all components of the Sumbandila application.

## Table of Contents
- [Backend Deployment](#backend-deployment)
- [Expo Mobile App Deployment](#expo-mobile-app-deployment)
- [Admin Dashboard Deployment](#admin-dashboard-deployment)
- [Environment Variables](#environment-variables)
- [GitHub Actions Secrets](#github-actions-secrets)

## Backend Deployment

The backend consists of Node.js/Express microservices that can be deployed to various platforms.

### Option 1: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login and create app**
   ```bash
   heroku login
   heroku create sumbandila-backend
   ```

3. **Add PostgreSQL**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

4. **Deploy**
   ```bash
   git subtree push --prefix backend heroku main
   ```

### Option 2: AWS (Elastic Beanstalk)

1. **Install EB CLI**
   ```bash
   pip install awsebcli
   ```

2. **Initialize and deploy**
   ```bash
   cd backend
   eb init -p node.js sumbandila-backend
   eb create sumbandila-backend-env
   eb deploy
   ```

### Option 3: Docker (Self-hosted)

1. **Build and run with Docker Compose**
   ```bash
   cd docker
   docker-compose up -d
   ```

## Expo Mobile App Deployment

### Prerequisites
- Expo account (free at [expo.dev](https://expo.dev))
- Install EAS CLI: `npm install -g eas-cli`

### Setup EAS (Expo Application Services)

1. **Login to Expo**
   ```bash
   cd expo
   eas login
   ```

2. **Configure EAS**
   ```bash
   eas build:configure
   ```

3. **Build for iOS and Android**
   ```bash
   # Build for both platforms
   eas build --platform all
   
   # Or individual platforms
   eas build --platform ios
   eas build --platform android
   ```

4. **Submit to App Stores**
   ```bash
   # Submit to both stores
   eas submit --platform all
   
   # Or individual stores
   eas submit --platform ios
   eas submit --platform android
   ```

### OTA Updates (Over-The-Air)

Deploy updates without rebuilding:

```bash
cd expo
eas update --branch production --message "Bug fixes and improvements"
```

### Testing Builds

```bash
# Build for internal testing
eas build --profile preview --platform android
eas build --profile preview --platform ios
```

## Admin Dashboard Deployment

The admin dashboard can be deployed as a static site to various hosting platforms.

### Option 1: Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd admin-dashboard
   vercel
   ```

3. **Production deployment**
   ```bash
   vercel --prod
   ```

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**
   ```bash
   cd admin-dashboard
   netlify deploy
   ```

3. **Production deployment**
   ```bash
   netlify deploy --prod
   ```

### Option 3: GitHub Pages

1. **Add homepage to package.json**
   ```json
   "homepage": "https://raphasha27.github.io/sumbandila-app"
   ```

2. **Deploy**
   ```bash
   npm run deploy
   ```

## Environment Variables

### Backend (.env)
```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/sumbandila

# API Keys (replace with real values)
JWT_SECRET=your-secret-key-here
ENCRYPTION_KEY=your-encryption-key-here

# Services
AUTH_SERVICE_URL=http://localhost:3001
VERIFICATION_SERVICE_URL=http://localhost:3002

# External APIs
DOE_API_KEY=your-doe-api-key
HPCSA_API_KEY=your-hpcsa-api-key
LAW_SOCIETY_API_KEY=your-law-society-api-key

# CORS
ALLOWED_ORIGINS=http://localhost:8081,https://your-app.com

# Environment
NODE_ENV=production
PORT=5000
```

### Expo (app.json / eas.json)
```json
{
  "expo": {
    "extra": {
      "apiUrl": "https://your-backend-url.com",
      "environment": "production"
    }
  }
}
```

## GitHub Actions Secrets

Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):

### Required for Deployment
- `EXPO_TOKEN` - Get from [expo.dev/accounts/[username]/settings/access-tokens](https://expo.dev/settings/access-tokens)

### Optional (depending on hosting provider)

**For Heroku:**
- `HEROKU_API_KEY`
- `HEROKU_APP_NAME`
- `HEROKU_EMAIL`

**For AWS:**
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

**For Vercel:**
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

**For Netlify:**
- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`

## Deployment Checklist

Before deploying to production:

- [ ] Update all environment variables with production values
- [ ] Replace placeholder API keys with real credentials
- [ ] Enable HTTPS on all services
- [ ] Set up proper database backups
- [ ] Configure monitoring and logging
- [ ] Test all API endpoints in staging environment
- [ ] Build and test mobile apps on both iOS and Android
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure analytics
- [ ] Update CORS settings for production domains
- [ ] Review and enable GitHub branch protection rules
- [ ] Set up automated database migrations
- [ ] Configure CDN for static assets (if needed)

## Monitoring & Maintenance

### Recommended Tools
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics, Mixpanel
- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Performance**: New Relic, Datadog
- **Logs**: Loggly, Papertrail

### Regular Maintenance
1. Monitor error rates and fix critical issues
2. Review and update dependencies monthly
3. Backup database regularly
4. Review security vulnerabilities with `npm audit`
5. Monitor API rate limits and costs

## Support

For deployment issues:
1. Check the [GitHub Issues](https://github.com/Raphasha27/sumbandila-app/issues)
2. Review deployment logs in GitHub Actions
3. Check hosting provider documentation
