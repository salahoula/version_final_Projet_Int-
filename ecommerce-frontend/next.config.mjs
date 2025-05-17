/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration pour les multi-zones
  assetPrefix: process.env.NODE_ENV === 'production' ? '/customer-static' : undefined,
  
  // Configuration pour les rewrites
  async rewrites() {
    return [
      // Rediriger les requêtes d'authentification vers le service d'authentification
      {
        source: '/api/auth/:path*',
        destination: `${process.env.AUTH_SERVICE_URL || 'http://localhost:3001'}/api/auth/:path*`,
      },
      // Rediriger les requêtes de produits vers le service de catalogue
      {
        source: '/api/products/:path*',
        destination: `${process.env.CATALOG_SERVICE_URL || 'http://localhost:3002'}/api/products/:path*`,
      },
      // Rediriger les requêtes de commandes vers le service de commandes
      {
        source: '/api/orders/:path*',
        destination: `${process.env.ORDERS_SERVICE_URL || 'http://localhost:3003'}/api/orders/:path*`,
      },
      // Rediriger les requêtes vers le dashboard admin
      {
        source: '/admin/:path*',
        destination: `${process.env.ADMIN_DASHBOARD_URL || 'http://localhost:4200'}/admin/:path*`,
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
