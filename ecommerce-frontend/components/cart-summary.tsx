import { Separator } from "@/components/ui/separator"

interface CartSummaryProps {
  totalPrice: number
}

export function CartSummary({ totalPrice }: CartSummaryProps) {
  // Frais de livraison fictifs
  const shippingCost = totalPrice > 50 ? 0 : 5.99
  const total = totalPrice + shippingCost

  return (
    <div className="bg-card rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Récapitulatif</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Sous-total</span>
          <span>{totalPrice.toFixed(2)} €</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Livraison</span>
          <span>
            {shippingCost === 0 ? <span className="text-green-600">Gratuite</span> : `${shippingCost.toFixed(2)} €`}
          </span>
        </div>

        {shippingCost > 0 && (
          <div className="text-sm text-muted-foreground">
            Plus que {(50 - totalPrice).toFixed(2)} € pour la livraison gratuite
          </div>
        )}

        <Separator />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{total.toFixed(2)} €</span>
        </div>
      </div>
    </div>
  )
}
