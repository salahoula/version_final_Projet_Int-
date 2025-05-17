import { getProducts } from "@/lib/api/products"
import { ProductCard } from "@/components/product-card"

interface ProductRecommendationsProps {
  productId: string
}

export async function ProductRecommendations({ productId }: ProductRecommendationsProps) {
  // Dans une application réelle, vous utiliseriez l'ID du produit pour obtenir des recommandations
  // Ici, nous récupérons simplement quelques produits en vedette
  const products = await getProducts({ featured: true, limit: 4 })

  // Filtrer le produit actuel des recommandations
  const filteredProducts = products.filter((product) => product.id !== productId)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
