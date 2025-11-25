# Mesh - Unified Public Safety Interoperability Platform

AI-powered real-time data integration connecting fire, police, EMS, and emergency management for coordinated emergency response in Birmingham, Alabama.

## Project Overview

Mesh is a comprehensive web platform that unifies fragmented emergency response systems across Birmingham's public safety agencies. The platform provides:

- **Real-time data integration** across 14+ independent dispatch centers
- **AI-powered operational intelligence** for surge prediction, resource load balancing, and hazard analysis
- **Privacy-first architecture** with zero surveillance and no individual-level prediction
- **Seamless integrations** with existing CAD, EPCR, EHR, and transit systems

## Technology Stack

- **Frontend Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM 7.9
- **Animation**: Framer Motion 12.23
- **UI Components**: lucide-react icons
- **Backend/Database**: Supabase (PostgreSQL)
- **Deployment Ready**: Production-optimized build

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Header.tsx       # Navigation header
│   ├── Footer.tsx       # Footer with contact info
│   ├── PageLayout.tsx   # Wrapper for all pages
│   ├── Orb.tsx          # Interactive orb animation
│   ├── Section.tsx      # Section wrapper utility
│   ├── FeatureCard.tsx  # Reusable feature card
│   └── CTA.tsx          # Call-to-action button
├── pages/               # Route pages
│   ├── Home.tsx         # Landing page
│   ├── Platform.tsx     # Platform features overview
│   ├── About.tsx        # Company information
│   └── Contact.tsx      # Contact form with Supabase
├── lib/                 # Utilities and configuration
│   └── supabase.ts      # Supabase client setup
├── providers/           # Context providers
│   └── app.tsx          # Theme and app provider
├── App.tsx              # Router configuration
├── main.tsx             # Entry point
└── index.css            # Global styles and theming
```

## Key Features

### Landing Page (Home)
- Hero section with animated Orb component
- Birmingham statistics and challenge statement
- Mesh Insight Engine capabilities showcase
- Ethics and privacy messaging

### Platform Page
- Detailed platform capabilities
- How it works workflow
- Integration ecosystem
- Key technical features

### About Page
- Company mission, vision, and values
- Birmingham context and statistics
- Team roles and structure
- Roadmap for development phases
- Career opportunities

### Contact Page
- Contact form with Supabase integration
- Multiple contact methods
- Frequently asked questions
- Real-time form validation

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- Supabase account with database access

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env` file with:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint code quality checks
- `npm run typecheck` - Run TypeScript type checking

## Database Schema

### contact_requests table
Stores contact form submissions with fields:
- `id` (UUID primary key)
- `name` (text, required)
- `email` (text, required)
- `company` (text, optional)
- `type` (enum: 'demo', 'partnership', 'general')
- `message` (text, required)
- `created_at` (timestamp)

**Security**: Row-level security enabled with policies for anonymous submissions and admin-only reads.

## Design System

### Color Palette
- **Primary**: Red (#c41e3a) - for CTAs and highlights
- **Background**: Slate 950 (#030712) - dark base
- **Secondary**: Slate gradients for depth
- **Accent**: Red/crimson for interactive elements

### Typography
- **Headings**: Bold sans-serif (5xl-6xl for main, 4xl-5xl for sections)
- **Body**: Regular sans-serif at 16-18px
- **Code**: Monospace for technical content

### Components
- Rounded corners (8px default)
- Border colors: slate-800 with red-500 hover states
- Shadow effects with red glow on hover
- Smooth transitions and animations via Framer Motion

## Animations & Interactions

- **Orb component**: Responds to mouse movement with smooth scaling and rotation
- **Page transitions**: Fade in/out with staggered child animations
- **Button hover states**: Scale, color, and shadow changes
- **Scroll animations**: Elements fade and slide in on viewport entry
- **Form validation**: Real-time feedback with loading and success states

## Performance Optimizations

- Code splitting via Vite
- Lazy component loading with React.lazy
- Image optimization (linked from Unsplash)
- CSS purging with Tailwind
- Production bundle: ~468KB JavaScript, ~18KB CSS (gzipped: 142KB JS, 4KB CSS)

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Color contrast ratios meet WCAG AA standards
- Keyboard navigation support
- Form validation with clear error messages

## Deployment

The project is production-ready and can be deployed to:
- Vercel
- Netlify
- AWS Amplify
- Traditional web servers

Ensure environment variables are configured in your hosting platform.

## Contact & Support

- **Email**: info@meshplatform.io
- **Phone**: (205) 555-0100
- **Location**: Birmingham, AL

## License

Proprietary - Mesh Platform 2025

---

Built with React, Vite, Tailwind CSS, and Supabase. Serving public safety in Birmingham, Alabama.
