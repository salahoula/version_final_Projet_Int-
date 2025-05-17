import { ProductDetail } from "@/components/product-detail"
import { ProductRecommendations } from "@/components/product-recommendations"
import { Suspense } from "react"
import { ProductDetailSkeleton } from "@/components/skeletons/product-detail-skeleton"
import { getProductById } from "@/lib/api/products"
import { notFound } from "next/navigation"

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail product={product} />
      </Suspense>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Vous pourriez aussi aimer</h2>
        <ProductRecommendations productId={params.id} />
      </section>
    </div>
  )
}
