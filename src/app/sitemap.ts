import type { MetadataRoute } from 'next';
import { allPages } from '@/lib/routes';
import { absUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return allPages().map((p) => ({ url: absUrl(p.path), lastModified: now, changeFrequency: p.freq, priority: p.prio }));
}
