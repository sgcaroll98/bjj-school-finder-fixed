# BJJ School Finder - Upgrade Plan Implementation

This repository contains the implementation of the upgrade plan functionality for the BJJ School Finder project. The main features include:

1. **Dashboard Page**:
   - Shows schools with their current plan status
   - Provides upgrade links for schools on Free or Basic plans
   - Improved UI with better styling and feedback messages

2. **Upgrade Plan Page**:
   - Allows users to select which school to upgrade (if they have multiple schools)
   - Displays pricing cards for Free, Basic, and Premium plans
   - Shows a detailed feature comparison table
   - Implements plan selection functionality

3. **School Edit Page**:
   - Shows the current subscription plan with a colored badge
   - Provides an upgrade button for schools on Free or Basic plans

## Deployment

This project is ready to be deployed to Vercel. Make sure to set up the following environment variables in your Vercel project:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_MAPBOX_TOKEN` (if using Mapbox)
- `NEXT_PUBLIC_N8N_WEBHOOK_URL` (if using n8n)

## Technologies Used

- Next.js for the frontend framework
- Supabase for database and authentication
- Tailwind CSS for styling
