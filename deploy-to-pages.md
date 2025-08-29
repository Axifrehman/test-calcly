# Cloudflare Pages Deployment Guide

Aap ka calculator app Cloudflare Pages par deploy karne ke liye ye steps follow kariye:

## Method 1: GitHub Integration (Recommended)

### Step 1: GitHub Repository Setup
1. Apna code GitHub par push kariye
2. Cloudflare Dashboard me jaiye: https://dash.cloudflare.com
3. "Pages" section me jaiye
4. "Create a project" click kariye
5. "Connect to Git" choose kariye
6. Apna GitHub repository select kariye

### Step 2: Build Configuration
Build settings me ye values set kariye:

```
Framework preset: React
Build command: npm run build:pages
Build output directory: dist
```

### Step 3: Environment Variables (Optional)
Agar future me API keys chahiye to Pages dashboard me add kar sakte hain.

## Method 2: Direct Upload

### Step 1: Build Locally
```bash
npm run build:pages
```

### Step 2: Upload to Pages
1. Cloudflare Dashboard > Pages
2. "Upload assets" choose kariye
3. `dist` folder upload kariye
4. Project name enter kariye (jaise: calcly-world)

## Method 3: Wrangler CLI

### Step 1: Install Wrangler (agar nahi hai)
```bash
npm install -g wrangler
```

### Step 2: Login
```bash
wrangler login
```

### Step 3: Deploy
```bash
npm run build:pages
wrangler pages deploy dist --project-name=calcly-world
```

## Important Notes:

1. **Custom Domain**: Deploy ke baad Pages dashboard me custom domain add kar sakte hain
2. **SSL**: Cloudflare automatically SSL certificate provide karega
3. **CDN**: Global CDN ke saath fast loading
4. **Free Tier**: 500 builds per month free hain
5. **Analytics**: Built-in web analytics available hai

## Build Output:
Build successful hone ke baad `dist` folder me ye files hongi:
- `index.html` - Main page
- `assets/` - CSS, JS, images
- All static calculator pages

## Performance:
- Global CDN edge locations
- Lightning fast loading
- Mobile optimized
- SEO friendly

Deployment complete hone ke baad aap ko `*.pages.dev` URL milega jo production-ready hoga!
