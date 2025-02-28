# Jiujitsu School Finder - Project Documentation

## Project Overview
Jiujitsu School Finder is a web application built with Next.js and Supabase that helps users find and compare Brazilian Jiujitsu schools based on location, training styles, and features.

## Key Features
- Location-based school search
- Browse schools by categories, states, and popular cities
- Latest blog articles with categorized content
- Responsive design for all devices

## File Structure

### Main Pages
- `pages/index.js` - Homepage with hero section, browse tiles, and blog content
- `pages/_app.js` - Main app component that wraps all pages
- `pages/schools/index.js` - Schools listing page

### Components
- `components/Layout.js` - Main layout wrapper with header and footer
- `components/SchoolCard.js` - Component for individual school listings

### Styles
- `styles/globals.css` - Global CSS styles
- `styles/school.css` - School-specific styling

### Scripts
- `public/scripts/textAnimation.js` - Text animation for the hero section

## Design Decisions

### Typography
- Primary font: Inter (Google Fonts)
- Font weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Color Scheme
- Primary: #4f46e5 (Indigo)
- Accent: #10b981 (Green)
- Text: #1f2937 (Dark Gray)
- Light Background: #f9fafb (Light Gray)

## Recent Updates
- Improved text animation speed in the hero section
- Updated browse tiles with SVG icons
- Redesigned footer to use the light theme with three-column layout
- Fixed styling for consistent padding and spacing

## Notes for Developers
- The hero section uses a dynamic typing animation effect
- Browse tiles use SVG icons instead of Font Awesome
- Blog cards are styled based on their category using data attributes
- Footer uses a three-column grid layout

## Next Steps
- Implement full search functionality
- Connect to Supabase database for dynamic content
- Add user authentication for saving favorite schools
- Implement school review system

## Deployment
The application is deployed on Vercel and connected to a Supabase backend.
