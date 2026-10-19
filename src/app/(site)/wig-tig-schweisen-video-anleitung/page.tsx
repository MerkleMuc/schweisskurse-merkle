import type { Metadata } from 'next';
import { RATGEBER_BY_PATH } from '@/lib/ratgeber';
import { RatgeberView } from '@/components/RatgeberView';

const page = RATGEBER_BY_PATH['/wig-tig-schweisen-video-anleitung/'];
export const metadata: Metadata = { title: page.title, description: page.description, alternates: { canonical: page.path } };

export default function Page() {
  return <RatgeberView page={page} />;
}
