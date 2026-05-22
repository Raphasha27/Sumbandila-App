# 📱 Sumbandila Mobile Application

![Version](https://img.shields.io/badge/version-4.0.0-blue)

> Native mobile app for iOS and Android built with React Native and Expo.

---

## 📋 Overview

The Sumbandila mobile app brings verification capabilities to your pocket. Verify institutions and professionals on-the-go with a native mobile experience.

## 🚀 Features

- 📱 Native iOS & Android support
- 🔍 Quick verification search
- 🎙️ Voice report submission
- 🔐 Biometric authentication
- 🌍 5-language support
- 📊 Trust score visualization
- 🔔 Push notifications
- 📴 Offline mode support

## 🛠️ Tech Stack

### Core
- **React Native** 0.85.0 - Mobile framework
- **Expo** ~55.0.15 - Development platform
- **React** 19.2.5 - UI library

### Navigation
- **React Navigation** - Navigation library
- **Bottom Tabs** - Tab navigation
- **Native Stack** - Stack navigation

### UI/UX
- **Lucide React Native** - Icons
- **Expo Linear Gradient** - Gradients
- **React Native Gesture Handler** - Gestures

### Features
- **Expo Local Authentication** - Biometric auth
- **Zustand** - State management

## 📦 Dependencies

| Package | Version |
|---------|--------|
| @expo/ngrok | ^4.1.0 |
| @react-navigation/bottom-tabs | ^7.15.9 |
| @react-navigation/native | ^7.2.2 |
| @react-navigation/native-stack | ^7.14.11 |
| expo | ~55.0.15 |
| expo-linear-gradient | ~55.0.13 |
| expo-local-authentication | ~55.0.13 |
| expo-status-bar | ~55.0.5 |
| lucide-react-native | ^1.8.0 |
| react | 19.2.5 |
| react-native | 0.85.0 |
| react-native-gesture-handler | ~2.31.1 |
| react-native-safe-area-context | ~5.7.0 |
| react-native-screens | ~4.16.0 |
| react-native-svg | 15.12.1 |
| react-native-web | * |
| zustand | * |


## 🏃 Getting Started

### Prerequisites

- Node.js >=22.0.0
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
# Install dependencies
cd apps/mobile
npm install

# Start Expo development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

### Testing on Device

1. Install **Expo Go** app on your phone
2. Run `npm start`
3. Scan the QR code with:
   - iOS: Camera app
   - Android: Expo Go app

## 📁 Project Structure

```
apps/mobile/
├── screens/            # Screen components
│   ├── HomeScreen.js
│   ├── VerifyScreen.js
│   ├── ResultScreen.js
│   ├── ReportScreen.js
│   └── ProfileScreen.js
├── navigation/         # Navigation configuration
│   └── AppNavigator.js
├── assets/             # Images, fonts, etc.
├── App.js              # Root component
├── app.json            # Expo configuration
└── package.json        # Dependencies
```

## 🎨 Screens

### Home Screen
- Quick search
- Recent verifications
- Featured institutions

### Verify Screen
- Search input
- Language selector
- Voice input

### Result Screen
- Trust score display
- Verification details
- Blockchain hash
- Share functionality

### Report Screen
- Fraud report form
- Voice recording
- Anonymous submission

### Profile Screen
- User settings
- Language preferences
- Biometric settings

## 🚀 Deployment

### Build for Production

```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Build for both
eas build --platform all
```

### Submit to Stores

```bash
# Submit to App Store
eas submit --platform ios

# Submit to Play Store
eas submit --platform android
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run linter
npm run lint
```

## 🤝 Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for contribution guidelines.

## 📄 License

MIT License - see [LICENSE](../../LICENSE) for details.

---

**Last Updated**: 2026-04-15  
**Version**: 4.0.0  
**Branch**: main  
**Commit**: e59e945
