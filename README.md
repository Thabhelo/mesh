# Mesh - Unified Public Safety Interoperability Platform

Mesh is an AI driven web experience that showcases a unified data layer for fire, police, EMS, and emergency management in Birmingham, Alabama. The site focuses on operational intelligence, interoperability, and ethical use of data.

## Project Overview

This repository contains the marketing and product explainer site for Mesh. It highlights:

- Real time interoperability challenges in Birmingham
- The Mesh Insight Engine for surge prediction, load balancing, and hazard analysis
- A privacy first, community focused approach to public safety technology
- Clear calls to action for agencies and partners who want to learn more

### Installation

1. Install dependencies

   ```bash
   npm install
   ```

2. Configure environment variables

   Create a `.env` file in the project root and set:

   ```text
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

4. Create a production build

   ```bash
   npm run build
   ```

## Available Scripts

- `npm run dev`  Start the Vite development server with hot reload
- `npm run build`  Build an optimized production bundle
- `npm run preview`  Preview the production build locally
- `npm run lint`  Run ESLint
- `npm run typecheck`  Run TypeScript type checking

## Data Model

The contact form writes to a Firestore collection named `contact_requests`.

Each document includes:

- `name`  string, required
- `email`  string, required
- `company`  string, optional
- `type`  string, one of `demo`, `partnership`, or `general`
- `message`  string, required
- `timestamp`  JavaScript Date set on submission

Authentication rules and access control should be configured in the Firebase console based on your deployment needs.


## Contact

- Email: `thabheloduve@gmail.com`
- Phone: `+1 (256) 375-4207`
- Location: Birmingham, Alabama, United States

## License

Proprietary - Mesh Platform 2025

