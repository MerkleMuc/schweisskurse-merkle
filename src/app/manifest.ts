import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return { name: 'Merkle Schweißkurse', short_name: 'Schweißkurse', start_url: '/', display: 'browser', background_color: '#FFFFFF', theme_color: '#111827', icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }] };
}
