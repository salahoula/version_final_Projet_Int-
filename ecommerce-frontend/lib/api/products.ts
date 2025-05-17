import type { Product } from "@/types/product"

// Données des produits avec des URLs d'images externes
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Smartphone XYZ Pro",
    description: "Un smartphone haut de gamme avec des fonctionnalités avancées",
    fullDescription:
      "Le Smartphone XYZ Pro est équipé d'un écran AMOLED de 6,7 pouces, d'un processeur octa-core, de 12 Go de RAM et de 256 Go de stockage. Il dispose d'un appareil photo principal de 108 MP et d'une batterie de 5000 mAh avec charge rapide.",
    price: 899.99,
    oldPrice: 999.99,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=600&auto=format&fit=crop",
    ],
    category: "electronics",
    inStock: true,
    featured: true,
    rating: 4.5,
    reviewCount: 128,
    specifications: [
      { name: "Écran", value: "6,7 pouces AMOLED" },
      { name: "Processeur", value: "Octa-core 2.8 GHz" },
      { name: "RAM", value: "12 Go" },
      { name: "Stockage", value: "256 Go" },
      { name: "Batterie", value: "5000 mAh" },
    ],
    reviews: [
      {
        author: "Jean Dupont",
        rating: 5,
        date: "2023-05-15",
        content:
          "Excellent smartphone, rapide et avec une excellente autonomie. L'appareil photo est incroyable pour les photos de nuit.",
      },
      {
        author: "Marie Martin",
        rating: 4,
        date: "2023-06-02",
        content:
          "Très bon téléphone, mais un peu cher. L'écran est magnifique et les performances sont au rendez-vous.",
      },
    ],
  },
  {
    id: "2",
    name: "Casque Audio Sans Fil",
    description: "Casque audio sans fil avec réduction de bruit active",
    fullDescription:
      "Ce casque audio sans fil offre une qualité sonore exceptionnelle avec sa technologie de réduction de bruit active. Profitez de jusqu'à 30 heures d'autonomie et d'un confort optimal grâce à ses coussinets en mousse à mémoire de forme.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
    category: "audio",
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 75,
    specifications: [
      { name: "Type", value: "Circum-aural" },
      { name: "Autonomie", value: "30 heures" },
      { name: "Connectivité", value: "Bluetooth 5.0" },
      { name: "Réduction de bruit", value: "Active" },
    ],
    reviews: [],
  },
  {
    id: "3",
    name: "Ordinateur Portable Ultra-fin",
    description: "Ordinateur portable léger et puissant pour les professionnels",
    price: 1299.99,
    oldPrice: 1499.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop",
    category: "computers",
    inStock: true,
    featured: true,
    rating: 4.2,
    reviewCount: 42,
    specifications: [],
    reviews: [],
  },
  {
    id: "4",
    name: "Montre Connectée Sport",
    description: "Montre connectée avec suivi d'activité et GPS intégré",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop",
    category: "wearables",
    inStock: false,
    featured: false,
    rating: 4.0,
    reviewCount: 56,
    specifications: [],
    reviews: [],
  },
  {
    id: "5",
    name: "Enceinte Bluetooth Portable",
    description: "Enceinte portable résistante à l'eau avec un son puissant",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop",
    category: "audio",
    inStock: true,
    featured: false,
    rating: 4.6,
    reviewCount: 112,
    specifications: [],
    reviews: [],
  },
  {
    id: "6",
    name: "Tablette Graphique Professionnelle",
    description: "Tablette graphique haute précision pour les designers",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=600&auto=format&fit=crop",
    category: "accessories",
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 28,
    specifications: [],
    reviews: [],
  },
  {
    id: "7",
    name: "Appareil Photo Reflex Numérique",
    description: "Appareil photo reflex avec capteur plein format",
    price: 1499.99,
    oldPrice: 1699.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
    category: "photography",
    inStock: true,
    featured: false,
    rating: 4.9,
    reviewCount: 64,
    specifications: [],
    reviews: [],
  },
  {
    id: "8",
    name: "Drone avec Caméra 4K",
    description: "Drone compact avec caméra 4K stabilisée",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=600&auto=format&fit=crop",
    category: "photography",
    inStock: true,
    featured: true,
    rating: 4.4,
    reviewCount: 37,
    specifications: [],
    reviews: [],
  },
]

interface GetProductsOptions {
  featured?: boolean
  categoryId?: string
  limit?: number
}

// Fonction simulant une API pour récupérer les produits
export async function getProducts(options: GetProductsOptions = {}): Promise<Product[]> {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredProducts = [...mockProducts]

  if (options.featured !== undefined) {
    filteredProducts = filteredProducts.filter((product) => product.featured === options.featured)
  }

  if (options.categoryId) {
    filteredProducts = filteredProducts.filter((product) => product.category === options.categoryId)
  }

  if (options.limit) {
    filteredProducts = filteredProducts.slice(0, options.limit)
  }

  return filteredProducts
}

// Fonction simulant une API pour récupérer un produit par son ID
export async function getProductById(id: string): Promise<Product | null> {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 300))

  const product = mockProducts.find((product) => product.id === id)
  return product || null
}

// Fonction simulant une API pour récupérer plusieurs produits par leurs IDs
export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 400))

  return mockProducts.filter((product) => ids.includes(product.id))
}
