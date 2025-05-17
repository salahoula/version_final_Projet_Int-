import { getProducts } from "@/lib/api/products"
import { ProductCard } from "@/components/product-card"

interface ProductGridProps {
  featured?: boolean
  categoryId?: string
  limit?: number
}

export async function ProductGrid({ featured, categoryId, limit }: ProductGridProps) {
  const products = await getProducts({ featured, categoryId, limit })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
