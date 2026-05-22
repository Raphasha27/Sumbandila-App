# 🌐 Sumbandila Web Application

![Version](https://img.shields.io/badge/version-1.0.0-blue)

> Modern, responsive web application for the Sumbandila verification platform.

---

## 📋 Overview

The Sumbandila web application provides a fast, accessible interface for verifying South African institutions and professionals. Built with modern web technologies for optimal performance and user experience.

## 🚀 Features

- ⚡ Lightning-fast verification search
- 🎨 Modern, responsive UI with Tailwind CSS
- 🌙 Dark mode optimized
- ♿ Accessibility compliant (WCAG 2.1 AA)
- 📱 Mobile-first design
- 🔄 Real-time updates with React Query
- 🎭 Smooth animations with Framer Motion
- 🔒 Secure authentication with Supabase

## 🛠️ Tech Stack

### Core
- **React** 19.2.5 - UI library
- **Vite** ^8.0.8 - Build tool
- **TypeScript** - Type safety

### UI/UX
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **Lucide React** - Icons

### State & Data
- **Zustand** - State management
- **TanStack Query** - Server state
- **Supabase** - Backend & Auth

## 📦 Dependencies

| Package | Version |
|---------|--------|
| @supabase/supabase-js | ^2.103.0 |
| @tanstack/react-query | ^5.99.0 |
| clsx | * |
| framer-motion | * |
| lucide-react | ^1.8.0 |
| react | 19.2.5 |
| react-dom | 19.2.5 |
| tailwind-merge | * |
| zustand | * |


## 🏃 Getting Started

### Prerequisites

- Node.js >=22.0.0
- npm >=10.0.0

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Create a `.env` file in the `apps/web` directory:

```env
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📁 Project Structure

```
apps/web/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities and helpers
│   ├── stores/         # Zustand stores
│   ├── styles/         # Global styles
│   └── App.tsx         # Root component
├── public/             # Static assets
├── index.html          # HTML entry point
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies
```

## 🧪 Testing

```bash
# Run linter
npm run lint

# Run type check
npm run type-check
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker

```bash
# Build image
docker build -f docker/web.Dockerfile -t sumbandila-web .

# Run container
docker run -p 3000:3000 sumbandila-web
```

## 📊 Performance

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: < 200KB (gzipped)

## 🤝 Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for contribution guidelines.

## 📄 License

MIT License - see [LICENSE](../../LICENSE) for details.

---

**Last Updated**: 2026-05-22  
**Version**: 1.0.0  
**Branch**: main  
**Commit**: 15dd6f7
