"use client"

import type { CartItemType } from "@/types/cart"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  const handleIncrement = () => {
    updateQuantity(item.product.id, item.quantity + 1)
  }

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.product.id, item.quantity - 1)
    }
  }

  const handleRemove = () => {
    removeItem(item.product.id)
  }

  return (
    <div className="py-4 flex items-start gap-4">
      <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md border">
        <img
          src={item.product.image || "/placeholder.svg"}
          alt={item.product.name}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex-1 min-w-0">
        <Link href={`/products/${item.product.id}`} className="hover:underline">
          <h3 className="font-medium">{item.product.name}</h3>
        </Link>

        <p className="mt-1 text-sm text-muted-foreground">{item.product.price.toFixed(2)} € / unité</p>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
              className="h-8 w-8 rounded-none"
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Diminuer</span>
            </Button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <Button variant="ghost" size="icon" onClick={handleIncrement} className="h-8 w-8 rounded-none">
              <Plus className="h-3 w-3" />
              <span className="sr-only">Augmenter</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            <span className="text-xs">Supprimer</span>
          </Button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-medium">{(item.product.price * item.quantity).toFixed(2)} €</p>
      </div>
    </div>
  )
}
