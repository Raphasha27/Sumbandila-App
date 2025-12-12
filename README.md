# Sumbandila App (Starter code)

This zip contains:
- frontend/  -> Expo app (SDK 54.0.6) (React Native)
- backend/   -> Node/Express mock microservice

## How to Run on Another PC (e.g., at Home)

### 1. Prerequisites
- **Node.js**: Install the latest LTS version of Node.js from [nodejs.org](https://nodejs.org).
- **VS Code**: Recommended editor [code.visualstudio.com](https://code.visualstudio.com).
- **Git** (Optional but recommended): [git-scm.com](https://git-scm.com).

### 2. Move the Project
- **Option A (USB/Drive)**: Copy this entire `sumbandila_app` folder to a USB drive or upload it to Google Drive/OneDrive, then download it on your home PC.
- **Option B (GitHub)**: Initialize a git repo and push to GitHub (see below).

### 3. Setup & Run
1. Open the folder in VS Code on your home PC.
2. Open the terminal in VS Code (Ctrl+`).
3. specific commands:
   ```bash
   # 1. Install dependencies (do this once)
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   cd ..

   # 2. Run the App (Easy Way)
   # This runs both backend and frontend. 
   # Use 'start:tunnel' if you are on a different Wi-Fi than your PC.
   npm run start:tunnel
   ```

### 4. Connect with your Phone
- Install **Expo Go** from the Play Store / App Store.
- Scan the **QR Code** that appears in the terminal.
- **Troubleshooting**: If it loads forever, ensure you are running `npm run start:tunnel`.

### Configuration Note
- The file `frontend/config.js` contains the IP address of the backend.
- If you use `npm run start:tunnel`, the frontend works anywhere.
- **However**, the Backend is still on your PC's Local IP (`http://localhost:5000` or `172.x.x.x`). 
- If you need the *Backend* to be accessible from a different network, you may need to use **ngrok**.

This is a starter, production-ready architecture suggestion:
- Separate microservices (one per registry) behind an API gateway.
- Secure tokens/keys and HTTPS.
- Replace the mock dataset with real registry integrations (DOE, HPCSA, Law Society, etc.)
- Add authentication, auditing, and administrative dashboards for managing sources.

Good luck on your millionaire journey — this is the skeleton to start rapid development.
