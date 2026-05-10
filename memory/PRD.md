# Learn and Drive - 2-Wheeler Driving School Website

## Problem Statement
Create a static website for "Learn and Drive" driving school specializing in 2-wheeler driving training. The website should be SEO-friendly, showcase services, and include customer reviews.

## Architecture
- **Frontend**: React + Tailwind CSS (static single-page marketing site)
- **Backend**: FastAPI (minimal, hello-world only - site is static)
- **Database**: MongoDB (not used for static site)

## School Info
- **Name**: Learn and Drive
- **Address**: Road, opp. ASBL, Janmabhoomi Colony, Chaitanya Enclave, Khajaguda, Makthakousarali, Telangana 500104
- **Phone**: 9985747111
- **Google Maps**: https://maps.app.goo.gl/UHqRmVcc8FJLZ7a58

## What's Been Implemented (Feb 2026)
- [x] SEO-optimized index.html with meta tags, JSON-LD structured data
- [x] Sticky glassmorphism navbar with smooth scroll (6 links including Enroll)
- [x] Hero section (woman on scooter image, 500+ students badge)
- [x] Stats bar — 3 stats only (Students, License Success, Road Safety) — Years Experience removed
- [x] About section with woman riding scooter image
- [x] Services section - bento grid (Basic 2-Wheeler Riding + License Preparation)
- [x] Why Choose Us section (4 feature cards)
- [x] Reviews/Testimonials grid (6 real-looking reviews)
- [x] **Enrollment Form** — Name, Phone, Course, Message fields with validation
- [x] **Google Sheets Integration** — Submissions go LIVE to Google Sheets via Apps Script webhook
- [x] MongoDB storage — All enrollments also saved to local DB
- [x] Contact section with Google Maps embed + address + phone
- [x] Footer with quick links
- [x] Custom fonts: Cabinet Grotesk + Work Sans

## Design System
- Primary: #FFB800 (Amber/Safety Yellow)
- Background: #FDFDFD / #F8FAFC
- Text: #0F172A / #475569
- Style: Swiss & High-Contrast (Archetype 4)
- Fonts: Cabinet Grotesk (headings) + Work Sans (body)

## Prioritized Backlog
### P0 (Done)
- Static website with all sections
- SEO meta tags and structured data
- Mobile responsive design
- Google Maps integration

### P1 (Next)
- WhatsApp chat button integration
- Enquiry/contact form
- Photo gallery of training sessions
- Course pricing table

### P2 (Future)
- Online booking system
- Admin panel for managing enquiries
- Student testimonial submission form
- Blog/tips section for SEO
