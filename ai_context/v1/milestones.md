v1: 15/02/2025

Revised Milestones
PHASE 0: PREPARATION & REPO SETUP
Goal: Get the dev environment ready, set up Git/GitHub, and plan the project structure.

Set Up Git & GitHub

Initialized a local Git repo (git init)
Created a GitHub repository and linked it (git remote add origin …)
Chose a branching strategy (e.g., main + feature branches)
Learned basic Git commands (commit, push, pull, branching)
Project Skeleton

Decided to use TypeScript for stronger type-safety with tRPC
Created a Next.js 14 project (npx create-next-app@latest --experimental-app --ts)
Installed key packages:
@prisma/client, prisma
@trpc/server, @trpc/client, @tanstack/react-query
(Optional) next-auth, tailwindcss
Configured Tailwind (if needed) via tailwind.config.js, imported in globals.css
Chose a Hosting & Deployment Plan (Optional for now)

Evaluated using Vercel for the Next.js app
Considered Railway or Supabase for the PostgreSQL DB
Git Tip Recap

Committed after each major setup step (project init, adding packages, etc.)
Used meaningful commit messages (“Install Prisma & tRPC dependencies”)
Outcome of Phase 0:
A ready-to-code environment with Next.js, tRPC, Prisma, and Git/GitHub set up.

PHASE 1-2: DATABASE & PRISMA SETUP, Basic tRPC Endpoints
Goal: Connect PostgreSQL and define initial database schemas (e.g., “Users” and “Trips”). Implement minimal authentication and an initial trip feature.

Provision PostgreSQL

Used Railway for a free tier DB
Added DATABASE_URL to .env
Prisma Init

Ran npx prisma init → created prisma/schema.prisma and .env
Updated .env with DATABASE_URL
Define Initial Models

Created User model with:
userId (unique username)
email (unique)
password (hashed)
Created Trip model with:
userId (foreign key referencing User)
destination, startDate, endDate
Prisma Migrate

Ran npx prisma migrate dev --name init → Created DB schema
Confirmed via npx prisma studio that tables match models
tRPC + Basic Endpoints

Implemented register: user creation with hashed passwords
Implemented login: user login with email/username + password
Implemented createTrip: adds a new trip for the authenticated user
Implemented getTripsByUser: fetches trips for a given userId
(Optional) getUserProfile: returns basic user info
MVP Frontend Flows

Authentication Page (/auth):
Toggle between Login (identifier + password) and Register (username + email + password)
Displays errors from backend if credentials are invalid or user already exists
Dashboard Page (/dashboard):
Checks if user is logged in (reads localStorage for token + userId)
Shows user’s trips and a form to create new trips
Offers a Logout button that clears session data
Git Tip Recap

Committed after each major schema change or functional endpoint
Used separate feature branches when adding significant new models or flows
Outcome of Phase 1:
A working MVP with minimal user authentication (register, login, logout) and basic trip management (add, view trips). Users can sign up, log in with either email or username, create trips, and see them on the dashboard.


 
PHASE 3: MVP FRONTEND LAYOUT & BASIC FLOWS
Goal: Create pages and minimal UI to demonstrate the flow from front-end to tRPC endpoints.
1.	Layout & Navigation
o	Build a basic layout in app/layout.tsx with a header/nav.
o	Possibly add a Home page (app/page.tsx) explaining the app.
2.	User Flows
o	Sign Up page (or simple forms to call createUser).
o	Some Traveler Profile form or minimal data input.
3.	Integration
o	Use React Query to fetch or mutate data from your tRPC endpoints.
o	Show success messages or error states.
Git Tip:
•	Commit after each significant UI or user flow implementation.
•	Keep commits atomic: one commit for a new page or new form, for instance.
 
PHASE 4: GOOGLE MAPS & PLACES API INTEGRATION
Goal: Let users see a map of recommended places, or search for beaches/locations.
1.	Set Up a Client Component for Map
o	e.g., app/MapClient.tsx that loads the Google Maps script with NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.
2.	Server-Side Calls to Places (Optional)
o	If you want to hide your API key, create a tRPC procedure or Next route handler that queries Places from the server.
o	Or use a restricted browser key and do calls client-side.
3.	Markers & Info
o	Display markers for locations fetched from Places or your own DB.
o	Possibly store location data in your DB to avoid repeated Places calls.
Git Tip:
•	Separate the map integration into a dedicated branch if major changes are expected.
•	Merge once stable.
 
PHASE 5: AI FEATURES (Trip Planner Logic)
Goal: Integrate an AI model or external service to help plan trips (e.g. using an OpenAI API or your own logic).
1.	Route for AI Recommendations
o	Create a tRPC procedure that calls an AI endpoint (e.g., OpenAI).
o	Provide the user’s inputs (destination, preferences) and parse the AI’s response.
2.	Refine Itinerary
o	Store itinerary data in DB (e.g., Trip, Activity models).
o	Possibly combine AI suggestions with Places data (fetch more location details automatically).
3.	Parallel Planning & Group Splits
o	Add additional fields for group members, activities.
o	Let the AI produce multiple sub-itineraries or recommendations.
Git Tip:
•	Version your AI logic so you don’t lose prior working setups.
•	If you do experiments with prompting, keep them in a separate folder or branch.
 
PHASE 6: POLISH & DEPLOY
Goal: Make it production-ready with a solid user experience.
1.	UI Improvements
o	Better styling, forms, validations.
o	Possibly incorporate a design system or component library.
2.	Authentication
o	If needed, implement NextAuth or custom JWT.
o	Protect certain routes or features (e.g., only logged-in users can save a trip).
3.	Error Handling & Logging
o	Make sure you handle failed API calls gracefully.
o	Add server logs or external logging (e.g., Sentry) if it’s critical.
4.	Deploy
o	Deploy the Next.js app to Vercel.
o	Connect your PostgreSQL on Railway/Supabase.
o	Ensure environment variables are set (API keys, DB URL).
Git Tip:
•	Tag your version: git tag v1.0.0 -m "MVP release"
•	Merge all final changes to main and deploy from there.

