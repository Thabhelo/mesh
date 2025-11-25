# Mesh - Unified Public Safety Interoperability Platform

Mesh is an AI driven web experience that showcases a unified data layer for fire, police, EMS, and emergency management in Birmingham, Alabama. The site focuses on operational intelligence, interoperability, and ethical use of data.

## Project Overview

This repository contains the marketing and product explainer site for Mesh. It highlights:

- Real time interoperability challenges in Birmingham
- The Mesh Insight Engine for surge prediction, load balancing, and hazard analysis
- A privacy first, community focused approach to public safety technology
- Clear calls to action for agencies and partners who want to learn more

## Project Structure

```text
src/
├── components/              Reusable UI pieces
│   ├── Header.tsx           Sticky glassmorphic navigation
│   ├── Footer.tsx           Footer with navigation and contact links
│   ├── PageLayout.tsx       Shared shell used by all pages
│   ├── Orb.tsx              Shader based orbital background
│   ├── NeonNetworkCanvas.tsx Network visualization on the platform page
│   ├── Section.tsx          Section utility and titles
│   └── FeatureCard.tsx      Generic card styling
├── pages/                   Top level routes
│   ├── Home.tsx             Landing page and hero
│   ├── Platform.tsx         Platform capabilities and integrations
│   ├── About.tsx            Team and mission
│   ├── Contact.tsx          Contact form and FAQ
│   ├── Privacy.tsx          Privacy Policy
│   └── Terms.tsx            Terms of Service
├── lib/
│   └── firebase.ts          Firebase and Firestore setup
├── providers/
│   └── app.tsx              App level providers
├── App.tsx                  Router configuration
├── main.tsx                 React entry point
└── index.css                Global styles and design tokens
```

## Key Pages

### Home

- Hero section with large orbital background and clear value proposition
- "Birmingham by the Numbers" market statistics
- Challenge framing and Mesh Insight Engine overview
- Ethics and privacy section that explains what Mesh does not do

### Platform

- Three core pillars of the Mesh platform
- "How it works" flow for connecting, normalizing, analyzing, and responding
- Integration capabilities across CAD, EPCR, EHR, transit, and other systems
- Key capabilities such as surge prediction, hazard analysis, and privacy first architecture

### About

- Story behind Mesh and why Birmingham is the starting point
- Mission, vision, values, and focus
- Team section for the founding group
- Roadmap for how the platform can scale over time


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

