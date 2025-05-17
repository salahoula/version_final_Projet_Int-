"use client"

import { useCart } from "@/contexts/cart-context"
import { CartItem } from "@/components/cart-item"
import { CartSummary } from "@/components/cart-summary"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { items, totalPrice, isEmpty } = useCart()

  if (isEmpty) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mon Panier</h1>
        <div className="bg-muted p-8 rounded-lg text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Votre panier est vide</h2>
          <p className="mb-4">Ajoutez des produits à votre panier pour commencer vos achats</p>
          <Button asChild>
            <Link href="/products">Continuer mes achats</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mon Panier</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <div className="bg-card rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Articles ({items.length})</h2>
              <div className="divide-y">
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <CartSummary totalPrice={totalPrice} />

          <div className="mt-4 flex flex-col gap-2">
            <Button size="lg" className="w-full">
              Procéder au paiement
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full">
              <Link href="/products">Continuer mes achats</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
