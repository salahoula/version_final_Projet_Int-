"use client"

import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { useFavorites } from "@/contexts/favorites-context"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(product.image)
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
    addToCart(product, quantity)
    toast({
      description: `${quantity} ${quantity > 1 ? "produits ajoutés" : "produit ajouté"} au panier`,
    })
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="aspect-square overflow-hidden rounded-lg border">
          <img src={selectedImage || "/placeholder.svg"} alt={product.name} className="object-cover w-full h-full" />
        </div>

        {product.gallery && product.gallery.length > 0 && (
          <div className="grid grid-cols-4 gap-2">
            {[product.image, ...(product.gallery || [])].slice(0, 4).map((image, index) => (
              <div
                key={index}
                className={cn(
                  "aspect-square overflow-hidden rounded-md border cursor-pointer",
                  selectedImage === image && "ring-2 ring-primary",
                )}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex items-center mt-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-5 w-5",
                    i < Math.floor(product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                  )}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">{product.reviewCount || 0} avis</span>
          </div>
        </div>

        <div className="flex items-baseline gap-4">
          <span className="text-3xl font-bold">{product.price.toFixed(2)} €</span>
          {product.oldPrice && (
            <span className="text-lg text-muted-foreground line-through">{product.oldPrice.toFixed(2)} €</span>
          )}
          {product.oldPrice && (
            <span className="text-sm font-medium px-2 py-1 bg-red-100 text-red-800 rounded-md">
              -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </span>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-muted-foreground">{product.description}</p>

          {product.inStock ? (
            <p className="text-green-600 font-medium">En stock</p>
          ) : (
            <p className="text-red-600 font-medium">Rupture de stock</p>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="h-10 w-10 rounded-none"
            >
              <Minus className="h-4 w-4" />
              <span className="sr-only">Diminuer</span>
            </Button>
            <span className="w-10 text-center">{quantity}</span>
            <Button variant="ghost" size="icon" onClick={incrementQuantity} className="h-10 w-10 rounded-none">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Augmenter</span>
            </Button>
          </div>

          <Button onClick={handleAddToCart} className="flex-1" disabled={!product.inStock}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Ajouter au panier
          </Button>

          <Button variant="outline" size="icon" onClick={handleToggleFavorite}>
            <Heart className={cn("h-5 w-5", isFavorite && "fill-red-500 text-red-500")} />
            <span className="sr-only">{isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}</span>
          </Button>
        </div>

        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Spécifications</TabsTrigger>
            <TabsTrigger value="reviews">Avis</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <div className="prose max-w-none">
              <p>{product.fullDescription || product.description}</p>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="mt-4">
            <div className="space-y-4">
              {product.specifications &&
                product.specifications.map((spec, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 py-2 border-b">
                    <div className="font-medium">{spec.name}</div>
                    <div>{spec.value}</div>
                  </div>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <div className="space-y-4">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">{review.author}</div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4",
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {new Date(review.date).toLocaleDateString()}
                    </div>
                    <p className="mt-2">{review.content}</p>
                  </div>
                ))
              ) : (
                <p>Aucun avis pour ce produit.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
