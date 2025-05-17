"use client"

import type { Product } from "@/types/product"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { useFavorites } from "@/contexts/favorites-context"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface ProductCardProps {
  product: Product
  showRemoveButton?: boolean
  onRemoveFavorite?: () => void
}

export function ProductCard({ product, showRemoveButton, onRemoveFavorite }: ProductCardProps) {
  const { addToCart } = useCart()
  const { favorites, addFavorite, removeFavorite } = useFavorites()
  const { toast } = useToast()

  const isFavorite = favorites.includes(product.id)

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(product.id)
      toast({
        description: "Produit retiré des favoris",
      })
    } else {
      addFavorite(product.id)
      toast({
        description: "Produit ajouté aux favoris",
      })
    }
  }

  const handleAddToCart = () => {
    addToCart(product, 1)
    toast({
      description: "Produit ajouté au panier",
    })
  }

  return (
    <Card className="overflow-hidden group">
      <div className="relative">
        <Link href={`/products/${product.id}`}>
          <div className="aspect-square overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
            />
          </div>
        </Link>

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
          onClick={showRemoveButton ? onRemoveFavorite : handleToggleFavorite}
        >
          <Heart className={cn("h-5 w-5", isFavorite && "fill-red-500 text-red-500")} />
          <span className="sr-only">{isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}</span>
        </Button>
      </div>

      <CardContent className="p-4">
        <Link href={`/products/${product.id}`} className="hover:underline">
          <h3 className="font-medium line-clamp-2 min-h-[48px]">{product.name}</h3>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold">{product.price.toFixed(2)} €</span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">{product.oldPrice.toFixed(2)} €</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full" variant="secondary">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Ajouter au panier
        </Button>
      </CardFooter>
    </Card>
  )
}
