"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Heart, User, Search, Menu, X } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { itemCount } = useCart()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/" className={`text-lg font-medium ${isActive("/") ? "text-primary" : "text-foreground"}`}>
                Accueil
              </Link>
              <Link
                href="/products"
                className={`text-lg font-medium ${isActive("/products") ? "text-primary" : "text-foreground"}`}
              >
                Produits
              </Link>
              <Link
                href="/categories"
                className={`text-lg font-medium ${isActive("/categories") ? "text-primary" : "text-foreground"}`}
              >
                Catégories
              </Link>
              <Link
                href="/about"
                className={`text-lg font-medium ${isActive("/about") ? "text-primary" : "text-foreground"}`}
              >
                À propos
              </Link>
              <Link
                href="/contact"
                className={`text-lg font-medium ${isActive("/contact") ? "text-primary" : "text-foreground"}`}
              >
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl">E-Shop</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/"
            className={isActive("/") ? "text-primary" : "text-foreground/60 transition-colors hover:text-foreground"}
          >
            Accueil
          </Link>
          <Link
            href="/products"
            className={
              isActive("/products") ? "text-primary" : "text-foreground/60 transition-colors hover:text-foreground"
            }
          >
            Produits
          </Link>
          <Link
            href="/categories"
            className={
              isActive("/categories") ? "text-primary" : "text-foreground/60 transition-colors hover:text-foreground"
            }
          >
            Catégories
          </Link>
          <Link
            href="/about"
            className={
              isActive("/about") ? "text-primary" : "text-foreground/60 transition-colors hover:text-foreground"
            }
          >
            À propos
          </Link>
          <Link
            href="/contact"
            className={
              isActive("/contact") ? "text-primary" : "text-foreground/60 transition-colors hover:text-foreground"
            }
          >
            Contact
          </Link>
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          {isSearchOpen ? (
            <div className="relative">
              <Input type="search" placeholder="Rechercher..." className="w-[200px] sm:w-[300px]" autoFocus />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Rechercher</span>
            </Button>
          )}

          <Link href="/favorites">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Favoris</span>
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {itemCount}
                </Badge>
              )}
              <span className="sr-only">Panier</span>
            </Button>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Mon compte</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Mon profil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">Mes commandes</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Déconnexion</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Connexion
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
