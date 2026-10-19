import type { NextConfig } from 'next';

/*
 * Die bestehende WordPress-Seite arbeitet mit Schrägstrich am Ende jeder URL.
 * trailingSlash hält jede bisherige Adresse 1:1 erreichbar — der Ratgeber
 * bringt den meisten Suchmaschinen-Traffic und darf keine URL verlieren.
 */
const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [48, 64, 96, 128, 256, 384],
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com' }]
  },
  async redirects() {
    return [
      // Alte, irreführende WordPress-Slugs auf sprechende Adressen
      { source: '/wig-einsteiger-schweisskurs-2/', destination: '/autogen-einsteiger-schweisskurs/', permanent: true },
      { source: '/vorgang/:slug*', destination: '/tuev-gepruefter-schweisskurs/', permanent: true },
      // Standort Friedrichshafen/Meckenbeuren wird nicht mehr angeboten
      { source: '/region-meckenbeuren/', destination: '/termine-und-anmeldungen/', permanent: true },
      { source: '/anfahrt-meckenbeuren/', destination: '/termine-und-anmeldungen/', permanent: true },
      // WordPress-Archive
      { source: '/category/schweissanleitung/', destination: '/ratgeber/schweissanleitung/', permanent: true },
      { source: '/tag/schweissanleitung/', destination: '/ratgeber/schweissanleitung/', permanent: true },
      { source: '/category/schweissgeraete/e-hand-schweissgeraete/', destination: '/ratgeber/schweisszubehoer/elektroden-schweissgeraete/', permanent: true },
      { source: '/category/:slug*', destination: '/ratgeber/', permanent: true },
      { source: '/tag/:slug*', destination: '/ratgeber/', permanent: true },
      { source: '/beispiel-seite/', destination: '/', permanent: true },
      { source: '/feed/', destination: '/', permanent: true },
      { source: '/wp-admin/:path*', destination: '/admin/', permanent: false },
      { source: '/wp-login.php', destination: '/admin/', permanent: false },
      { source: '/datenschutzerklaerung/', destination: '/datenschutz/', permanent: true },
      { source: '/widerrufsbelehrung/', destination: '/widerruf/', permanent: true }
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
        ]
      },
      {
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]
      },
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
      }
    ];
  }
};

export default nextConfig;
