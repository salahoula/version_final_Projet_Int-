import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Découvrez nos produits exceptionnels
            </h1>
            <p className="text-xl text-muted-foreground">
              Explorez notre sélection de produits de haute qualité à des prix compétitifs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/products">Découvrir</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/categories">Parcourir les catégories</Link>
              </Button>
            </div>
          </div>

          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop"
              alt="Produit vedette"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
