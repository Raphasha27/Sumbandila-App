# Sumbandila Frontend (Expo SDK 54)

This is a starter Expo app (SDK 54.0.6). It provides:
- Search input to query the backend verification microservice
- Barcode/QR scanner screen (using expo-barcode-scanner)
- Web support via `expo start --web`

API base: default in app code points at `http://10.0.2.2:4000` for Android emulator.
- On iOS simulator use `http://localhost:4000`
- On web use `http://localhost:4000`

To run:
1. Install dependencies: `npm install`
2. Start Expo: `npm run start`
3. Open on web: `npm run web`
4. Or use Expo Go for Android/iOS to test.

Note: Replace mock backend with production verification APIs to connect to official registries.
