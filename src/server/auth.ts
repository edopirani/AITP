import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

/*
📌 What This File Does:
- Handles user registration & login.
- Uses bcrypt to hash passwords securely.
- Validates login credentials.
*/

// 🔐 Register a new user
export async function registerUser(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { email, password: hashedPassword, userId: "some-unique-id" },
  });
}

// 🔐 Login a user
export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Incorrect password");

  return user;
}