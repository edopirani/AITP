/*
📌 What This File Does:
- This is the **API entry point** for tRPC.
- It receives requests at `/api/trpc/hello` (or other endpoints defined in `server/trpc.ts`).
- It forwards those requests to the backend router (`appRouter`).
*/

/*
🚀 Example Requests:
1️⃣ **GET Request (Fetching Data)**
   Request:  GET http://localhost:3000/api/trpc/hello?input={"name":"Edoardo"}
   Response: { "message": "Hello, Edoardo!" }

2️⃣ **POST Request (If We Add a Mutation)**
   Request:  POST http://localhost:3000/api/trpc/hello
   Body:     { "input": { "name": "Edoardo" } }
   Response: { "message": "Hello, Edoardo!" }
*/


// Import tRPC's fetch adapter (so Next.js can handle tRPC requests)
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

// Import the backend router (where API logic is defined)
import { appRouter } from "@/server/trpc";


const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc", // Defines the API base URL
    req, // The incoming HTTP request
    router: appRouter, // The backend router with API logic
    createContext: () => ({}), // (Optional) Add authentication or other context if needed
  });
};

// Export the handler for both GET and POST requests
export { handler as GET, handler as POST };

