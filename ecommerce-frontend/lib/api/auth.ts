import type { User } from "@/types/user"

// Fonction simulant une API d'authentification
export async function login(email: string, password: string): Promise<{ user: User; token: string }> {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Dans une application réelle, vous feriez un appel API ici
  if (email === "user@example.com" && password === "password") {
    return {
      user: {
        id: "1",
        name: "Utilisateur Test",
        email: "user@example.com",
        role: "user",
      },
      token: "fake-jwt-token",
    }
  }

  throw new Error("Identifiants invalides")
}

export async function register(name: string, email: string, password: string): Promise<{ user: User; token: string }> {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Dans une application réelle, vous feriez un appel API ici
  return {
    user: {
      id: "2",
      name,
      email,
      role: "user",
    },
    token: "fake-jwt-token",
  }
}

export async function logout(): Promise<void> {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Dans une application réelle, vous feriez un appel API ici
  return
}
