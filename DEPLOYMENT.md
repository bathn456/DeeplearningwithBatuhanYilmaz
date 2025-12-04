# Firebase Deployment Guide

## Prerequisites
- Node.js and npm installed
- Firebase CLI installed (`npm install -g firebase-tools`)

## Deployment Steps

### 1. Login to Firebase
```bash
firebase login
```

### 2. Initialize Firebase (if needed)
The project is already configured with `firebase.json` and `.firebaserc`.

### 3. Test Locally
```bash
firebase serve
```
Then open `http://localhost:5000` in your browser to test.

### 4. Deploy to Firebase Hosting
```bash
firebase deploy
```

### 5. Access Your Site
After deployment completes, your site will be available at:
- **Primary URL**: https://deeplearningwithbatuhanyilmaz.web.app
- **Alternative URL**: https://deeplearningwithbatuhanyilmaz.firebaseapp.com

## Project Configuration
- **Project ID**: `deeplearningwithbatuhanyilmaz`
- **Public Directory**: `.` (current directory)
- **Hosting URL**: https://deeplearningwithbatuhanyilmaz.web.app

## Notes
- All `.jpg` images in the root directory will be deployed
- The site has caching headers configured for optimal performance
- SEO meta tags are already included in `index.html`
