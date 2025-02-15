v0: 15/02/2025

PHASE 0: PREPARATION & REPO SETUP
Goal: Get the dev environment ready, set up Git/GitHub, and plan the project structure.
1.	Set Up Git & GitHub
o	Initialize a local git repo (git init).
o	Create a GitHub repo and link it (git remote add origin ...).
o	Decide on a branching strategy (e.g., main + feature branches).
o	Learn basic commands if needed (commit, push, pull, branching).
2.	Project Skeleton
o	Decide on TypeScript vs. JavaScript (TypeScript recommended for better tRPC support).
o	Create a Next.js 14 project (npx create-next-app@latest --experimental-app your-app --ts).
o	Install needed packages:
	@prisma/client, prisma
	@trpc/server, @trpc/client, @tanstack/react-query (for tRPC)
	next-auth (if using NextAuth, optional)
	tailwindcss (if using Tailwind)
o	Set up Tailwind (if using it):
1.	npx tailwindcss init -p
2.	Configure tailwind.config.js, import in globals.css.
3.	Decide Hosting (Optional for now)
o	Plan which service you’ll deploy on (Vercel for web; Railway or Supabase for DB).
Git Tip:
•	Commit after each major setup step (e.g., after creating Next.js app, after adding Tailwind, etc.).
•	Use meaningful commit messages: “Install Prisma & tRPC dependencies”.
 
PHASE 1: DATABASE & PRISMA SETUP
Goal: Connect PostgreSQL and define initial schema (e.g., “Users”).
1.	Provision PostgreSQL
o	Use Railway, Supabase, or Render for a free tier.
o	Get DATABASE_URL connection string.
2.	Prisma Init
o	npx prisma init → creates prisma/schema.prisma + .env.
o	Update .env with DATABASE_URL.
3.	Define Initial Models
o	e.g.:
prisma
CopyEdit
model User {
  id        String  @id @default(uuid())
  email     String  @unique
  password  String
  createdAt DateTime @default(now())
}
o	You can expand later with “Trip”, “Location”, etc.
4.	Prisma Migrate
o	npx prisma migrate dev --name init → Creates DB schema.
o	Test with npx prisma studio to ensure the DB is accessible.
Git Tip:
•	Commit after a successful migration or schema change.
•	Consider using feature branches for new models, then merge into main once stable.
 
PHASE 2: tRPC + BASIC ENDPOINTS
Goal: Implement core backend logic with tRPC routers. Provide minimal endpoints.
1.	Set Up tRPC
o	Create a root router (e.g. app/api/trpc/[trpc].ts or a top-level trpc.ts file in lib/).
o	Example:
ts
CopyEdit
// lib/trpc.ts
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

const t = initTRPC.context<YourContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;
// etc.
2.	User Router
o	e.g., src/server/routers/user.ts:
ts
CopyEdit
import { router, publicProcedure } from '../trpc';
import { z } from 'zod';

export const userRouter = router({
  createUser: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // Use Prisma to create user
      return ctx.prisma.user.create({ data: input });
    }),
});
3.	Combine Routers
o	e.g., export const appRouter = router({ user: userRouter });
o	Expose appRouter to Next.js using an API route or next-13 route handler.
4.	Frontend tRPC Client
o	e.g., a trpc.ts file in frontend that sets up the client using @tanstack/react-query.
Git Tip:
•	One commit per router or major function.
•	Use small PRs if working with a team or future collaborators.
 
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

