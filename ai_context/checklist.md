Prompt: AI Trip Planner Context & Checklist for Continuity
💡 This is an ongoing project where I am building an AI-powered travel planning MVP. Below is all the relevant project context, tech stack, and progress. Use this information to provide structured, relevant, and efficient responses without me having to re-explain details.
❗ At the end of this chat, when I request an updated checklist, you must automatically update any changes, log completed tasks, and revise pending issues before providing the new version. Also, if you feel like the first prompt explaining your role needs to be modified, if you learned something new, re-print an updated version of that as well.
 
1️⃣ Project Overview (Core Context)
•	Project Name: AI Travel Planner MVP
•	Goal: AI-driven trip planning app integrating Google Maps, Google Places, and itinerary optimization.
•	Tech Stack:
o	Frontend & Backend: Next.js 14 (App Router)
o	API Communication: tRPC
o	Database ORM: Prisma
o	Database: PostgreSQL (Hosted on Railway, Supabase, or Render)
o	Hosting: Frontend & Backend on Vercel, Database on Railway/Supabase/Render
o	Authentication: Likely using NextAuth.js, if needed
 
2️⃣ MVP Core Features (What’s Being Built)
•	✅ Traveler Profiling: Users define trip preferences.
•	✅ Area & Destination Selection: AI suggests places based on user preferences.
•	✅ Trip Type Decision: Determines whether to stay in a base or travel between cities.
•	✅ Activity Selection: AI curates activities, users select from options (linked to location).
•	✅ Parallel Planning: Supports group splits (e.g., parents relax while kids do surf lessons).
•	✅ Google Maps Integration: Displays locations dynamically.
•	✅ Google Places API: Fetches location info, photos, and ratings.
•	✅ Final Itinerary Generation: AI optimizes trip structure based on user input.
 
3️⃣ Current Progress (Update This Before Switching Chats)
🔹 Last Completed Task:
🟢 Example: "Set up Next.js 14 app, installed dependencies (tRPC, Prisma, TailwindCSS, etc.)."
🔸 Next Task:
🟡 Example: "Implementing tRPC endpoints for storing traveler profiles."
⚠ Pending Issues / Roadblocks:
🔴 Example: "Debugging Prisma connection issue with Supabase."
 
4️⃣ Folder & File Structure (Modify Based on Progress)
pgsql
CopyEdit
my-app/
├── app/
│   ├── (UI pages & components)
│   ├── api/
│   │   ├── places/route.js      <-- Calls Google Places API
│   │   ├── trips/route.js       <-- Saves user trips in DB
│   │   ├── activities/route.js  <-- Retrieves available activities
│   └── layout.js
├── prisma/
│   ├── schema.prisma      <-- Defines database models
│   ├── migrations/        <-- Database migration files
│   └── seed.ts            <-- (Optional) Sample data for testing
├── lib/
│   ├── prisma.js          <-- Prisma client connection
│   ├── trpc.ts            <-- Config for tRPC
├── .env                   <-- API keys & secrets
├── package.json           <-- Dependencies
 
5️⃣ APIs & Dependencies Being Used
✔ Google Maps API (for interactive maps).
✔ Google Places API (for fetching locations & details).
✔ Prisma ORM (for managing PostgreSQL).
✔ tRPC (for frontend-backend communication).
✔ TailwindCSS (for styling).

