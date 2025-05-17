import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    id: "electronics",
    name: "Électronique",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=300&auto=format&fit=crop",
    count: 42,
  },
  {
    id: "audio",
    name: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop",
    count: 18,
  },
  {
    id: "computers",
    name: "Ordinateurs",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=300&auto=format&fit=crop",
    count: 24,
  },
  {
    id: "wearables",
    name: "Wearables",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=300&auto=format&fit=crop",
    count: 15,
  },
]

export function FeaturedCategories() {
  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-6">Catégories populaires</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.id}`}>
            <Card className="overflow-hidden h-full transition-all hover:shadow-md">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4 overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    width={96}
                    height={96}
                  />
                </div>
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} produits</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
