import type { LoginCredentials, LoginResponse } from "@/types/auth";

export async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Invalid credentials");
  }

  return response.json();
}

