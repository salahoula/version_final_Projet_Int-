"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { login as apiLogin, register as apiRegister, logout as apiLogout } from "@/lib/api/auth"
import type { User } from "@/types/user"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token")

        if (token) {
          // Simuler la récupération des informations utilisateur
          // Dans une application réelle, vous feriez un appel API pour valider le token
          const userData = JSON.parse(localStorage.getItem("user") || "{}")
          setUser(userData)
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification:", error)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const { user, token } = await apiLogin(email, password)
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      setUser(user)
    } catch (error) {
      console.error("Erreur lors de la connexion:", error)
      throw error
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const { user, token } = await apiRegister(name, email, password)
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      setUser(user)
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await apiLogout()
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setUser(null)
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
      throw error
    }
  }

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider")
  }
  return context
}
