/*
📌 What This File Does:
- Handles user authentication logic for login and registration.
- Uses `fetch` to communicate with the backend.
- Stores authentication tokens (JWT) in local storage.
*/

export async function registerUser(email: string, password: string) {
  const response = await fetch("/api/trpc/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to register user.");
  }

  return response.json();
}

export async function loginUser(email: string, password: string) {
  const response = await fetch("/api/trpc/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid login credentials.");
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);
  return data;
}

export function logoutUser() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function isAuthenticated() {
  return !!getToken();
}