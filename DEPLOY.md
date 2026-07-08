# Deploy to GitHub Pages

## Steps

1. **Build with root base href:**

```bash
MSYS_NO_PATHCONV=1 npx ng build --base-href=/
```

2. **Add CNAME file for custom domain:**

```bash
echo "parkdiamondapartments.com" > dist/ParkDiamondAngular/browser/CNAME
```

3. **Deploy to gh-pages branch:**

```bash
npx gh-pages -d dist/ParkDiamondAngular/browser
```

## One-liner

```bash
MSYS_NO_PATHCONV=1 npx ng build --base-href=/ && echo "parkdiamondapartments.com" > dist/ParkDiamondAngular/browser/CNAME && npx gh-pages -d dist/ParkDiamondAngular/browser
```

## DNS Setup

Your domain DNS must point to GitHub Pages:

- **A records** (pick one approach):
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- **Or CNAME:** `diamondparkohrid.github.io`

## Notes

- `MSYS_NO_PATHCONV=1` is required on Git Bash (Windows) to prevent `/` from being converted to a local path.
- The CNAME file must be recreated after each build since the build output is cleaned.
