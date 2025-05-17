import { ProductGrid } from "@/components/product-grid"
import { HeroSection } from "@/components/hero-section"
import { FeaturedCategories } from "@/components/featured-categories"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <FeaturedCategories />
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Produits populaires</h2>
        <ProductGrid featured={true} />
      </section>
    </div>
  )
}
