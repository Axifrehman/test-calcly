#!/usr/bin/env node

// Cloudflare Pages build script
// This script prepares the app for static deployment

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Building for Cloudflare Pages...');

try {
  // Run the build
  console.log('📦 Building React app...');
  execSync('npm run build:pages', { stdio: 'inherit' });
  
  // Create _headers file for security
  const headersContent = `/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/*.js
  Cache-Control: max-age=31536000, immutable

/*.css
  Cache-Control: max-age=31536000, immutable

/*.png
  Cache-Control: max-age=31536000, immutable

/*.jpg
  Cache-Control: max-age=31536000, immutable

/*.ico
  Cache-Control: max-age=31536000, immutable`;

  fs.writeFileSync('dist/_headers', headersContent);
  
  // Create _redirects file for SPA routing
  const redirectsContent = `/*    /index.html   200`;
  fs.writeFileSync('dist/_redirects', redirectsContent);
  
  console.log('✅ Build complete! Ready for Cloudflare Pages deployment.');
  console.log('📁 Files are in the dist/ directory');
  console.log('🌐 Deploy with: wrangler pages deploy dist --project-name=calcly-world');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
