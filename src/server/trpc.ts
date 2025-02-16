import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const t = initTRPC.create();

// JWT Secret Key (Store this in an environment variable)
const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

export const appRouter = t.router({
  // User Registration
  register: t.procedure
    .input(
      z.object({
        username: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [{ userId: input.username }, { email: input.email }],
          },
        });

        if (existingUser) {
          return { success: false, message: "Username or Email already in use." };
        }

        const hashedPassword = await bcrypt.hash(input.password, 10);

        const user = await prisma.user.create({
          data: {
            userId: input.username,
            email: input.email,
            password: hashedPassword,
          },
        });

        const token = jwt.sign({ userId: user.userId }, SECRET_KEY, { expiresIn: "1h" });

        return { success: true, token, user };
      } catch (error) {
        console.error("Registration Error:", error);
        return { success: false, message: "Registration failed. Please try again." };
      }
    }),

  // User Login (Supports both Email and Username)
  login: t.procedure
    .input(
      z.object({
        identifier: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const user = await prisma.user.findFirst({
          where: {
            OR: [{ email: input.identifier }, { userId: input.identifier }],
          },
        });

        if (!user) {
          return { success: false, message: "User not found." };
        }

        const validPassword = await bcrypt.compare(input.password, user.password);
        if (!validPassword) {
          return { success: false, message: "Invalid credentials." };
        }

        const token = jwt.sign({ userId: user.userId }, SECRET_KEY, { expiresIn: "1h" });

        return { success: true, token, user };
      } catch (error) {
        console.error("Login Error:", error);
        return { success: false, message: "Login failed. Please try again." };
      }
    }),

  // Fetch User Profile
  getUserProfile: t.procedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      try {
        const user = await prisma.user.findUnique({
          where: { userId: input.userId },
          select: { userId: true, email: true },
        });

        if (!user) {
          return { success: false, message: "User not found." };
        }

        return { success: true, user };
      } catch (error) {
        console.error("Fetch Profile Error:", error);
        return { success: false, message: "Failed to fetch user profile." };
      }
    }),

  // Fetch All Trips for a User
  getTripsByUser: t.procedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      try {
        const trips = await prisma.trip.findMany({
          where: { userId: input.userId },
        });

        return { success: true, trips };
      } catch (error) {
        console.error("Fetch Trips Error:", error);
        return { success: false, message: "Failed to fetch trips." };
      }
    }),

  // Create a New Trip
  createTrip: t.procedure
    .input(
      z.object({
        userId: z.string(),
        destination: z.string(),
        startDate: z.string(),
        endDate: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const trip = await prisma.trip.create({
          data: {
            userId: input.userId,
            destination: input.destination,
            startDate: input.startDate,
            endDate: input.endDate,
          },
        });

        return { success: true, trip };
      } catch (error) {
        console.error("Create Trip Error:", error);
        return { success: false, message: "Failed to create trip." };
      }
    }),

  // User Logout (Clears frontend token)
  logout: t.procedure.mutation(() => {
    return { success: true, message: "User logged out successfully." };
  }),
});

// Export API types for frontend use
export type AppRouter = typeof appRouter;
