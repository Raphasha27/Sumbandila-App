# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of Sumbandila seriously. If you discover a security vulnerability, please follow these steps:

1. **Do NOT** open a public issue
2. Email details to: admin@sumbandila.com
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity (Critical: 7 days, High: 14 days, Medium: 30 days)

## Security Best Practices

When contributing to this project:

- Never commit credentials, API keys, or secrets
- Use environment variables for sensitive data
- Follow secure coding practices
- Keep dependencies up to date
- Run security scans before submitting PRs

## Security Features

- JWT-based authentication
- Role-based access control (RBAC)
- Encrypted data transmission
- Input validation with Pydantic
- SQL injection prevention
- XSS protection

Thank you for helping keep Sumbandila secure!
