# ADR 0010: Native Biometric Authentication (Mobile)

## Status
Accepted

## Context
Registry agents in the field handle sensitive national data. Password-only entry on mobile is prone to theft and shoulder-surfing. We need a "Level 5 Identity" check to ensure the physical presence of the authorized agent.

## Decision
We will implement **Native Biometric Authentication** using the `expo-local-authentication` library.

### Security Workflow:
1. **Hardware Check**: The app verifies if the device supports FaceID, TouchID, or Iris scanning.
2. **Identity Gate**: The primary "Scanner" and "Audit" actions are gated behind a mandatory biometric prompt.
3. **Fallback**: If biometrics fail, the system falls back to the secure device passcode (OS-level security).

## Consequences
- **Pros**: Strong non-repudiation, significantly higher mobile security posture, "Zero-Trust" at the edge.
- **Cons**: Requires modern hardware; agents on legacy devices will fallback to passcodes.
