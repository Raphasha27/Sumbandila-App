# Contributing to Sumbandila

Thank you for your interest in contributing to Sumbandila! This document provides guidelines and instructions for contributing.

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/Raphasha27/sumbandila-app.git
   cd sumbandila-app
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend && npm install && cd ..
   
   # Expo
   cd expo && npm install && cd ..
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env` in backend directory
   - Update with your local configuration

4. **Run the application**
   ```bash
   # Backend
   cd backend && npm start
   
   # Expo (in another terminal)
   cd expo && npm start
   ```

## Branching Strategy

- `main` - Production-ready code
- `develop` - Development branch for integration
- Feature branches: `feature/your-feature-name`
- Bug fixes: `bugfix/issue-description`
- Hotfixes: `hotfix/critical-fix`

## Pull Request Process

1. Create a feature branch from `develop`
2. Make your changes
3. Ensure all tests pass
4. Update documentation if needed
5. Submit PR to `develop` branch
6. Wait for code review and CI checks

## Code Style

- Use ESLint for JavaScript/TypeScript
- Follow existing code patterns
- Write meaningful commit messages
- Add comments for complex logic

## Testing

- Write unit tests for new features
- Ensure integration tests pass
- Test on both iOS and Android for mobile changes

## Reporting Issues

Use GitHub Issues with:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
