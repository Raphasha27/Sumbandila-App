# 🔐 GitHub Verification Setup

To achieve the **"Verified"** badge for your high-integrity commits, you must add the generated SSH Signing Key to your GitHub account.

## 1. Copy Your Signing Key
The following key has been generated for `raphashakoketso69@gmail.com`:

```text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIL3c+FQEkjItS6gR6jycJYfcKI/F1OcDZieYuO+rMX/m raphashakoketso69@gmail.com
```

## 2. Add to GitHub
1. Go to **Settings** > **SSH and GPG keys**.
2. Click **New SSH key**.
3. **Title**: `Sumbandila Sentinel Signing Key`.
4. **Key Type**: Select **Signing Key** (Critical!).
5. **Key**: Paste the key above.
6. Click **Add SSH key**.

## 3. Local Verification Strategy
Since this is a high-security monorepo, we enforce cryptographic signing.
If you pull this repo to a new machine, run:

```powershell
git config --global gpg.format ssh
git config --global user.signingkey "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIL3c+FQEkjItS6gR6jycJYfcKI/F1OcDZieYuO+rMX/m raphashakoketso69@gmail.com"
git config --global commit.gpgsign true
```

Once added to GitHub, all future commits (and the `WHITE_PAPER.md` authorship) will carry the **Verified** badge.
