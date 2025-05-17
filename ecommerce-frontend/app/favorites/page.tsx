"use client"

import { useFavorites } from "@/contexts/favorites-context"
import { ProductCard } from "@/components/product-card"
import { useEffect, useState } from "react"
import { getProductsByIds } from "@/lib/api/products"
import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/components/ui/use-toast"

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      if (favorites.length === 0) {
        setProducts([])
        setLoading(false)
        return
      }

      try {
        const fetchedProducts = await getProductsByIds(favorites)
        setProducts(fetchedProducts)
      } catch (error) {
        console.error("Failed to fetch favorite products:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger vos produits favoris",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [favorites, toast])

  const handleAddAllToCart = () => {
    products.forEach((product) => {
      addToCart(product, 1)
    })

    toast({
      title: "Succès",
      description: `${products.length} produits ajoutés au panier`,
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mes Favoris</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mes Favoris</h1>
        <div className="bg-muted p-8 rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Vous n'avez pas encore de favoris</h2>
          <p className="mb-4">Parcourez notre catalogue et ajoutez des produits à vos favoris</p>
          <Button href="/products">Découvrir nos produits</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mes Favoris</h1>
        <Button onClick={handleAddAllToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Tout ajouter au panier
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onRemoveFavorite={() => removeFavorite(product.id)}
            showRemoveButton
          />
        ))}
      </div>
    </div>
  )
}
