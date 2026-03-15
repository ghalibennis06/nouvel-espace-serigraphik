import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nouvelespaceserigraphik.ma',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      },
    ],
  },
  // Preserve legacy WooCommerce-style SEO URLs
  async redirects() {
    return [
      {
        source: '/categorie-produit/:slug*',
        destination: '/fr/categorie-produit/:slug*',
        permanent: false,
        locale: false,
      },
      {
        source: '/produit/:slug*',
        destination: '/fr/produit/:slug*',
        permanent: false,
        locale: false,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
