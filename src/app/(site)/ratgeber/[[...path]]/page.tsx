import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import { RATGEBER, RATGEBER_BY_PATH, nearestExisting } from '@/lib/ratgeber';
import { RatgeberView } from '@/components/RatgeberView';

const toPath = (segs?: string[]) => '/ratgeber/' + (segs?.length ? segs.join('/') + '/' : '');

export function generateStaticParams() {
  return RATGEBER.filter((r) => r.path.startsWith('/ratgeber/')).map((r) => ({ path: r.path.split('/').filter(Boolean).slice(1) }));
}

export async function generateMetadata({ params }: { params: Promise<{ path?: string[] }> }): Promise<Metadata> {
  const p = RATGEBER_BY_PATH[toPath((await params).path)];
  if (!p) return {};
  return { title: p.title, description: p.description, alternates: { canonical: p.path }, openGraph: { type: 'article', title: p.title, description: p.description } };
}

export default async function Page({ params }: { params: Promise<{ path?: string[] }> }) {
  const path = toPath((await params).path);
  const page = RATGEBER_BY_PATH[path];
  // Unbekannte Alt-URLs des Ratgebers per 301 auf die nächste passende Seite
  if (!page) permanentRedirect(nearestExisting(path));
  return <RatgeberView page={page} />;
}
