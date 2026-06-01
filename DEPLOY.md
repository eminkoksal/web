# Deploying eminkoksal.com

Everything is built and committed. Three phases: **push → enable Pages → point DNS.**

---

## 1. Push to GitHub  (you do this once)

The repo `https://github.com/eminkoksal/web` already exists and is empty.
You need a **Personal Access Token** to push (GitHub no longer accepts passwords).

1. Create a token: <https://github.com/settings/tokens?type=beta>
   → **Generate new token (fine-grained)**
   - **Repository access:** Only select repositories → `web`
   - **Permissions:** Repository permissions → **Contents → Read and write**
   - Generate, then copy the token (starts with `github_pat_…`).

2. In Terminal:

   ```bash
   cd "/Users/eminkoksal/Library/Mobile Documents/com~apple~CloudDocs/Coding/My Digital Identity/web"
   git push -u origin main
   ```

   When prompted:
   - **Username:** `eminkoksal`
   - **Password:** paste the token

   macOS Keychain saves it, so you won't be asked again.

---

## 2. Enable GitHub Pages  (build & host)

In the repo on github.com → **Settings → Pages**:

- **Build and deployment → Source:** select **GitHub Actions**.

That's it. The included workflow (`.github/workflows/deploy.yml`) builds the site and
publishes it every time you push to `main`. Watch the first run under the repo's
**Actions** tab — it takes ~1–2 minutes. When it's green, the site is live at the
temporary URL and ready for the custom domain.

---

## 3. Point eminkoksal.com at GitHub Pages  (DNS at Squarespace)

Squarespace is only the **registrar** here, so we just edit DNS records.

### a. In Squarespace
**Domains → eminkoksal.com → DNS / DNS Settings → Custom Records.**

**Remove** any existing records that point the root domain elsewhere (old A records,
parking, or `@` ALIAS records left from WordPress).

**Add these records:**

| Type  | Host  | Value                 |
|-------|-------|-----------------------|
| A     | `@`   | `185.199.108.153`     |
| A     | `@`   | `185.199.109.153`     |
| A     | `@`   | `185.199.110.153`     |
| A     | `@`   | `185.199.111.153`     |
| CNAME | `www` | `eminkoksal.github.io` |

(Optional IPv6 — add if Squarespace allows AAAA records:)

| Type | Host | Value                  |
|------|------|------------------------|
| AAAA | `@`  | `2606:50c0:8000::153`  |
| AAAA | `@`  | `2606:50c0:8001::153`  |
| AAAA | `@`  | `2606:50c0:8002::153`  |
| AAAA | `@`  | `2606:50c0:8003::153`  |

> The `www` CNAME uses `eminkoksal.github.io` (your GitHub username), **not** the repo
> name. GitHub routes the domain to this repo because of the `CNAME` file in the build.

### b. Back in GitHub → Settings → Pages
- **Custom domain:** enter `eminkoksal.com` → **Save**.
  (A DNS check runs; it may show a warning until DNS propagates — that's normal.)
- Once the check passes, tick **Enforce HTTPS** (GitHub auto-issues the certificate;
  can take from a few minutes up to ~24h after DNS resolves).

DNS changes usually propagate within 15–60 minutes (up to 24h worst case).

---

## Updating the site later

Edit files under `src/` (the React pages) or `content/`, then:

```bash
git add -A && git commit -m "Update copy" && git push
```

The deploy workflow rebuilds and republishes automatically.
